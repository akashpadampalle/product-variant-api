# Product Variant Management API

## Checkout Documentation

https://product-variant-api.onrender.com/docs/

## Installation Guide

### Step 1: Clone the Repository

```bash
git https://github.com/akashpadampalle/product-variant-api.git
cd product-variant-api
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set up MongoDB Atlas

1. Create an account on MongoDB Atlas.
2. Create a new cluster and configure it according to your needs.
3. Get your connection string from the cluster:
    - Go to the "Clusters" section.
    - Click "Connect" on your cluster.
    - Choose "Connect your application" and copy the connection string.
    - Replace the placeholder <password> with your actual MongoDB Atlas password in the connection string.

### Step 4: Create .env File

Create a .env file in the root of your project and add the following content:
```javascript
DATABASE_URL=<your-mongodb-atlas-connection-string>

```
Replace `<your-mongodb-atlas-connection-string>` with the connection string you obtained from MongoDB Atlas.

### Step 5: Run the API
- For development (with nodemon):
    ```bash
    npm run dev
    ```
- For production:
    ```bash
    npm run build
    
    npm run start
    ```
### Step 6: Access the API

The API should now be running on http://localhost:5000. You can test the API using tools like Postman or curl.



