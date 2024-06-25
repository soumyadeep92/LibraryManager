const mongoose = require('mongoose');

var QuizQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    question_type: {
        type: String,
        required: true
    },
    answers_count: {
        type: Number,
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

var QuizQuestionModel = new mongoose.model('quiz-questions',QuizQuestionsSchema);
module.exports = QuizQuestionModel;