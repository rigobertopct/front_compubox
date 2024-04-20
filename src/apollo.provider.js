import { InMemoryCache, ApolloClient } from "@apollo/client";
import { createApolloProvider } from "@vue/apollo-option";

const cache = new InMemoryCache();
const token = localStorage.getItem("token");
const apolloClient = new ApolloClient({
  cache,
  uri: "http://127.0.0.1:8000/",
  // uri: "https://compubox.xutil.net/graphql/",
  // uri: "https://compubox.xutil.cu/graphql/",
  headers: {
    Authorization: "JWT " + token
  }
});

export const provider = createApolloProvider({
  defaultClient: apolloClient
});
