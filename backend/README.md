# BellSant Machine Health API

Welcome to the BellSant Machine Health API! This API allows you to evaluate the health of various machines and their components based on provided data. This README provides instructions on how to set up and use the API.

## Prerequisites

Before you get started, make sure you have the following prerequisites installed on your system:

- Node.js: [Download Node.js](https://nodejs.org/)
- Yarn (optional but recommended, can use NPM instead): [Install Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Installation

Follow these steps to set up the BellSant Machine Health API:

1. Navigate to the project directory:

   ```bash
   cd api
   ```

2. Install dependencies using Yarn (or npm if you prefer):

   ```bash
   yarn
   ```
### Setup Database

Setup database using scrpts in scripts folder

  ```bash
    yran seed
  ```

it will create tables and add two dummy users
``` bash 
  [{username: admin, password: admin}, {username: admin, password: admin}]
```
## Usage

### Starting the API

To start the API, run the following command:

```bash
yarn start
```

The API will be accessible at `http://localhost:3001` by default. You can change the port or other configurations in the `app.ts` file.

### Evaluating Machine Health

You can evaluate the health of a machine by sending a POST request to the `/machine-health` endpoint with your auth token. Here's an example using cURL:

```bash
curl -X POST -H "Content-Type: application/json" -H "authorization: YOUR_AUTH_TOKEN" -d '{
  "machines": {
    "weldingRobot": {
      "errorRate": "0.5",
      "vibrationLevel": "2.5"
    }
  }
}' http://localhost:3001/machine-health
```

The response will include the machine name and its health score.

### API Endpoints

- `POST /machine-health`: If the token is valid it calculate the health of a machine based on provided data.
- `POST /auth/login`: Creates user session if provided credentials are valid.
- `POST /auth/register`: Register the user if username is not already taken.
- `Delete /auth/logout`: Logout the user if token is valid.
- `GET /auth`: Give user details if the token is valid. 

## Customization

You can customize machine data and health evaluation logic by modifying the `machineData.json` file and the calculation functions in `app.ts`.
