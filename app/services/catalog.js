import Service from '@ember/service';
import Band from 'rarwe/models/band';
import Song from 'rarwe/models/song';
import { tracked } from 'tracked-built-ins';

import { isArray } from '@ember/array';

//Obtener datos desde el backend
function extractRelationships(object) {
	let relationships = {};
	for (let relationshipName in object) {
		relationships[relationshipName] =
		object[relationshipName].links.related;
	}
	return relationships;
}
//Obtener datos desde el backend


export default class CatalogService extends Service {
	storage = {};

	constructor() {
	  super(...arguments);
	  this.storage.bands = tracked([]);
	  this.storage.songs = tracked([]);
	}


	//Obtener datos desde el backend
	//--Extraer las relaciones para cada banda
	async fetchAll(type) {
	  if (type === 'bands') {
	  	let response = await fetch('/bands');
	  	let json = await response.json();

	  	this.loadAll(json);

	  return this.bands;
	}
	  if (type === 'songs') {
	  	let response = await fetch('/songs');
	  	let json = await response.json();

	  	this.loadAll(json);

	  return this.bands;
	  }

	}


	/*función separada que cree nuevos registros a partir
	 de datos json y los agregue al catálogo*/
	loadAll(json) {
	  let records = [];
	  for (let item of json.data) {
	  	records.push(this._loadResource(item));
	  }
	  return records;
	}


	//Creacion new metodo instacia modelo
	load(response) {
	  return this._loadResource(response.data);
	}
	//Creacion new metodo instacia modelo


//Detalle creacion nuevo registro de modelo y lo agrega al catalago
	_loadResource(data) {
	  let record;
	  let { id, type, attributes, relationships } = data;
	  if (type === 'bands') {
	  	let rels = extractRelationships(relationships);
	  	record = new Band({ id, ...attributes }, rels);
	  	this.add('band', record);
	  }
	  if (type === 'songs') {
	  	let rels = extractRelationships(relationships);
	  	record = new Song({ id, ...attributes }, rels);
	  	this.add('song', record);
	  }
	  return record;
	}


	//Obtener relaciones //Buscar canciones relacionadas con bandas
	//bands = record and relationship = songs "route/songs"

	async fetchRelated(record, relationship) {
	  let url = record.relationships[relationship];
	  let response = await fetch(url);
	  let json = await response.json();
	  if (isArray(json.data)) {
	  	record[relationship] = this.loadAll(json);
	  } else {
	  	record[relationship] = this.load(json);
	  }
	  return record[relationship];
	}
	//Obtener relaciones


	//Creacion new metodo instacia modelo
	async create(type, attributes, relationships={}) {
	  let payload = {
	  	data: {
	  	  type: type === 'band' ? 'bands' : 'songs',
	  	  attributes,
	  	  relationships
	  	}
	  };
	  let response = await fetch(type === 'band' ? '/bands' : '/songs',
	  	{
	  	  method: 'POST',
	  	  headers: {
	  	  	'Content-Type': 'application/vnd.api+json'
	  	  },
	  	  body: JSON.stringify(payload)
	  	});
	  let json = await response.json();
	  return this.load(json);
	}
	//Creacion new metodo instacia modelo


	//Actualización de instancias de modelos existentes
	async update(type, record, attributes) {
	  let payload = {
	  	data: {
	  	  id: record.id,
	  	  type: type === 'band' ? 'bands' : 'songs',
	  	  attributes
	  	}
	  };
	  let url = type === 'band' ? `/bands/${record.id}` :
	  `/songs/${record.id}`;
	  await fetch(url, {
	  	method: 'PATCH',
	  	headers: {
	  	  'Content-Type': 'application/vnd.api+json'
	  	},
	  	body: JSON.stringify(payload)
	  });
	}
	//Actualización de instancias de modelos existentes


	add(type, record) {      //type = band y record = record que hace referencia a la ruta bands linea 18
	  let collection = type === 'band' ? this.storage.bands : this.storage.songs;    //Condicion en Operador Ternario
	//  collection.push(record);

	  //Agregar un mapa de identidad
	  let recordIds = collection.map(record => record.id);
	  if (!recordIds.includes(record.id)) {
	  	collection.push(record);
	  }
	  //Agregar un mapa de identidad
	}

	get bands() {
		return this.storage.bands;
	}

	get songs() {
		return this.storage.songs;

	}

	//Encontrar una banda con un id en especifico
	find(type, filterFn) {
	  let collection = type === 'band' ? this.bands : this.songs;
	  console.log(collection);
	  return collection.find(filterFn);
    }

}


