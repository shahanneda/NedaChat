const express = require("express")();

const server = require("http").Server(express); // create the http servere and conenct it to socket io

const io = require("socket.io")(server); // setup socekt io

server.listen(80);
console.log("NedaChat Server Started!");


app.get('/', function (req, res) {
        //res.sendFile(__dirname + '/index.html');
        io.on('connection', function (socket) {
                

                socket.emit('news', { 
                        hello: 'world' 
                });

                socket.on('my other event', function (data) {
                        console.log(data);
                });

                socket.on("connect", function(data){
                        console.log("New User Connected: name" + data.user.name);
                        io.emit("newUser", data);
                }


        });
});

