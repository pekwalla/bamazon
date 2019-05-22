var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");

// create the connection information for the sql database
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
  //displayProducts();
});
 

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
    customer_question();
    
	});
}

function customer_question() {

inquirer.prompt([
	{
		name: "item_ID",
		type: "number",
		message:"Please enter from the list the Item ID you like to order.".blue,
		filter:Number
	},
	{
		name:"Quantity",
		type:"number",
		message:"Quantity to order?".blue,
		filter:Number
	}

 ]).then(function(answers){
   	var quantityNeeded = answers.Quantity;
 	  var IDrequested = answers.item_ID;
    checkOrder(IDrequested, quantityNeeded);
     
      
    
 });

}
 

checkOrder = function(item_ID, quantity){
    connection.query("Select * FROM products WHERE item_id = "+ item_ID, function(err, res) {
      if(err){console.log(err)};
      
      //console.log(res);
      //  if (res[0].item_id !== answers.item_ID){
      //  console.log("The item ID is not valid. Ente an item ID from the list")
       //   displayProducts();
        
       // }
      

        if (quantity < 1) {
          console.log("OOPS !!! Sorry.. your order Quantity can't be < 0".bgBlue);
         // displayProducts();
        } else if (quantity > 0  &&  quantity <= res[0].stock_quantity ) {

           // console.log(quantity);
            console.log("Good news your item is in stock!".bgGreen);
            var totalCost = res[0].price * quantity;
            
            console.log("Your total cost for ".green + quantity + " " +res[0].product_name.green+ " is ".green + totalCost)
            console.log("Thank you for your order!".green);


            res[0].stock_quantity -= quantity;

             // Ends the code to remove item from inventory.
            connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?',[res[0].stock_quantity, item_ID],
          
            function (err, res) {
              if (err) throw err;

             // displayProducts();  // Runs the prompt again, so the customer can continue shopping.
          });  

    
              //console.log(res);
              // console.log("The remaining quantity is: "+ res[0].item_id + " "+ res[0].stock_quantity);
          
              
		} else if (quantity > 0 &&  quantity > res[0].stock_quantity) {
			console.log("Sorry!!! Insufficient quantity, sorry we do not have enough".bgMagenta + " "+ res[0].product_name + " " + " to complete your order.".bgMagenta);
    };
		displayProducts();
    })
 
    }  
    displayProducts();
 