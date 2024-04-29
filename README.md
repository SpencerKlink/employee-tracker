# Employee Tracker

Employee Tracker is a command-line application built with Node.js, MySQL, and Inquirer. It allows you to manage your company's departments, roles, and employees easily.

## Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update employee roles

## Installation

1. Clone this repository to your computer.
2. Navigate to the project directory in your terminal.
3. Run `npm i` to install the required dependencies.

## Usage

1. Make sure you have MySQL installed and running on your machine.
2. Configure your MySQL connection settings in a `.env` file based on the provided `.env.example`.
3. Run `npm start` to start the application.
4. Use the arrow keys to navigate through the menu and select the desired actions.

## Database Schema

The project uses a MySQL database with the following schema:

- `department` table: id, name
- `role` table: id, title, salary, department_id
- `employee` table: id, first_name, last_name, role_id, manager_id

