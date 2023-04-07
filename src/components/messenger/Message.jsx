const Message = ({message, user}) => {
	const style = { height: "80px", width: "80px", objectFit: "cover", borderRadius: "50px"};
	
	return (
    <>
      <span
        className={
          message.sender._id === user._id ? "sent-by-me" : "sent-by-other"
        }
      >
        <img src={message.sender.image} alt="Sender pic" style={style}/>
        <p>{message.content}</p>
      </span>
    </>
  );
}

export default Message;