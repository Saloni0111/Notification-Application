var firebase = require("firebase");
const open = require('open');
var $ = require('jquery');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const engine = require("ejs-mate");
const ejs = require("ejs");
const path = require("path");
var server = app.listen(8080);

app.engine("ejs", engine);
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use('/public', express.static(path.join(__dirname, 'public')));


var firebaseConfig = {
    //Add your configuration here
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var ref = database.ref("users");



ref.orderByChild("users").limitToLast(1).on("child_added", function(snapshot) {

    console.log("notification arrived");

    var ke = snapshot.key;
    var me = snapshot.val().message;
    console.log(ke + " was " + me);

    if (snapshot.val().flagMessage === 'true') {
        app.locals.flag = 1;
        app.locals.mess = snapshot.val().message;
    }

    if (snapshot.val().flagText === 'true') {
        app.locals.flag = 2;
        app.locals.mess = snapshot.val().message;
    }

    if (snapshot.val().flagImage === 'true') {
        app.locals.flag = 3;
        app.locals.mess = snapshot.val().message;
    }

    if (snapshot.val().flagVideo === 'true') {
        app.locals.flag = 4;
        app.locals.mess = snapshot.val().message;
    }

    if (snapshot.val().flagAudio === 'true') {
        app.locals.flag = 5;
        app.locals.mess = snapshot.val().message;
    }

    app.get('/', (req, res) => {
        res.render('index1.ejs');
    });
    open("http://localhost:8080/");

});