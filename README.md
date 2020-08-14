# NedaChat
## An Instant messaging app featuring group chats, personal messages, and more!

### [Click Here to go to NedaChat (shahan.ca/nedachat)](http://shahan.ca/nedachat)

This app is essentially a clone of Facebook messenger, made with the MERN stack, using mongo db for the database, express and node js for the server,
and react for the frontend. Another very import library was **socket.io** which provided the instant messing web sockets, that allows all users in the chat to 
receive instant updates when a new chat is sent.

## Features and Techniques used:
- Groups chats of as many users as needed, along with personal messages
- Web sockets for **instant updates with all the users in the chat**
- Smart managing of all the different clients connected and their web sockets, including allowing multiple clients per each user
- Optimizing data sent, while making sure all clients stay in sync


## Libraries and tools used:
- MongoDB for the database, and MongoDB atlas for hosting the database
- Node js for the server side
- Amazon Aws EC2 for hosting the server
- Express for the server
- Socket Io for communicating with web sockets from the server to the client instantly
- React for the frontend web page
- React router for routing the front end

 

## Running

- setup mongo db database, either on atlas or locally
- install required dependencies with npm install 
- create an auth.json file in the server folder, like the following
```
{
 "password":"MONGO DB ATLAS DATABASE PASSWORD HERE"
}
```
- Update the uri constant in the server/server.js file to match you MongoDB uri
- run ` node server/server.js `

