/// <reference path="typings/ui-grid/ui-grid.d.ts" />
/// <reference path="DataService.ts" />

namespace app.controller {
  "use strict";

  interface IMyEntity {
    name: string;
    age: number;
  }

  export class MainController {

    private gridApi: uiGrid.IGridApiOf<IMyEntity>;

    tabs = [
      {title: "DATA1"},
      {title: "DATA2"}
    ];

    selectedTab: string;

    filterValue: string = "";

    gridOptions: uiGrid.IGridOptionsOf<IMyEntity> = {
      enableFiltering: false,
      onRegisterApi: (gridApi) => {
        this.gridApi = gridApi;
        this.gridApi.grid.registerRowsProcessor((renderableRows:any) => {
          var matcher = new RegExp(this.filterValue);
          renderableRows.forEach(function(row: any) {
            var match = false;
            ['name'].forEach(function(field){
              if (row.entity[field].match(matcher)){
                match = true;
              }
            });
            if (!match){
              row.visible = false;
            }
          });
          return renderableRows;
        }, 200 );
      },
      columnDefs: [
        { field: "name", displayName: "name" },
        { field: "age", displayName: "age"}
      ]
    };

    constructor(private dataService: app.service.DataService) {
      this.gridOptions.data = this.getData(1);
    }

    update(): void {
      this.gridApi.grid.refresh();
    }

    setSelectedTab(tab: string): void {
      this.selectedTab = tab;
      if (this.selectedTab === "DATA1") {
        this.gridOptions.data = this.getData(1);
      }
      else {
        this.gridOptions.data = this.getData(2);
      }
      this.update();
    }

    getData(dataNo: number): Array<any> {
      return this.dataService.getData(dataNo);
    }
  }
}
