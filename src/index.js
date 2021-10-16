const { Command } = require('commander');
const { prompt } = require('inquirer');
const fs = require("fs");
const  chalk = require('chalk');

const program = new Command();

const { task } = require('./classes/task');

program
    .command('create-task')
    .alias('ct')
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
                choices: ['Новый', 'В процессе', 'Готово'],
            }).then(status => {
                task.saveTask(answers['createTask'], status['statusTask']);
            })
        })
    })

program
    .command('task-list')
    .alias('tl')
    .action(() => {
            task.displayTaskList()
        }
    )

program.parse(process.argv);
