[![CircleCI](https://circleci.com/gh/onwuvic/mesh-api/tree/develop.svg?style=svg)](https://circleci.com/gh/onwuvic/mesh-api/tree/develop) [![Maintainability](https://api.codeclimate.com/v1/badges/6ce7172178567742ad18/maintainability)](https://codeclimate.com/github/onwuvic/mesh-api/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/6ce7172178567742ad18/test_coverage)](https://codeclimate.com/github/onwuvic/mesh-api/test_coverage) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

# Mesh API

## Description

**`Mesh`** is an application that help you organize your orders.

### Features
* Add New Order
* Update Existing Order
* Get All Orders
* Get One Order
* Delete Order

## Installation
* Install Node
* On your `terminal` or `CMD`
* clone the repo
  > git clone https://github.com/onwuvic/mesh-api.git

  or

  > git clone git@github.com:onwuvic/mesh-api.git

* cd into `mesh-api`
  > cd mesh-api
* run `npm install`
* create `.env` file and populate it with `.env.sample` values
* Add the necessary firebase config values in the `.env` file
* run `npm run dev`
* app runs on `http://localhost:4000/api/v1/`

## Test
* This test is written with [Jest](https://jestjs.io/), Supertest
* add a valid auth firebase jwt token to `src/tests/mockData` file or `AUTH_TOKEN` in `.env` file
* To run test `npm test`

## Coding Style
* Airbnb

## Language
* JavaScript

## Api Documentation/Usage
* [Postman Docs](https://documenter.getpostman.com/view/3765915/TW6tMAFQ)
## Author
[Victor Onwuzor](https://github.com/onwuvic)

## License & Copyright
MIT © 
