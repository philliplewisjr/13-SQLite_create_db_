'use strict';

//
const sqlite3 = require('sqlite3').verbose();
//db opens or creates a database
const db = new sqlite3.Database('example.sqlite')

console.log(db);

//delete table
const dropEmployees = () => {
  db.run(`DROP TABLE employees`);
}
// dropEmployees()

//creates a database with the db.run() method
db.run('CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary NUMBER(6,2))');
//inserting data into
// db.run('INSERT INTO employees VALUES (1, "Phillip", "Lewis", 500000.00)');

const populateEmployees = () => {

const {list} = require('./employees.json');
list.forEach(each => {
db.run(`INSERT INTO employees VALUES 
  (${each.id},
  "${each.firstName}",
  "${each.lastName}",
  ${each.salary}
  )`)

  })
}
populateEmployees();



//selects from row
// db.get(`SELECT * FROM employees`, (err, row) => {
//   console.log(row);
// })

//db.all returns and array of the results
// db.all(`SELECT * FROM employees`, (err, allRows)=>{
  //console.log(newDate().)
//   allRows.forEach(({id, first , last , salary})=>{
//     console.log(`
//         ${id} ${first} ${last}
//         Salary: ${salary}
//       `);
//   });
// });

//better for larger data bases
db.each(`SELECT * FROM employees
        WHERE employees.salary > 50000
         GROUP BY employees.first
         `, (err, {id, first , last , salary})=>{
  console.log(`
        ${id} ${first} ${last}
        Salary: ${salary}
      `)
})

const result = allRows


//challenge 2: Javascript sorting fun - ES6
//1 - sort all records alphabetically by first name
//2 - create a new array of all the employees that make more than 50000
//3 - using this new array, create an array that says each persons first and last name, as well as their salary
