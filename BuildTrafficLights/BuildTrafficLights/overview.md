#Build Traffic Lights

This extension contains a widget which visualizes the current build state of a build definition as a traffic light.

###Features

- The build state is represented as a traffic light.
- Each traffic light needs a 1x2 widget tile. If the widget is large enough, the last n build states are also shown.
- If a build is queued but not started, the yellow light is blinking.
- If a build is running, all lights are blinking. 