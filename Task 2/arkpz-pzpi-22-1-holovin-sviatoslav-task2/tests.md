# User

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "role": "admin"
  }'
```

```bash
curl -X GET http://localhost:3000/users
```

```bash
curl -X GET http://localhost:3000/users/newuser
```

```bash
curl -X PATCH http://localhost:3000/users/newuser \
  -H "Content-Type: application/json" \
  -d '{
    "role": "manager"
  }'
```

```bash
curl -X DELETE http://localhost:3000/users/newuser
```

# Location

```bash
curl -X POST http://localhost:3000/locations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Центральний склад",
    "address": "вул. Хрещатик, 22, Київ"
  }'
```

```bash
curl -X GET http://localhost:3000/locations
```

```bash
curl -X GET http://localhost:3000/locations/1
```

```bash
curl -X PATCH http://localhost:3000/locations/1 \
  -H "Content-Type: application/json" \
  -d '{
    "address": "вул. Хрещатик, 25, Київ"
  }'
```

```bash
curl -X DELETE http://localhost:3000/locations/1
```

# Inventory

```bash
curl -X POST http://localhost:3000/inventories \
  -H "Content-Type: application/json" \
  -d '{
    "location_id": 1,
    "max_quantity": 100
  }'
```

```bash
curl -X GET http://localhost:3000/inventories
```

```bash
curl -X GET http://localhost:3000/inventories/1
```

```bash
curl -X PATCH http://localhost:3000/inventories/1 \
  -H "Content-Type: application/json" \
  -d '{
    "max_quantity": 150
  }'
```

```bash
curl -X DELETE http://localhost:3000/inventories/1
```

# Vaccine

```bash
curl -X POST http://localhost:3000/vaccines \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Вакцина проти грипу",
    "description": "Щорічна вакцинація від грипу",
    "min_temperature": 2,
    "max_temperature": 8,
    "min_humidity": 30,
    "max_humidity": 50
  }'
```

```bash
curl -X GET http://localhost:3000/vaccines
```

```bash
curl -X GET http://localhost:3000/vaccines/1
```

```bash
curl -X PATCH http://localhost:3000/vaccines/1 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Оновлений опис вакцини проти грипу"
  }'
```

```bash
curl -X DELETE http://localhost:3000/vaccines/1
```

# InventoryItem

```bash
curl -X POST http://localhost:3000/inventoryItems \
  -H "Content-Type: application/json" \
  -d '{
    "inventory_id": 1,
    "vaccine_id": 1,
    "quantity": 50
  }'
```

```bash
curl -X GET http://localhost:3000/inventoryItems
```

```bash
curl -X GET http://localhost:3000/inventoryItems/1
```

```bash
curl -X PATCH http://localhost:3000/inventoryItems/1 \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 60
  }'
```

```bash
curl -X DELETE http://localhost:3000/inventoryItems/1
```

# Order

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "order_status": "pending",
    "items": [
      {
        "vaccine_id": 1,
        "quantity": 10
      }
    ]
  }'
```

```bash
curl -X GET http://localhost:3000/orders
```

```bash
curl -X GET http://localhost:3000/orders/1
```

```bash
curl -X PATCH http://localhost:3000/orders/1 \
  -H "Content-Type: application/json" \
  -d '{
    "order_status": "completed",
    "items": [
      {
        "vaccine_id": 1,
        "quantity": 15
      }
    ]
  }'
```

```bash
curl -X DELETE http://localhost:3000/orders/1
```

# SensorData

```bash
curl -X POST http://localhost:3000/sensorData \
  -H "Content-Type: application/json" \
  -d '{
    "location_id": 1,
    "temperature": 22.5,
    "humidity": 60.0
  }'
```

```bash
curl -X GET http://localhost:3000/sensorData
```

```bash
curl -X GET http://localhost:3000/sensorData/1
```

# Notification

```bash
curl -X POST http://localhost:3000/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "message": "Температура перевищила допустимий рівень",
    "notification_type": "warning"
  }'
```

```bash
curl -X GET http://localhost:3000/notifications
```

```bash
curl -X GET http://localhost:3000/notifications/1
```
