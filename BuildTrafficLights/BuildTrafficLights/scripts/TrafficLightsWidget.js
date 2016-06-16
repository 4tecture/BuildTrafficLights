define(["require", "exports", "scripts/TrafficLights"], function (require, exports, TrafficLights) {
    "use strict";
    function GetSettings(widgetSettings) {
        var config = JSON.parse(widgetSettings.customSettings.data);
        if (config != null) {
            if (config.buildDefinition != null || config.buildDefinition != null) {
                return config;
            }
            return null;
        }
    }
    function RenderTrafficLights(WidgetHelpers, widgetSettings) {
        var config = GetSettings(widgetSettings);
        if (config != null) {
            var trafficLights = new TrafficLights.TrafficLights(VSS.getWebContext().project.name, config.buildDefinition, config.numberOfLastBuilds, document.getElementById("content")); // todo
            trafficLights.updateBuildState();
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
});
//# sourceMappingURL=TrafficLightsWidget.js.map