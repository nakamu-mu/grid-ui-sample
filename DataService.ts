namespace app.service {
  "use strict";

  export class DataService {

    private data1: Array<any> = [
      {"name": "taro", "age": 10},
      {"name": "jiro", "age": 15}
    ];

    private data2: Array<any> = [
      {"name": "hanako", "age": 8},
      {"name": "pinoko", "age": 18},
      {"name": "kinoko", "age": 72}
    ];

    constructor() {

    }

    getData(dataNo: number = 1) {
      if (dataNo == 1) {
        return this.data1;
      }
      else {
        return this.data2;
      }
    }
  }
}
