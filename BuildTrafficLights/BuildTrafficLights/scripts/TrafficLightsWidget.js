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
            var trafficLights = new TrafficLights.TrafficLights(VSS.getWebContext().project.name, 2, 5, document.getElementById("content")); // todo
            trafficLights.renderLights();
            return WidgetHelpers.WidgetStatusHelper.Success();
        }
        else {
            return WidgetHelpers.WidgetStatusHelper.Failure("The configuration is missing!");
        }
    }
    VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {
        VSS.register("BuildTrafficLightsWidget", function () {
            return {
                load: function (widgetSettings) {
                    RenderTrafficLights(WidgetHelpers, widgetSettings);
                },
                reload: function (widgetSettings) {
                    RenderTrafficLights(WidgetHelpers, widgetSettings);
                }
            };
        });
        VSS.notifyLoadSucceeded();
    });
});
//# sourceMappingURL=TrafficLightsWidget.js.map