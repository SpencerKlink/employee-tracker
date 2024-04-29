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
('Mark', 'Zuck', 1, 1),
('Elon', 'Musk', 2, 3),
('Elton', 'John', 3, 2),
('Lance', 'Armstrong', 2, 1),
('Blue', 'Beats', 3, 1),
('Oranges', 'Apples', 2, 3),
('Sandra', 'Peters', 1, 3),
('Jackson', 'Johnson', 3, 2),
('Ronald', 'McDonald', 2, 2);
