# Uevent

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

## View the Swagger API Documentation

- Make sure the server is running.
- Go to `{{HOST}}:{{PORT}}/docs` in your web browser.
