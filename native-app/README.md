# Machine Health App (React Native Expo)

Welcome to the Machine Health App, a React Native Expo project designed to evaluate the health of various machines in an automobile factory. This README will guide you on setting up and running the app, as well as understanding its structure.

## Getting Started

To get started with the app, follow these steps:

### Prerequisites

Before you begin, make sure you have the following software installed on your development machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) (package manager)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for running Expo projects)

### Installation

```bash
yarn
```

### Running the App

To run the app, use the following command:

```bash
yarn start
```

This will launch the Expo development server, and you can access the app on your device using the Expo Go app or an emulator. You can hit `i` or `a` on the keyboard to launch the ios or android app respectively.

## Project Structure

The project structure is organized as follows:

- `App.tsx`: The entry point of the Expo app, where the navigation is configured.
- `components/`: Contains reusable components used throughout the app.
- `app/`: Contains individual screens or pages/tabs of the app.
- `providers/`: Store all provider including the Auth Provider.
- `types/`: Store the Types of project.
- `constants/`: Contains the constant values of the project. 

## Screens and Features

The app has the following screens and features:

- **Login**: This is the initial screen of the app. It allows users to enter their username and password. If the credentials are correct, after pressing the login button, the user will be redirected to the Machine Health Screen. Users can also press the register button and will be redirected to the Register Screen.

- **Register**: Allows users to register themselves by providing all the required information. After successful registration, the user is redirected to the login screen.

- **Machine Health**: Allows users to select a machine, part name, and part value, and calculates the health score of the machine. User can also logout using the Logout button.


## Customization

If you would like, feel free to modify the app as needed.
