var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object

// Endpoint to Get a list of users
app.get('/getServers', function(req, res){
    fs.readFile(__dirname + "/" + "server.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data); // you can also use res.send()
    });
})

// Create a server to listen at port 8080
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})

var user = {
    "user3":  {
        "Company Name": "Sy Inc.",
        "Name of Employees":["Dhavid", "May Ann", "Anitta", "Kuroko", "Akira"],
        "Positions":"Marketing",
        "Location":"Rodeo Boulevard, USA",
        "id":3
    }
} 

//The addUser endpoint
app.post('/addServers', function(req, res){
    //Step 2: read existing users
    fs.readFile(__dirname + "/" + "server.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        //Step 3: append user variable to list
        data["user3"] = user["user3"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})


app.get('/:id', function (req, res) {
    // First retrieve existing user list
    fs.readFile( __dirname + "/" + "server.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 }) 

 var user = {
    "user1": {  
        "Company Name": "Samsung Inc",
        "Name of Employees": ["Louriell Kate", "Jenn", "George", "Shiel", "Mark"],
        "Positions":"Accountants",
        "Location":"Melrose Avenue, USA",
        "id":1
    }
 }

 app.put('/updateServers', function (req, res) {
    fs.readFile( __dirname + "/" + "server.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user1"] = user["user1"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
})


 //Code to delete a user by id
 var id = 2;
 app.delete('/deleteServers', function (req, res) {
    // First retrieve existing users
    fs.readFile( __dirname + "/" + "server.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
        
       console.log( data );
       res.end( JSON.stringify(data));
    });

 }) 

 