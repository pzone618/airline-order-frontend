# AirlineOrderFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.2.
It is an airline order backend administration system built with Angular (Standalone Components)
It provides user login with JWT authentication, order management, user management, and a dashboard for key metrics display. The frontend leverages the Ng-Zorro UI component library for a rich user experience.

## Tech Stack

Angular 20 (Standalone Components)  
Ng-Zorro Ant Design 20.x  
RxJS  
TypeScript  
SCSS  

## Features
1. Authentication  
User login with JWT token (POST /api/auth/login)  
Route guards with JWT authorization  
2. Order Management
List all orders with pagination  
View order details  
Update order status  
API endpoint: /api/orders  
3. User Management
List users  
(User details & management coming soon)  
API endpoint: /api/users (backend support required)  
4. Dashboard
Display key metrics: today's orders, weekly revenue, pending payments, active users  
Recent orders list  
Data fetched dynamically from backend APIs  
5. Routing
Lazy loaded standalone components  
Route guards for authenticated access

## Coding Guidelines
Use Angular Standalone Components to reduce NgModule complexity   
Utilize lazy loading to optimize initial load performance  
Employ Ng-Zorro components for UI consistency and speed  
Use RxJS observables for reactive service calls  

## Future Enhancements
Complete user detail and permission management  
Order creation and payment integration  
More comprehensive dashboard metrics and visualizations  
Unit and integration testing  

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name

ng generate component pages/order-detaill --type=component
ng generate service services/order --type=service
ng generate guard core/guards/auth --functional
ng generate interceptor core/interceptors/auth
ng g class shared/models/order --type model
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
