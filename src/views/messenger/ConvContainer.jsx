import ConvMessages from "../../components/messenger/ConvMessages";

const ConvContainer = () => {
  // using a container so that when the messages reload inside the conversation, not all the page reloads and it looks smoother
  return (<ConvMessages />);
}

export default ConvContainer;
