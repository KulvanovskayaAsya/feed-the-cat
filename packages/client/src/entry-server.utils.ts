import { createAsyncThunk } from '@reduxjs/toolkit'
import { Request as ExpressRequest } from 'express'
import { RootState } from '@/store'
import { matchRoutes } from 'react-router-dom'
import { routes } from '@/router/routes'

export const createUrl = (req: ExpressRequest) => {
  const origin = `${req.protocol}://${req.get('host')}`

  return new URL(req.originalUrl || req.url, origin)
}

export const createFetchRequest = (req: ExpressRequest) => {
  const url = createUrl(req)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init: {
    method: string
    headers: Headers
    signal: AbortSignal
    body?: any
  } = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}

export const fetchPageDataThunk = createAsyncThunk<void, string>(
  'app/fetchPageDataThunk',
  async (url: string, { dispatch, getState }) => {
    const state = getState() as RootState
    const matchedRoutes = matchRoutes(routes, url)

    if (!matchedRoutes) {
      throw new Error('Страница не найдена!')
    }

    for (const { route } of matchedRoutes) {
      if ('fetchData' in route && route.fetchData) {
        await route.fetchData({ dispatch, state })
      }
    }
  }
)
