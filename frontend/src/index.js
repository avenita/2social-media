import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//importamos el component Provider redux
import { Provider } from 'react-redux'

//importamos nuestro store
import { store } from './store/index'

//importamos estilos de antd
import 'antd/dist/antd.css';


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);


