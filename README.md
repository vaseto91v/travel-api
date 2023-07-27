# TravelAPI

### `npm install`

Install the necessary packages

### `npm start`

Runs ts-node-dev --respawn --transpile-only src/app.ts 
The app runs on port 8080. In order to change use the .env file 

### `Available routes`

## `GET /space-doors`
Returns a full list of space doors 
## `GET /space-doors/:id/access` 
Returns a list of available destinations given a space door id and available currency. Add the optional query parameter availableCurrency to specify the available currency. It defaults to 0. For example 
localhost:8080/space-doors/1/access?availableCurrency=5 
## `GET /space-doors/:startId/path/:endId `

Returns the path between two doors and the total price of the trip. The path is in a form of array 
of doors. The first door in the array is your start destination and the last is the end destination.
The doors in between them are ordered by the order of the direction.
