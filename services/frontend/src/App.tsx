import React, { useEffect, useState } from "react";
import { ApolloProvider, gql } from "@apollo/client";
import ChannelList from "./components/ChannelList/ChannelList";
import MessageList from "./components/MessageList/MessageList";
import MessageForm from "./components/MessageForm/MessageForm";
import client from "./apollo";
import AppDescription from "./components/AppDescription/AppDescription";

interface Channel {
  id: string;
  name: string;
}

interface Message {
  id: string;
  text: string;
  channelID: string;
}

const App: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Fetch channels from the GraphQL server
    const fetchChannels = async () => {
      // Define GraphQL query to fetch channels
      const GET_CHANNELS = gql`
        query GetChannels {
          channels {
            id
            name
          }
        }
      `;

      try {
        const { data } = await client.query({ query: GET_CHANNELS });
        setChannels(data.channels);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    // Fetch messages for the selected channel
    const fetchMessages = async () => {
      // Check if there are stored messages for the selected channel
      const storedMessages = localStorage.getItem(selectedChannel);
      if (storedMessages) {
        // If stored messages exist, fetch messages from the server and append stored messages
        const serverMessages = await fetchMessagesFromServer(selectedChannel);
        setMessages([...serverMessages, ...JSON.parse(storedMessages)]);
      } else {
        // If no stored messages, fetch messages from the server
        const serverMessages = await fetchMessagesFromServer(selectedChannel);
        setMessages(serverMessages);
      }
    };

    if (selectedChannel) {
      fetchMessages();
    }
  }, [selectedChannel]);

  const fetchMessagesFromServer = async (
    channelId: string
  ): Promise<Message[]> => {
    // Define GraphQL query to fetch messages for the selected channel
    const GET_MESSAGES = gql`
      query GetMessages($channelId: String!) {
        messages(channelId: $channelId) {
          id
          text
          channelID
        }
      }
    `;

    try {
      const { data } = await client.query({
        query: GET_MESSAGES,
        variables: { channelId },
      });
      return data.messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannel(channelId);
  };

  const handleSubmitMessage = (text: string) => {
    // Validate the message
    if (!text.trim()) {
      console.log("Cannot submit empty message");
      return;
    }

    // Update messages state with the new message
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      channelID: selectedChannel,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Store messages in localStorage
    const storedMessages = localStorage.getItem(selectedChannel);
    const updatedMessages = storedMessages
      ? [...JSON.parse(storedMessages), newMessage]
      : [newMessage];
    localStorage.setItem(selectedChannel, JSON.stringify(updatedMessages));
  };

  // Clear messages from state and localStorage on component mount
  useEffect(() => {
    setMessages([]);
    localStorage.clear();
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="flex h-screen">
        <div className="w-fit bg-gray-100 flex flex-col h-max">
          <ChannelList
            channels={channels}
            onSelectChannel={handleChannelSelect}
          />
          <AppDescription />
        </div>
        <div className="w-3/4 bg-white">
          <div className="p-4">
            <MessageList
              messages={messages}
              selectedChannel={selectedChannel}
            />
            <MessageForm onSubmit={handleSubmitMessage} />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
