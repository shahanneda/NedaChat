# NedaChat
## An Instant messaging app featuring group chats, personal messages, and more!

### [Click Here to go to NedaChat (shahan.ca/nedachat)](http://shahan.ca/nedachat)

This app is essentially a clone of Facebook messenger, made with the MERN stack, using mongo db for the databse, express and node js for the server,
and react for the frontend. Another very import library was **socket.io** which provided the instant messing websockets, that allows all users in the chat to 
recieve instant updates when a new chat is sent.

## Features and Techniques used:
- Groups chats of as many users as needed, along with personal messages
- Websockets for **instant updates with all the users in the chat**
- Smart managing of all the different clients connected and their websockets, including allowing multiple clients per each user
- Optimising data sent, while making sure all clients stay in sync


## Libraries and tools used:
- MongoDb for the database, and MongoDb atlas for hosting the databse
- Node js for the server side
- Express for the server
- SocketIo for comminicating with websockets from the server to the client instatly
- React for the frontend web page
- React router for routing the front end

 

## Running

- setup mongo db database, either on atlas or locally
- install required dependensies with npm install 
- creat an auth.json file in the server folder, like the following
```
{
  "dbPassword":"MONGO DB ATLAS DATABASE PASSWORD HERE"
}
```
- Update the uri constant in the server/server.js file to match you mongodb uri
- run ` node server/server.js `


