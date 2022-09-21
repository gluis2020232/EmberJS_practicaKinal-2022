import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BandsBandRoute extends Route {

  @service catalog;
  @service router;

  model(params) {
    console.log('Estoy en la ruta band');
    return this.catalog.find('band', band => band.id === params.id);
  }

  //Redirección, si la banda tiene una descripción o no.

  redirect(band) {
    if (band.description) {
      this.router.transitionTo('bands.band.details');
    } else {
      this.router.transitionTo('bands.band.songs');
    }
  }

}

