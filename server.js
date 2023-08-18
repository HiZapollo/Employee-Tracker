const inquirer = require('inquirer');
const Employee = require('./lib/employee.js'); //where all my methods are defined

const db = new Employee;

const questions = [ // This just contains the only two questions that I could put here that don't rely on many nested methods
    {
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Quit Application'
        ]
    },
    {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department? ',
        validate: (text) => {
            if (!text) {
                return "Error: must not be empty!"
            } else if (text.length > 30) {
                return "Error: must be less than or equal to 30 characters long!";
            } else {
                return true;
            }
        }
    }
]

// MAIN FUNCTION (it is called when the file is loaded, and when each prompt-line is finished, resulting in a loop that only ends when the user decides or an error occurs)
function init() {
    inquirer.prompt(questions[0])
        .then((response) => {

            let choice = response.choices;

            switch (choice) { // switch statement because if statements are ugly and take forever
                case 'View all departments':
                    db.viewDepartments()
                        .then(([rows]) => {
                            console.table(rows);
                        })
                        .then(() => init())
                        .catch(console.log)

                    break;
                case 'View all roles':
                    db.viewRoles()
                        .then(([rows]) => {
                            console.table(rows);
                        })
                        .then(() => init())
                        .catch(console.log)

                    break;
                case 'View all employees':
                    db.viewEmployees()
                        .then(([rows]) => {
                            console.table(rows);
                        })
                        .then(() => init())
                        .catch(console.log)

                    break;
                case 'Add Department':
                    inquirer.prompt(questions[1])
                        .then((response) => {
                            db.addDepartment(response.department)
                            console.log(`Added ${response.department} to the database.`)
                        })
                        .then(() => init())

                    break;
                case 'Add Role':
                    db.viewDepartments()
                        .then(([rows]) => {
                            let departments = rows.map((department) => ({ name: department.name, value: department.id }));// gives the name a hidden value of the department's id
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'role_name',
                                    message: 'What is the name of the role?',
                                    validate: (text) => {
                                        if (!text) {
                                            return "Error: must not be empty!"
                                        } else if (text.length > 30) {
                                            return "Error: must be less than or equal to 30 characters long!";
                                        } else {
                                            return true;
                                        }
                                    }
                                },
                                {
                                    type: 'input',
                                    name: 'role_salary',
                                    message: 'What is the salary of the role?',
                                    validate: (text) => {
                                        if (!text) {
                                            return "Error: must not be empty!"
                                        } else {
                                            return true;
                                        }
                                    }
                                },
                                {
                                    type: 'list',
                                    name: 'role_department',
                                    message: 'Which department does the role belong to?',
                                    choices: departments
                                }
                            ])
                                .then((response) => {
                                    db.addRole(response.role_name, response.role_salary, response.role_department);
                                    console.log(`Role ${response.role_name} added successfully!`)
                                })
                                .then((() => init()))
                        })
                        .catch(console.log)

                    break;
                case 'Add Employee':
                    db.viewRoles()
                        .then(([rows]) => {
                            let roles = rows.map((role) => ({ name: role.title, value: role.id }));
                            db.viewEmployees()
                                .then(([rows]) => {
                                    let employees = rows.map((employee) => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
                                    inquirer.prompt([
                                        {
                                            type: 'input',
                                            name: 'first_name',
                                            message: 'What is the first name of the employee?',
                                            validate: (text) => {
                                                if (!text) {
                                                    return "Error: must not be empty!"
                                                } else if (text.length > 30) {
                                                    return "Error: must be less than or equal to 30 characters long!";
                                                } else {
                                                    return true;
                                                }
                                            }
                                        },
                                        {
                                            type: 'input',
                                            name: 'last_name',
                                            message: 'What is the last name of the employee?',
                                            validate: (text) => {
                                                if (!text) {
                                                    return "Error: must not be empty!"
                                                } else if (text.length > 30) {
                                                    return "Error: must be less than or equal to 30 characters long!";
                                                } else {
                                                    return true;
                                                }
                                            }
                                        },
                                        {
                                            type: 'list',
                                            name: 'role_id',
                                            message: 'What is the role the employee belongs to?',
                                            choices: roles
                                        },
                                        {
                                            type: 'list',
                                            name: 'manager_id',
                                            message: 'Who is their manager?',
                                            choices: employees
                                        }
                                    ])
                                    .then((res) => {
                                        db.addEmployee(res.first_name, res.last_name, res.role_id, res.manager_id);
                                        console.log(`Employee ${res.first_name} ${res.last_name} added successfully!`)
                                    })
                                    .then(() => init())
                                })
                        })

                    break;
                case 'Update Employee Role':
                    db.viewRoles()
                        .then(([rows]) => {
                            let roles = rows.map((role) => ({ name: role.title, value: role.id }));
                            db.viewEmployees()
                                .then(([rows]) => {
                                    let employees = rows.map((employee) => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
                                    inquirer.prompt([
                                        {
                                            type: 'list',
                                            name: 'employee_name',
                                            message: `Which employee's role do you want to update?`,
                                            choices: employees
                                        },
                                        {
                                            type: 'list',
                                            name: 'role_id',
                                            message: 'Which role do you want to assign the selected employee?',
                                            choices: roles
                                        }
                                    ])
                                    .then((res) => {
                                        db.updateEmployeeRole(res.employee_name, res.role_id);
                                        console.log(`Employee ${res.employee_name} updated successfully!`)
                                    })
                                    .then(() => init())
                                })
                        })

                    break;
                case 'Quit Application':
                    console.log('Bye!');
                    process.exit()
                default:
                    console.log('Something went wrong! Try again.');
                    process.exit();
            }
            return response;
        })
}

init()