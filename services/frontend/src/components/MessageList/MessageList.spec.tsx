import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MessageList from "./MessageList";

describe("MessageList component", () => {
  const messages = [
    { id: "1", text: "Message 1", channelID: "channel1" },
    { id: "2", text: "Message 2", channelID: "channel2" },
    { id: "3", text: "Message 3", channelID: "channel1" },
  ];

  it("renders messages based on the selected channel", () => {
    // Render MessageList component with selectedChannel="channel1"
    render(<MessageList messages={messages} selectedChannel="channel1" />);

    // Check if only messages belonging to the selected channel are rendered
    const filteredMessages = messages.filter(
      (message) => message.channelID === "channel1"
    );
    filteredMessages.forEach((message) => {
      expect(screen.getByText(message.text)).toBeInTheDocument();
    });

    // Check if messages from other channels are not rendered
    const otherChannelMessages = messages.filter(
      (message) => message.channelID !== "channel1"
    );
    otherChannelMessages.forEach((message) => {
      expect(screen.queryByText(message.text)).toBeNull();
    });
  });
});
