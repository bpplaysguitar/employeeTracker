DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES  ("management"),
		("drivers");


CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (role_id)
);

INSERT INTO role (title, salary, department_id)
VALUES  ("Team Principal", 8000000.00, 1),
		("Primary Driver", 15000000.00, 2),
		("Reserve Driver", 1000000.00, 2);


CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  employee_role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (employee_id)
);

INSERT INTO employee (first_name, last_name, employee_role_id, manager_id)
VALUES 	("Christian", "Horner", 1, null),
        ("Toto", "Wolff", 1, null),
        ("Guenther", "Steiner", 1, null),
		    ("Daniel", "Ricciardo", 2, 1),
		    ("Max", "Verstappen", 2, 1),
        ("Sebastian", "Vettel", 2, 2),
        ("Valtteri", "Bottas", 2, 2),
        ("Charles", "Leclerc", 2, 3),
        ("Carlos", "Sainz", 2, 3),
        ("Pierre", "Gasly", 3, 1),
        ("Lando", "Norris", 3, 2),
        ("Nico", "Hulkenberg", 3, 3);

SELECT * from department;
SELECT * from role;
SELECT * from employee;
