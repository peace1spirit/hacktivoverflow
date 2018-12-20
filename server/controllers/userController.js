const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const CronJob = require('cron').CronJob
const sgMail = require('@sendgrid/mail')
const axios = require('axios')
class UserController {

    static register (req,res){    
        let imageUrl =''
        if (req.hasOwnProperty('file'))
            imageUrl=req.file.cloudStoragePublicUrl
        const { name,email, password } = req.body
        UserModel
        .create({ 
            name:name,
            email:email, 
            imageUrl:imageUrl, 
            password: password,
            oauth: 0
         })
        .then((result) => {
            new CronJob('* * 31 12 *', function() {
                sgMail.setApiKey(process.env.SENDGRID)
                const msg = {
                    to: email,
                    from: 'test@example.com',
                    subject: 'Happpy new year from hacktiveoverflow',
                    text: 'Happpy new year from hacktiveoverflow',
                    html: `<p>Hello, ${name}, Happpy new year from hacktiveoverflow </p>`,
                }
                sgMail.send(msg)
            }, null, true, 'Asia/Jakarta')
            res.status(201).json({
                message: "Register success",
                result
            })
        }).catch((err) => {
            res.status(500).json({ error: err })
        });
    }
    static login (req,res){
        const { email, password } = req.body
        UserModel
        .findOne({ email: email })
        .then(result => {
            let flag = bcrypt.compareSync(password, result.password);
            if(flag) {
                const Payload= {
                    id: result._id,
                    name: result.name,
                    email: result.email,
                    oauth: result.oauth,
                    role: result.role
                }
                res.status(200).json({
                    message: 'Login success',
                    token: jwt.sign(Payload, process.env.JWT),
                    user: Payload
                })
            } else {
                reject()
            }    
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ error: err })
        })
    }
    static googlelogin(req,res){
        var googleToken= req.headers.googletoken;
        axios({
            method:'GET',
            url:`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken}`
            
        })
        .then(function(response){
            UserModel.findOne({email:response.data.email})
            .then(result=>{
                if(result==null){
                    UserModel.create({ //jika tidak ada maka login berdasarkan oauth,password empty
                        name: response.data.name, 
                        email: response.data.email,
                        oauth: 1
                    })
                    .then(usercreate=>{
                        //console.log('usercreated', usercreate )
                        const payload={
                            id: usercreate._id,
                            name: response.data.name, 
                            email: response.data.email,
                            oauth: 0
                         };   
                         let token=jwt.sign(payload,process.env.JWT)
                         res.status(200).json({user:payload,token:token}) 
                    })      
                    .catch(err=>{
                        res.status(500).json({message:err.message})
                    })           
                }
                else{
                    const payload={
                        id: result._id,
                        name: response.data.name, 
                        email: response.data.email,
                        oauth: 0
                    };   
                    let token=jwt.sign(payload,process.env.JWT)
                    res.status(200).json({user:payload,token:token})  
                }
            })       
        })
        .catch(function(err){
            res.status(500).json({message:err.message})
        })
            
    }
    static getuser (req,res){
        const Payload= {
            id: req.currentuser._id,
            name: req.currentuser.name,
            email: req.currentuser.email,
            role: req.currentuser.role
        }
        res.status(200).json({
            message: 'Login success',
            user: Payload
        })
    }
    static userUpdate (req, res) {  
        let updateValue={}; 
        console.log('updateee----------')
        Object.assign(updateValue, 
            req.body.name ? { name : req.body.name } : null,
            req.body.email ? { email : req.body.email } : null,
            req.body.password ? { password: req.body.password } :null
        );
        console.log(updateValue)
        UserModel
            .findOneAndUpdate(
                { _id: req.currentuser._id },updateValue)
            .then((result) => {
                return res.status(200).json({
                    message: "User Successfully Updated",
                    result
                })
            }).catch((err) => {
                res.status(500).json({ message: 'Error!!', err });
            });
    }
}
module.exports = UserController