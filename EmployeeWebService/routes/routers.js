var express = require("express");
var mongoose = require("mongoose");
var schema = mongoose.Schema;
var router = express.Router();

//define schema and validation
var empschema = new schema({
    //_id: Number,
    empid: String,
    ename: { type: String, trim: true, required: true },
    sal: String
        //sal:{type:Number,validate:/[0-9]*/}
});

var Emp = mongoose.model("emptab", empschema, "emptabs");

router.get("/employees", (req, res) => {
    Emp.find().then((result) => {
        res.send(result);
    }).catch((err) => { res.status(500).send("No data found") })
});

//this will retrieve one employee object and return in json
router.get("/employees/:id", (req, res) => {
    Emp.findOne({ empid: req.params.id }).then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => { res.status(500).send("No data found") })
});
router.post("/employees", (req, res) => {
    console.log("in post request");
    console.log(req.body);
    var emp = new Emp({
        // _id: req.body._id,
        empid: req.body.empid,
        ename: req.body.ename,
        sal: req.body.sal
    });
    emp.save().then((data) => { res.send(data); })
        .catch((err) => {
            res.status(500).send("No data found");
        });

})

//to update data in database and send updated object in json format
router.put("/employees/:id", (req, res) => {
    console.log(req.params.id)
    Emp.findOne({ empid: req.body.empid }) //{empid:req.params.id}
        .then((doc) => {
            console.log(doc);
            console.log("in request.body");
            console.log(req.body)
            doc.empid = req.body.empid;
            doc.ename = req.body.ename;
            doc.sal = req.body.sal;
            console.log("updated document");
            console.log(doc)
            doc.save().then((data) => {
                res.send(data);
            }).catch((err) => {
                res.status(500).send("No data found");
            });
        })
        .catch((err) => {
            res.status(500).send("No data found");
        })
});

//this will delete data from database and send message to user
router.delete("/employees/:id", (req, res) => {
    Emp.remove({ empid: req.params.id })
        .then(() => {
            res.send({ message: "deleted successfully" });
        })
        .catch((err) => {
            res.status(500).send("No data found");
        });
})

module.exports = router;