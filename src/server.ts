import { app } from "./app";

const server = app.listen(3333, () => {
  console.log("Server is running on port 3333");
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err)
})

process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection', err)
})

function grafulShutdown(event: string) {
  return (code: number) => {
    console.log(`${event} received.`, code)
    server.close(async () => {
      console.log('> Server HTTP Stopped')
      process.exit(code)
    })
  }
}

process.on('SIGINT', grafulShutdown('SIGINT'))
process.on('SIGTERM', grafulShutdown('SIGTERM'))