const Product = require("../models/Product");

module.exports = {
  readAllProducts(req, res) {
    Product.find({}).exec((err, products) => {
      if (err)
        console.log("Get Product mongoose error---------------------------err");
      console.log("products -------------------", products);
      res.status(200).json(products);
    });
  },
  readProduct(req, res) {
    //Destruct the id from the endpoint url, to retrieve  a specific product.
    const { id } = req.params;
    //Copy and paste on of the product's id to the url when testing it.
    //Use the findById to get a specific product.
    Product.findById(id).exec((err, product) => {
      if (err) console.log("Get Single Product Error---------------", err);
      console.log("product--------------", product);
      res.status(200).json({ product });
    });
  }
};
