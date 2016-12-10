define(["require", "exports", "TFS/Build/RestClient", "scripts/TrafficLight"], function (require, exports, BuildRestClient, TrafficLight) {
    "use strict";
    var TrafficLightsCollection = (function () {
        function TrafficLightsCollection(projectname, builddefinition, numberofbuilds, element) {
            var _this = this;
            this.projectname = projectname;
            this.buildDefinitionId = builddefinition;
            this.numberOfBuilds = numberofbuilds;
            this.trafficLightsElement = element;
            this.updateBuildState();
            this.timerToken = setInterval(function () {
                _this.updateBuildState();
            }, 5000);
        }
        TrafficLightsCollection.prototype.updateBuildState = function () {
            var _this = this;
            var buildClient = BuildRestClient.getClient();
            buildClient.getBuilds(this.projectname, [this.buildDefinitionId], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.numberOfBuilds).then(function (buildResults) {
                _this.builds = buildResults;
                _this.renderLights();
                buildClient.getDefinition(_this.buildDefinitionId, _this.projectname).then(function (buildDefinitionResult) {
                    _this.buildDefinitionName = buildDefinitionResult.name;
                    document.getElementById("buildDefinitionTitle").innerHTML = _this.buildDefinitionName;
                });
            }, function (err) { _this.renderLights(); });
        };
        TrafficLightsCollection.prototype.renderLights = function () {
            if (this.builds != null && this.builds.length > 0) {
                if (this.trafficLights == null || this.trafficLights.length != this.builds.length) {
                    while (this.trafficLightsElement.hasChildNodes()) {
                        this.trafficLightsElement.removeChild(this.trafficLightsElement.lastChild);
                    }
                    this.trafficLights = [];
                    for (var i = 0; i < this.builds.length; i++) {
                        var tlDiv = document.createElement("div");
                        tlDiv.classList.add("trafficlight");
                        this.trafficLightsElement.appendChild(tlDiv);
                        this.trafficLights[i] = new TrafficLight.TrafficLight(tlDiv);
                        this.trafficLights[i].UpdateBuildState(this.builds[i]);
                    }
                }
                else {
                    for (var i = 0; i < this.builds.length; i++) {
                        this.trafficLights[i].UpdateBuildState(this.builds[i]);
                    }
                }
            }
            else {
                this.trafficLights = null;
                var paragraph = document.createElement("p");
                paragraph.innerHTML = "No builds available";
                while (this.trafficLightsElement.hasChildNodes()) {
                    this.trafficLightsElement.removeChild(this.trafficLightsElement.lastChild);
                }
                this.trafficLightsElement.appendChild(paragraph);
            }
        };
        return TrafficLightsCollection;
    }());
    exports.TrafficLightsCollection = TrafficLightsCollection;
});
//# sourceMappingURL=TrafficLightsCollection.js.map