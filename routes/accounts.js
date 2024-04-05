import express from "express";
import { promises as fs } from "fs";

const router = express.Router();

// desestruturando file sistem
const { readFile, writeFile } = fs;

router.post("/", async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    account = {id: data.nextId++, ...account}     
    data.accounts.push(account);
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});


router.get('/', async (req, res) => {
    try{
        const data = JSON.parse(await readFile(global.fileName));
        res.send(data)
    } catch(err){
        res.send(err)

    }
})




router.get('/:id', async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
      const account =  data.accounts.find(
        account => account.id === parseInt(req.params.id))
        res.send(account)
        
    } catch(err){
        res.send(err)
    }
})



router.delete('/:id', async (req, res) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

       data.accounts =  data.accounts.filter(
        account => account.id !== parseInt(req.params.id));  

        await writeFile(global.fileName, JSON.stringify(data));
        res.end()
      
    }catch(err){
      
         res.status(400).json({msg:'Error'});
    }    
})
 
export default router;
