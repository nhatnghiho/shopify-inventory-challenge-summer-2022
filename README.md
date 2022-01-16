# Shopify Backend Developer Intern Challenge Summer 2022

An inventory management web app can be used by inventory planning manager, product catalog manager, store mananager, and customers. The app allows user to 1) create new product offerings, 2) set up new location, and 3) establish and maintain product inventories across stores, fulfillment centers, and warehouses.

## Background Technologies:

- React.js
- Express.js
- MongoDB Atlas

## Set Up Guide

### Clone project

There are two ways to clone the project to your machine:

1. Use git clone: `git clone https://github.com/nhatnghiho/shopify-inventory-challenge-summer-2022.git`
2. Download zip then unzip the project

### Update Node.js

Node.js is required. This project uses `v16.13.0` in particular. If you have not already, update Node to ensure smooth operation.

### Run website

To host the web app on your local machine:

1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm i`
3. Start web app: `npm start`

### Connect to server

The web app needs to connect to the server in order to access and manage data. On a parallel terminal:

1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm i`
3. Run the server: `npm run devStart`

## Data Model and API Description

In this inventory management app, you will be able to register new items to the product catalog, open new stores/warehouses (i.e., locations) in the network, and manage each location's inventory. The data model is developed that focus on the user stories as below.

- "As a product catalog manager, I want to add a new item to the product catalog or update an existing item in the catalog."
- "As a store manager, I want to add a new store to the network or update an existing store in the network."
- "As an inventory planning manager, I want to register an item to a store and set/adjust the inventory level of that item in that store."
- "As a customer, I want to check which stores offer the item that I to purchase."

See the documentation for the data model below.

### Item

An item holds information about a physical good, including item's name, SKU, and cost. Each item is associated to a unique user-specified ID, which is used to access item's information, retrieve its available locations, and query inventory level.

#### Sample Item

```
{
    _id : 61e269c75acfcdccb020bdad
    item_id : 2316457
    item_name : Crock-Pot 7-Quart Easy Clean Slow Cooker with Locking Lid
    sku : CPSCVC70LLEC-S
    cost : 49.99
    created_at : 2022-01-15T06:29:09.059+00:00
    updated_at : 2022-01-15T06:29:09.059+00:00
    __v : 0
}
```

#### Functionalities & Endpoints

- Register item to product catalog: `POST` `/api/items/create`
- Return a full list of product catalog: `GET` `/api/items/get/all`
- Display a list of items at a location: `GET` `/api/items/get?location_id=<location_id>`
- Display an item's attributes by ID: `GET` `/api/items/get/attributes?item_id=<item_id>`
- Modify an item's attributes: `POST` `/api/items/modify/:item_id`
- Remove item from product catalog and all locations: `POST` `/api/items/delete?item_id=<item_id>`

### Location

A location can be a store, a fulfillment center, or a warehouse. It essentially represents a geographical location that can store goods. Each location is associated to a unique user-specified ID and holds information such as store's name and address. The ID can be used to access the store's information, retrieve its items, and query inventory level.

Note: Please note that this documentation uses "location" synonymously for store, fulfillment center, and warehouse.

#### Sample Location

```
{
    _id : 61e262bf5acfcdccb020bd7d
    location_id : 4950
    location_name : Alpharetta
    address : 2855 Jordan Ct
    city : Alpharetta
    state : GA
    country : US
    zip : 30004
    created_at : 2022-01-15T05:59:27.509+00:00
    updated_at : 2022-01-15T05:59:27.509+00:00
    __v :
}
```

#### Functionalities and Endpoints

- Create new location: `POST` `/api/locations/create`
- Display a list of all locations in the network: `GET` `/api/locations/get/all`
- Display a list of locations that has a given item: `GET` `/api/locations/get?item_id=<item_id>`
- Display a location's attributes by ID: `GET` `/api/locations/get/attributes?location_id=<location_id>`
- Modify a location's attributes: `POST` `/api/locations/modify/:location_id`
- Remove a location from network and its inventory: `POST` `/api/locations/delete?location_id=<location_id>`

### Inventory

An inventory maps an item to a location and specifies the item's quantity at that location. Each inventory object must have a unique pair of location ID and item ID. This pair of IDs can be used to retrieve and update item's count.

#### Sample Inventory

```
{
    _id : 61e26cb91f95a96838d95053
    item_id : 2316457
    location_id : 4950
    item_count : 100
    created_at : 2022-01-15T06:42:01.087+00:00
    updated_at : 2022-01-15T06:45:57.373+00:00
    __v : 0
}
```

#### Functionalities and Endpoints

- Register item to location: `POST` `/api/inventory/create`
- Show item's availability at a location: `GET` `/api/inventory/get/availability?item_id=<item_id>&location_id=<location_id>`
- Set inventory level: `POST` `/api/inventory/set/availability`
- Adjust inventory level: `POST` `/api/inventory/adjust/availability`
- Delete an item from a location: `POST` `/api/inventory/delete?item_id=<item_id>&location_id=<location_id>`

## API Usage and Documentation

For API Usage and Documentation, please refer to the this README.md document ([LINK](https://github.com/nhatnghiho/shopify-inventory-challenge-summer-2022/blob/326ecfb91a8d4d2064ff5eab155f89d298f01b0f/server/README.md))
