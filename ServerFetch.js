const fetch = require('node-fetch')
const express = require('express')
const mysql = require('mysql')
const Song = require('./Song.js')
const app = express()

//NEEDED THINGS TO DO
/*
1. nodejs emit to document path
2. populate sql database

*/

Array.prototype.clean = function() {
  return this.filter(val => !!val);
}

//Connection Settings
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'playlist'
});

// Connecting to MySQL DATABASE
try {
  db.connect(err => {
      console.log('MySql Connected...');
  });
} catch(err) { throw err.message }

//Local Storage
app.use('/', express.static('public')) // Stores static files in 'public' folder at '/'

// Lisening on PORT 3000
app.listen(3000, () => console.log('App listening on port 3000!'))



// Create TABLE
app.get('/createtable/:tablename', (req, res) => {
  let sql = `CREATE TABLE ${req.params.tablename} (
        ID int NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        artist VARCHAR(255),
        composer VARCHAR(255),
        album VARCHAR(255),
        genre VARCHAR(255),
        time int,
        year int,
        PRIMARY KEY (ID)
      );`
  db.query(sql, (err, result) =>{
    if (err) throw err
    res.send(`Table ${req.params.tablename} was Sucessfully created`)
  } )
})

app.get('/populate', async (req, res) => {

  (function() {
    'use strict';
    fetch('http://localhost:3000/playlist.csv')
     .then(response => response.text())
     .then(text =>  text.split(/"|,|","/).clean())
     .then(songs => {
       console.log('Fetch Was Sucessful!')
        const playlist = objectArray(songs)

        for (let song in playlist){
          let sql
          if (!playlist[song]) {
            throw 'playlist NOT defined'
          } else {
            sql = `INSERT INTO songs (name, artist, composer, album, genre, time, year)
                       VALUES ("${playlist[song].name}", "${playlist[song].artist}", "${playlist[song].composer}",
                          "${playlist[song].album}", "${playlist[song].genre}", "${playlist[song].time}", "${playlist[song].year}"
                           );`
          }

           db.query(sql, (err, result) =>{
             if (err) throw err
             res.send('Table Created..')
           } )
        }

     })
     .catch(error => {
       console.log('Request Failed', new Error(error))
     })
  }());

  res.send('Database have been populatet')
})

//DROP DATABASE
app.get('/droptable/:name', (req, res) => {
  let sql = 'DROP DATABASE ' + req.params.name + ';'
  db.query(sql, (err, result) =>{
    if (err) throw err
    res.send(`Database with name ${req.params.name} were droped..`)
  } )
})


function objectArray(songs) {
  let tempArry = [],
      songsArray = []

  for (let song = 0; song < songs.length; song++) {
    tempArry.push(songs[song])
    if (songs[song] == '\n'){

      let music = new Song({
        id: Math.floor(song/31),
        name: tempArry[0],
        artist: tempArry[1],
        composer: tempArry[2],
        album: tempArry[3],
        genre: tempArry[9],
        size: tempArry[10],
        time: tempArry[11],
        year: tempArry[16]
      })

      songsArray.push(music)
      tempArry = []
  }

  }
   // console.log(songsArray);
   console.log("created");
  return songsArray
}
