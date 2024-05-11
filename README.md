# Gemini Dialogue

## Introduction
Gemini dialogue is a small project that demonstrates the use of the Google Gemini Pro AI models to automate the HR
queries for a company.

## Technologies
- Node.js 20
- Google Gemini API Key

## Features
- The model can be given a context to answer from.
- You can ask the model to generate a response to a question.
- The model can pick small details from the context.

## Setup and Usage Guidelines (development environment ONLY)

- Make a copy of the `.env.example` file and rename it to `.env`
- Fill in the environment variables in the `.env` file

### Usage without Docker
- Make sure you have Node.js 20 installed on your machine
- Make sure you have the `npm` command installed on your machine
- Install the npm packages by running this command:
```shell
  npm install
```
- Start the server by running this command:
```shell
  npm start
```
- The server will be running at [http://localhost:4000](http://localhost:4000)

### Usage with Docker
- Make sure you have docker and docker-compose installed on your machine
- Make sure you have the `Make` command installed on your machine

- In the root directory, run this command to build and start the docker containers:
  ```shell
  make start
  ```
- The server will be running at [http://localhost:4000](http://localhost:4000)

**Notes:**
- By default, npm packages will be installed automatically when you start the docker container. But if you wish, you can install the npm packages whenever you want:
  ```shell
  make install
  ```
- Check the `Makefile` at the root directory to find out more available make commands