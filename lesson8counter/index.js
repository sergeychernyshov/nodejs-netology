const express = require('express')
const redis = require("redis");

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || 'localhost'

const client = redis.createClient(`redis://${REDIS_URL}`)
const app = express()

app.post('/counter/:bookId/incr',(req,res)=>{
    const { bookId } = req.params
    client.incr(bookId,(err,rep)=>{
        if(err){
            res.status(500).json({error:"Redis fail"})
        }else{
            res.json({message:`${bookId}`,cnt:rep})
        }
    })
})

app.get('/counter/:bookId',(req,res)=>{
    const { bookId } = req.params
    client.get(bookId, (err, rep) => {
        if(err){
            res.status(500).json({error:"Redis fail"})
        }else{
            res.json({message:`${bookId}`,cnt:rep})
        }
    });
})


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})



