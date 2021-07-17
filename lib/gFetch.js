import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const gFetch = (qry) => {
  const client = new ApolloClient({
    uri: `${process.env.API_URL}`,
    cache: new InMemoryCache(),
  });
  return client.query({
    query: gql`
      ${qry}
    `,
  });
};

export default gFetch;
