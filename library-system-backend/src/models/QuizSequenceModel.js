const mongoose = require('mongoose');

var QuizSequenceSchema = new mongoose.Schema({
    question_id: {
        type: String,
        required: true
    },
    answer_id: {
        type: String,
        required: true
    },
    is_active:{
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

var QuizSequenceModel = new mongoose.model('quiz-sequence',QuizSequenceSchema);
module.exports = QuizSequenceModel;