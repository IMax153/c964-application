/* eslint-disable */
import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks()

import '@testing-library/jest-dom/extend-expect'

import { config } from 'dotenv'
import * as path from 'path'
import { cache } from 'swr'
/* eslint-enable */

config({
  path: path.resolve(process.cwd(), '.env.local')
})

afterEach(() => {
  cache.clear()
})
