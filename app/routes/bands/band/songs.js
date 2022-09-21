import Route from "@ember/routing/route";
import { inject as service } from '@ember/service';

export default class BandsBandSongsRoute extends Route {

    @service catalog;                      //Actualizar el enlace del modelo de la ruta

    async model() {
      console.log('Estoy en la ruta songs');
      let band = this.modelFor('bands.band');
      await this.catalog.fetchRelated(band, 'songs');

      return band;
    }

    //------------------------------

    resetController(controller) {
      controller.title = '';
      controller.showAddSong = true;
    }
}


