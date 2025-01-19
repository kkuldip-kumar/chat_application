import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { AppRoutes } from '@/routes/AppRoutes.tsx'
import { Loader } from './components/loader.tsx'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App.tsx';
import { client } from './graphql/apolloClient.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />} >
      <ApolloProvider client={client}>
        {/* <App /> */}
        <AppRoutes />
      </ApolloProvider>,
    </Suspense>
  </React.StrictMode>,
)
