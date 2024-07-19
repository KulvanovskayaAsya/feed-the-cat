import { Request as ExpressRequest } from 'express'
import ReactDOM from 'react-dom/server'
import { matchRoutes } from 'react-router-dom'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { routes } from '@/router/routes'

import { createFetchRequest, createUrl } from './entry-server.utils'

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { reducer } from './store'

import { fetchUserThunk } from '@/store/slices/userSlice'

import './index.css'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({
    reducer,
  })

  const router = createStaticRouter(dataRoutes, context)

  await store.dispatch(fetchUserThunk())

  return {
    html: ReactDOM.renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    ),
    initialState: store.getState(),
  }
}
