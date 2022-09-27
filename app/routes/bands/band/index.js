import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BandsBandIndexRoute extends Route {

  @service router;

  //Redirección, si la banda tiene una descripción o no.
  redirect(band) {
    if (band.description) {
      this.router.transitionTo('bands.band.details');
    } else {
      this.router.transitionTo('bands.band.songs');
    }
  }
}
