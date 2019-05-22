
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your usernamenode
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to Bamazon".rainbow);
    console.log("connected as id ".rainbow + connection.threadId + "\n");
    start();
    
    
  });
   
 


function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
       message: "Your Selection P?".green,
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
         displayProducts();
          break;
  
        case "View Low Inventory":
          lowInventory();
          break;
  
        case "Add to Inventory":
         lowInventory();
          addInventory();
          break;
  
        case "Add New Product":
          addItem();
          break;
            
        case "exit":
          connection.end();
          break;
        }
      });
    }

    var displayProducts = function(){
        var query = "Select * FROM products";
        connection.query(query, function(err, res){
            if(err) throw err;
            var displayTable = new Table ({
                head: ["Item ID", "Product Name", "Department", "Price", "stock_Quantity"],
                colWidths: [10,25,25,10,25]
            });
            for(var i = 0; i < res.length; i++){
                displayTable.push(
                    [res[i].item_id,res[i].product_name, res[i].department, res[i].price, res[i].stock_quantity]
                    );
            }
           
            console.log(displayTable.toString());
         
        start();
        });
    }
    
    var lowInventory = function(){
      
        connection.query("Select * FROM products WHERE stock_Quantity <"+ 5 , function(err, res) {
 
            if(err) throw err;
            var displayTable = new Table ({
                head: ["Item ID", "Product Name", "Department", "Price", "stock_Quantity"],
                colWidths: [10,25,25,10,25]
            });
            for(var i = 0; i < res.length; i++){
                displayTable.push(
                    [res[i].item_id,res[i].product_name, res[i].department, res[i].price, res[i].stock_quantity]
                    );
            }
            
            console.log(displayTable.toString());
     
        //start();
        });
    }

    function addInventory() {
        
        inquirer.prompt([
            {
                name: "item_ID",
                type: "number",
                message:"Please enter from the list the Item ID you like to update.",
                filter:Number
            },
            {
                name:"Quantity",
                type:"number",
                message:"Quantity to add ?",
                filter:Number
            }
        
         ]).then(function(answers){
           
             var quantity = answers.Quantity;
             var IDrequested = answers.item_ID;
             //addIventory(IDrequested, quantityNeeded);
             
         
                connection.query("Select * FROM products WHERE item_id = "+ IDrequested, function(err, res) {
             
           
                    if(err){console.log(err)};
              
                        console.log("Updating the Inventory...".bgGreen); 
                                  
                        res[0].stock_quantity = quantity;
            
                         // Ends the code to remove item from inventory.
                    connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?',[res[0].stock_quantity, IDrequested],
                      
                         function (err, res) {
                          if (err) throw err;
                          
                         // displayProducts();  // Runs the prompt again, so the customer can continue shopping.
                    });                           
                    lowInventory();
                  
                    
                })
            }) 
            
        }         
            
        function addItem() { 
        }        
          
    
    