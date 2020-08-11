import { createStore , combineReducers, applyMiddleware, compose } from "redux"
import { connectRouter, routerMiddleware } from "connected-react-router"
import reduxThunk from "redux-thunk"
import reducers from "./reducers"

function createAppStore(history, preloadedState = {}) {
  // enhancers
  let composeEnhancers = compose

  if (typeof window !== "undefined") {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose
  }

  // middlewares
  const middlewares = [routerMiddleware(history), reduxThunk]

  const store = createStore(
    connectRouter(history)(combineReducers(reducers)),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  return {
    store,
    history
  }
}

export default createAppStore
