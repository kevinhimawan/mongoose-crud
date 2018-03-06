const Books = require('../models/books.model')
const Transactions = require('../models/transactions.model')

module.exports = {
    createBooks (req,res){
        const { isbn, title, author,category, stock } = req.body
        const newBooks = new Books({
            isbn, title, author,category, stock
        })

        newBooks.save((err, data) => {
            if (err) return res.status(500).json({message:'error'})
            return  res.status(201).json({message:'success', data})
        })
    },

    readBooks (req,res){
        Books
        .find()
        .exec()
        .then(result=>{
            res.status(200).send({
                result
            })
        }).catch(err=>{
            res.status(500).send(err)
        })
    },

    updateBooks(req,res){
        const id = req.params.id
        Books
        .update({_id: id},{$set: req.body})
        .then(result =>{
            res.status(200).send({
                result
            })
        }).catch(err=>{
            res.status(500).send(err)
        })
    },

    deleteBooks(req,res){
        const id = req.params.id
        Books
        .remove({_id:id})
        .exec()
        .then(result=>{
            res.status(200).send({
                result
            })
        }).catch(err =>{
            res.status(500).send(err)
        })
    },

    updateStock(req,res){
        Transactions.find().exec().then(transactions=>{
            const checkAllTransaction = transactions.map(transaction =>{
                console.log(transaction)
                return new Promise ((resolve,reject)=>{
                    const checkAllBook = transaction.booklist.map(book=>{
                        console.log(book)
                        return new Promise ((resolve,reject)=>{
                            Books.findById(book).then(bookData=>{
                                console.log(bookData)
                                const newStock = bookData.stock - 1
                                let newStockObj = {
                                    stock : newStock
                                }
                                Books.update({_id:book},{$set:newStockObj}).then(result =>{
                                    resolve(result)
                                }).catch(err=>{reject(err)})
                            })
                        })
                    })
                    Promise.all(checkAllBook).then(donePerTransaction =>{
                        resolve(donePerTransaction)
                    }).catch(err=>{reject(err)})
                })
            })

            Promise.all(checkAllTransaction).then(doneAllTransaction=>{
                Books.find().exec().then(allBooks=>{
                    res.status(200).send(allBooks)
                })
            })
        })
    }
}