export default {
  _task_type: '',

  _task_name: '',

  get_task_type() {
    return this._task_type
  },

  get_task_name() {
    return this._task_name
  },

  set_task_type(type) {
    this._task_type = type
  },

  set_task_name(name) {
    this._task_name = name
  },

  find_task_name_in_url_and_save(url) {
    if(url.includes('.')) {
      this.set_task_name('')
      return
    }

    this.set_task_name(url.replace('/', '').split('/').shift())
  }
}