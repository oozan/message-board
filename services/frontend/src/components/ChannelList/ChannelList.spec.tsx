import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChannelList from "./ChannelList";

describe("ChannelList component", () => {
  it("renders the list of channels correctly", () => {
    const channels = [
      { id: "1", name: "Channel 1" },
      { id: "2", name: "Channel 2" },
      { id: "3", name: "Channel 3" },
    ];

    render(<ChannelList channels={channels} onSelectChannel={() => {}} />);

    channels.forEach((channel) => {
      const channelElement = screen.getByText(channel.name);
      expect(channelElement).toBeInTheDocument();
    });
  });
});
