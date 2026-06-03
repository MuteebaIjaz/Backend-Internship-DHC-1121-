const Products = require('../models/products.model.js');



// Home-Page Controller
exports.getHome = async (req, res,next) => {
  try {
    const products = await Products.find().limit(3);
    if (products.length === 0) {
      return res.status(404).render('404');
    }

    res.render("Home", { products, search: '', user:req.user });
  }catch (error) {
        console.log(error);
         return res.status(500).render('error', {
        message: 'Internal Server Error'
    });     

    } 
}


// Products-Page Controller
exports.getProducts = async (req, res,next) => {
  try {
    const search = req.query.search;
const page=parseInt(req.query.page) || 1;
const limit = 6;

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
const total = await Products.countDocuments(query);
const pages = Math.ceil(total/limit);

    const products = await Products.find(query).skip((page-1) * limit).limit(limit);

    res.render("products", { products, search , page, pages, total, user:req.user});
  }catch (error) {
        console.log(error);
         return res.status(500).render('error', {
        message: 'Internal Server Error'
    });     

    }
};



// Each Product-Detail Page Controller
exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).render("404");
    }
    res.render("Product-detail", { product , user:req.user});
  } catch (error) {
        console.log(error);
         return res.status(500).render('error', {
        message: 'Internal Server Error'
    });     

    }
}