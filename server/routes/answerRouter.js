const express = require('express');
const router = express.Router();
const AnswerController = require('../controllers/answerController');
const {isLogin} = require('../middleware/isLogin');

router.post('/', isLogin, AnswerController.addAnswer)
router.put('/unlike', isLogin, AnswerController.unLike)
router.put('/uplike', isLogin, AnswerController.upLike)
router.post('/byid', AnswerController.getByIdQuestion)
router.put('/', isLogin, AnswerController.updateAnswer)
router.delete('/', isLogin,  AnswerController.deleteAnswer)

module.exports = router;