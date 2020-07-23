const db = require("../data/dbConfig.js");
const Joi = require("@hapi/joi")

const accountBodySchema = Joi.object({
  name: Joi.string().required(),
  budget: Joi.number().required()
})

const validateAccountBody = async (req, res, next) => {
    try{
      const value = await accountBodySchema.validateAsync(req.body);
      next();
    } catch(error){
      res.status(400).json(error.details[0].message)
    }
  }

  const validateAccountId = async (req, res, next) => {
    const {id} = req.params
  try {
    const accountById = await db("accounts").where("id", id)
    if(accountById.length === 0){
      res.status(404).json({message: "Account not found."})
    }else{
      req.account = accountById
      next();
    }
    
  } catch(error){
    res.status(500).json({error: "can not get account id at this time"})
  }
  }

  module.exports = {
  validateAccountBody,
  validateAccountId
}