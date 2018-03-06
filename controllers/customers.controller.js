const Customers = require('../models/customers.model')

module.exports = {
    createCustomers (req,res){
        const { name, memberid, address, zipcode, phone } = req.body
        const newCustomer = new Customers ({
            name, memberid, address, zipcode, phone
        })
        newCustomer.save((err,data)=>{
            if(err)return res.status(500).send(err)
            return res.status(201).send({message: `Create successfuly` ,data})
        })
    },

    readCustomers (req,res){
        Customers
        .find()
        .exec()
        .then(result =>{
            res.status(200).send(result)
        }).catch(err=>{
            res.status(500).send(err)
        })
    },

    updateCustomers (req,res){
        const id = req.params.id
        Customers
        .update({_id:id},{$set: req.body})
        .then(result =>{
            res.status(200).send(result)
        }).catch(err=>{
            res.status(500).send(err)
        })
    },

    deleteCustomers (req,res){
        const id = req.params.id
        Customers.remove({_id:id},(err,result)=>{
            if(err) return res.status(500).send(err)
            return res.status(201).send(result)
        })
    }
}