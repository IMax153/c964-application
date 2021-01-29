/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string
    NODE_ENV?: 'development' | 'production' | 'test'
    PORT?: string
    SECRET_COOKIE_PASSWORD?: string
    SECRET_DEVELOPMENT_TOKEN?: string
  }
}
