import mongoose from 'mongoose'

const _mongodb_connection_string = 'mongodb://127.0.0.1:27017/test'
const Schema = mongoose.Schema
const LogSchema = new Schema({
  action: String,
  message: String,
  datetime: String
})
const LogModel = mongoose.model('Log', LogSchema)

export default {
  _log_action: {
    1: 'info',
    2: 'warn',
    3: 'error'
  },

  _database: null,

  _LogModel: LogModel,

  get_log_model(){
    return this._LogModel
  },

  get_database() {
    return this._database
  },

  set_database(db) {
    this._database = db
  },

  get_log_action_by_id(id) {
    return this._log_action[id]
  },

  async connect() {
    if(this.get_database()) return

    try {
      this.set_database(await mongoose.connect(_mongodb_connection_string))
    } catch(e) {
      console.log("something went wrong in db connection: " + e);
    }
  },

  async disconnect() {
    try {
      await mongoose.disconnect()
    }
    catch(e) {
      console.log("can't disconnect from db because of exception: " + e);
    }
  }
}