const { response } = require("express");
const { category } = require("../models/categoryModel");
const { MONGO_DB_CONFIG } = require("../config/app.config");

async function createCategory(params,callback) {
    if (params.nom) {
        return callback({
            message: "Category name required"
        },"")
    }
    const model = new category(params);
    model.save().then((response)=>{
        return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    });
}
async function getCategories(params,callback) {
    const categoryName = params.nom;  
    var condition = categoryName ? { categoryName :{ $regex: new RegExp(categoryName), $options: "i"},}:{};
    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    category
        .find(condition, "nom image")
        .limit(pageSize).skip(perPage * page)
        .then((response)=>{
            return callback(null,response);
        }).catch((error)=>{
            return callback(error);
        });
}
async function getCategoryById(params,callback) {
    const idCategory = params.idCategory;
    category.findById(idCategory)
    .then((response)=>{
        if (!response) return callback("categorie with that ID that's not exit");
        else return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    });
    
}
async function updateCategory(params,callback) {
    const idCategory = params.idCategory;
    category.findByIdAndUpdate(idCategory,params,{useFindAndModify:false})
    .then((response)=>{
        if (!response) return callback("categorie with that ID that's not exit");
        else return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    });
    
}

async function deleteCategory(params,callback) {
    const idCategory = params.idCategory;
    category.findByIdAndDelete(idCategory,params,{useFindAndModify:false})
    .then((response)=>{
        if (!response) return callback("categorie with that ID that's not exit");
        else return callback(null,response);
    }).catch((error)=>{
        return callback(error);
    });
    
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory   
}