import Player from './components/Player';
import { AppProvider } from "./store/store";
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ModalProvider } from "react-modal-hook";
import { globalCSS } from '@go1d/go1d';
import { useEffect } from 'react';
import Layout from './components/common/Layout';
import Catalog from './components/Catalog';
import IconVideoplay from '@go1d/go1d/build/components/Icons/Videoplay';
import IconList from '@go1d/go1d/build/components/Icons/List';

function App() {
  globalCSS();

  const params = new URLSearchParams(window.location.hash.substr(1));
  const initialState = {
    token: params.get('access_token') as string,
    player: {
      url: ''
    },
    account: null,
  };

  useEffect(() => {
    window.localStorage.setItem('token', params.get('access_token') as string);
  }, [params]);

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL + '/graphql/query',
  });

  const authLink = setContext((_, { headers }) => {
    const params = new URLSearchParams(window.location.hash.substr(1));
    const token = params.get('access_token') || localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AppProvider values={initialState}>
        <ModalProvider>
          <Layout
            items={[
              { icon: IconVideoplay, onRender: <Player /> },
              { icon: IconList, onRender: <Catalog /> },
            ]}
          />
        </ModalProvider>
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
