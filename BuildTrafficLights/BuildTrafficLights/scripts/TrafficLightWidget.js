"use strict";
var ScrumReport = require("scripts/TrafficLight");
VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {
    VSS.register("BuildTrafficLightsWidget", function () {
        return {
            load: function (widgetSettings) {
                var scrumReport = new ScrumReport.ScrumReport();
                scrumReport.LoadWidget();
                return WidgetHelpers.WidgetStatusHelper.Success();
            },
            reload: function (widgetSettings) {
                var scrumReport = new ScrumReport.ScrumReport();
                scrumReport.LoadWidget();
                return WidgetHelpers.WidgetStatusHelper.Success();
            }
        };
    });
    VSS.notifyLoadSucceeded();
});
//# sourceMappingURL=TrafficLightWidget.js.map