/// <reference path='../node_modules/vss-web-extension-sdk/typings/VSS.d.ts' />
import Contracts = require("TFS/Build/Contracts");
import BuildRestClient = require("TFS/Build/RestClient");

export class TrafficLights {

    projectname: string;
    buildDefinition: number;
    numberOfBuilds: number;
    trafficLightsElement: HTMLElement;
    builds: Contracts.Build[];

    constructor(projectname: string, builddefinition: number, numberofbuilds: number, element: HTMLElement) {
        this.projectname = projectname
        this.buildDefinition = builddefinition;
        this.numberOfBuilds = numberofbuilds;
        this.trafficLightsElement = element;
    }

    public updateBuildState() {
        var buildClient = BuildRestClient.getClient();
        buildClient.getBuilds(this.projectname, [this.buildDefinition], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.numberOfBuilds).then((buildResults: Contracts.Build[]) => {
            this.builds = buildResults;
        });
    }

    public renderLights() {
        this.updateBuildState();

        for (var i = 0; i < this.builds.length; i++) {
            var tlDiv = document.createElement("div");
            tlDiv.innerHTML = "<h2>" + this.builds[i].buildNumber + "</h2><span>Status: " + this.builds[i].status.toString() + "</span > ";
            this.trafficLightsElement.appendChild(tlDiv);
        }
    }
}
