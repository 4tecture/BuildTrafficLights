define(["require", "exports", "TFS/Build/RestClient"], function (require, exports, BuildRestClient) {
    "use strict";
    var TrafficLights = (function () {
        function TrafficLights(projectname, builddefinition, numberofbuilds, element) {
            this.projectname = projectname;
            this.buildDefinitionId = builddefinition;
            this.numberOfBuilds = numberofbuilds;
            this.trafficLightsElement = element;
        }
        TrafficLights.prototype.updateBuildState = function () {
            var _this = this;
            var buildClient = BuildRestClient.getClient();
            buildClient.getBuilds(this.projectname, [this.buildDefinitionId], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.numberOfBuilds).then(function (buildResults) {
                _this.builds = buildResults;
                buildClient.getDefinition(_this.buildDefinitionId, _this.projectname).then(function (buildDefinitionResult) {
                    _this.buildDefinitionName = buildDefinitionResult.name;
                    _this.renderLights();
                }, function (err) { _this.renderLights(); });
            });
        };
        TrafficLights.prototype.renderLights = function () {
            document.getElementById("buildDefinitionTitle").innerHTML = this.buildDefinitionName;
            if (this.builds != null && this.builds.length > 0) {
                if (this.trafficLightsElement.hasChildNodes) {
                    while (this.trafficLightsElement.hasChildNodes()) {
                        this.trafficLightsElement.removeChild(this.trafficLightsElement.lastChild);
                    }
                }
                for (var i = 0; i < this.builds.length; i++) {
                    var tlDiv = document.createElement("div");
                    tlDiv.innerHTML = "<span>Status: " + this.builds[i].status.toString() + "</span>";
                    this.trafficLightsElement.appendChild(tlDiv);
                }
            }
            else {
                var paragraph = document.createElement("p");
                paragraph.innerHTML = "No builds available";
                while (this.trafficLightsElement.hasChildNodes()) {
                    this.trafficLightsElement.removeChild(this.trafficLightsElement.lastChild);
                }
                this.trafficLightsElement.appendChild(paragraph);
            }
        };
        return TrafficLights;
    }());
    exports.TrafficLights = TrafficLights;
});
//# sourceMappingURL=TrafficLights.js.map