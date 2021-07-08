const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "rootroot",
  database: "employeeDB",
});

const initialPrompt = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "Add Employee",
      "Add Role",
      "Add Department",
      "Update Employee Role",
      "Exit",
    ],
    name: "whatToDo",
  },
];

// View all employees
const viewAllEmployees = () => {
  connection.query(
  `SELECT first_name, last_name, title FROM employee
    LEFT JOIN role ON employee.role_id = role.id;
    `, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// View all departments
const viewAllDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// View all roles
const viewAllRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

// Add employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter employee's first name.",
        name: "employeeFirstName",
      },
      {
        type: "input",
        message: "Please enter employee's last name.",
        name: "employeeLastName",
      },
      {
        type: "input",
        message: "What is the ID of the employee's role?",
        name: "employeeRoleId",
      },
      {
        type: "input",
        message: "What is ID of the employee's manager?",
        name: "employeeManagerId",
      },
    ])
    .then((res) => {
      let employeeFirstName = res.employeeFirstName;
      let employeeLastName = res.employeeLastName;
      let employeeRoleId = res.employeeRoleId;
      let employeeManagerId = res.employeeManagerId;

      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employeeFirstName}', '${employeeLastName}', ${employeeRoleId}, '${employeeManagerId}');`,
        (err, res) => {
          if (err) throw err;
          console.log(
            `${employeeFirstName} ${employeeLastName} was added as an employee.`
          );
        }
      );
      // Return to the main menu
      mainMenu();
    });
}

// Add department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter department name.",
        name: "departmentName",
      },
    ])
    .then((res) => {
      let departmentName = res.departmentName;
      connection.query(
        `INSERT INTO department (name) VALUES ('${departmentName}');`,
        (err, res) => {
          if (err) throw err;
          console.log(`Added ${departmentName} department.`);
        }
      );
      // Return to the main menu
      mainMenu();
    });
}

// Add role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter role title.",
        name: "roleTitle",
      },
      {
        type: "input",
        message: "Please salary for this role.",
        name: "roleSalary",
      },
      {
        type: "input",
        message: "Please the department ID for this role.",
        name: "roleDepartmentId",
      },
    ])
    .then((res) => {
      let roleTitle = res.roleTitle;
      let roleSalary = res.roleSalary;
      let roleDepartmentId = res.roleDepartmentId;
      connection.query(
        `INSERT INTO role (title, salary, department_id) VALUES ('${roleTitle}', '${roleSalary}', '${roleDepartmentId}');`,
        (err, res) => {
          if (err) throw err;
          console.log(
            `Added ${roleTitle} as a role with a salary of ${roleSalary}, in department ${roleDepartmentId}.`
          );
        }
      );
      // Return to the main menu
      mainMenu();
    });
}


// Update employee role
function updateEmployeeRole() {
    connection.query(`SELECT employee_id, first_name, last_name, title, role_id FROM employee
    LEFT JOIN role ON role.role_id = employee.employee_role_id;
    `, (err, res) => {
        if (err) throw err;
        console.table(res);
        inquirer.prompt([{
            type: "input",
            message: "Please enter employee ID of employee to update",
            name: "employeeToUpdateId",
        },])
        // mainMenu();
      });
};
  


connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  // After connecting, run the main menu
  mainMenu();
});

// Main menu
function mainMenu() {
  inquirer.prompt(initialPrompt).then((res) => {
    switch (res.whatToDo) {
      case "View All Employees":
        console.log("Viewing all employees.");
        viewAllEmployees();
        break;
      case "View All Departments":
        console.log("Viewing all departments.");
        viewAllDepartments();
        break;
      case "View All Roles":
        console.log("Viewing all roles.");
        viewAllRoles();
        break;
      case "Add Employee":
        console.log("Adding employee.");
        addEmployee();
        break;
      case "Add Role":
        console.log("Adding role.");
        addRole();
        break;
      case "Add Department":
        console.log("Adding department.");
        addDepartment();
        break;
      case "Update Employee Role":
        console.log("Updating employee role.");
        updateEmployeeRole();
        break;
      case "Exit":
        console.log("Exiting");
        connection.end();
    }
  });
}
