const router = require('express');
const quizMasterController = require('../controllers/quizMasterController');

const route = router.Router();

route.post('/quiz/questions/create', quizMasterController.questionsCreate);
route.post('/quiz/answers/create', quizMasterController.answersCreate);
route.post('/quiz/sequence/create', quizMasterController.sequenceCreate);
route.post('/quiz/sample', quizMasterController.sampleQuizPage);
route.get('/quiz/all/questions', quizMasterController.allQuestions);
route.get('/quiz/one/question/:question_id', quizMasterController.getOneQuestion);
route.delete('/quiz/delete/question/:questionId', quizMasterController.deleteQuestionsById);

module.exports = route;