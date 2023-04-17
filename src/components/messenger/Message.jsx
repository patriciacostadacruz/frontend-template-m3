import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCheckDouble, faFloppyDisk, faBan, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"; 

const Message = ({ message, user, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [content, setContent] = useState(message.content);
  const style = {
    height: "40px",
    width: "40px",
    objectFit: "cover",
    borderRadius: "50px",
  };
  const dropdownRef = useRef(null);

  const handleDelete = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (confirmation) {
      onDelete(message._id);
    }
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await onUpdate(message._id, { content });
    setIsEditing(false);
    setShowOptions(!showOptions);
  };

  const handleCancel = () => {
    setContent(message.content);
    setIsEditing(false);
    setShowOptions(!showOptions);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEllipsisClick = () => {
    setShowOptions(!showOptions);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowOptions(false);
    }
  };

  const formatMessageDate = (date) => {
    const messageDate = new Date(date);
    const currentDate = new Date();
    const isToday =
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear();
    if (isToday) {
      const hours = messageDate.getHours();
      const minutes = messageDate.getMinutes();
      const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
      return formattedTime;
    } else {
      const month = messageDate.toLocaleString("default", { month: "short" });
      const day = messageDate.getDate();
      const formattedDate = `${month} ${day}`;
      return formattedDate;
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={
        message.sender._id === user._id
          ? "message sent-by-me"
          : "message sent-by-other"
      }
    >
      <img src={message.sender.image} alt="Sender pic" style={style} />
      {isEditing ? (
        <>
          <textarea value={content} onChange={handleContentChange} />
          <div className="message-options-dropdown">
            <button onClick={handleSave} className="message-edit-buttons">
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
            <button onClick={handleCancel} className="message-edit-buttons">
              <FontAwesomeIcon icon={faBan} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="message-details">
            <p>
              {message.sender._id === user._id && (
                <FontAwesomeIcon icon={faCheckDouble} />
              )}
              {" "}{message.content}
            </p>
          </div>
          <p className="message-date">{formatMessageDate(message.createdAt)}</p>
          <div className="message-options">
            {message.sender._id === user._id && (
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                onClick={handleEllipsisClick}
                className="ellipsis"
              />
            )}
            {showOptions && (
              <div className="message-options-dropdown" ref={dropdownRef}>
                {message.sender._id === user._id && (
                  <>
                    <button onClick={handleDelete}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button onClick={handleEdit}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Message;
