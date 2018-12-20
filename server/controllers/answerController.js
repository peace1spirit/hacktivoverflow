const AnswerModel = require('../models/answer.model')

class AnswerController {
    static addAnswer(req,res){
      const { answer, questionId } = req.body
      const userId =req.currentuser.id
      AnswerModel
      .create({
        answer: answer,
        userId: userId,
        questionId : questionId,
      })
      .then(result => {
        res.status(201).json({
          message: "Add answer success",
          result: result
        })
      })
      .catch(err => {
        res.status(500).json({ error : err })
      })
    }

    static getByIdQuestion(req,res){
        const { questionId } = req.body
        console.log('lala',questionId)
        AnswerModel
        .find({ questionId: questionId })
        .populate('userId')
        .populate('questionId')
        .then((result) => {
          res.status(200).json({
            message: 'Get answer success',
            result
          })
        })
        .catch((err) => {
          res.status(500).json({ error : err });
        })
    }
    
    static updateAnswer(req,res){
        const { id } = req.body
        const userId = req.currentuser.id
        let updateValue={};
        Object.assign(updateValue, 
            req.body.answer ? { answer: req.body.answer } : null
        );
        console.log('update as',updateValue)
        AnswerModel
        .findOneAndUpdate(
            {
                _id: id, 
                 userId: userId            
            },
            updateValue  
          )
        .then((result) => {
            if (result) {
                res.status(201).json({
                    message: "Update answer success",
                    result
                })
            } else {
                res.status(401).json({ message: "Authorization failed" })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: err })
        })
    }
    static upLike(req,res){
        const userId = req.currentuser.id
        console.log(userId)
        const idAnswer = req.body.id
        AnswerModel
        .findOne({ _id : idAnswer, likes: { "$in" : [userId]} })
        .then((answer) => {
            if (answer) {
                res.status(403).json({
                  message: 'User already Like'
                })
            }else {
                AnswerModel.findOneAndUpdate({ _id: idAnswer},{ $push: { likes: userId }})
                .then((result1) => {
                    console.log('ini pull unlikse')
                    AnswerModel.findOneAndUpdate({_id: idAnswer},{ $pull: { unLikes: {$in: [ userId ]} } })
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
        const idAnswer = req.body.id
        AnswerModel
        .findOne({ _id : idAnswer, unLikes: { "$in" : [userId]} })
        .then((result) => {
            if (result) {
                res.status(403).json({
                  message: 'User already Unlike'
                })
            }else {
                AnswerModel.findOneAndUpdate({_id: idAnswer},{ $push: { unLikes: userId }})
                .then((result1) => {
                    console.log('ini pull likes')
                    AnswerModel.findOneAndUpdate({_id: idAnswer},{ $pull: { likes: {$in: [ userId ]} } })
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
    static deleteAnswer(req,res){
        const { id } = req.body
        const userId = req.currentuser.id
        AnswerModel
        .findOneAndDelete({
            _id:id, 
            userId: userId
        })
        .then((result) => {
            res.status(200).json({
            message: "Delete answer success",
            result
            })
        })
        .catch((err) => {
            res.status(500).json({ error: err })
        })   
    }
}

module.exports = AnswerController