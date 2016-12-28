/**
 * Created by jonathanmar on 10/17/16.
 */

//initialize app to be a function handler you can supply to
    //an HTTP server
var app = require('express')();
var counter = 0;

var hostname = '0.0.0.0';
var port = process.env.PORT || 3000;

var x = 300;

//var MongoClient = require('mongodb').MongoClient

//var assert = require('assert');

//var MongoClient = require('mongodb').MongoClient,
  //  assert = require('assert');

//var dboper = require('./operations');

// Connection URL
//var url = 'mongodb://admin:asteroids72@ds035735.mlab.com:35735/test1';

// Use connect method to connect to the Server

/**
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    dboper.insertDocument(db, { name: "player3", score: "980" },
        "highscore", function (result) {
            console.log(result.ops);

            dboper.findDocuments(db, "highscore", function (docs) {
                console.log(docs);


                dboper.updateDocument(db, { name: "player3" },
                    { score: "Updated Test" },
                    "highscore", function (result) {
                        console.log(result.result);

                        dboper.findDocuments(db, "highscore", function (docs) {
                            console.log(docs)

                            //db.dropCollection("highscore", function (result) {
                            //    console.log(result);

                            //    db.close();
                            //});
                        });
                    });

            });
        });
});
/**
MongoClient.connect(url, function(err,db){
    //check for errors on connection
    assert.equal(err,null);
    console.log("connected correctly to server");


    var collection = db.collection("highscore");


    collection.insertOne({name:"player2",score:"300"},
    function(err,result){
        assert.equal(err,null);
        console.log("after insert:");
        console.log(result.ops);

        collection.find({}).toArray(function(err,docs){
            assert.equal(err,null);
            console.log("Found");
            console.log(docs);

            db.dropCollection("highscore",function(err,result){
                assert.equal(err,null);
                db.close();
            });

        });
        //notice use of callback function every step of the way
        //finding takes time, so the function will be executed
        //as soon as the time is done
    });

    //callback function above will return a result
    //either an error or result
    //result.ops is an array containing all the successful
    //documents that have been inserted


});


 **/


var clients = [];
//the app object which serves as a function handler is
//supplied to an http server

//http takes the express app and does stuff with it
var server = require('http').Server(app);
//var http = require('http').Server(app);


//initialize a new instance of socket.io by
//passing in the http server
//the listen on the connection event
//for incoming sockets

//passing server to io
//socket.io-ifying the server

var io = require('socket.io')(server);
//console.log(io);

//this is what happens when you type the homepage
//serves up index.html from the working folder
//whenever you get a request, serve up the index.html
app.get('/', function(req, res){
    res.sendfile('index.html');
});


//whenever the socket.io object receives a new connection
//do something
//connection, disconnect, and a few others are reserved words
//ex / could use disconnect when people leave the game etc.

//message is also a reserved word


//move this into the other connection

io.on('connection', function(socket){
    console.log('a user connected');
});
//not sure why there are 2 of these


//socket here is the client socket object (different from the io server object)

//as soon as connection happens
//client object is passes in as "socket"

//and its in the event loop permanently
//the connection only happens once per tab opening
//same for disconnect 

//like a conference call
//io hears everything that happens with the client "socket"
//and the client "socket" objects hear everything that is emitted from the server

//below is an event listener

//io is pulling the strings on all the client sockets
io.on('connection', function(socket){
    //as soon as the client sends a message of a particular type with the specfic text 'chat message' 
    //do something
    
    
    //when this event happens on the socket side
    //pass in a function that responds and can make use of the message contents
    socket.on('chat message', function(msg){
        
        
        //i think because this is coming from the server it goes to everyone
        io.emit('chat message', msg);
        if (msg == 'right wins'){
            console.log("someone typed right");
            io.emit('right wins', "someone typed right");
            x += 30;
            
            if (x>599){
                io.emit('chat message', "Right Does Win!!!!");
                x=300;
                //console.log("right wins");
            }
        }
        if (msg == 'left rules'){
            console.log("someone typed left");
            io.emit('left rules', "someone typed left");
            x -= 30;
            if (x<1){
                io.emit('chat message', "Left Does Rule!!!!");
                x=300;
            }
        }
    });
    
    //for every socket that connect, they are listening for the join key
    //when they hear it take the data object and run this function
    socket.on('join',function(data){

        //on the server i'm keeping track of how many people joined
        counter += 1;
        console.log(data + counter);
        //trigger a particular even on this particular client object
        socket.emit('your number',counter);
        socket.emit('starting x',x);
        //io.emit()
    });
    
    socket.on('disconnect',function(){
        counter -= 1;
        console.log("client disconnected");
    });
    //io.clients(function(error, clients){
    //    if (error) throw error;
    //    console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
    //});
});

//this is a route handler and defines
//what happens when someone reaches the home page
//req is the request
app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

server.listen(port, hostname, function(){
    console.log('listening on ' + hostname + ':' + port);
});
