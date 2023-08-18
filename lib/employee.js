const mysql = require('mysql2');

// The Employee Class:
//  - Houses all of the query functions
//  - They return a promise that will be handled in the main file.
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
        return this.db.promise().query('SELECT * FROM department;');
    }
    viewRoles() {
        return this.db.promise().query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT OUTER JOIN department ON role.department_id=department.id;');
    }
    viewEmployees() {
        return this.db.promise().query('SELECT E.id, E.first_name, E.last_name, role.title AS title, CONCAT(M.first_name," ", M.last_name) AS "Manager" FROM ((employee E LEFT OUTER JOIN employee M ON E.manager_id = M.id) LEFT OUTER JOIN role ON E.role_id = role.id);');
    }
    addDepartment(department) {
        return this.db.promise().query(`INSERT INTO department (name) VALUES ('${department}');`)
    }
    addRole(name, salary, deparment) {
        return this.db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${name}', '${salary}', '${deparment}');`)
    }
    addEmployee(first_name, last_name, role_id, manager_id) {
        return this.db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}', '${last_name}', '${role_id}', '${manager_id}');`)
    }
    updateEmployeeRole(employee_id, role_id) {
        return this.db.promise().query(`UPDATE employee SET role_id = ${role_id} WHERE id = ${employee_id};`);
    }
}

module.exports = Employee;