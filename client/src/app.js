/**
 * Created By Nguyen Cong Thanh on 05/04/2019 14:04.
 *
 * Copyright Intelin 2019.
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import AppComponent from './app/app.component'
import AppStore from './app/app.store'

ReactDOM.render(
    <Provider store={AppStore}>
      <BrowserRouter>
        <AppComponent/>
      </BrowserRouter>
    </Provider>
  ,
  document.getElementById("root")
);
