const express = require("express");
const app = express();

const server = require("http").Server(app); // create the http servere and conenct it to socket io

const io = require("socket.io")(server); // setup socekt io

let path = require("path");
let chats = {};

let userConnections = {};

let users = {};
users["shahanneda"] = 
        { 
                id:"shahanneda", 
                username:"shahanneda", 
                chatsUserIsIn:["Group 1"],
        }

users["sam"] = 
        { 
                id:"sam", 
                username:"sam", 
                chatsUserIsIn:["Group 1"],

        }
/*
users["bob"] = 
{ 
        id:"bob", 
        username:"bob", 
        chatsUserIsIn:[ "Group 6"],
}*/

chats["Group 1"] =
        { 
                id:"Group 1",
                name:"Group 1",
                usersInChat:{
                        "shahanneda": users["shahanneda"],
                        "sam": users["sam"],
                },
                messages:{},
        }



server.listen(7777);
console.log("NedaChat Server Started!");

const getIP = require('external-ip')();

getIP((err, ip) => {
        if (err) {
                // every service in the list has failed
                throw err;
        }
        console.log(ip);
});

// Add headers
app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
});
app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../client/index.html'));
});
app.use(express.static(path.join(__dirname + '/../client/')));

app.get('/getChats/:userid', function(req,res){
        console.log("apiEndpoint: getchats triggered");
        let userid = req.params.userid; 
        let storedChats = {};
        let user = users[userid];

        if(user){
                for(let chatId of user.chatsUserIsIn){
                        storedChats[chatId] = chats[chatId];
                }
                let jsonChats = JSON.stringify(storedChats);
                res.send(jsonChats);
        }else{
                res.send({});
        }

});
app.get('/searchForUser/:username', function(req,res){
        let username = req.params.username;
        username = username.toLowerCase();
        let usersToSend = {};
        console.log(users);
        for(let userid of Object.keys(users)){
                console.log(userid);
                if(userid.indexOf(username) != -1){
                        usersToSend[userid] = users[userid].username;  
                }
        }
        console.log(usersToSend);
        res.send(JSON.stringify(usersToSend));

});


io.on('connection', function (socket) {

        socket.on("connection", function(data){

        });

        socket.on("NewConnection", function(data){
                if(userConnections[data.user.id]){
                        console.log("Found other user client id, appending");
                        userConnections[data.user.id].push(socket);
                }else{
                        userConnections[data.user.id]  = [socket];  
                }

                if(!(data.user.id in users)){
                        users[data.user.id] = {
                                id: data.user.id,
                                username:data.user.id,
                                chatsUserIsIn:[],
                        };
                        console.log("new user created: " + data.user.id); 
                }
                console.log(users[data.user.id]);
                console.log("New User Connected: name: " + data.user.id);
        });

        socket.on("newMessage", function(data){
                let chat = chats[data.chatId]; // find chat using unique identifier
                chat.messages[data.id] = data; //  data is the message object 

                let usersInChat = chat.usersInChat;
                console.log(usersInChat);
                for(let userid in usersInChat){
                        console.log("user id :" + userid);
                        let userConnectionsForId = userConnections[userid];
                        console.log("trying gto get user: " + userid + " user connections " + userConnections);
                        //console.log(userConnections);
                        if(userConnectionsForId){ //  we have to check whether user is actually in chat or not

                                userConnectionsForId.map( userConnection => { // map through all of the clients of the user, the same id could have multiple sessions
                                        if(userConnection){
                                                userConnection.emit("chatUpdate", chat);
                                                console.log("sending message to " + userid );
                                        }
                                });
                        }
                }

                //socket.broadcast.emit("newMessage", data);
                console.log("New Message: ");
                //console.log(chat);
        });


        /*        socket.on("getChats", function(data){
                console.log(chats);
                let info = [{hola: "HEOOLL"}];
                console.log(info);
                socket.emit("allChatUpdate", { test:{chats} });
        });
        */

        socket.on("createChat", function(data){
                let newChat = {
                        id:data.id,
                        name:data.name,
                        usersInChat: data.usersInChat,
                        messages: {},
                };
                Object.keys(data.usersInChat).map( (userid) => {
                        users[userid].chatsUserIsIn.push( data.id);

                        let userConnectionsForId = userConnections[userid];
                        if(userConnectionsForId){ //  we have to check whether user is actually in chat or not

                                userConnectionsForId.map( userConnection => { // map through all of the clients of the user, the same id could have multiple sessions
                                        if(userConnection){
                                                userConnection.emit("chatUpdate", newChat);
                                                console.log("sending message to " + userid );
                                        }
                                });
                        }

                });
                console.log("creating chat!");
                console.log(newChat);
                chats[newChat.id] = newChat;
        });

        socket.on("editChat", function(data){
                let newChat = {
                        id:data.id,
                        name:data.name,
                        usersInChat: data.usersInChat,// to make this more secure make sure no users are being removed
                        messages: chats[data.id].messages ,
                };

                Object.keys(data.usersInChat).map( (userid) => {
                        //users[userid].chatsUserIsIn(data.id); we do not need to change that since the chat id never changed!

                        let userConnectionsForId = userConnections[userid];
                        if(userConnectionsForId){ //  we have to check whether user is actually in chat or not

                                userConnectionsForId.map( userConnection => { // map through all of the clients of the user, the same id could have multiple sessions
                                        if(userConnection){
                                                userConnection.emit("chatUpdate", newChat);
                                                console.log("sending message to " + userid );
                                        }
                                });
                        }

                });
                console.log("editing chat!");
                console.log(newChat);
                chats[newChat.id] = newChat;
        });

        socket.on("leaveChat", function(data){
                let chatId = data.id
                let userId = data.userId;
                console.log("leave chat: " + chatId + " for user: " + userId);

                                console.log(users[userId].chatsUserIsIn)
                let userConnectionsForId = userConnections[userId];
                if(chatId in chats){
                        if(userId in chats[chatId].usersInChat){
                                let indexOfChat = users[userId].chatsUserIsIn.indexOf(chatId)
                                console.log(indexOfChat + " " + users[userId].chatsUserIsIn[indexOfChat]);

                                 users[userId].chatsUserIsIn.splice(users[userId].chatsUserIsIn.indexOf(chatId), 1);// TODO: test if this is the culprit for the delete not working

                                console.log("requested : " + data.id); 
                                delete chats[chatId].usersInChat[userId]; 

                                if(userConnectionsForId){ //  we have to check whether user is actually in chat or not
                                        userConnectionsForId.map( userConnection => { // map through all of the clients of the user, the same id could have multiple sessions
                                                if(userConnection){
                                                        userConnection.emit("updateAll", {});
                                                        console.log("sending updateallrequest to " + userId );
                                                }
                                        });
                                }
                        }
                }
        });

});
