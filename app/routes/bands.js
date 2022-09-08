
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

import Band from 'rarwe/models/band';
import Song from 'rarwe/models/song';

//Modelo
export default class BandsRoute extends Route {

    @service catalog;

    model() {
        let blackDog = new Song({    //Objetos
            title: 'Black Dog',
        //    band: 'Led Zeppelin',
            rating: 3
        });

        let yellowLedbetter = new Song({
            title: 'Yellow Ledbetter',
        //    band: 'Pearl Jam',
            rating: 4
        });

        let pretender = new Song({
            title: 'The Pretender',
        //    band: 'Foo Fighters',
            rating: 2
        });

        let daughter = new Song({
            title: 'Daughter',
        //    band: 'Pearl Jam',
            rating: 5
        });


        let ledZeppelin = new Band({
            id: 'led-zeppelin',
            name: 'Led Zeppelin',
            songs: [blackDog]
        });

        let pearlJam = new Band({
            id: 'pearl-jam',
            name: 'Pearl Jam',
            songs: [yellowLedbetter, daughter]
        });

        let fooFighters = new Band({
            id: 'foo-fighters',
            name: 'Foo Fighters',
            songs: [pretender]
        });


        //Almacenar canciones en el catalogo
        blackDog.band = ledZeppelin;
        yellowLedbetter.band = pearlJam;
        daughter.band = pearlJam;
        pretender.band = fooFighters;

        this.catalog.add('song', blackDog);
        this.catalog.add('song', yellowLedbetter);
        this.catalog.add('song', daughter);
        this.catalog.add('song', pretender); //


        this.catalog.add('band', ledZeppelin);
        this.catalog.add('band', pearlJam);
        this.catalog.add('band', fooFighters);

        return this.catalog.bands;

    }
}

