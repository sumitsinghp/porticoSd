(function () {
  'use strict';
  // function TreeViewController($scope, $routeParams, StageHelper, LevelService, AssetMapService, TabularService) {
  function TreeViewController($scope, $routeParams, StageHelper, LevelService, AssetMapService) {
    alert('version 1.2');
    var sublevels = LevelService.getSubLevels($routeParams.id)
    console.log('Sub Levels: ', sublevels);
    var getLevel = LevelService.getLevel($routeParams.id)
    console.log('Get CanvasLevel: ', $scope.canvasAssets);

    var levelCountry = sublevels.filter(function (level) {
      return level.type === "COUNTRY";
    })

    console.log('Country ', levelCountry);
    var levelSite = sublevels.filter(function (level) {
      return level.type === "SITE";
    });

    console.log('levelSite ', levelSite);

    var levelBuilding = sublevels.filter(function (level) {
      return level.type === "BUILDING";
    });

    console.log('levelBuilding ', levelBuilding);
    var levelFloor = sublevels.filter(function (level) {
      return level.type === "FLOOR";
    });

    console.log('levelFloor ', levelFloor);
    var tabluarData = [];
    if (levelCountry) {
      for (var i = 0; i < levelCountry.length; i++) {
        console.log('hi', levelCountry.length);
        tabluarData.push({"level": levelCountry[i].name, "mapId": "", "make": "", "model": "", "$$treeLevel": 0});
        var sites = levelSite.filter(function (site) {
          return site.parentId === levelCountry[i]._id;
        });
        if (sites) {
          for (var j = 0; j < sites.length; j++) {
            tabluarData.push({"level": sites[j].name, "mapId": "", "make": "", "model": "", "$$treeLevel": 1});
            var buildings = levelBuilding.filter(function (building) {
              return building.parentId === sites[j]._id;
            });
            if (buildings) {
              for (var k = 0; k < buildings.length; k++) {
                tabluarData.push({"level": buildings[k].name, "mapId": "", "make": "", "model": "", "$$treeLevel": 2});
                var floors = levelFloor.filter(function (floor) {
                  return floor.parentId === buildings[k]._id;
                });
                if (floors) {

                  // floors.forEach(forEachFloorCb);
                  for (var l = 0; l < floors.length; l++) {
                    tabluarData.push({"level": floors[l].name, "mapId": "", "make": "", "model": "", "$$treeLevel": 3});
                    var floorAssets = AssetMapService.getAssetMaps(floors[l]._id);
                    if (floorAssets) {
                      for (var m = 0; m < floorAssets.length; m++) {
                        tabluarData.push({
                          "level": "",
                          "mapId": floorAssets[m].properties.mapID,
                          "make": floorAssets[m].properties.make,
                          "model": floorAssets[m].properties.model,
                          "$$treeLevel": 4
                        })
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
console.log('TabularView: ',tabluarData);
    $scope.TreeViewData = tabluarData;
    //$scope.TreeViewData = TabularService.getTabularData();

    var rowtpl = '';
    rowtpl += '<div class=\"{{grid.appScope.rowLevel(row)}}\">';
    rowtpl += '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name"';
    rowtpl += 'class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell>';
    rowtpl += '</div>';
    rowtpl += '</div>';

    var columnDefs = [
      {name: 'level', displayName: 'Level'},
      {name: 'mapId', displayName: 'Map ID'},
      {name: 'make', displayName: 'Make'},
      {name: 'model', displayName: 'Model'}
    ]

    $scope.gridOptions2 = {
      columnDefs: columnDefs,
      data: 'TreeViewData',
      rowTemplate: rowtpl,
    };

    $scope.rowLevel = function (row) {
      var cls = '';
      if (row.treeLevel != void 0) {
        cls = 'rowLevel-' + row.treeLevel;
      }
      return cls;
    }
  }

  var app = angular.module('app'),
      requires = [
        '$scope',
        '$routeParams',
        'StageHelperService',
        'ngCartosCore.services.LevelService',
        'ngCartosCore.services.AssetMapService',
        // 'ngTreeView.services.TabularService',
        TreeViewController
      ];
  app.controller('TreeViewController', requires);
}());