var moment = require('moment');
const QuizQuestions = require('../models/QuizQuestionsModel');
const QuizAnswers = require('../models/QuizAnswerModel');
const QuizQuestionMapper = require('../models/QuizQuestionMapperModel');
const QuizSequence = require('../models/QuizSequenceModel');
const resCommon = require('../config/responseConfig');

const quizMasterController = {
    questionsCreate: {},
    answersCreate: {},
    sequenceCreate: {},
    sampleQuizPage: {},
    allQuestions: {},
    deleteQuestionsById: {}
}

quizMasterController.questionsCreate = async (req, res) => {
    try {
        const { question, question_type, answers_count } = req.body;
        let date_create = moment().format('Y-M-D H:m:s');
        let questionsObj = {
            question: question,
            question_type: question_type,
            answers_count: answers_count,
            created_by: 0,
            created_at: date_create
        }
        const questionDetails = await QuizQuestions.create(questionsObj);
        res.status(200).json({ "message": "Quiz questions created successfully", "questionDetails": questionDetails })
    } catch (err) {
        res.status(400).json({ "message": "Data not found", "questionDetails": {} });
    }
}

quizMasterController.answersCreate = async (req, res) => {
    try {
        const { answer, answer_type, question_id } = req.body;
        let date_create = moment().format('Y-M-D H:m:s');
        let answersObj = {
            answer: answer,
            answer_type: answer_type,
            created_by: 0,
            created_at: date_create
        }
        const answersDetails = await QuizAnswers.create(answersObj);
        const mapperObj = {
            questionId: question_id,
            answerId: answersDetails.id,
            created_by: 0,
            created_at: date_create
        }
        await QuizQuestionMapper.create(mapperObj);
        res.status(200).json({ "meassage": "Quiz answers created successfully", "answerDetails": answersDetails })
    } catch (err) {
        console.log(err)
        res.status(400).json({ "message": "Data not found", "answerDetails": {} });
    }
}

quizMasterController.allQuestions = async (req, res) => {
    try {
        let quizQuestions = await QuizQuestions.find();
        res.status(200).json({ "message": "Quiz questions fetched successfully", "quizDetails": quizQuestions });
    } catch (err) {
        console.log(err)
        res.status(400).json({ "message": "Data not found", "answerDetails": {} });
    }
}

quizMasterController.getOneQuestion = async (req, res) => {
    try {
        let questionId = req.params.question_id;
        let quizQuestions = await QuizQuestions.findOne({ "id": questionId });
        res.status(200).json({ "message": "Quiz questions fetched successfully", "quizDetails": quizQuestions });
    } catch (err) {
        console.log(err)
        res.status(400).json({ "message": "Data not found", "answerDetails": {} });
    }
}

quizMasterController.deleteQuestionsById = async (req, res) => {
    try {
        let questionId = req.params.questionId;
        let quizQuestions = await QuizQuestions.deleteOne({ "_id": questionId });
        res.status(200).json({ "status": true, "message": "Quiz questions deleted successfully" });
    } catch (err) {
        console.log(err)
        res.status(400).json({ "status": false, "message": "Data not found", "answerDetails": {} });
    }
}

quizMasterController.sequenceCreate = async (req, res) => {
    try {
        const { question_id } = req.body;
        let answerDetails = await QuizQuestionMapper.find({ "questionId": question_id });
        let date_create = moment().format('Y-M-D H:m:s');
        if (answerDetails.length > 0) {
            for (let i = 0; i < answerDetails.length; i++) {
                let sequenceObj = {
                    question_id: question_id,
                    answer_id: answerDetails[i]._id,
                    is_active: '1',
                    created_by: 0,
                    created_at: date_create
                };
                await QuizSequence.create(sequenceObj);
            }
            const sequenceDetails = await QuizSequence.find({ "question_id": question_id });
            res.status(200).json({ "meassage": "Quiz sequence created successfully", "sequenceDetails": sequenceDetails });
        } else {
            res.status(200).json({ "meassage": "Quiz sequence not created", "sequenceDetails": [] });
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ "message": "Data not found", "sequenceDetails": {} });
    }
}

quizMasterController.sampleQuizPage = async (req, res) => {
    try {
        let questionIds = req.body.question_id;
        let quizDetails = [];
        for (let i = 0; i < questionIds.length; i++) {
            let answerArr = [];
            let quizObj = {
                questionDetails: {},
                answerDetails: []
            };
            let questionDetails = await QuizQuestions.findOne({ "_id": questionIds[i] });
            let mapDetails = await QuizQuestionMapper.find({ "questionId": questionIds[i] });
            if (mapDetails.length > 0) {
                for (let j = 0; j < mapDetails.length; j++) {
                    let answerDetails = await QuizAnswers.findOne({ "_id": mapDetails[j].answerId });
                    if (answerDetails) {
                        answerArr.push(answerDetails);
                    }
                }
            }
            quizObj['questionDetails'] = questionDetails;
            quizObj['answerDetails'] = answerArr;
            quizDetails.push(quizObj);
        }
        res.status(200).json({ "meassage": "Quiz sequence retrieved successfully", "quizDetails": quizDetails });
    } catch (err) {
        res.status(400).json({ "message": "Data not found", "sequenceDetails": {} });
    }
}

module.exports = quizMasterController;