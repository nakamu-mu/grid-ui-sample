var app;
(function (app) {
    var service;
    (function (service) {
        "use strict";
        var DataService = (function () {
            function DataService() {
                this.data1 = [
                    { "name": "taro", "age": 10 },
                    { "name": "jiro", "age": 15 }
                ];
                this.data2 = [
                    { "name": "hanako", "age": 8 },
                    { "name": "pinoko", "age": 18 },
                    { "name": "kinoko", "age": 72 }
                ];
            }
            DataService.prototype.getData = function (dataNo) {
                if (dataNo === void 0) { dataNo = 1; }
                if (dataNo == 1) {
                    return this.data1;
                }
                else {
                    return this.data2;
                }
            };
            return DataService;
        })();
        service.DataService = DataService;
    })(service = app.service || (app.service = {}));
})(app || (app = {}));
