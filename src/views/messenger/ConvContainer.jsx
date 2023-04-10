import ConvMessages from "../../components/messenger/ConvMessages";

function ConvContainer() {
  // using a container so that when the messages reload inside the conversation, not all the page reloads
  return (<ConvMessages />);
}

export default ConvContainer;
