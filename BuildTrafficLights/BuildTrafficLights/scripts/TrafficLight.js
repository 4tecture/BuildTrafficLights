define(["require", "exports", "TFS/Build/Contracts"], function (require, exports, Contracts) {
    "use strict";
    var TrafficLight = (function () {
        function TrafficLight(trafficLightElement) {
            this.trafficLightElement = trafficLightElement;
        }
        TrafficLight.prototype.UpdateBuildState = function (build) {
            if (this.currentBuild == null || this.currentBuild.status != build.status) {
                this.VerifyHtmlElements(this.trafficLightElement);
                this.StopRunningLights();
                this.trafficLightElement.querySelector(".buildnamecontainer").querySelector(".trafficlightbuildname").innerHTML = build.buildNumber;
                if (build.status == Contracts.BuildStatus.InProgress) {
                    this.StartRunningLights(false);
                }
                else if (build.status == Contracts.BuildStatus.NotStarted) {
                    this.StartRunningLights(true);
                }
                else if (build.status == Contracts.BuildStatus.Completed) {
                    if (build.result == Contracts.BuildResult.Succeeded) {
                        this.RenderTrafficLight(TrafficLightState.Green);
                    }
                    else if (build.result == Contracts.BuildResult.PartiallySucceeded) {
                        this.RenderTrafficLight(TrafficLightState.Yellow);
                    }
                    else if (build.result == Contracts.BuildResult.Failed) {
                        this.RenderTrafficLight(TrafficLightState.Red);
                    }
                }
            }
            this.currentBuild = build;
        };
        TrafficLight.prototype.RenderTrafficLight = function (state) {
            var activeLightBulb = this.trafficLightElement.querySelector(".activelightbulb");
            if (activeLightBulb != null) {
                activeLightBulb.classList.remove("activelightbulb");
            }
            switch (state) {
                case TrafficLightState.Red:
                    this.trafficLightElement.querySelector("#trafficlightbulb-red").classList.add("activelightbulb");
                    break;
                case TrafficLightState.Yellow:
                    this.trafficLightElement.querySelector("#trafficlightbulb-yellow").classList.add("activelightbulb");
                    break;
                case TrafficLightState.Green:
                    this.trafficLightElement.querySelector("#trafficlightbulb-green").classList.add("activelightbulb");
                    break;
            }
            this.currentLightState = state;
        };
        TrafficLight.prototype.StartRunningLights = function (onlyblinkyellow) {
            var _this = this;
            if (onlyblinkyellow === void 0) { onlyblinkyellow = false; }
            if (onlyblinkyellow) {
                this.timerToken = setInterval(function () {
                    var newState = _this.currentLightState == TrafficLightState.Yellow ? TrafficLightState.None : TrafficLightState.Yellow;
                    _this.RenderTrafficLight(newState);
                }, 500);
            }
            else {
                this.timerToken = setInterval(function () {
                    var newState = (_this.currentLightState + 1) % 3;
                    _this.RenderTrafficLight(newState);
                }, 500);
            }
        };
        TrafficLight.prototype.StopRunningLights = function () {
            clearTimeout(this.timerToken);
        };
        TrafficLight.prototype.VerifyHtmlElements = function (element) {
            if (element.childNodes.length != 3 || !element.firstChild.classList.contains("trafficlightbulb")) {
                while (element.hasChildNodes()) {
                    element.removeChild(element.lastChild);
                }
                var red = document.createElement("span");
                red.classList.add("trafficlightbulb");
                red.id = "trafficlightbulb-red";
                var yellow = document.createElement("span");
                yellow.classList.add("trafficlightbulb");
                yellow.id = "trafficlightbulb-yellow";
                var green = document.createElement("span");
                green.classList.add("trafficlightbulb");
                green.id = "trafficlightbulb-green";
                element.appendChild(red);
                element.appendChild(yellow);
                element.appendChild(green);
                var buildnamecontainer = document.createElement("div");
                buildnamecontainer.classList.add("buildnamecontainer");
                var buildname = document.createElement("span");
                buildname.id = "buildname";
                buildname.classList.add("trafficlightbuildname");
                buildnamecontainer.appendChild(buildname);
                element.appendChild(buildnamecontainer);
            }
        };
        return TrafficLight;
    }());
    exports.TrafficLight = TrafficLight;
    var TrafficLightState;
    (function (TrafficLightState) {
        TrafficLightState[TrafficLightState["Red"] = 0] = "Red";
        TrafficLightState[TrafficLightState["Yellow"] = 1] = "Yellow";
        TrafficLightState[TrafficLightState["Green"] = 2] = "Green";
        TrafficLightState[TrafficLightState["None"] = 3] = "None";
    })(TrafficLightState || (TrafficLightState = {}));
});
//# sourceMappingURL=TrafficLight.js.map