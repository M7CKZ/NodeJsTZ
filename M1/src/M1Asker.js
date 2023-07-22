import MicroMQ from 'micromq'

const _service_name = "M1"
const _microservices = ['LoggerService', 'M2']

export default {
  _create_service() {
    return new MicroMQ({
      name: _service_name,
      microservices: _microservices,
      rabbit: {
        url: process.env.RABBIT_URL
      }
    })
  },

  async ask_for_log (action, message) {
    await this._create_service().ask('LoggerService', {
      server: {
        action: 'save_log',
        meta: {
          action,
          message
        }
      }
    }).catch(async (e) => {
      await M1asker.ask_for_log(3, `error in asking for log: ${e}`)
    })
  },

  async ask_for_task (task_type, task_name) {
    return this._create_service().ask('M2', {
      server: {
        action: 'do_task',
        meta: {
          task_type,
          task_name
        }
      }
    }).catch(async (e) => {
      await M1asker.ask_for_log(3, `error in asking for task: ${e}`)
    })
  }
}