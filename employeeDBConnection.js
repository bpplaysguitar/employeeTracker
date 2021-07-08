const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'rootroot',
  database: 'employeeDB',
});


const initialPrompt = 
[
  {
    type: 'list',
    message: "What would you like to do?",
    choices: ['View All Employees', 'View All Roles', 'View All Departments', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role', 'Exit'],
    name: 'whatToDo',
}
]

// Show all employees
const selectAllEmployees = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};


// Add employee 
function addEmployee() {
  inquirer.prompt([
      {
          message: "Please enter employee's first name",
          name: 'employeeFirstName',
      },
      {
          message: "Please enter employee's last name",
          name: 'employeeLastName',
      },
      {
          type: 'list',
          message: "What is this employee's role?",
          choices: ['Team Principal', 'Primary Driver', 'Reserve Driver'],
          name: 'employeeRole',
      },
  ]).then(res => {
      let employeeFirstName = res.employeeFirstName;
      let employeeLastName = res.employeeLastName;
      connection.query(`SELECT id FROM role WHERE title = '${res.employeeRole}';`, (err, res) => {
          if (err) throw err;
          connection.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${employeeFirstName}', '${employeeLastName}', ${res[0].id});`, (err, res) => {
              if (err) throw err;
              console.log(`${employeeFirstName} ${employeeLastName} was added as an employee.`);
              // Show all employees 
              selectAllEmployees();
          });
      });
  });
};


connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  // selectAllEmployees();
  // addEmployee();
  // First ask what the user wants to do
  inquirer.prompt(initialPrompt)

  .then(res => {
    switch (res.whatToDo) {
        case 'View All Employees':
            console.log("Viewing all employees.");
            viewAllEmployees();
            break;
        case 'View All Departments':
            console.log("Viewing all departments.");
            viewAllDepartments();
            break;
        case 'View All Roles':
            console.log("Viewing all roles.");
            viewAllRoles();
            break;
        case 'Add Employee':
            console.log("Adding employee.");
            addEmployee();
            break;
        case 'Add Role':
            console.log("Adding role.");
            addRole();
            break;
        case 'Add Department':
            console.log("Adding department.");
            addDepartment();
            break;
        case 'Update Employee Role':
            console.log("Updating employee role.");
            updateEmployeeRole();
            break;
        case 'Exit':
            console.log("Exiting");
            connection.end();
    }
})})


'View All Employees', 'View All Roles', 'View All Departments', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role'