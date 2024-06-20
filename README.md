## Bike Rental System

### [Live URL](https://bike-rental-service-three.vercel.app) 

### Features

- Can Offer Bike rental service to customer
- User can create their own account and request to start ride checking all bike specifications and price per hour.
- User can return bike after riding is completed. From return time total cost calculated automatically as per price per hour
- Admin can add, update and delete bike in bike collection
- User can update their profile information
- User can see all of his previous rentals

### Technology used

    TypeScript, NodeJs, ExpressJs, mongoose, Zod

### Follow the below instructions to run the application in your local machine

- First clone the github repository or download the zip file
- run "npm install" command. Thus you can get all the required dependencies required for the application
- create a .env file in the project root directory
- write .env following field as per your choice
    ```
    NODE_ENV=Development
    PORT=5000
    DB_URL=""
    SALT=12
    ACCESS_TOKEN_SECRET_KEY=""
    ACCESS_TOKEN_EXPIRY_TIME="12h"
    ```
- then run "npm run start:dev" command to run the application as development mode in your machine

### Thanks for following the instructions.