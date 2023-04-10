import React, { useState } from "react";
import checkmark from "../../images/checkmark.png";

const Message = ({ message, user, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
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
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await onUpdate(message._id, { content });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(message.content);
    setIsEditing(false);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
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
    <span
      className={
        message.sender._id === user._id ? "sent-by-me" : "sent-by-other"
      }
    >
      <img src={message.sender.image} alt="Sender pic" style={style} />
      {isEditing ? (
        <>
          <textarea value={content} onChange={handleContentChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <p>
            {message.sender._id === user._id && (
              <img width="20" src={checkmark} alt="Message checkmark" />
            )}
            {message.content}
          </p>
          <p>{formatMessageDate(message.createdAt)}</p>
          {message.sender._id === user._id && (
            <>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleEdit}>Edit</button>
            </>
          )}
        </>
      )}
    </span>
  );
};

export default Message;
