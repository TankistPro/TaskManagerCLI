const { Command } = require('commander');
const { prompt } = require('inquirer');

const program = new Command();

const { task } = require('./classes/task');
const { render } = require('./classes/render');
const { taskStatus } = require('./enums/taskStatus');

program
    .command('create-task')
    .alias('-ct')
    .action(() => {
        prompt({
            type: 'input',
            name: 'createTask',
            message: 'Напишите таск:',
        }).then(answers => {
            prompt({
                type: 'list',
                name: 'statusTask',
                message: 'Статус таска:',
                choices: [taskStatus.NEW_TASK, taskStatus.PENDING_TASK, taskStatus.SUCCESS_TASK],
            }).then(status => {
                task.saveTask(answers['createTask'], status['statusTask']);
                render.displayTaskList();
            })
        })
    })

program
    .command('task-list')
    .alias('-tl')
    .action(() => {
            render.displayTaskList();
        }
    )

program
    .command('check <task_id>')
    .alias('-c <task_id>')
    .action((data) => {
        console.log(data)
    })

program.parse(process.argv);
