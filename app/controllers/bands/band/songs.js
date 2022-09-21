//...
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BandsBandSongsController extends Controller {
  @tracked showAddSong = true;
  @tracked title = '';
  @service catalog;


  //Funcion Actualizacion de canciones
  @action
  async updateRating(song, rating) {
    song.rating = rating;

    this.catalog.update('song', song, { rating });
  }
  //Funcion Actualizacion de canciones


  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  //Trasladamos la creacion de canciones al back-end
  @action
    async saveSong() {

    //usar catalog.create para crear una canción
    let song = await this.catalog.create(
      'song',
      { title: this.title },
      { band: { data: { id: this.model.id, type: 'bands' } } }
      );
    //usar catalog.create para crear una canción

    this.model.songs = [...this.model.songs, song];
    this.title = '';
    this.showAddSong = true;
  }

  @action
  cancelar() {
    this.title = '';
    this.showAddSong = true;
  }
}






