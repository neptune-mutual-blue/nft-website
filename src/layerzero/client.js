const MessageStatus = {
  INFLIGHT: 'INFLIGHT',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED'
}

const URLS = {
  testnet: 'https://api-testnet.layerzero-scan.com',
  mainnet: 'https://api-mainnet.layerzero-scan.com',
  sandbox: 'https://api-sandbox.layerzero-scan.com'
}

export const createClient = (env) => {
  const baseURL = URLS[env]

  if (!baseURL) { throw new Error(`No endpoint for env ${env}`) }

  return {
    async getMessagesBySrcTxHash (srcTxHash) {
      if (!srcTxHash) { throw new Error('srcTxHash must be provided') }
      const response = await fetch(`${baseURL}/tx/${srcTxHash}`)

      const data = await response.json()

      return data
    }
  }
}

export function getMessagesBySrcTxHash (srcChainId, srcTxHash) {
  const env = srcChainId < 10000 ? 'mainnet' : srcChainId < 20000 ? 'testnet' : 'sandbox'
  return createClient(env).getMessagesBySrcTxHash(srcTxHash)
}

const sleep = (ms = 1000) => { return new Promise((resolve) => { return setTimeout(resolve, ms) }) }

export async function waitForMessageReceived (srcChainId, srcTxHash, pollInterval = 3000) {
  const env = srcChainId < 10000 ? 'mainnet' : srcChainId < 20000 ? 'testnet' : 'sandbox'
  const client = createClient(env)
  while (true) {
    try {
      const { messages } = await client.getMessagesBySrcTxHash(srcTxHash)
      const message = messages[0]
      if (messages.length > 1) {
        return Promise.reject(new Error('More than one message'))
      } else if ((message === null || typeof message === 'undefined' ? undefined : message.status) === MessageStatus.FAILED) {
        return Promise.reject(new Error(`Message failed ${message.dstTxError}`))
      } else if ((message === null || typeof message === 'undefined' ? undefined : message.status) === MessageStatus.DELIVERED) {
        return message
      }
    } catch (_a) {
      // http error
    }
    await sleep(pollInterval)
  }
}

export async function waitForAllMessagesReceived (srcChainId, srcTxHash, pollInterval = 3000, numberOfMessages) {
  const env = srcChainId < 10000 ? 'mainnet' : srcChainId < 20000 ? 'testnet' : 'sandbox'
  const client = createClient(env)
  while (true) {
    try {
      const { messages } = await client.getMessagesBySrcTxHash(srcTxHash)
      if (messages.length > 0) {
        if (messages.every((m) => { return m.status === MessageStatus.DELIVERED })) {
          if (numberOfMessages === undefined ||
                      numberOfMessages === messages.length) {
            return messages
          }
        }
      }
    } catch (_a) {
      // http error
    }
    await sleep(pollInterval)
  }
}
