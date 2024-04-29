const inquirer = require('inquirer');
const { executeQuery } = require('../utils/database');

function startApp() {
    console.log('Welcome to the Employee Tracker!');
    showMainMenu();
}

async function showMainMenu() {
    const choices = [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
    ];

    const { action } = await inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: choices
        }
    ]);

    switch (action) {
        case 'View All Departments':
            await viewAllDepartments();
            break;
        case 'View All Roles':
            await viewAllRoles();
            break;
        case 'View All Employees':
            await viewAllEmployees();
            break;
        case 'Add a Department':
            await addDepartment();
            break;
        case 'Add a Role':
            await addRole();
            break;
        case 'Add an Employee':
            await addEmployee();
            break;
        case 'Update an Employee Role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            console.log('Exiting application...');
            process.exit();
    }
}

async function viewAllDepartments() {
    const sql = `SELECT id, name FROM department`;
    try {
        const departments = await executeQuery(sql);
        console.log("\nDepartments:");
        console.table(departments);
    } catch (error) {
        console.error('Error fetching departments:', error);
    } finally {
        showMainMenu();
    }
}

async function addDepartment() {
    const { departmentName } = await inquirer.prompt([
        {
            name: 'departmentName',
            type: 'input',
            message: 'What is the name of the department?',
        }
    ]);

    const sql = `INSERT INTO department (name) VALUES (?)`;
    try {
        await executeQuery(sql, [departmentName]);
        console.log(`Added ${departmentName} to the database`);
    } catch (error) {
        console.error('Error adding department:', error);
    } finally {
        showMainMenu();
    }
}

async function addRole() {
    const departments = await executeQuery(`SELECT id, name FROM department`);
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const { title, salary, departmentId } = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the role?',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role?',
            validate: value => !isNaN(parseFloat(value)) && isFinite(value) ? true : 'Please enter a valid number'
        },
        {
            name: 'departmentId',
            type: 'list',
            message: 'Which department does this role belong to?',
            choices: departmentChoices
        }
    ]);

    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    try {
        await executeQuery(sql, [title, salary, departmentId]);
        console.log(`Added the role ${title} with a salary of ${salary} to the department ID ${departmentId}`);
    } catch (error) {
        console.error('Error adding role:', error);
    } finally {
        showMainMenu();
    }
}

async function viewAllRoles() {
    const sql = `SELECT id, title, salary, department_id FROM role`;
    try {
        const roles = await executeQuery(sql);
        console.log("\nRoles:");
        console.table(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
    } finally {
        showMainMenu();
    }
}

async function viewAllEmployees() {
    const sql = `
        SELECT 
            e.id, 
            e.first_name, 
            e.last_name, 
            r.title AS role, 
            r.salary, 
            d.name AS department, 
            CONCAT(m.first_name, ' ', m.last_name) AS manager 
        FROM 
            employee e
        INNER JOIN 
            role r ON e.role_id = r.id
        INNER JOIN 
            department d ON r.department_id = d.id
        LEFT JOIN 
            employee m ON e.manager_id = m.id
    `;
    try {
        const employees = await executeQuery(sql);
        console.log("\nEmployees:");
        console.table(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
    } finally {
        showMainMenu();
    }
}


async function addEmployee() {
    console.log('Adding an employee...');

    // Prompt for employee details
    const { firstName, lastName, roleId, managerName } = await inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "Enter the employee's first name:",
        },
        {
            name: 'lastName',
            type: 'input',
            message: "Enter the employee's last name:",
        },
        {
            name: 'roleId',
            type: 'input',
            message: "Enter the employee's role ID:",
        },
        {
            name: 'managerName',
            type: 'input',
            message: "Enter the employee's manager's name:",
        },
    ]);

    const managerQuery = `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`;
    const [manager] = await executeQuery(managerQuery, [managerName]);
    
    if (!manager) {
        console.log(`Manager '${managerName}' not found.`);
        return;
    }

    const managerId = manager.id;

    const insertQuery = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    try {
        await executeQuery(insertQuery, [firstName, lastName, roleId, managerId]);
        console.log(`Employee '${firstName} ${lastName}' added successfully.`);
    } catch (error) {
        console.error('Error adding employee:', error);
    } finally {
        showMainMenu();
    }
}

async function updateEmployeeRole() {
    const employees = await executeQuery(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`);
    const employeeChoices = employees.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const roles = await executeQuery(`SELECT id, title FROM role`);
    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { employeeId, roleId } = await inquirer.prompt([
        {
            name: 'employeeId',
            type: 'list',
            message: 'Choose the employee to update:',
            choices: employeeChoices
        },
        {
            name: 'roleId',
            type: 'list',
            message: 'Choose the new role for the employee:',
            choices: roleChoices
        }
    ]);

    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    try {
        await executeQuery(sql, [roleId, employeeId]);
        console.log(`Updated employee's role successfully`);
    } catch (error) {
        console.error('Error updating employee role:', error);
    } finally {
        showMainMenu();
    }
}

startApp();
