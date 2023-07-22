import MicroMQ from 'micromq'
import M2Controller from '../src/M2Controller.js';

const M2 = new MicroMQ({
  name: 'M2',
  rabbit: {
    url: process.env.RABBIT_URL
  },
  microservices: ['LoggerService']
})

M2.action('do_task', async (meta, res) => {
  let result = null

  try {
    result = await M2Controller.do_task(meta)
  }
  catch(e) {
    await M2.ask('LoggerService', {
      server: {
        action: 'save_log',
        meta: {
          action: 3,
          message: `exception while doing task ${e}`
        }
      }
    }).catch((ex) => {
      result = {exception: ex}
      console.log(ex)
    })
  }
  finally {
    res.json({
      result
    })
  }

})

M2.start()

process.on('SIGINT', async function() {
  process.exit()
})