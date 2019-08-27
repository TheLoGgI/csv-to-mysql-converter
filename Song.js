

  module.exports = class Song {
    constructor(song) {
      this.id = song.id
      this.name = song.name
      this.artist = song.artist
      this.composer = song.composer
      this.album = song.album
      this.genre = song.genre
      this.size = song.size
      this.time = song.time
      this.year = song.year
    }
  }
