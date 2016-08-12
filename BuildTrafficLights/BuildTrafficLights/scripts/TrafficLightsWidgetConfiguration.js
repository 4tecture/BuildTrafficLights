define(["require", "exports", "TFS/Build/RestClient"], function (require, exports, BuildRestClient) {
    "use strict";
    var TrafficLightsWidgetConfiguration = (function () {
        function TrafficLightsWidgetConfiguration(WidgetHelpers) {
            this.WidgetHelpers = WidgetHelpers;
            this.widgetConfigurationContext = null;
            this.CurrentProject = VSS.getWebContext().project.name;
            this.selectBuildDefinition = document.getElementById("selectBuildDefinition");
        }
        TrafficLightsWidgetConfiguration.prototype.load = function (widgetSettings, widgetConfigurationContext) {
            var _this = this;
            this.widgetConfigurationContext = widgetConfigurationContext;
            this.initializeOptions(widgetSettings);
            this.selectBuildDefinition.addEventListener("change", function () {
                _this.widgetConfigurationContext.notify(_this.WidgetHelpers.WidgetEvent.ConfigurationChange, _this.WidgetHelpers.WidgetEvent.Args(_this.getCustomSettings()));
            });
            return this.WidgetHelpers.WidgetStatusHelper.Success();
        };
        TrafficLightsWidgetConfiguration.prototype.initializeOptions = function (widgetSettings) {
            var _this = this;
            var client = BuildRestClient.getClient();
            var definitions = client.getDefinitions(this.CurrentProject).then(function (q) {
                for (var i = 0; i < q.length; i++) {
                    var b1 = document.createElement("option");
                    b1.value = q[i].id.toString();
                    b1.text = q[i].name;
                    _this.selectBuildDefinition.add(b1);
                }
            });
            var config = JSON.parse(widgetSettings.customSettings.data);
            if (config != null) {
                if (config.buildDefinition != null) {
                    this.selectBuildDefinition.value = config.buildDefinition;
                }
            }
        };
        TrafficLightsWidgetConfiguration.prototype.getCustomSettings = function () {
            return {
                data: JSON.stringify({
                    buildDefinition: this.selectBuildDefinition.value
                })
            };
        };
        TrafficLightsWidgetConfiguration.prototype.onSave = function () {
            var customSettings = this.getCustomSettings();
            return this.WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);
        };
        return TrafficLightsWidgetConfiguration;
    }());
    exports.TrafficLightsWidgetConfiguration = TrafficLightsWidgetConfiguration;
    VSS.require(["TFS/Dashboards/WidgetHelpers"], function (WidgetHelpers) {
        WidgetHelpers.IncludeWidgetConfigurationStyles();
        VSS.register("BuildTrafficLightsWidget.Configuration", function () {
            var configuration = new TrafficLightsWidgetConfiguration(WidgetHelpers);
            return configuration;
        });
        VSS.notifyLoadSucceeded();
    });
});
//# sourceMappingURL=TrafficLightsWidgetConfiguration.js.map