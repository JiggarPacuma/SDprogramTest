//connect to our database and also let's us make qurey to db and get all data we need to

const mysql = require('mysql');
const dotenv =require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err)=>{
    if(err){
        console.log(err.message);
    }
   //console.log(connection.state);

});

class DbService{ //gona contain all the  update data, delete data, insert data

    static getDBServiceInstance(){
        return instance ? instance : new DbService();
        //if instance is not null, if it is not nullit means obj is already created so
        //return that otherwise we're gonna create a new instance
    }
    async getAllData(){
        try{
            //if the query is successfull we'll resolve it otherwise it will reject and go to catch block
            const response = await new Promise((resolve,reject)=> {
                const query = "SELECT * FROM items;";
                connection.query(query,(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })

            });
          //  console.log(response);
          return response;

        }catch(error){
            console.log(error);
        }
    }

    async getSelectedRow(id){
        
        try{
            //if the query is successfull we'll resolve it otherwise it will reject and go to catch block
            const response = await new Promise((resolve,reject)=> {
                const query = "SELECT * FROM items WHERE id = ?;";
                connection.query(query,id,(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })

            });
          //  console.log(response);
          return response;

        }catch(error){
            console.log(error);
        }
    }

    async insertNewName(name){
        try{
             
            //if the query is successfull we'll resolve it otherwise it will reject and go to catch block
            const insertId = await new Promise((resolve,reject)=> {
                const query = "INSERT INTO items(name,qty,amount) VALUES(?,?,?);";
                connection.query(query,[name.itemname, name.qty,name.amt],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })

            });
           // return response;
        }catch(error){
            console.log(error.message);
        }
    }

    async deleteRowById(id){
        try{
            id = parseInt(id,10);//base 10. no need for this but some browser don't work the same
            const response = await new Promise((resolve,reject)=> {
                const query = "DELETE FROM items WHERE id=?";
                connection.query(query,[id],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response===1? true : false;
        }catch(error){
            console.log(error);
            return false
        }
        
    }

    async updateNameRowById(id,itemname,qty,amt){
        try{
            id = parseInt(id,10);//base 10. no need for this but some browser don't work the same
            const response = await new Promise((resolve,reject)=> {
                const query = "UPDATE items SET name=?, qty=?, amount=? WHERE id=?;";
                connection.query(query,[itemname, qty,
                    amt, id],(err,result)=>{
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response===1? true : false;
        }catch(error){
            console.log(error);
            return false
        }
    }
    async searchByName(name){
        try{
            //if the query is successfull we'll resolve it otherwise it will reject and go to catch block
            const response = await new Promise((resolve,reject)=> {
                const query = "SELECT * FROM items WHERE name = ?;";
                connection.query(query,name,(err,results)=>{
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })

            });
          //  console.log(response);
          return response;

        }catch(error){
            console.log(error);
        }

    }

}

module.exports = DbService;