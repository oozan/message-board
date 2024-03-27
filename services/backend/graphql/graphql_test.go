package graphql

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGraphQLHandler(t *testing.T) {
    t.Run("GraphQLHandler", func(t *testing.T) {
        req := httptest.NewRequest("POST", "/graphql", nil)
        rr := httptest.NewRecorder()
        GraphQLHandler(rr, req)
        if status := rr.Code; status != http.StatusOK {
            t.Errorf("handler returned wrong status code: got %v want %v",
                status, http.StatusOK)
        }
    })
}

func TestGraphQLHandlerWithOptions(t *testing.T) {
    t.Run("GraphQLHandler with OPTIONS method", func(t *testing.T) {
        req := httptest.NewRequest("OPTIONS", "/graphql", nil)
        rr := httptest.NewRecorder()
        GraphQLHandler(rr, req)
        if status := rr.Code; status != http.StatusOK {
            t.Errorf("handler returned wrong status code: got %v want %v",
                status, http.StatusOK)
        }
    })
}
