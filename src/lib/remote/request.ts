export class FetchError extends Error {
  /* eslint-disable */
  // @ts-ignore
  private response: Response
  // @ts-ignore
  private data: any

  constructor(message: string, response: Response, data: any) {
    super(message)
    this.response = response
    this.data = data
  }
  /* eslint-enable */
}

export const request = async (input: RequestInfo, init?: RequestInit | undefined): Promise<any> => {
  try {
    const response = await fetch(input, init)

    // If the server replies, there's always some data in the returned JSON.
    // If a network error occured, it would have thrown in the previous line.
    const data = await response.json()

    if (response.ok) {
      return data
    }

    throw new FetchError(response.statusText, response, data)
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    throw error
  }
}
