import MicroMQ from 'micromq'
import LoggerController from '../src/loggerController.js'

const LoggerService = new MicroMQ({
  name: 'LoggerService',
  rabbit: {
    url: process.env.RABBIT_URL
  }
})

LoggerService.action('save_log', async (meta, res) => {
  LoggerController.save_log(LoggerController.create_log_obj(meta.action, meta.message))

  res.json({
    status: 200
  })
})

try {
  await LoggerController.connect()
  LoggerService.start()
} catch(ex) {
  console.log('logger didn"t start for some reason: ' + ex);
}

process.on('SIGINT', async function() {
  await LoggerController.disconnect()
  process.exit()
})