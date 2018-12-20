const QuestionModel = require('../models/question.model')


class QuestionController {

    static addQuestion(req,res){
        const { title, description, tags } = req.body
        let dataQ = new QuestionModel({
            title: title,
            description: description,
            userId: req.currentuser.id             
        })
        for (let i = 0; i < tags.length; i++) {
            dataQ.tags.push(tags[i]) 
            console.log('---------',tags[i])
        }     
         
        dataQ.save()  
        .then((result) => {
            res.status(201).json({
                message: "Add question success",
                result
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: err })
        })
    }
    static getAllQuestion(req,res){
        QuestionModel
        .find({})
        .populate('userId')
        .then((result) => {
          res.status(200).json({
            message: "Get all question success",
            result
          })
        })
        .catch((err) => { 
            res.status(500).json({ error: err })
        })
    }
    static upLike(req,res){
        const userId = req.currentuser.id
        console.log(userId)
        const idQuestion = req.body.id
        QuestionModel
        .findOne({ _id : idQuestion, likes: { "$in" : [userId]} })
        .then((result) => {
            //console.log(result.likes.indexOf("5bcf0d717c4d261d47db225e"))
            if (result) {
                res.status(403).json({
                  message: 'User already Like'
                })
            }else {
                QuestionModel.findOneAndUpdate({ _id: idQuestion},{ $push: { likes: userId }})
                .then((result1) => {
                    console.log('ini pull unlikse')
                    QuestionModel.findOneAndUpdate({_id: idQuestion},{ $pull: { unLikes: {$in: [ userId ]} } })
                    .then((result) => {
                        res.status(200).json({ message: "upVote success", result })
                    }).catch((err) => {
                        res.status(500).json({ error: err })
                    });
                    
                })
                .catch((err) => {
                    res.status(500).json({ error: err })
                })
            }
        }).catch((err) => {
            res.status(500).json({ error: err })
        });
    }
    static unLike(req,res){
        const userId = req.currentuser.id
        const idQuestion = req.body.id
        QuestionModel
        .findOne({ _id : idQuestion, unLikes: { "$in" : [userId]} })
        .then((result) => {
            if (result) {
                res.status(403).json({
                  message: 'User already Unlike'
                })
            }else {
                QuestionModel.findOneAndUpdate({_id: idQuestion},{ $push: { unLikes: userId }})
                .then((result1) => {
                    console.log('ini pull likes')
                    QuestionModel.findOneAndUpdate({_id: idQuestion},{ $pull: { likes: {$in: [ userId ]} } })
                    .then((result) => {
                        res.status(200).json({
                            message: "downVote success",
                            result
                        })
                    }).catch((err) => {
                        res.status(500).json({ error: err })
                    });                 
                })
                .catch((err) => {
                    res.status(500).json({ error: err })
                })
            }
        }).catch((err) => {
            res.status(500).json({ error: err })
        });
    }
    static updateQuestion(req,res){
        const { id } = req.body
        const userId = req.currentuser.id
        let updateValue={};
        console.log('req.body',req.body)
        
        Object.assign(updateValue, 
            req.body.title ? { title: req.body.title } : null,
            req.body.description ? { description: req.body.description } : null,
            req.body.tags ? { $push: { tags: { $each: req.body.tags } } }  : null
        );
        console.log('updateValue',updateValue)
        QuestionModel
        .findOneAndUpdate({_id: id, userId: userId},{tags:[]})
        .then((dataupdate) => {
            QuestionModel.findOneAndUpdate({_id: id, userId: userId}, updateValue)
            .then((result) => {
                res.status(201).json({
                    message: "Update question success",
                    result
                })
            })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })

    }
    static QSearch (req, res) {
        //console.log('-----ssss')
        QuestionModel
        .find({title: new RegExp(req.body.search, 'i')})
        .populate('userId')
        .then((result) => {
          res.status(200).json({
            message: "Get filter",
            result
          })
        })  
    }
    static deleteQuestion(req,res){
        const { id } = req.body
        const userId = req.currentuser.id
        QuestionModel
        .findOneAndDelete({
            _id:id, 
            userId: userId
        })
        .then((result) => {
            console.log('delete',result)
            res.status(200).json({
                message: "Delete question success",
                result
            })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })      
    }
}

module.exports=QuestionController;