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
/// <reference path="typings/ui-grid/ui-grid.d.ts" />
/// <reference path="DataService.ts" />
var app;
(function (app) {
    var controller;
    (function (controller) {
        "use strict";
        var MainController = (function () {
            function MainController(dataService) {
                var _this = this;
                this.dataService = dataService;
                this.tabs = [
                    { title: "DATA1" },
                    { title: "DATA2" }
                ];
                this.filterValue = "";
                this.gridOptions = {
                    enableFiltering: false,
                    onRegisterApi: function (gridApi) {
                        _this.gridApi = gridApi;
                        _this.gridApi.grid.registerRowsProcessor(function (renderableRows) {
                            var matcher = new RegExp(_this.filterValue);
                            renderableRows.forEach(function (row) {
                                var match = false;
                                ['name'].forEach(function (field) {
                                    if (row.entity[field].match(matcher)) {
                                        match = true;
                                    }
                                });
                                if (!match) {
                                    row.visible = false;
                                }
                            });
                            return renderableRows;
                        }, 200);
                    },
                    columnDefs: [
                        { field: "name", displayName: "name" },
                        { field: "age", displayName: "age" }
                    ]
                };
                this.gridOptions.data = this.getData(1);
            }
            MainController.prototype.update = function () {
                this.gridApi.grid.refresh();
            };
            MainController.prototype.setSelectedTab = function (tab) {
                this.selectedTab = tab;
                if (this.selectedTab === "DATA1") {
                    this.gridOptions.data = this.getData(1);
                }
                else {
                    this.gridOptions.data = this.getData(2);
                }
                this.update();
            };
            MainController.prototype.getData = function (dataNo) {
                return this.dataService.getData(dataNo);
            };
            return MainController;
        })();
        controller.MainController = MainController;
    })(controller = app.controller || (app.controller = {}));
})(app || (app = {}));
"use strict";
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="DataService.ts" />
/// <reference path="MainController.ts" />
angular.module("app", ["ui.grid", "ui.bootstrap"])
    .service("DataService", app.service.DataService)
    .controller("MainController", ["DataService", app.controller.MainController]);
