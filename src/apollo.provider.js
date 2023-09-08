import { InMemoryCache, ApolloClient } from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

const cache = new InMemoryCache();
const token = localStorage.getItem("token");
const apolloClient = new ApolloClient({
  cache,
  uri: "http://127.0.0.1:84/",
  // uri: "http://10.34.50.28:8000/",
  headers: {
    Authorization: "JWT " + token
  }
});

export const provider = createApolloProvider({
  defaultClient: apolloClient
});
