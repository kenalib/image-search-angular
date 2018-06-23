# ImageSearchAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

* following commands are used to create this app.

```
ng generate component pictures
ng generate service image-search
ng generate service message
ng generate component image-search
ng generate component messages
npm install angular-in-memory-web-api --save
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## VSCode Tips

* create `launch.json` for Chrome debugger extension setup
* c.f. https://code.visualstudio.com/docs/nodejs/angular-tutorial
* Some useful `settings.json`

```
{
    "workbench.colorTheme": "Default Light+",
    "workbench.tree.horizontalScrolling": true,
    "window.title": "${activeEditorLong}${separator}${rootName}",
    "telemetry.enableTelemetry": false,
    "files.trimTrailingWhitespace": true,
    "[typescript]": {
        "editor.tabSize": 2
    },
    "[html]": {
        "editor.tabSize": 2
    },
    "[css]": {
        "editor.tabSize": 2
    }
}
```
