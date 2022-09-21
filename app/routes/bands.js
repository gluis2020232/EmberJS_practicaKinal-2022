//..
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default class BandsRoute extends Route {
  @service catalog;

  model() {
    console.log('Estoy en la ruta bands');

    //Peticion de bands hacia el backend
    return this.catalog.fetchAll('bands');
  }
}

