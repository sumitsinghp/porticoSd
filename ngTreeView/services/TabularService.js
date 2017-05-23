(function () {
  'use strict';
  function TabularService($q, $log, $routeParams, StageHelper, LevelService, AssetService, AssetMapService) {

    function getTabularData() {
      var tabluarData = [];
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

      if (levelCountry) {
        for (var i = 0; i < levelCountry.length; i++) {
          tabluarData.push({"level": levelCountry[i].name, "mapId": "", "make": "", "model": "", "$$treeLevel": 0});
          var sites = levelSite.filter(function (site) {
            return site.parentId === levelCountry[i]._id;
          });
          if (sites) {
            for (var j = 0; j < sites.length; j++) {
              tabluarData.push({"level": sites[i].name, "mapId": "", "make": "", "model": "", "$$treeLevel": 1});
              var buildings = levelBuilding.filter(function (building) {
                return building.parentId === sites[i]._id;
              });
              if (buildings) {
                for (var i = 0; i < buildings.length; i++) {
                  tabluarData.push({
                    "level": buildings[i].name,
                    "mapId": "",
                    "make": "",
                    "model": "",
                    "$$treeLevel": 2
                  });
                  var floors = levelFloor.filter(function (floor) {
                    return floor.parentId === buildings[i]._id;
                  });
                  if (floors) {

                    // floors.forEach(forEachFloorCb);
                    for (var i = 0; i < floors.length; i++) {
                      tabluarData.push({
                        "level": floors[i].name,
                        "mapId": "",
                        "make": "",
                        "model": "",
                        "$$treeLevel": 3
                      });
                      var floorAssets = AssetMapService.getAssetMaps(floors[i]._id);
                      if (floorAssets) {
                        for (var j = 0; j < floorAssets.length; j++) {
                          tabluarData.push({
                            "level": "",
                            "mapId": floorAssets[j].properties.mapID,
                            "make": floorAssets[j].properties.make,
                            "model": floorAssets[j].properties.model,
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

      return tabluarData;
    }

    return {
      getTabularData: getTabularData
    };
  }

  var app = angular.module('app'),
      requires = [
        '$q',
        '$log',
        '$routeParams',
        'StageHelperService',
        'ngCartosCore.services.LevelService',
        'ngCartosCore.services.AssetService',
        'ngCartosCore.services.AssetMapService',
        TabularService
      ];
  app.factory('ngTreeView.services.TabularService', requires);
}());