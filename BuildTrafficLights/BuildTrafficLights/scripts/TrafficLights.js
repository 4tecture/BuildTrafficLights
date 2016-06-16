define(["require", "exports", "TFS/Build/RestClient"], function (require, exports, BuildRestClient) {
    "use strict";
    var TrafficLights = (function () {
        function TrafficLights(projectname, builddefinition, numberofbuilds, element) {
            this.projectname = projectname;
            this.buildDefinition = builddefinition;
            this.numberOfBuilds = numberofbuilds;
            this.trafficLightsElement = element;
        }
        TrafficLights.prototype.updateBuildState = function () {
            var _this = this;
            var buildClient = BuildRestClient.getClient();
            buildClient.getBuilds(this.projectname, [this.buildDefinition], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.numberOfBuilds).then(function (buildResults) {
                _this.builds = buildResults;
            });
        };
        TrafficLights.prototype.renderLights = function () {
            this.updateBuildState();
            for (var i = 0; i < this.builds.length; i++) {
                var tlDiv = document.createElement("div");
                tlDiv.innerHTML = "<h2>" + this.builds[i].buildNumber + "</h2><span>Status: " + this.builds[i].status.toString() + "</span > ";
                this.trafficLightsElement.appendChild(tlDiv);
            }
        };
        return TrafficLights;
    }());
    exports.TrafficLights = TrafficLights;
});
//# sourceMappingURL=TrafficLights.js.map