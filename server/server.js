const express = require("express");
const app = express();

const server = require("http").Server(app); // create the http servere and conenct it to socket io

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const io = require("socket.io")(server); // setup socekt io

let path = require("path");
let chats = {};

let userConnections = {}; // stores all the different sockets to the different users so we can send them messages
let socketIdToUserId = {};

let users = {};

let chatsUserIsPartOfStorage = {}; // used for the getchats api endpoint

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

const url = 'mongodb://localhost:27017';
const dbName = 'nedachat';
let db = null; 

MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to to mongodb server");
        db = client.db(dbName);
        connectedToMongoDb();

});

function connectedToMongoDb(){
        db.createCollection('chats');
        db.createCollection('users');
        let chatsCollection = db.collection("chats");
        let usersCollection = db.collection("users");

        /*
users["bob"] = 
{ 
        id:"bob", 
        username:"bob", 
        chatsUserIsIn:[ "Group 6"],
}*/


        // Connection URL

        // Database Name

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
                let userid = req.params.userid; 
                usersCollection.findOne({_id: userid}, (err, user) => {
                        if(user != null){
                                chatsCollection.find({_id:{"$in": user.chatsUserIsIn}}, (err,result) =>{
                                        result.toArray( (err, arrayOfChats) =>{
                                                let chatsObject ={};
                                                arrayOfChats.map( chat =>{
                                                        chatsObject[chat.id] = chat;
                                                });
                                                let jsonChats = JSON.stringify(chatsObject);
                                                res.send(jsonChats);
                                        });
                                });
                        }
                        else{
                                res.send({});
                        }
                });
        });
        app.get('/searchForUser/:username', function(req,res){
                let username = req.params.username;
                username = username.toLowerCase();
                usersCollection.find({}).toArray( (err,result) =>{
                        let usersToSend = {};
                        result.map( user => {
                                let userid = user.id;
                                if(userid.indexOf(username) != -1){
                                        usersToSend[userid] =  user;  
                                }
                        });
                        res.send(JSON.stringify(usersToSend));

                });

        });


        io.on('connection', function (socket) {

                socket.on("connection", function(data){

                });

                socket.on("NewConnection", function(data){
                        if(userConnections[data.user.id]){
                                userConnections[data.user.id].push(socket);
                        }else{
                                userConnections[data.user.id]  = [socket];  
                        }
                        socketIdToUserId[socket.id] = data.user.id;

                        usersCollection.findOne({_id: data.user.id}, (err, result) => {
                                if(result == null){
                                        console.log("did not find user: " +data.user.id + " making new user");

                                        usersCollection.update({_id:data.user.id}, {
                                                $set:{
                                                        _id: data.user.id,
                                                        id: data.user.id,
                                                        username:data.user.id,
                                                        chatsUserIsIn: [],
                                                }
                                        }, {upsert : true});

                                }

                        });

                        /*
                        if(!(data.user.id in users)){
                                users[data.user.id] = {
                                        id: data.user.id,
                                        username:data.user.id,
                                        chatsUserIsIn:[],
                                };
                                console.log("new user created: " + data.user.id); 
                        }*/
                        console.log("New User Connected: name: " + data.user.id);
                });

                socket.on("disconnect", function(data){
                        if(socket.id in socketIdToUserId){
                                let userId = socketIdToUserId[socket.id];
                                console.log("User " + userId + " disconnected!");
                                userConnections[userId].splice(userConnections[userId].indexOf(socket), 1);

                        }
                });

                socket.on("newMessage", function(data){

                        chatsCollection.findOne({_id:data.chatId}, (err,chat) =>{
                                if(chat == null){
                                        console.log("ERROR: CHAT NULL WHEN SHOULD NOT HAVE BEEN, ID:" + data.chatId); 
                                        return;
                                }
                                chat.messages[data.id] = data; //  data is the message object 
                                chatsCollection.update({_id:data.chatId}, chat, {upsert: true});

                                let usersInChat = chat.usersInChat;
                                for(let userid in usersInChat){
                                        let userConnectionsForId = userConnections[userid];
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

                        });
                        console.log("New Message: "); 
                        console.log(data);
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
                                usersCollection.findOne({ _id: userid}, (err,result) =>{
                                        console.log("looking for " + userid + " found :");
                                        console.log(result);
                                        result.chatsUserIsIn.push( data.id);
                                        usersCollection.update({_id: userid}, result, {upsert: true});
                                })

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
                        chatsCollection.update({_id: newChat.id},newChat, {upsert: true});
                });

                socket.on("editChat", function(data){
                        chatsCollection.findOne({_id: data.id}, (err,oldChat) =>{


                                let newChat = {
                                        id:data.id,
                                        name:data.name,
                                        usersInChat: data.usersInChat,// to make this more secure make sure no users are being removed
                                        messages: oldChat.messages,
                                };

                                Object.keys(data.usersInChat).map( (userid) => {
                                        //users[userid].chatsUserIsIn(data.id); we do not need to change that since the chat id never changed!

                                        usersCollection.findOne({_id: userid}, (err,result) =>{ // check if user does not know they are in chat and tell them
                                               if(result.chatsUserIsIn.indexOf(data.id) == -1){
                                                        result.chatsUserIsIn.push(data.id);
                                                       usersCollection.update({_id: userid}, result, {upsert: false});
                                               }

                                        });
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
                                chatsCollection.update({_id: newChat.id},newChat, {upsert: true});
                        });
                });

                socket.on("leaveChat", function(data){
                        let chatId = data.id
                        let userId = data.userId;
                        console.log("leave chat: " + chatId + " for user: " + userId);
                        let userConnectionsForId = userConnections[userId];
                        usersCollection.findOne({_id: userId}, (err,oldUser) =>{
                                oldUser.chatsUserIsIn.splice(oldUser.chatsUserIsIn.indexOf(chatId), 1);
                                usersCollection.update({_id: userId}, oldUser, {upsert: false});
                        });

                        chatsCollection.findOne({_id: chatId}, (err,oldChat) =>{
                                delete oldChat.usersInChat[userId]; 
                                chatsCollection.update({_id: chatId}, oldChat, {upsert: false});
                        });

                        if(userConnectionsForId){ //  we have to check whether user is actually in chat or not
                                userConnectionsForId.map( userConnection => { // map through all of the clients of the user, the same id could have multiple sessions
                                        if(userConnection){
                                                userConnection.emit("updateAll", {});
                                                console.log("sending updateallrequest to " + userId );
                                        }
                                });
                        }
                });

        });
}
