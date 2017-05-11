/// <reference path='../node_modules/vss-web-extension-sdk/typings/VSS.d.ts' />
/// <reference path="trafficlightscollection.ts" />
import TrafficLights = require("./TrafficLightsCollection");

function GetSettings(widgetSettings) {
    var config = JSON.parse(widgetSettings.customSettings.data);
    if (config != null) {
        if (config.buildDefinition != null) {
            return config;
        }
        return null;
    }
}

function RenderTrafficLights(WidgetHelpers, widgetSettings) {
    var numberOfBuilds = <number>widgetSettings.size.columnSpan;
    var config = GetSettings(widgetSettings);
    if (config != null) {
        var trafficLights = new TrafficLights.TrafficLightsCollection(VSS.getWebContext().project.name, config.buildDefinition, numberOfBuilds, document.getElementById("content"));
    }
    else {
        var content = document.getElementById("content");
        var noconfigtitle = document.createElement("h2");
        noconfigtitle.innerHTML = "Not configured!";
        content.appendChild(noconfigtitle);
    }
}


VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {
    WidgetHelpers.IncludeWidgetStyles();
    VSS.register("BuildTrafficLightsWidget", function () {
        return {
            load: function (widgetSettings) {
                RenderTrafficLights(WidgetHelpers, widgetSettings);
                return WidgetHelpers.WidgetStatusHelper.Success();
            },
            reload: function (widgetSettings) {
                RenderTrafficLights(WidgetHelpers, widgetSettings);
                return WidgetHelpers.WidgetStatusHelper.Success();
            }
        };
    });
    VSS.notifyLoadSucceeded();
});