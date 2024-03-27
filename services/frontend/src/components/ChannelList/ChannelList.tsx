import React from "react";

interface Channel {
  id: string;
  name: string;
}

interface ChannelListProps {
  channels: Channel[];
  onSelectChannel: (channelId: string) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  onSelectChannel,
}) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li
            key={channel.id}
            className="cursor-pointer py-2 px-4 rounded-md hover:bg-gray-300"
            onClick={() => onSelectChannel(channel.id)}
          >
            {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
