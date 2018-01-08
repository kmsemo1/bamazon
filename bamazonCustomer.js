var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "top_songsDB"
});

connection.connect(function (err) {
    if (err) throw err;
    beginSearch();
});

function beginSearch() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "input",
                message: "Please enter the ID of the product you would like to buy:"
            },
            {
                name: "action",
                type: "input",
                message: "Please enter the number of units of the chosen item you would like to buy:"
            }
        ])
        .then(function (answer) {
            var query = "SELECT product_name, department_name, price, stock_quantit FROM bamazon WHERE ?";
            connection.query(query, function (err, res) {
                for (var i=0; i<res.length; i++) {
                    console.log("ID: " + res[i].id);
                }
            }
        )
    })
}