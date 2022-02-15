var express = require("express");
var router = express.Router();
var pool = require("./pool");
var multer = require("./multer");

/* GET home page. */

router.post("/addnewproduct", multer.any(), function (req, res, next) {
  console.log(req.body);
  console.log(req.files);
  pool.query(
    "insert into product(productname,description,price,offerprice,delivery,ratings,color,vendorstatus,adstatus,offertype,stock,outletid,categoryid,brandid,modelid,picture,ad) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.productname,
      req.body.description,
      req.body.price,
      req.body.offerprice,
      req.body.delivery,
      req.body.ratings,
      req.body.color,
      req.body.vendorstatus,
      req.body.adstatus,
      req.body.offertype,
      req.body.stock,
      req.body.vendorid,
      req.body.categoryid,
      req.body.brandid,
      req.body.modelid,
      req.files[0].originalname,
      req.files[1].originalname,
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({ RESULT: false });
      } else {
        console.log(result);
        return res.status(200).json({ RESULT: true });
      }
    }
  );
});

router.get("/displayall", function (req, res, next) {
  pool.query("select * from product", function (err, result) {
    if (err) {
      return res.status(500).json([]);
    } else {
      return res.status(200).json(result);
    }
  });
});

router.post("/deleteRecord", function (req, res, next) {
  pool.query(
    "delete from product where productid=?",
    [req.body.productid],
    function (err, result) {
      if (err) {
        return res.status(500).json([]);
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

router.post("/updateRecord", multer.any(), function (req, res, next) {
  console.log(req.body);
  if (req.body.picture != "" && req.body.ad != "") {
    q =
      "update product set productname=?,description=?,price=?,offerprice=?,delivery=?,ratings=?,color=?,vendorstatus=?,adstatus=?,offertype=?,stock=?,outletid=?,categoryid=?,brandid=?,modelid=?,picture=?,ad=?";
    pm = [
      req.body.productname,
      req.body.description,
      req.body.price,
      req.body.offerprice,
      req.body.delivery,
      req.body.ratings,
      req.body.color,
      req.body.vendorstatus,
      req.body.adstatus,
      req.body.offertype,
      req.body.stock,
      req.body.vendorid,
      req.body.categoryid,
      req.body.brandid,
      req.body.modelid,
      req.files[0].originalname,
      req.files[1].originalname,
    ];
  } else if (req.body.picture != "") {
    q =
      "update product set productname=?,description=?,price=?,offerprice=?,delivery=?,ratings=?,color=?,vendorstatus=?,adstatus=?,offertype=?,stock=?,outletid=?,categoryid=?,brandid=?,modelid=?,picture=?";
    pm = [
      req.body.productname,
      req.body.description,
      req.body.price,
      req.body.offerprice,
      req.body.delivery,
      req.body.ratings,
      req.body.color,
      req.body.vendorstatus,
      req.body.adstatus,
      req.body.offertype,
      req.body.stock,
      req.body.vendorid,
      req.body.categoryid,
      req.body.brandid,
      req.body.modelid,
      req.files[0].originalname,
    ];
  } else if (req.body.ad != "") {
    q =
      "update product set productname=?,description=?,price=?,offerprice=?,delivery=?,ratings=?,color=?,vendorstatus=?,adstatus=?,offertype=?,stock=?,outletid=?,categoryid=?,brandid=?,modelid=?,ad=?";
    pm = [
      req.body.productname,
      req.body.description,
      req.body.price,
      req.body.offerprice,
      req.body.delivery,
      req.body.ratings,
      req.body.color,
      req.body.vendorstatus,
      req.body.adstatus,
      req.body.offertype,
      req.body.stock,
      req.body.vendorid,
      req.body.categoryid,
      req.body.brandid,
      req.body.modelid,
      req.files[0].originalname,
    ];
  } else {
    q =
      "update product set productname=?,description=?,price=?,offerprice=?,delivery=?,ratings=?,color=?,vendorstatus=?,adstatus=?,offertype=?,stock=?,outletid=?,categoryid=?,brandid=?,modelid=?";
    pm = [
      req.body.productname,
      req.body.description,
      req.body.price,
      req.body.offerprice,
      req.body.delivery,
      req.body.ratings,
      req.body.color,
      req.body.vendorstatus,
      req.body.adstatus,
      req.body.offertype,
      req.body.stock,
      req.body.vendorid,
      req.body.categoryid,
      req.body.brandid,
      req.body.modelid,
    ];
  }
  pool.query(q, pm, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({ RESULT: false });
    } else {
      return res.status(200).json({ RESULT: true });
    }
  });
});

module.exports = router;
