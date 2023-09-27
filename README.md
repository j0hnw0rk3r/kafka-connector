[![CI](https://github.com/DevION-LLC/csi-15plus-boxes-api/actions/workflows/ci.yml/badge.svg)](https://github.com/DevION-LLC/csi-15plus-boxes-api/actions/workflows/ci.yml)
[![Build](https://github.com/DevION-LLC/csi-15plus-boxes-api/actions/workflows/build.yml/badge.svg)](https://github.com/DevION-LLC/csi-15plus-boxes-api/actions/workflows/build.yml)

# 15+ Boxes - API

## Table of Contents
1. [Tech Stack](#Tech-Stack)
2. [About](#About)
3. [Configuration](#Configuration)
4. [Development](#Development)
5. [Deployment](#Deployment)

## Tech Stack
- [NodeJS](https://nodejs.org)
- [ExpressJS](https://expressjs.com)
- [MySQL](https://mysql.com)
- [Apache Cassandra](https://www.datastax.com/products/apache-cassandra)
- [Docker](https://docker.com)
- [TypeScript](https://www.typescriptlang.org)

## About
This is the api server of 15+ boxes scrapers with Cassandra db. It is built using [Typescript](https://www.typescriptlang.org), [Node.js](https://nodejs.org),
and [Express.js](https://expressjs.com).

## SSH
1. the pem key to ssh into the server can be downloaded from the s3 bucket in the csi aws account.
2. whitelisting the users ip address may be required to access the servers terminal through ssh


## Configuration

#### Environment Variables
Environment variables are accessed in the `.env` file. The `example.env` file shows examples of what variables need to
be defined in the `.env` file.


## Development
Coming Soon


## Deployment
A CI/CD pipeline has been set up with GitHub actions and changes will automatically be deployed to production after a pull request to main is successfully made.
