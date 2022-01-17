const res = require('express/lib/response');
const {expressValidate} = require('express-validator')
const {Client} = require('pg')
const client = new Client({
    host:'localhost',
    user:'postgres',
    database:'admin',
    password:'postgres',
    port:'5432'
});
client.connect((err,connection)=>{
        if(err)
            console.log('Database not connect properly. it has connection error!!',err);
        console.log('Connected successfully!!')
})


//Views users
exports.view =(req,res)=>{
    client.query('SELECT * from users',(err,result)=>{
        if(err)
            console.log("Query not correct. Home have the some issue")
    //    console.log(result.rows)
    let removedUser = req.query.removed;
    //res.render('home', { rows, removedUser });
      res.render("home",{rows:result.rows,removed:removedUser})
    })  
}

exports.find =(req,res)=>{
    let searchItem = req.body.search;
    client.query('SELECT * FROM users WHERE firstname=$1 or lastname=$1',[searchItem],(err,result)=>{
        if(err)
            console.log("Query not correct. Select have the some issue")
        console.log("Search query excuted")
        res.render("home",{rows:result.rows})
    })
}
 exports.form = (req,res) =>{
     console.log("dss")
     res.render("add-user",)
 }

exports.create =(req,res)=>{     
    let data = req.body;
    res.json(data)

    const error = expressValidate(req);
    if(!error.isEmpty()){
        return res.status(422).jsonp(error.arry())
    }
    // let firstname =data.first_name;
    // let lastname = data.last_name;
    // let email =data.Email;
    // let mobile = data.moile;
    // client.query('INSERT INTO users(firstname, lastname, email,mobile) VALUES($1,$2,$3,$4) RETURNING *',[firstname,lastname,email,mobile],(err,result)=>{
    //     if(err){
    //         console.log("Insert not correct. Query have the some issue",err)
    //     }else{    
    //     msg = "User added successfully!!"
    //     res.render("add-user", {alert:msg})
    //     }
    // })
}


exports.edit =(req,res)=>{
    let regid = req.params.id;
    console.log(regid)
    client.query('SELECT * from users WHERE  regid = $1', [regid],(err,result)=>{
        if(err)
            console.log("Query not correct. Edit have the some issue")
        res.render("edit-user",{rows:result.rows})
    })  

}


exports.update =(req,res)=>{
    let data = req.body;
    let firstname =data.first_name;
    let lastname = data.last_name;
    let email =data.Email;
    let mobile = data.moile;
    let regid = req.params.id;
  //console.log(regid)
    client.query('UPDATE users SET firstname= $1, lastname = $2 , email =$3 ,mobile = $4 WHERE  regid = $5', [firstname,lastname,email,mobile,regid],(err,result)=>{
        if(err)
            console.log("Query not correct. Query have the some issue")
        console.log("Update query run")    
        client.query('SELECT * from users WHERE  regid = $1', [regid],(err,result)=>{
            if(err)
                console.log("Query not correct. update have the some issue")
            msg = "User updated successfully!!"
            res.render("edit-user",{rows:result.rows, alert:msg})
        })
//        res.render("edit-user",{rows:result.rows})
    })  

}

//delete user
exports.delete =(req,res)=>{
    let regid = req.params.id;
    console.log("posttt",regid)
    client.query('DELETE FROM users WHERE  regid = $1', [regid],(err,result)=>{
        if(err)
            console.log("Query not correct. Delete have the some issue")
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/?removed=' + removedUser);
        
    })  
}

//View All 
exports.viewall =(req,res) => {
    let regid = req.params.id;
    console.log(regid)
    client.query('SELECT * from users WHERE  regid = $1', [regid],(err,result)=>{
        if(err)
            console.log("Query not correct. viewall have the some issue")
        res.render("view-user",{rows:result.rows})
    })  

}



