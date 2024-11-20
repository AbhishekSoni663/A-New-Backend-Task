const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
require("dotenv").config()

const port = process.env.PORT || 3000



const getFileData = (filePath , res) =>{
    fs.readFile(filePath , 'utf-8' , (err,data)=>{
        if(err){
            res.status(500).send("Error reading file")
        }else{
            return res.send(data)
        }
    })
}


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    const filePath = path.join(__dirname , 'text.txt')
    getFileData(filePath , res)
})

app.get('/form',(req,res)=>{
    const filePath = path.join(__dirname , 'form.txt')
    getFileData(filePath ,res)
})

app.get('/profile',(req,res)=>{
    const filePath = path.join(__dirname , "profile.txt")
    fs.readFile(filePath , "utf-8" , (err , data)=>{
        if(err){
            res.status(500).send("Error in reading")
        }else{
            const {name = "abhi" , age="N/A" , bio = "no bio provided"} = req.query;
            const dynamicContent = data
                .replace('{{name}}', name)
                .replace('{{age}}', age)
                .replace('{{bio}}', bio)
            res.send(dynamicContent)
        }
    })
})
app.listen(port,()=>{
    console.log(`Server is Running at Port : ${port}`)
})