var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Nonfatbearz1",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    beginSearch();
});

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}

function beginSearch() {
    // inquirer to ask user id number and quantity
    inquirer
        .prompt([
            {
                name: "idNumber",
                type: "input",
                message: "Please enter the ID number of the product you would like to buy:",
                validate: validateInput,
                filter: Number
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the number of units of the chosen item you would like to buy:",
                validate: validateInput,
                filter: Number
            }
        ])
        .then(function (answer) {
            // var for user input for idNumber and quantity
            var item = input.idNumber;
            var quantity = input.quantity;
            // var for connecting to DB
            var query = "SELECT * FROM products WHERE ?";
            connection.query(query, { idNumber: item }, function (err, res) {
                if (err) throw err;

                // error if user input invalid ID
                if (data.length === 0) {
                    console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                    displayInventory();

                } else {
                    var productData = data[0];

                    // If the quantity requested by the user is in stock
                    if (quantity <= productData.stock_quantity) {
                        console.log('Congratulations, the product you requested is in stock! Placing order!');

                        // Construct the updating query string
                        var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                        // Update the inventory
                        connection.query(updateQueryStr, function (err, data) {
                            if (err) throw err;

                            console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                            console.log('Thank you for shopping with us!');
                            console.log("\n---------------------------------------------------------------------\n");

                            // End the database connection
                            connection.end();
                        })
                    } else {
                        console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
                        console.log('Please modify your order.');
                        console.log("\n---------------------------------------------------------------------\n");

                        displayInventory();
                    }
                }
            })
        })
}


// displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
    // console.log('___ENTER displayInventory___');

    // Construct the db query string
    queryStr = 'SELECT * FROM products';

    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id + '  //  ';
            strOut += 'Product Name: ' + data[i].product_name + '  //  ';
            strOut += 'Department: ' + data[i].department_name + '  //  ';
            strOut += 'Price: $' + data[i].price + '\n';

            console.log(strOut);
        }

        console.log("---------------------------------------------------------------------\n");

        //Prompt the user for item/quantity they would like to purchase
        promptUserPurchase();
    })
}

// runBamazon will execute the main application logic
function runBamazon() {
    

    // Display the available inventory
    displayInventory();
}

// Run the application logic
runBamazon();
