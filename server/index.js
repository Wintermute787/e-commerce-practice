require("dotenv").config();
//middleware
const bodyParser = require("body-parser");

//require the session to save the user data and give a user a unique experience?
const session = require("express-session");
//use cors to enable cross origin requests
const cors = require("cors");

//import controllers
const adminController = require("./controllers/admin_controller");
const cloudinaryController = require("./controllers/cloudinary_controller");
const userController = require("./controllers/user_controller");
const productsController = require("./controllers/products_controller");
//mongoose
const mongoose = require("mongoose");
//express server
const express = require("express");
//set instance of the express server into a variable
const app = express();

//mongodb
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup session
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 24
    }
  })
);
//allow cors
app.use(cors());

//endpoints
setTimeout(() => {
  //user endpoints
  //cloudinary will get creds from cloudinary controller
  // app.get("api/upload", cloudinaryController.upload);

  //read the users session
  // app.get("/api/user-data", userController.readUserData);
  //add an item to the cart
  // app.post("/api/user-data/cart", userController.addToCart);
  //remove an item from the cart
  // app.delete("/api/user-data/cart/:id", userController.removeFromCart);

  //when user login
  // app.get("/auth/callback", userController.login);
  //when the user logout
  // app.post("/api/logout", userController.logout);

  //products endpoints
  app.get("/api/products", productsController.readAllProducts);
  //get specific product
  app.get("/api/products/:id", productsController.readProduct);

  //admin endpoints
  app.get("/api/users", adminController.getAdminUsers);
  //when admin creates a product. no need for request paramete since we are inserting data into the database
  app.post("/api/products", adminController.createProduct);
  app.put("/api/products/:id", adminController.updateProduct);
  app.delete("/api/products/:id", adminController.deleteProduct);
}, 200);

//server
const port = process.env.Port || 5000;
app.listen(port, () => console.log(`server has started on port ${port}`));
