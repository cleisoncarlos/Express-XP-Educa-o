import express from "express";
// importando filesistem com promisses pra nao precisar tratar callbacks
import {promises as fs} from 'fs'
import accountsRouter from './routes/accounts.js'

//-------------------------------
global.fileName = 'accounts.json'



//-------------------------------
const app = express()
app.use(express.json())
app.use('/accounts', accountsRouter)



// desestruturando file sistem
const {readFile, writeFile} = fs

app.listen(3001,  async  () => {

    try {
        await readFile(global.fileName)   
    } catch(err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }
        writeFile(global.fileName, JSON.stringify(initialJson)).then(()=> {
            console.log('API starteed and file created! ')
        }).catch(err => {
            console.log(err)
        })
    }  

    console.log("Rodando na porta 3001 !")
})