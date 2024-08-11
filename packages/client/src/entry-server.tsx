import { Request as ExpressRequest } from 'express'
import ReactDOM from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { routes } from '@/router/routes'

import {
  createFetchRequest,
  createUrl,
  fetchPageDataThunk,
} from './entry-server.utils'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { reducer } from './store'

import './index.css'
import { setPageHasBeenInitializedOnServer } from './store/slices/ssrSlice'

export const render = async (req: ExpressRequest, nonce: string) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({
    reducer,
  })

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const url = createUrl(req)
  await store.dispatch(fetchPageDataThunk(url.toString()))

  const router = createStaticRouter(dataRoutes, context)

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} nonce={nonce} />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
