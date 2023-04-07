const Message = ({message, user}) => {
	
	return (
    <>
      <span className={message.sender._id === user._id ? "sent-by-me" : "sent-by-other"}>
        <p>
          <strong>{message.sender.image}</strong>
        </p>
        <p>{message.content}</p>
      </span>
    </>
  );
}

export default Message;