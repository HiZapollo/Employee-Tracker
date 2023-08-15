//const mysql = require('mysql2');
const inquirer = require('inquirer');
const Employee = require('./lib/employee.js');

const employee = new Employee;

inquirer.prompt([
    {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'placeholder'
        ]
    }
])
.then((response) => {
    //console.log(response.choices);
    if (response.choices === 'View all departments') {
        employee.viewDepartments();
    }
})