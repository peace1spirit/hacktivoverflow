const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/questionController');
const { isLogin } = require('../middleware/isLogin');

router.post('/', isLogin, QuestionController.addQuestion)
router.put('/unlike', isLogin, QuestionController.unLike)
router.put('/uplike', isLogin, QuestionController.upLike)
router.get('/', QuestionController.getAllQuestion)
router.put('/', isLogin, QuestionController.updateQuestion)
router.delete('/', isLogin,  QuestionController.deleteQuestion)
router.post('/search', QuestionController.QSearch)

module.exports = router;