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
('Mark', 'Zuck', 1, NULL), -- CEO, no manager
('Elon', 'Musk', 2, 1),     -- Reports to Mark Zuck
('Elton', 'John', 3, 2),     -- Reports to Elon Musk
('Lance', 'Armstrong', 2, NULL), -- New hire, no manager
('Blue', 'Beats', 3, NULL), -- New hire, no manager
('Oranges', 'Apples', 2, 2),   -- Reports to Elon Musk
('Sandra', 'Peters', 1, 1),    -- Reports to Mark Zuck
('Jackson', 'Johnson', 3, 2),  -- Reports to Elon Musk
('Ronald', 'McDonald', 2, 2);  -- Reports to Elon Musk