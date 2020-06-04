# Chatapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

##how i achieved it
1.first make sure u have list of users stored in userlist array whenever user logged in successfully.
You can achieve it by storing userlist details in local storage
2. U have user list , display it whenever a new user logged in. 
3.use ngfor to iterate through list of users and get current user when clicked on user name 



sending message:
on click of messageText button, setCurrentUserActive(store recieverID and name in cookie)->sendMessageUsingKeyPress->SendMessage