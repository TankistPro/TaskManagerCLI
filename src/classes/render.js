const { signale } = require("signales");
const chalk = require("chalk");
const fs = require("fs");

const { config } = require("../config");
const { taskStatus } = require("../enums/taskStatus");

class Render {
    displayTaskList() {
        try {
            const tasks = this._getTasks();
            const statistic = this._getTaskStatistic();

            console.log(chalk.green`СПИСОК ТАСКОВ: ${tasks.taskList.length} \n`)

            tasks.taskList.forEach((task, index) => {
                this._buildItem(task)
            })

            console.log(
                `\nВыполнено: ${ statistic.done }  В процессе: ${ statistic.inProgress }  Новых: ${ statistic.new }`
            )
        } catch (e) {
            console.log(chalk.red('Список тасков пуст.'));
        }
    }

    _buildItem(item) {
        const id = item.id;
        const message = item.message;
        const status = item.status;

        const msgObj = {
            prefix: chalk.grey(`${id}.`),
            message
        }

        return taskStatus.NEW_TASK === status ? signale.pending(msgObj) :
            taskStatus.PENDING_TASK === status ? signale.pending(msgObj) :
                signale.success(msgObj);
    }

    _getTaskStatistic() {
        const tasks = this._getTasks();
        const statisticPayload = {
            new: 0,
            inProgress: 0,
            done: 0
        }

        tasks.taskList.forEach(task => {
            task.status === taskStatus.NEW_TASK ? statisticPayload.new += 1 :
                task.status === taskStatus.PENDING_TASK ? statisticPayload.inProgress += 1:
                    statisticPayload.done += 1;
        })

        return statisticPayload;
    }

    _getTasks () {
        const file = fs.readFileSync(config.savePath + config.fileName, 'utf8');

        return JSON.parse(file);
    }
}

module.exports.render = new Render();
