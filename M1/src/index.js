import MicroMQ from 'micromq'
import M1Controller from '../src/M1Controller.js'

const PORT = 3000

const M1 = new MicroMQ({
  name: 'M1',
  rabbit: {
    url: process.env.RABBIT_URL
  },
  microservices: ['LoggerService', 'M2']
})

M1.all('', M1Controller.do_task)

M1.listen(PORT)

process.on('SIGINT', async function() {
  process.exit()
})