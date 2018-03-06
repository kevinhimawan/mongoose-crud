const Transactions = require('../models/transactions.model')

module.exports = {
    createTransaction (req,res){
        const memberid = req.body.member
        const booksid = req.body.booklist
        
        const newTransactions = new Transactions ()
        newTransactions.member = memberid
        newTransactions.days = Number(req.body.days)
        newTransactions.out_date = new Date ()
        newTransactions.due_date = new Date().setDate(new Date().getDate() + Number(req.body.days));
        newTransactions.booklist = booksid

        newTransactions.save((err,result)=>{
            if(err)return res.status(500).send(err)
            return res.status(201).send(result)
        })
    },

    readTransactions (req,res){
        Transactions
        .find()
        .exec()
        .then(result=>{
            res.status(200).send(result)
        }).catch(err=>{
            res.status(500).send(err)
        })
    },

    deleteTransactions(req,res){
        const id = req.params.id
        Transactions.remove({_id:id},(err,done)=>{
            if(err)return res.status(500).send(err)
            return res.status(200).send(done)
        })
    },

    updateTransactions(req,res){
        const id = req.params.id
        Transactions
        .findById(id)       
        .then(previousData=>{
            const inDate = new Date(req.body.in_date)
            const timeDiff = inDate - previousData.due_date
            const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
            
            Transactions
            .update({_id:id},{$set:{in_date:inDate,fine:diffDays*1000}})
            .then(result=>{
                res.status(201).send(result)
            }).catch(err=>{
                res.status(500).send(err)
            })
        })
    }
}