import BuildRestClient = require("TFS/Build/RestClient");
import Contracts = require("TFS/Build/Contracts");

export class TrafficLightsWidgetConfiguration {
    widgetConfigurationContext = null;
    public CurrentProject = VSS.getWebContext().project.name;

    selectBuildDefinition: HTMLSelectElement = <HTMLSelectElement>document.getElementById("selectBuildDefinition");

    constructor(public WidgetHelpers) {

    }

    public load(widgetSettings, widgetConfigurationContext) {
        this.widgetConfigurationContext = widgetConfigurationContext;

        this.initializeOptions(widgetSettings);

        this.selectBuildDefinition.addEventListener(
            "change",
            () => {
                this.widgetConfigurationContext.notify(this.WidgetHelpers.WidgetEvent.ConfigurationChange,
                    this.WidgetHelpers.WidgetEvent.Args(this.getCustomSettings()));
            });

        return this.WidgetHelpers.WidgetStatusHelper.Success();
    }

    public initializeOptions(widgetSettings) {
        var client = BuildRestClient.getClient()
        var definitions = client.getDefinitions(this.CurrentProject).then((q: Contracts.DefinitionReference[]) => {
            for (var i = 0; i < q.length; i++) {
                var b1 = document.createElement("option");
                b1.value = q[i].id.toString();
                b1.text = q[i].name;
                this.selectBuildDefinition.add(b1);
            }
        });

        var config = JSON.parse(widgetSettings.customSettings.data);
        if (config != null) {
            if (config.buildDefinition != null) {
                this.selectBuildDefinition.value = config.buildDefinition;
            }
        }
    }

    public getCustomSettings() {
        return {
            data: JSON.stringify({
                buildDefinition: this.selectBuildDefinition.value
            })
        };
    }

    public onSave() {
        var customSettings = this.getCustomSettings();
        return this.WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);
    }
}


VSS.require(["TFS/Dashboards/WidgetHelpers"], (WidgetHelpers) => {
    WidgetHelpers.IncludeWidgetConfigurationStyles();
    VSS.register("BuildTrafficLightsWidget.Configuration", () => {
        var configuration = new TrafficLightsWidgetConfiguration(WidgetHelpers);
        return configuration;
    })

    VSS.notifyLoadSucceeded();
});