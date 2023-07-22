export default {
  async do_task({task_type, task_name}) {
    const func = this?.[`${task_type}_${task_name}`]?.bind(this)

    if(func) {
      return await func(task_type, task_name)
    } else {
      return {result: 'wrong_task'}
    }
  },

  async get_task1(task_type, task_name) {
    await this.sleep(500)
    
    return {
      task_type, task_name
    }
  },

  async post_task1(task_type, task_name) {
    await this.sleep(500)

    return {
      task_type, task_name
    }
  },

  async get_task2(task_type, task_name) {
    await this.sleep(500)

    return {
      task_type, task_name
    }
  },

  async post_task2(task_type, task_name) {
    await this.sleep(500)

    return {
      task_type, task_name
    }
  },

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

}