package graphql

import (
	"backend/structs"
	"fmt"
	"log"

	"net/http"

	"github.com/graphql-go/graphql"

	"github.com/graphql-go/handler"
)

func check(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

var channels = []structs.Channel{
	{ID: "1", Name: "General"},
	{ID: "2", Name: "Random"},
}

var defaultMessages = map[string][]structs.Message{
	"1": {
		{ID: "1", ChannelID: "1", Text: "Tervetuloa Yleiseen kanavaan!"},
		{ID: "2", ChannelID: "1", Text: "Tämä on ensimmäinen viesti Yleisessä kanavassa."},
		{ID: "3", ChannelID: "1", Text: "Älä unohda esittäytyä!"},
		{ID: "4", ChannelID: "1", Text: "Voit vapaasti kysyä mitä tahansa täällä."},
	},
	"2": {
		{ID: "5", ChannelID: "2", Text: "Tervetuloa Satunnainen-kanavaan!"},
		{ID: "6", ChannelID: "2", Text: "Tämä on ensimmäinen viesti Satunnaisessa kanavassa."},
		{ID: "7", ChannelID: "2", Text: "Voit jakaa mitä tahansa satunnaista täällä!"},
		{ID: "8", ChannelID: "2", Text: "Jaa mielenkiintoisia faktoja, vitsejä tai tarinoita."},
	},
}


var channelType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Channel",
	Fields: graphql.Fields{
		"id":   &graphql.Field{Type: graphql.String},
		"name": &graphql.Field{Type: graphql.String},
	},
})

var messageType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Message",
	Fields: graphql.Fields{
		"id":        &graphql.Field{Type: graphql.String},
		"channelID": &graphql.Field{Type: graphql.String},
		"text":      &graphql.Field{Type: graphql.String},
	},
})

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"channels": &graphql.Field{
			Type: graphql.NewList(channelType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if channels == nil {
					return nil, fmt.Errorf("channels not initialized")
				}
				return channels, nil
			},
		},
		"messages": &graphql.Field{
			Type: graphql.NewList(messageType),
			Args: graphql.FieldConfigArgument{
				"channelId": &graphql.ArgumentConfig{Type: graphql.String},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				channelID, ok := p.Args["channelId"].(string)
				if !ok {
					return nil, fmt.Errorf("invalid channelId")
				}
				return defaultMessages[channelID], nil
			},
		},
	},
})

var rootMutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "Mutation",
	Fields: graphql.Fields{
		"addMessage": &graphql.Field{
			Type: messageType,
			Args: graphql.FieldConfigArgument{
				"channelId": &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
				"text":      &graphql.ArgumentConfig{Type: graphql.NewNonNull(graphql.String)},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				channelID, ok := p.Args["channelId"].(string)
				if !ok {
					return nil, fmt.Errorf("invalid channelId")
				}
				text, ok := p.Args["text"].(string)
				if !ok {
					return nil, fmt.Errorf("invalid text")
				}
				message := structs.Message{
					ID:        "3", // Generate unique ID here
					ChannelID: channelID,
					Text:      text,
				}
				// Do not store the message in the messages map
				return message, nil
			},
		},
	},
})

func GraphQLHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query:    rootQuery,
		Mutation: rootMutation,
	})
	if err != nil {
		check(err)
		fmt.Printf("Error creating schema: %v\n", err)
		return
	}
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// Check if the request method is OPTIONS (preflight request)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Create a GraphQL handler
	h := handler.New(&handler.Config{
		Schema: &schema,
		Pretty: true,
	})
	// Handle GraphQL requests
	h.ServeHTTP(w, r)
}

func StartGraphqlServer() {

	// Create a server with the custom GraphQL handler
	srv := &http.Server{
		Addr:    ":4000",
		Handler: http.HandlerFunc(GraphQLHandler),
	}
	// Start the server
	log.Println("Server started on port 4000")
	log.Fatal(srv.ListenAndServe())
}

