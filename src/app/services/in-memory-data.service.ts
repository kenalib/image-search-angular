import { InMemoryDbService } from 'angular-in-memory-web-api';

declare function require(url: string);
const default_response = require('../default_response.json');

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    // const pictures = [
    //   { itemId: "11", catId: "3", custContent: "c1", "sortExprValues": "6.0", picName: 'Mr. Nice' },
    //   { itemId: "12", catId: "3", custContent: "c1", "sortExprValues": "6.0", picName: 'Narco' },
    //   { itemId: "13", catId: "3", custContent: "c1", "sortExprValues": "6.0", picName: 'Bombasto' },
    //   { itemId: "14", catId: "3", custContent: "c1", "sortExprValues": "6.0", picName: 'Celeritas' },
    //   { itemId: "15", catId: "3", custContent: "c1", "sortExprValues": "6.0", picName: 'Magneta' },
    //   { itemId: "16", catId: "3", custContent: "c1", "sortExprValues": "6.0", picName: 'RubberMan' },
    //   { itemId: "17", catId: "3", custContent: "c1", "sortExprValues": "6.0", picName: 'Dynama' },
    //   { itemId: "18", catId: "3", custContent: "c1", "sortExprValues": "6.0", picName: 'Dr IQ' },
    //   { itemId: "19", catId: "3", custContent: "c1", "sortExprValues": "6.0", picName: 'Magma' },
    //   { itemId: "20", catId: "3", custContent: "c1", "sortExprValues": "6.0", picName: 'Tornado' }
    // ];
    const pictures = default_response;
    return {pictures};
  }
}
