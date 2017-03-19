'use strict';

//Verbose helps with debugging
const { Database } = require("sqlite3").verbose();

//function to handle errors
const errorHandler = (err)=> {
  if(err) {
    console.log(`${err}`);
  };
};



//Returns a database object and automatically opens database
//Database method excepts a callback function that logs successful connection
const db = new Database("employees.sqlite", ()=>{
  console.log("Connected");
});

//creates a database that will be written to disk on file
//Changes will persist after database is closed
const db1 = new Database("employees.sqlite");

// const dropEmployees = () => {
//   db.run(`DROP TABLE employees`);
// }
// dropEmployees()


//creates table if it does not exist
db.run("CREATE TABLE IF NOT EXISTS employees (id INT, firstName TEXT, lastName TEXT, jobTitle TEXT, address TEXT, salary INT, department TEXT)");


//populates database
const populateEmployees = ()=> {
  //pulls in json file
  let {list} = require("./employees.json");

  list.forEach((obj)=>{
    //put text in quotes inside the tic marks
    db.run(`INSERT INTO employees VALUES
      (${obj.id},
      "${obj.firstName}",
      "${obj.lastName}",
      "${obj.jobTitle}",
      "${obj.address}",
      ${obj.salary},
      "${obj.department}")`)
  })
};
//call function to populate the data base
populateEmployees();

let allEmployees = ()=> {
  db.all(`SELECT * FROM employees`, (err, employees)=>{
      employees.forEach((each)=>{
        console.log(`Employee:
          ID: ${each.id}
          FirstName: ${each.firstName}
          LastName: ${each.lastName}
          Title: ${each.jobTitle}
          Address: ${each.address}
          Salary: ${each.salary}
          `)
      })
    });
};
//call allEmployees function
allEmployees()

// function to get jobTitle
let jobTitles = ()=>{
  db.each(`SELECT jobTitle FROM employees WHERE jobTitle = "softwareDeveloper"`, (err, {jobTitle})=> {
    if(err) {
      console.log(err);
    } else {
        console.log(`${jobTitle}`)
    };
  });
};
//call function
jobTitles();



//query for employees first name last name and address
db.all(`SELECT firstName, lastName, address FROM employees`, (err, employees)=>{
  employees.forEach(({firstName, lastName, address})=>{
    console.log(`First Name: "${firstName}" Last Name: "${lastName}" Address: "${address}"`)
  });
});


//query employees salary
db.each(`SELECT * FROM employees`, (err, { firstName, lastName, department, salary})=>{
  console.log(new Date().getMilliseconds());
  console.log(`${firstName} ${lastName} DEPARTMENT: ${department} SALARY: ${salary}`);
});







// 1. sort all alphabetically
// 2. create a new array of employees who's salary is more than 50000
let salaryRange = ()=> {
    db.all(`SELECT firstName, lastName, salary, department
            FROM employees
            WHERE employees.salary > 50000 GROUP BY employees.lastName`, (err, employees)=> {
              if(err) {
                return console.log(err.toString());
              }
              employees.forEach(({firstName, lastName, department, salary }) => {
                console.log(`${firstName} ${lastName} DEPARTMENT: ${department}, SALARY: ${salary} `);
              });
            });
  };

salaryRange();
