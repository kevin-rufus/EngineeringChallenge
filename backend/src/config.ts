const config = {
  http: {
    host: process.env.EXPRESS_HOST || '127.0.0.1',
    port: parseInt(process.env.EXPRESS_PORT as string, 10) || 3001,
  }
}

export default config
