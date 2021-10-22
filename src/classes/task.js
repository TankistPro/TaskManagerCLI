const fs = require('fs');
const  chalk = require('chalk');
const { signale } = require('signales')

const { config } = require('../config');
const { taskStatus } = require('../enums/taskStatus');

signale.config({'displayLabel': false})

class Task {
    saveTask (task, status) {
        try {
            if(!this._existPath()) {
                fs.mkdirSync(config.savePath, { recursive: true });

                fs.writeFileSync(config.savePath + config.fileName, JSON.stringify({
                    "taskList": []
                }));
            }

            const newTask = {
                id: null,
                message: task,
                status: status
            }

            const newTaskId = this.updateTaskObject(newTask);

            console.log(
                chalk.green(`\nТаск успешно добавлен! ID таска: ${newTaskId}\n`)
            )
        } catch (e) {
            console.log(
                chalk.red("Ошибка при записи в файл!")
            )
        }
    }

    updateTaskObject (task = null) {
        let tasks = JSON.parse(fs.readFileSync(config.savePath + config.fileName, 'utf8'));

        if(task) {
            tasks.taskList.push(task);
        }

        tasks.taskList.forEach((item, index) => {
            item.id = index + 1;
        })

        fs.writeFileSync(config.savePath + config.fileName, JSON.stringify(tasks));

        return tasks.taskList.length;
    }


    _existPath() {
        return fs.existsSync(config.savePath);
    }
}


module.exports.task = new Task()

