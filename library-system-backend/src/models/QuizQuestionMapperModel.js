const mongoose = require('mongoose');

var QuizQuestionMapSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true
    },
    answerId:{
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_by: {
        type: String,
    },
    updated_at: {
        type: Date,
    }
});

var QuizQuestionMapModel = new mongoose.model('quiz-questions-answers',QuizQuestionMapSchema);
module.exports = QuizQuestionMapModel;