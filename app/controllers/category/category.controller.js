
const db = require('../../models');
const Category =  db.Category;

exports.fetchCategory = async (req,res)=>{
    try {

     const category = await  Category.find().exec()
            res.status(200).send({
                ...category
              });

              console.log(res)
              

    } catch (err) {
        res.status(500).send({ message: err.message || "Some error occurred during registration." });
    }
}