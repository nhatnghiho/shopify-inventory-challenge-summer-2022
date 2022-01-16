### Register item to product catalog:

`POST` `/api/items/create`

#### Sample Request

```
POST http://localhost:4000/api/items/create
Content-Type: application/json

{
    "item_id": "1415869",
    "item_name": "Cuisinart Elite Collection 12-Cup Die Cast Food Processor",
    "sku": "CFP-24DCNPC",
    "cost": "199.99"
}
```

#### Sample Response

```
{
  "item_exist": false,
  "item": {
    "item_id": "1415869",
    "item_name": "Cuisinart Elite Collection 12-Cup Die Cast Food Processor",
    "sku": "CFP-24DCNPC",
    "cost": 199.99,
    "created_at": "2022-01-16T13:56:28.088Z",
    "updated_at": "2022-01-16T13:56:28.088Z",
    "_id": "61e426187c013664f8ce4444",
    "__v": 0
  }
}
```

### Return a full list of product catalog:

`GET` `/api/items/get/all`

#### Sample Request

```
GET http://localhost:4000/api/items/get/all
Content-Type: application/json
```

#### Sample Reponse

```
{
  "items": [
    {
      "_id": "61e269645acfcdccb020bda1",
      "item_id": "2317292",
      "item_name": "De'Longhi Manual Espresso and Cappuccino Machine with Cappuccino System",
      "sku": "ECP3220BK",
      "cost": 119.99,
      "created_at": "2022-01-15T06:27:48.123Z",
      "updated_at": "2022-01-15T06:27:48.123Z",
      "__v": 0
    },
    {
      "_id": "61e2699d5acfcdccb020bda7",
      "item_id": "1344365",
      "item_name": "Kenwood Chef Major 7-Qt. Stand Mixer",
      "sku": "KMM021",
      "cost": 499.99,
      "created_at": "2022-01-15T06:28:45.119Z",
      "updated_at": "2022-01-15T06:28:45.119Z",
      "__v": 0
    }
  ]
}
```

### Display an item's properties by ID:

`GET` `/api/items/get/properties?item_id=<item_id>`

#### Sample Request

```
GET http://localhost:4000/api/items/get/attributes?item_id=1344365
Content-Type: application/json
```

```
{
  "item_exist": true,
  "item": {
    "item_id": "1344365",
    "item_name": "Kenwood Chef Major 7-Qt. Stand Mixer",
    "sku": "KMM021",
    "cost": 499.99,
    "created_at": "2022-01-15T06:28:45.119Z",
    "updated_at": "2022-01-15T06:28:45.119Z"
  }
}
```

### Modify an item's attributes

`POST` `/api/items/modify/:item_id`

#### Sample Request

```
POST http://localhost:4000/api/items/modify/1344365
Content-Type: application/json

{
    "item_id": "1344365",
    "cost": "599.99"
}
```

#### Sample Response

```
{
  "item_exist": true,
  "updatedItem": {
    "_id": "61e2699d5acfcdccb020bda7",
    "item_id": "1344365",
    "item_name": "Kenwood Chef Major 7-Qt. Stand Mixer",
    "sku": "KMM021",
    "cost": 599.99,
    "created_at": "2022-01-15T06:28:45.119Z",
    "updated_at": "2022-01-15T06:28:45.119Z",
    "__v": 0
  }
}
```

### Remove item from product catalog and all locations:

`POST` `/api/items/delete?item_id=<item_id>`

#### Sample Request

```
POST http://localhost:4000/api/items/delete?item_id=1344365
Content-Type: application/json
```

#### Sample Response

```
{
  "item_exist": false
}
```

### Create new store location:

`POST` `/api/locations/create`

#### Sample Request

```
{
  "location_id": "2643",
  "location_name": "Bakersfield",
  "address": "3800 Rosadale Hwy",
  "city": "Bakersfield",
  "state": "CA",
  "country": "US",
  "zip": "93308"
}
```

#### Sample Response

```
{
  "location_exist": false,
  "location": {
    "location_id": "2643",
    "location_name": "Bakersfield",
    "address": "3800 Rosadale Hwy",
    "city": "Bakersfield",
    "state": "CA",
    "country": "US",
    "zip": "93308",
    "createdAt": "2022-01-16T13:56:28.094Z",
    "updatedAt": "2022-01-16T13:56:28.094Z",
    "_id": "61e45f3e7c013664f8ce4451",
    "__v": 0
  }
}
```

### Display a full list of all store locations in the network:

`GET` `/api/locations/get/all`

#### Sample Request

```
GET http://localhost:4000/api/locations/get/all
Content-Type: application/json
```

#### Sample Response

```
{
  "locations": [
    {
      "_id": "61e341e73eb1c277b7a9ef54",
      "location_id": "2640",
      "location_name": "Commerce Business Center",
      "address": "6333 Telegraph Rd",
      "city": "Commerce",
      "state": "CA",
      "country": "US",
      "zip": "90040",
      "createdAt": "2022-01-15T20:43:35.244Z",
      "updatedAt": "2022-01-15T20:43:35.244Z",
      "__v": 0
    },
    {
      "_id": "61e342273eb1c277b7a9ef57",
      "location_id": "8703",
      "location_name": "Laguna Marketplace",
      "address": "27220 Heather Ridge Rd",
      "city": "Laguna Niguel",
      "state": "CA",
      "country": "US",
      "zip": "92667",
      "createdAt": "2022-01-15T20:43:35.244Z",
      "updatedAt": "2022-01-15T20:43:35.244Z",
      "__v": 0
    }
  ]
}
```

### Display a location's properties by ID:

`GET` `/api/locations/get/attributes?location_id=<location_id>`

#### Sample Request

```
GET http://localhost:4000/api/locations/get/attributes?location_id=2640
Content-Type: application/json
```

#### Sample Response

```
{
  "location_exist": true,
  "location": {
    "location_id": "2640",
    "location_name": "Commerce Business Center",
    "address": "6333 Telegraph Rd",
    "city": "Commerce",
    "state": "CA",
    "country": "US",
    "zip": "90040",
    "createdAt": "2022-01-15T20:43:35.244Z",
    "updatedAt": "2022-01-15T20:43:35.244Z"
  }
}
```

### Modify a location's properties:

`POST` `/api/locations/modify/:location_id`

#### Sample Request

```
POST http://localhost:4000/api/locations/modify/2640
Content-Type: application/json

{
    "location_id": "2640",
    "country": "UK"
}
```

#### Sample Response

```
{
  "location_exist": true,
  "updatedLocation": {
    "_id": "61e341e73eb1c277b7a9ef54",
    "location_id": "2640",
    "location_name": "Commerce Business Center",
    "address": "6333 Telegraph Rd",
    "city": "Commerce",
    "state": "CA",
    "country": "UK",
    "zip": "90040",
    "createdAt": "2022-01-15T20:43:35.244Z",
    "updatedAt": "2022-01-15T20:43:35.244Z",
    "__v": 0
  }
}
```

### Remove a location from network and its inventory:

`POST` `/api/locations/delete?location_id=<location_id>`

#### Sample Request

```
POST http://localhost:4000/api/locations/delete?location_id=2640
Content-Type: application/json

{
  "location_id": "2640"
}
```

#### Sample Response

```
{
    "location_exist": false,
}
```

### Register item to store:

`POST` `/api/inventory/create`

#### Sample Request

```
POST http://localhost:4000/api/inventory/create
Content-Type: application/json

{
    "item_id": "2317292",
    "location_id": "4950",
    "item_count": 0
}
```

#### Sample Response

```
{
  "item_exist": true,
  "location_exist": true,
  "inventory_exist": false,
  "inventory": {
    "item_id": "2317292",
    "location_id": "4950",
    "item_count": 0,
    "created_at": "2022-01-16T13:56:28.096Z",
    "updated_at": "2022-01-16T13:56:28.096Z",
    "_id": "61e4647f7c013664f8ce4460",
    "__v": 0
  }
}
```

### Display a list of items at a location:

`GET` `/api/items/get?location_id=<location_id>`

#### Sample Request

```
GET http://localhost:4000/api/items/get?location_id=4950
Content-Type: application/json
```

#### Sample Response

```
{
  "location_exist": true,
  "location_id": "4950",
  "items": [
    {
      "item_id": "1415869",
      "item_name": "Cuisinart Elite Collection 12-Cup Die Cast Food Processor",
      "sku": "CFP-24DCNPC",
      "cost": 199.99,
      "created_at": "2022-01-16T13:56:28.088Z",
      "updated_at": "2022-01-16T13:56:28.088Z"
    },
    {
      "item_id": "2317292",
      "item_name": "De'Longhi Manual Espresso and Cappuccino Machine with Cappuccino System",
      "sku": "ECP3220BK",
      "cost": 119.99,
      "created_at": "2022-01-15T06:27:48.123Z",
      "updated_at": "2022-01-15T06:27:48.123Z"
    }
  ]
}
```

### Display a list of locations that has a given item:

`GET` `/api/locations/get?item_id=<item_id>`

#### Sample Request

```
GET http://localhost:4000/api/locations/get?item_id=1355440
Content-Type: application/json
```

#### Sample Response

```
{
  "item_exist": true,
  "item_id": "1355440",
  "locations": [
    {
      "location_id": "1700",
      "location_name": "Augusta",
      "address": "825 Cabela Dr",
      "city": "Augusta",
      "state": "GA",
      "country": "US",
      "zip": "30909",
      "createdAt": "2022-01-16T10:22:31.211Z",
      "updatedAt": "2022-01-16T10:22:31.211Z"
    }
  ]
}
```

### Show item's availability at a location:

`GET` `/api/inventory/get/availability?item_id=<item_id>&location_id=<location_id>`

#### Sample Request

```
GET http://localhost:4000/api/inventory/get/availability?item_id=1355440&location_id=1700
Content-Type: application/json
```

#### Sample Response

```
{
  "item_exist": true,
  "location_exist": true,
  "inventory": {
    "_id": "61e3f2ce019faff16d39de29",
    "item_id": "1355440",
    "location_id": "1700",
    "item_count": 303,
    "created_at": "2022-01-16T10:22:31.209Z",
    "updated_at": "2022-01-16T11:55:59.369Z",
    "__v": 0
  }
}
```

### Set inventory level:

`POST` `/api/inventory/set/availability`

#### Sample Request

```
POST http://localhost:4000/api/inventory/set/availability
Content-Type: application/json

{
    "item_id": "2317292",
    "location_id": "1700",
    "item_count": "50"
}
```

#### Sample Response

```
{
  "item_exist": true,
  "location_exist": true,
  "inventory_exist": true,
  "updatedInventory": {
    "_id": "61e3f2d8019faff16d39de2e",
    "item_id": "2317292",
    "location_id": "1700",
    "item_count": 50,
    "created_at": "2022-01-16T10:22:31.209Z",
    "updated_at": "2022-01-16T18:45:48.297Z",
    "__v": 0
  }
}
```

### Adjust inventory level:

`POST` `/api/inventory/adjust/availability`

#### Sample Request

```
POST http://localhost:4000/api/inventory/adjust/availability
Content-Type: application/json

{
    "item_id": "2317292",
    "location_id": "1700",
    "adjustment": "-30"
}
```

#### Sample Response

```
{
  "item_exist": true,
  "location_exist": true,
  "inventory_exist": true,
  "updatedInventory": {
    "_id": "61e3f2d8019faff16d39de2e",
    "item_id": "2317292",
    "location_id": "1700",
    "item_count": 20,
    "created_at": "2022-01-16T10:22:31.209Z",
    "updated_at": "2022-01-16T18:47:04.498Z",
    "__v": 0
  },
  "adjust_exceeded": false,
  "old_item_count": 50
}
```

### Delete an item from a store location:

`POST` `/api/inventory/delete?item_id=<item_id>&store_id=<store_id>`

#### Sample Request

```
POST http://localhost:4000/api/inventory/delete?item_id=2317292&location_id=1700
Content-Type: application/json
```

#### Sample Response

```
{
  "item_exist": true,
  "location_exist": true,
  "inventory_exist": false
}
```
