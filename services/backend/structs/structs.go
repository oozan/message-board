// Package structs defines all the necessary structs for the application.
package structs

// ErrorLogs represents error logs.
type ErrorLogs struct {
	ErrorMessage string `json:"errorMessage"`
}

// Channel represents a GraphQL channel.
type Channel struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// Message represents a GraphQL message.
type Message struct {
	ID        string `json:"id"`
	ChannelID string `json:"channelId"`
	Text      string `json:"text"`
}
