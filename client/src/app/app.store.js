/**
 * Created By Nguyen Cong Thanh on 03/04/2019 15:28.
 *
 * Copyright Intelin 2019.
 */

import 'regenerator-runtime/runtime'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import combineReducers from './store/root.reducer'
import rootSaga from './store/root.saga'

class AppStore {

  constructor() {
    if (!AppStore.instance) {
      this.rootReducer = combineReducers;
      this.rootSaga = rootSaga;
      this.getStore = this.getStore.bind(this)
      AppStore.instance = this;
    }
    return AppStore.instance
  }

  getStore() {
    try {
      const sagaMiddleware = createSagaMiddleware()
      const store = createStore(this.rootReducer, applyMiddleware(sagaMiddleware));
      sagaMiddleware.run(this.rootSaga)
      return store
    } catch (e) {
      return {}
    }
  }

}

export default new AppStore().getStore()
