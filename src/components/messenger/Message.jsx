import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faCheckDouble, faFloppyDisk, faBan, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"; 

const Message = ({ message, user, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [content, setContent] = useState(message.content);
  const style = {
    height: "50px",
    width: "50px",
    objectFit: "cover",
    borderRadius: "50px",
  };

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

  return (
    <div
      className={
        message.sender._id === user._id
          ? "message-card sent-by-me"
          : "message-card sent-by-other"
      }
    >
      <img src={message.sender.image} alt="Sender pic" style={style} />
      {isEditing ? (
        <div className="message-edit">
          <textarea value={content} onChange={handleContentChange} />
          <button onClick={handleSave}>
            <FontAwesomeIcon icon={faFloppyDisk} /> Save
          </button>
          <button onClick={handleCancel}>
            <FontAwesomeIcon icon={faBan} /> Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="message-details">
            <p>
              {message.sender._id === user._id && (
                <FontAwesomeIcon icon={faCheckDouble} />
              )}{" "}
              {message.content}
            </p>
            <p className="message-date">
              {formatMessageDate(message.createdAt)}
            </p>
          </div>
          <div className="message-options">
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              onClick={handleEllipsisClick}
            />
            {showOptions && (
              <div className="message-options-dropdown">
                {message.sender._id ===
                  user._id && (
                    <>
                      <button onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                      <button onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
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
