const Products = require('../models/products.model.js');



// Home-Page Controller
exports.getHome = async (req, res, next) => {
  try {
    const products = await Products.find().limit(3);
    if (!products) {
      return res.status(404).render("404");
    }

    res.render("home", { products, search: '' });
  } catch (error) {
    next(error)
  }
}


// Products-Page Controller
exports.getProducts = async (req, res, next) => {
  try {
    const search = req.query.search;

    let query = {};
// Search-Product Query
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" }},
          {category: { $regex: search, $options: "i" }}
        ]
      };
    }

    const products = await Products.find(query);

    res.render("products", { products, search });
  } catch (error) {
    next(error);
  }
};



// Each Product-Detail Page Controller
exports.getProductDetails = async (req, res, next) => {
  try {
    const products = await Products.findById(req.params.id);
    if (!products) {
      return res.status(404).render("404");
    }
    res.render("Product-detail", { products });
  } catch (error) {
    next(error);
  }
}