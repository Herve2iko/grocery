const categoryService = require("../services/categoryService");
const upload = require("../middleware/category,upload");

exports.create = (req , res, next)=>{
    upload(req, res, function (err){
        if (err) {
            next(err);
        }else{
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") :"";
            var model = {
                nom: req.body.nom, 
                description: req.body.description, 
                image: path != "" ? "/" + path : ""
            };
            categoryService.createCategory(model, (error, results)=>{
                if (error) {
                    return next(error);
                }else{
                    return res.status(201).send({
                        message: "Saved with success",
                        data: results,
                    });
                }
            });
        }
    });
};


exports.findAll = (req , res, next)=>{
    var model = {
        nom: req.body.nom,
        pageSize: req.query.pageSize,
        page: req.query.page,
    };
    categoryService.createCategories(model, (error, results)=>{
        if (error) {
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
};
exports.findOne = (req , res, next)=>{
    var model = {
        categoryId: req.params.id,
    };
    categoryService.createCategoryById(model, (error, results)=>{
        if (error) {
            return next(error);
        }else{
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
};

exports.update = (req , res, next)=>{
    upload(req, res, function (err){
        if (err) {
            next(err);
        }else{
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") :"";
            var model = {
                categoryId: req.params.id,
                nom: req.body.nom, 
                description: req.body.description, 
                image: path != "" ? "/" + path : ""
            };
            categoryService.updateCategory(model, (error, results)=>{
                if (error) {
                    return next(error);
                }else{
                    return res.status(201).send({
                        message: "Updated with success",
                        data: results,
                    });
                }
            });
        }
    });
};

exports.delete = (req , res, next)=>{
    var model = {
        categoryId: req.params.id,
    };
    categoryService.deleteCategory(model, (error, results)=>{
        if (error) {
            return next(error);
        }else{
            return res.status(200).send({
                message: "Delete with success",
                data: results,
            });
        }
    });
};