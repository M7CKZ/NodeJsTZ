import M1asker from '../src/M1Asker.js'
import M1Model from '../src/M1Model.js'

const M1Controller = {
  do_task: async (request, response) => {
    M1Model.set_task_type(request.method)
    M1Model.find_task_name_in_url_and_save(request.url)

    const task_type = M1Model.get_task_type()
    const task_name = M1Model.get_task_name()

    try {
      if(!task_name) {
        response.json({
          result: "wrong_task"
        })
  
        return
      }

      await M1asker.ask_for_log(1, 'trying to ask for task \n')

      const do_task = await M1asker.ask_for_task(task_type, task_name)
    
      await M1asker.ask_for_log(1, 'asking for task is successfull \n')
    
      response.json({
        result: do_task.response.result
      })
    } catch(e) {
      await M1asker.ask_for_log(3, `do_task error: ${e}`)
    }
    
  }
}

export default M1Controller