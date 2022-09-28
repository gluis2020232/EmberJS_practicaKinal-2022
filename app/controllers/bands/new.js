import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class BandsNewController extends Controller {

    @service catalog; //Srive interactuar con el backend
    @service router; //Sirve para interactuar con la nevghacion del usuario
    @tracked name;

    //Saliendo de una ruta  //Advertimos al usuario que pueder perder sus cambios
    constructor() {
      super(...arguments);

      this.router.on('routeWillChange', transition => {
        console.log('La ruta va a cambiar');

        if (transition.isAborted) {       //verificar si la transición es abortada y luego rescatar
          return;
        }

        if(this.confirmedLeave) {       //Confirma sol una vez
          return;
        }

        if (transition.from.name === 'bands.new') {
          console.log('Saliendo de ruta bands.new');
          if (this.name) {
            let leave = window.confirm('Usted tiene cambios no guardados. ¿Está seguro que quieres salir de la pagina?');

            if (leave) {
              this.confirmedLeave = true;

            } else {
              transition.abort();
            }
          }
        }
      });
    }
    //Saliendo de una ruta

    @action
    updateName(event) {
      this.name = event.target.value;
    }

    @action
      async saveBand() {      //Creacion de banda
      let band = await this.catalog.create('band', { name: this.name });   //El catalago lo usamos para ir a traer todas las bandas

      this.confirmedLeave = true; //modal

      this.router.transitionTo('bands.band.songs', band.id);   //Le digo que me redirecciona a bands.band.songs
    }

}


