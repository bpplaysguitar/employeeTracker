// Packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');
// const fs = require('fs');
// const generate = require('./src/generateHTML')
// const create = require('./src/generateEmployee');
// let employeeData = ``;

console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

const initialPrompt = 
[
  {
    type: 'list',
    message: "What would you like to do?",
    choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager'],
    name: 'whaToDo',
}
]

const removeEmployeePrompt = 
[
  {
    type: 'list',
    message: "Which employee do you want to remove?",
    choices: ['TODO is this variables?'],
    name: 'removeEmployee',
},
]


// Function call to initialize app
init();
