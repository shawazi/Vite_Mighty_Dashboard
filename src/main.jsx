
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from './redux/reducers'
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'
import Layout from './components/layout/Layout'
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";

const domNode = document.getElementById('root');
const root = createRoot(domNode);

const store = createStore(
  rootReducer
)

document.title = 'Sales Dashboard'

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider>
        <Layout />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>,
);
