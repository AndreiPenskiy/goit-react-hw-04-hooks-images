import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import {GlobalStyle} from './index.styled.jsx';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

