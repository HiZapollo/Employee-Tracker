const mysql = require('mysql2');

class Employee {
    constructor () {
       this.db =  mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'employees_db'
        });
    }
    viewDepartments() {
        this.db.promise().query('SELECT * FROM department')
        .then(([rows, fields]) => {
            console.log(rows);
        })
        .catch(console.log)
        .then(() => this.db.end());
    }
    viewRoles() {
        this.db.promise().query('SELECT * FROM role')
        .then(([rows, fields]) => {
            console.log(rows);
        })
        .catch(console.log)
        .then(() => this.db.end());
    }
    viewEmployees() {
        this.db.promise().query('SELECT * FROM employee')
        .then(([rows, fields]) => {
            console.log(rows);
        })
        .catch(console.log)
        .then(() => this.db.end());
    }
    addDepartment(department) {

    }
    addRole(role) {

    }
    addEmployee(employee) {

    }
    updateEmployeeRole(employee) {

    }
}

module.exports = Employee;