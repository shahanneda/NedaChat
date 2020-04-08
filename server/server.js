const express = require("express")();

const server = require("http").Server(express); // create the http servere and conenct it to socket io

const io = require("socket.io")(server); // setup socekt io

server.listen(80);
console.log("NedaChat Server Started!");


express.get('/', function (req, res) {
        //res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
        socket.on("connect", function(data){
        });
        socket.on("NewConnection", function(data){
                io.emit("newUser", data);
                console.log("New User Connected: name: " + data.user.name);
        });
        socket.on("buttonClicked", function(data){
                io.emit("buttonClicked", data);
                console.log("button clicked");
        });
});
