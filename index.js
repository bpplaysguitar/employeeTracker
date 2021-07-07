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

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(initialPrompt)
  .then((res) => {
    res.role = "Manager";
    employeeData += create.employee(res);
    if (res.conStop === 'Continue') {
      employeeFunction();
    } else {
      const fileName = "./dist/index.html"
      
      fs.writeFile(
        fileName,
        generate.HTML(employeeData),
        err => err ? console.error(err) : console.log("Team profiles successfully generated."));

    }



  })

}

      function employeeFunction() {
        inquirer.prompt(employeePrompt).then((res) => {
            if (res.askAgain) {
                employeeData += create.employee(res);
                employeeFunction();
            } else {
                employeeData += create.employee(res);
                const fileName = "./dist/index.html";
    
                fs.writeFile(
                    fileName,
                    generate.HTML(employeeData),
                    err => err ? console.error(err) : console.log("Team profiles successfully generated."));
            }
        })
    };


// Function call to initialize app
init();
