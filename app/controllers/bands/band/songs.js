//...
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BandsBandSongsController extends Controller {
  @tracked showAddSong = true;
  @tracked title = '';
  @tracked sortBy = 'title';
  @tracked searchTerm = '';
  @service catalog;


  //Buscador de canciones
  get matchingSongs() {
    let searchTerm = this.searchTerm.toLowerCase();
    return this.model.songs.filter(song => {
      return song.title.toLowerCase().includes(searchTerm);
    })
  }

  @action
  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
  }

  //Lista ordenada de canciones
  get sortedSongs() {
    let sortBy = this.sortBy
    let isDescendingSort = false;

    if (sortBy.charAt(0) === '-') {
      sortBy = this.sortBy.slice(1);
      isDescendingSort = true;
    }

    return this.matchingSongs.sort((song1, song2) => {

      if (song1[sortBy] < song2[sortBy]) {
        return isDescendingSort ? 1 : -1;
      }
      if (song1[sortBy] > song2[sortBy]) {
        return isDescendingSort ? -1 : 1;
      }
      return 0;
    })
  }


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

    //usar this.catalog.create para crear una canción
    let song = await this.catalog.create(
      'song',                                //reference type catalogo
      { title: this.title },                                    //reference attributes catalogo
      { band: { data: { id: this.model.id, type: 'bands' } } }  //reference relationships={} catalogo
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






