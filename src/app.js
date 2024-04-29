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

async function viewAllRoles() {
    console.log('Functionality to view all roles');
    showMainMenu();
}

async function viewAllEmployees() {
    console.log('Functionality to view all employees');
    showMainMenu();
}

async function addDepartment() {
    console.log('Functionality to add a department');
    showMainMenu();
}

async function addRole() {
    console.log('Functionality to add a role');
    showMainMenu();
}

async function addEmployee() {
    console.log('Functionality to add an employee');
    showMainMenu();
}

async function updateEmployeeRole() {
    console.log('Functionality to update an employee role');
    showMainMenu();
}

startApp();
