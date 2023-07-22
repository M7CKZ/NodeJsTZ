import LoggerModel from '../src/loggerModel.js'

export default {
  async connect() {
    await LoggerModel.connect()
  },

  async save_log(log_obj) {
    try {
      await LoggerModel.get_log_model().create(log_obj)
    } catch(e) {
      console.log("logs didn't save, reason: " + e);
    }
  },

  async disconnect() {
    await LoggerModel.disconnect()
  },

  create_log_obj(action_id, message) {
    const datetime = (new Date()).toLocaleString().split(',').join('')
    const action = LoggerModel.get_log_action_by_id(action_id)
    const result = {
      action, message, datetime
    }

    console.log(result)
    return result
  }
}