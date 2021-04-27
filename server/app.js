const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();//so that we can access when we need to

const dbService = require('./dbService');//we 
const { response } = require('express');

app.use(cors());//so when we have incoming API call it'll now block it and we will be able to send data to our backend
app.use(express.json());//so we will be able to send it in json format
app.use (express.urlencoded({extended:false}));

//create 
app.post('/insert',(request,response)=>{
    //const {name} = request.body; //destructuring
    const db =  dbService.getDBServiceInstance();
    const result = db.insertNewName( request.body);
    result
    .then(data => response.json({data:data}))
    .catch(err=> console.log(err));

});

//read
app.get('/getAll',(request,response)=>{
    const db =  dbService.getDBServiceInstance();
    const result = db.getAllData();

    result
    .then(data => response.json({data:data}))
    .catch (err => console.log(err));
    
});

app.get('/getSelected/:id',(request,response)=>{
    const{id}=request.params;
    const db =  dbService.getDBServiceInstance();
    const result = db.getSelectedRow(id);

    result
    .then(data => response.json({data:data}))
    .catch (err => console.log(err));
    
});


//update
app.patch('/update',(request,response)=>{

    const {id,itemname,qty,amt } = request.body
    const db =  dbService.getDBServiceInstance();
    const result = db.updateNameRowById(id,itemname,qty,amt);
    result
    .then(data => response.json({success:data}))
    .catch(err=> console.log(err));
});

//delete
app.delete('/delete/:id',(request,response)=>{
    const{id}=request.params;
    const db =  dbService.getDBServiceInstance();

    const result = db.deleteRowById(id);

    result
    .then(data => response.json({success:data}))
    .catch (err => console.log(err));

})
app.get('/search/:name',(request,response)=>{
    const{name}=request.params;
    const db =  dbService.getDBServiceInstance();

    const result = db.searchByName(name);

    result
    .then(data => response.json({data:data}))
    .catch (err => console.log(err));
})

app.listen(process.env.PORT,()=>console.log('app is running')); //start local server so that we know it is running