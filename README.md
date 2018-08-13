# Drone Dashboard 
Dashboard containing a 3D Drone model to simulate the real drone.

Will also log API calls sent in Go Project - This can be used to facilitate testing.

Accepts JSON Messages in the following format:
```json
{
    "movement": {
        "yaw": 10,
        "roll": 10,
        "pitch": 10,
        "gaz": 10
    }
}
```

### Preview

<img src="Dashboard_Preview.gif"></img>

## How To Run
```
cd jetApp

ojet restore

ojet serve
```

User has the option to call the Sample API with the Send Message button **OR** the application will respond to API Calls in the GO Drone API project

## Websocket Integration

### Real GO Drone API
[DroneAPI](https://github.com/oracledeveloperslondon/droneAPI)

### Dummy API
```
cd api

npm install

node sample.js
```