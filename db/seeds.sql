INSERT INTO department (name)
VALUES ('Sales'),
       ('Legal'),
       ('Engineering'),
       ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 3),
       ('Software Engineer', 120000, 3),
       ('Account Manager', 160000, 4),
       ('Accountant', 125000, 4),
       ('Legal Team Lead', 250000, 2),
       ('Lawyer', 190000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jack', 'Leaderson', 1, null),
       ('Nick', 'Selltons', 2, 1),
       ('Rebecca', 'Builders', 3, null),
       ('Seth', 'Handy', 4, 3);

