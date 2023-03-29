<head>
    <div align="center">
        <h1 align="center">Uevent (Client)</h1>
    </div>
</head>

<div align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white" />
  <img alt="react" src="https://img.shields.io/badge/-React-61DAFB.svg?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="redux" src="https://img.shields.io/badge/-Redux-764ABC.svg?style=for-the-badge&logo=redux&logoColor=white" />
  <img alt="react router" src="https://img.shields.io/badge/-React%20Router-CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white" />
  <img alt="Chakra UI" src="https://img.shields.io/badge/-Chakra%20UI-319795.svg?style=for-the-badge&logo=ChakraUI&logoColor=white" />
  <img alt="Stripe" src="https://img.shields.io/badge/-Stripe-008CDD.svg?style=for-the-badge&logo=Stripe&logoColor=white" />
  <img alt="Google Maps" src="https://img.shields.io/badge/-Google%20Maps-4285F4.svg?style=for-the-badge&logo=Google-Maps&logoColor=white" />
</div>

</br>

## About

An event-booking application, written in React, with the use of Redux, Chakra UI & Google Maps API.

## Setup & Run

Prior to setup, create an `.env` file based on the `.env.example`. Make sure your `SERVER_URL` in the `api/.env` file matches the `VITE_API_URL` in your `client/.env`.
Then proceed:

- Create a Stripe account and use the provided test API keys.
- Get [Google maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) and use the provided key.
- Run `npm install` in the `client/` directory.
- Run `npm run dev`.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html#building-the-app) for more information.
