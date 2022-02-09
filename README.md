# root-me-API-wrapper

## Description

This a wrapper for the [root-me](https://root-me.org) API.

Important notes to avoid being rate-limited by the API Gathering the information about a user a really slow process especially if the user has solved a lot of challenges. 

## Usage :

```javascript
const { Client } = require("root-me-api-wrapper");
const { api_key } = require("./config.json"); // Get your API key from https://www.root-me.org/?page=preferences

// Create a new client
const client = new Client(api_key);

//get the information about a user
client.getUser(userid).then(user => {
    console.log(user);
    // The user is retruned as an object
});

//get the information about a challenge
client.getChallenge(challengeid).then(challenge => {
    console.log(challenge);
    // The challenge is retruned as an object
});
```

## Documentation

### User Object Owerview

User Object:
* id: The user id (integer)
* name: The pseudo of the user (string)
* rank: The overall rank of the user (number)
* score: The number of points the user has (number)
* solve: An array of challenges the user has solved (array of Challenge Object)
* title: The title of the user (string)
* challenges: The challenges created by the user (array of Challenge Object)

Challenge Object:
* id : The challenge id (integer)
* title : The title of the challenge (string)
* description : The description of the challenge (string)
* points : The number of points the challenge is worth (number)
* authors : An array of the authors names (array of string)
* authors_id : An array of the authors ids (array of integer)
* date : The date of the challenge creation (string)
* category : The category of the challenge (string)
* difficulty : The difficulty of the challenge (string)
