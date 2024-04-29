USE employee_tracker;

INSERT INTO department (name) VALUES 
('Engineering'),
('Human Resources'),
('Marketing');

INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 90000, 1),
('HR Manager', 75000, 2),
('Marketing Coordinator', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Emily', 'Jones', 3, 1);
