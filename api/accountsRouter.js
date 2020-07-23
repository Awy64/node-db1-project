const express = require("express")
const router = express.Router()
const db = require("../data/dbConfig.js");
const {validateAccountBody, validateAccountId} = require("./middleWare.js")

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts")
    res.status(200).json(accounts)
  } catch(error){
    res.status(500).json({error: "can not get accounts at this time"})
  }
})

router.get("/:id", validateAccountId, (req, res) => {
  res.status(200).json(req.account)
})


router.post("/", validateAccountBody, async (req, res) => {
  try {
    const newAccount = await db("accounts").insert(req.body)
    res.status(201).json({...req.body, id: newAccount[0]})
  } catch(error){
    res.status(500).json({error: "can not add a new account at this time.", err: error})
  }
})

router.put("/:id",validateAccountBody, validateAccountId, async (req, res) => {
  const {id} = req.params;
  try {
    const accountUpdated = await db('accounts').where("id", id).update(req.body)
    if(accountUpdated === 1){
      res.status(201).json({message: "account updated", data: req.body})
    }else{
      res.status(400).json({message: "account not updated"})
    }
  } catch(error){
    res.status(500).json({error: "can not update account at this time.", err: error})
  }
})

router.delete("/:id",validateAccountBody, validateAccountId, async (req, res) => {
  const {id} = req.params;
  try {
    const accountUpdated = await db('accounts').where("id", id).del()
    if(accountUpdated === 1){
      res.status(201).json({message: "account deleted"})
    }else{
      res.status(400).json({message: "account not deleted"})
    }
  } catch(error){
    res.status(500).json({error: "can not update account at this time.", err: error})
  }
})




module.exports = router;