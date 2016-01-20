"use strict"

/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="DataService.ts" />
/// <reference path="MainController.ts" />

angular.module("app", ["ui.grid", "ui.bootstrap"])

.service("DataService", app.service.DataService)
.controller("MainController", ["DataService", app.controller.MainController]);
