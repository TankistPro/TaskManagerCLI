const fs = require('fs');
const  chalk = require('chalk');
const { config } = require('../config');

class Task {
    saveTask (task, status) {
        try {
            if(!this._existPath()) {
                fs.mkdirSync(config.savePath, { recursive: true });

                fs.writeFileSync(config.savePath + config.fileName, JSON.stringify({
                    "taskList": []
                }));
            }

            const tasks =  this.getTasks();

            const newTask = {
                id: this.generateTaskId(),
                message: task,
                status: status
            }

            tasks.taskList.push(newTask);

            fs.writeFileSync(config.savePath + config.fileName, JSON.stringify(tasks));

            console.log(
                chalk.green(`Таск успешно добавлен! ID таска: ${newTask.id}`)
            )
        } catch (e) {
            console.log(
                chalk.red("Ошибка при записи в файл!")
            )
        }
    }

    generateTaskId () {
        const tasks =  this.getTasks();

        return tasks.taskList.length + 1;
    }

    getTasks () {
        const file = fs.readFileSync(config.savePath + config.fileName, 'utf8')

        return JSON.parse(file)
    }

    displayTaskList () {
        const tasks = this.getTasks();

        tasks.taskList.forEach(task => {
            console.log(
                task.status === 'Новый' ? chalk.gray(`${task.id}. ${task.message}.`):
                    task.status === 'В процессе' ? chalk.blueBright(`${task.id}. ${task.message}.`) :
                        chalk.greenBright(`${task.id}. ${task.message}.`)
            )
        })
    }

    _existPath() {
        return fs.existsSync(config.savePath);
    }
}


module.exports.task = new Task()
