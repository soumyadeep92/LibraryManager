const mongoose = require('mongoose');

var QuizAnswersSchema = new mongoose.Schema({
    answer: {
        type: String,
        required: true
    },
    answer_type: {
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

var QuizAnswersModel = new mongoose.model('quiz-answers',QuizAnswersSchema);
module.exports = QuizAnswersModel;