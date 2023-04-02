<head>
    <div align="center">
        <h1 align="center">Uevent (Server)</h1>
    </div>
</head>

<div align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/-Node.js-339933.svg?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/-Express-000000.svg?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img alt="MySQL" src="https://img.shields.io/badge/-MySQL-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/-Prisma-2D3748.svg?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="JSON Web Tokens" src="https://img.shields.io/badge/-JWT-000000.svg?style=for-the-badge&logo=JSONWebTokens&logoColor=white" />
  <img alt="Nodemon" src="https://img.shields.io/badge/-Nodemon-76D04B.svg?style=for-the-badge&logo=nodemon&logoColor=white" />
  <img alt="Swagger" src="https://img.shields.io/badge/-Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=black" />
  <img alt="Stripe" src="https://img.shields.io/badge/-Stripe-008CDD.svg?style=for-the-badge&logo=Stripe&logoColor=white" />
</div>

</br>

## About

An event-booking application, written in Express.js, with the use of MySQL, Prisma & Stripe API.

## Requirements & Dependencies

- Node.js (version 16.17.1 or higher)
- NPM (version 9.4.0 or higher)
- MySQL
- Stripe API

## Setup & Run

Prior to setup, create an `.env` file based on the `.env.example` file, and fill in the required vars.
Then proceed:

- Install all the required dependencies, listed above.
- Create a Stripe account and use the provided test API keys.
- Run `npm install` in the `api/` directory.
- Run `npm run migrate`.
- Run `npm run dev`.

You can now access the API, using the host and port, provided in the `.env` file.

## Test Payments Locally

- Install [stripe-cli](https://stripe.com/docs/stripe-cli)
- Run `stripe login`
- Run `stripe listen --forward-to {{HOST}}:{{PORT}}/webhook`
- Use the generated `webhook signing secret` in your `.env` file.

Stripe payments will now be confirmed via the `/webhook` endpoint.

### Test Stripe Connect

You can create & connect Stripe accounts via our platform in order to receive payments for paid events.

- Make sure you have all the [prerequisites](https://stripe.com/docs/connect/collect-then-transfer-guide) completed.
- Create a company using the client side.
- Navigate to the edit menu of the company and click the _Connect Stripe_ button.
- Follow the further given instructions.

You can now view your Stripe account by clicking the _Stripe Account_ button on the company page.

_Note_: If you don't complete & submit the form, the paid events won't be possible.

## View the Swagger API Documentation

- Make sure the server is running.
- Go to `{{HOST}}:{{PORT}}/docs` in your web browser.
