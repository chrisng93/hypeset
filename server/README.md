# hypeset Backend


## Table of Contents

1. [Getting started](#Getting-Started)
  1. [Install dependencies](#Install-Dependencies)
  2. [Install and run databases](#Install-Run-Databases)
  3. [Run the application](#Run-Application)


## Getting started

#### 1. Install dependencies

  From within the server directory run the following command to install all dependencies:

  ```sh
  $ npm install
  ```

#### 2. Install and run databases

  1. Install Postgres and Redis locally and run them in separate terminal windows
  2. Go into Postgres CLI and create the database using the following command:
  
  ```
    CREATE DATABASE (database);
  ```

#### 3. Run the application

  1. Within the server directory, use create a .env file using the .env.example file as a guide

  2. In a new terminal window run the following command to start the application:

  ```sh
  $ npm run dev
  ```
