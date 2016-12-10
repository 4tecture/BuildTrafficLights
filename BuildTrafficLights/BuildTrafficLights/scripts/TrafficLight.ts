/// <reference path='../node_modules/vss-web-extension-sdk/typings/TFS.d.ts' />
import Contracts = require("TFS/Build/Contracts");

export class TrafficLight {

    trafficLightElement: HTMLDivElement;
    currentBuild: Contracts.Build;
    timerToken: number;
    currentLightState: TrafficLightState;

    constructor(trafficLightElement: HTMLDivElement) {
        this.trafficLightElement = trafficLightElement;
    }

    public UpdateBuildState(build: Contracts.Build) {
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
    }

    public RenderTrafficLight(state: TrafficLightState) {
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
    }

    public StartRunningLights(onlyblinkyellow: boolean = false) {
        if (onlyblinkyellow) {
            this.timerToken = setInterval(() => {
                var newState = this.currentLightState == TrafficLightState.Yellow ? TrafficLightState.None : TrafficLightState.Yellow;
                this.RenderTrafficLight(newState);
            }, 500);
        }
        else {
            this.timerToken = setInterval(() => {
                var newState = ((<number>this.currentLightState) + 1) % 3;
                this.RenderTrafficLight(newState);
            }, 500);
        }
    }

    public StopRunningLights() {
        clearTimeout(this.timerToken);
    }

    public VerifyHtmlElements(element: HTMLDivElement) {
        if (element.childNodes.length != 3 || !(<HTMLElement>element.firstChild).classList.contains("trafficlightbulb")) {
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
    }
}

enum TrafficLightState {
    Red = 0,
    Yellow = 1,
    Green = 2,
    None = 3
}