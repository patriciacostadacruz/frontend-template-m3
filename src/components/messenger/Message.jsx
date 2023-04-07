import React, { useState } from "react";

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
          <p>{message.content}</p>
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
