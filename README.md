# KODECAMP 5.0 NODE.JS BEGINNER TRACK

---

This is a a continuation of my REST API project for an e-commerce app from my previous TASK 5 version that:
+ Provided two POST endpoints; for registering and logging in users. 
+ Provided a single GET enpoint that is not protected so anyone logged in or not can access it, and it returns all the products in the app
+ Provided two POST endpoints that are protected and only admins are authorized to make requests.
+ Provided a single GET endpoint that returns a list of products by a specific brand
+ Provided a GET, POST, PUT and DELETE endpoints for:
  + Returning the list of all the brands
  + Adding brands
  + Updating brands
  + Deleting brands
+ Provided a POST endpoint for customers to make orders 
+ Provided two GET endpoints for admins to view all orders as well as a single order
+ Provided a PATCH endpoint for admins to change the order status

| **Only admins are allowed to access the POST, PUT and DELETE brand endpoints** |

In addition to the already existing endpoints above, it:
+ Provides a GET endpoint for users to view their profile 
+ Provides a GET endpoint for admins to view all orders and customers to view their own orders
+ Provides a SOCKET.IO implementation for customers to see updates on their orders' shipping status when admins update the status

---

## Tech Stack
+ Node.js
+ Express.js 
+ MongoDB Atlas

## Local setup instructions
1. Clone the repository

```bash
git clone https://github.com/njaumatilda/task_7_e-commerce_auth_app.git
```

2. Navigate to the project directory

```bash
cd task_7_e-commerce_auth_app
```

3. Install dependencies

```bash
npm install
```

4. Configure environment variables

To run this project, you will need to create a `.env` file in the project directory and make sure it is included in the `.gitignore` file. Configure the following environment variables:

```env
DB_URL = your-db-url
PORT = your-port
SALT = your-salt
JWT_KEY = your-secret-key
```

> Replace:
>
> `your-db-url` with your specified db url, 
>
> `your-port` with your specified port, 
>
>`your-salt` with your specified salt and 
>
>`your-secret-key` with your specified secret key

6. Start the server

```bash
npm start
```

## API Documentation
Here is the reference on the usage of the API: 
[API Documentation](https://documenter.getpostman.com/view/38132076/2sB3Hhs2Ue)

## Deployment
The API has been deployed to a publicly accessible endpoint on Render:
[Live URL](https://task-7-e-commerce-auth-app.onrender.com)

## Author
[Matilda Njau](https://github.com/njaumatilda) 