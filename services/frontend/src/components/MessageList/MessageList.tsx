import React from "react";

interface Message {
  id: string;
  text: string;
  channelID: string;
}

interface MessageListProps {
  messages: Message[];
  selectedChannel: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  selectedChannel,
}) => {
  // Filter messages based on the selected channel
  const filteredMessages = selectedChannel
    ? messages.filter((message) => message.channelID === selectedChannel)
    : messages;

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Messages</h2>
      <ul>
        {filteredMessages.map((message, index) => (
          <li
            key={`${message.id}-${index}`}
            className="py-2 px-4 rounded-md bg-white shadow-sm mb-2"
          >
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
