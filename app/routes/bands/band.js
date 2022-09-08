import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default class BandsBandRoute extends Route {

  @service catalog;

  model(params) {
    //let bands = this.modelFor('bands');
    //return bands.find(band => band.id === params.id);
    return this.catalog.find('band', band => band.id === params.id);
  }

}