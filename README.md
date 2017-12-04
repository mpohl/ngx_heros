## MySassyApp
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2.

## fake backend server
Run `node json-server/serve.ts` to start a dev backend server on [http://localhost:300](http://localhost:300) with 1s forced delay,
data from json-server/data.json 

## dev server
Run `ng serve -ec`

Navigate to [http://localhost:4200](http://localhost:4200/).
The app will automatically reload if you change any of the source files.

## build production (pe patient)
Run `ng build -e=prod --prod --no-sourcemap --aot --target=production`
The build artifacts will be stored in the `dist/` directory.

## bulid production (pe patient) and serve with a dev server
Run `ng serve -e=prod --prod --aot --target=production` to build and serve production

## extract translation to json
run `npm run extract` to extract translation keys to src/i18n/*.json 


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
