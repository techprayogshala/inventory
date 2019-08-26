# inventory
Shopping Inventory Management System

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Project Structure](#project-structure)
* [API Endpoints](#api-endpoints)

## General info
This project is a shopping centre inventory management system which will help the team to maintain records of assets(physical display panels) are installed in shopping centres. This is an API to manage inventory
and shopping centres, allowing persisting and modifying data, as well as (optionally) an interface for users to manage the
inventory.
	
## Technologies
Project is created with:
* npm version: 8.11.1
* node js version: 6.11.2
* sqllite: In-memory
	
## Setup
To run this project, install it locally using npm:

```
$ cd ../inventory
$ npm install
$ npm run dev
```

## Project Structure
```
inventory
    |-------config
    |------ routes
              |-----api
    |------ service
    app.js
    connect.js
    package.json
```
The routes api folder contains all the routes for assets, shopping centre and login.

The service folder contain service to authenticate the user and generate the jwt token which inturn used to secure the endpoints.

The connect.js file contains the scripts to create the database tables and simulate the real world example to persist the data using the sqllite in-memory database which loads up at server startup.

## API Endpoints

All enpoints are secured and using jwt token to access the endpoints.

To access the token:
```
METHOD: POST
URL:    http://localhost:3000/api/login
BODY:   Pass the username and password
        {
          "userName" : "admin",
          "password": "admin"
        }
```

To fetch all the assets in a shopping centre:
```
METHOD: GET
URL:    http://localhost:3000/api/shopping-centre/{shoppingCentreId}/assets

```
To get a particular asset in a shopping centre:
```
METHOD: GET
URL:    http://localhost:3000/api/shopping-centre/{shoppingCentreId}/assets/{assetId}
     OR http://localhost:3000/api/assets/{assetId}
```

To add an asset:
```
METHOD: POST
URL:    http://localhost:3000/api/shopping-centre/{shoppingCentreId}/assets/add
BODY:   Pass the values of of asset
        {
          "assetId" : "Inactive",
          "name": "Asset Name",
          "dimension": "34H*24W*10L",
          "status": "Active",
        }
```

To update an asset:
```
METHOD: PUT
URL:    http://localhost:3000/api/shopping-centre/{shoppingCentreId}/assets/{assetId}
BODY:   Pass the value of status and/or user ID
        {
          "status" : "Inactive",
        }
```

To delete an asset:
```
METHOD: DELETE
URL:    http://localhost:3000/api/shopping-centre/{shoppingCentreId}/assets/{assetId}

```

To fetch the list of all shopping centres:
```
METHOD: GET
URL:    http://localhost:3000/api/shopping-centre

```

To fetch the a particular shopping centre:
```
METHOD: GET
URL:    http://localhost:3000/api/shopping-centre/{shoppingCentreId}

```
To fetch the list of users:
```
METHOD: GET
URL:    http://localhost:3000/api/users

```

