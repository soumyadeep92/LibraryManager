import axios from 'axios';
import { useState, useEffect } from 'react';

const QuizMaster = () => {
    const [questions, setQuestions] = useState({ questions: "", questionId: "", answerCount: "" });
    const [answers, setAnswers] = useState([{ answer: "", answerCount: "" }]);

    const CreateQuestions = (question, questionType, answerCount) => {
        axios.post('http://localhost:4000/api/v1/masterNode/quiz/questions/create', {
            "question": question,
            "question_type": questionType,
            "answers_count": answerCount
        }).then(res => {
            console.log(res);
            // setQuestions({ question: question, questionId: res.id, answerCount: answerCount })
        }).catch(err => {
            console.log(err);
        })
    }

    const CreateAnswers = (answer, answerType, questionId) => {
        axios.post('http://localhost:4000/api/v1/masterNode/quiz/answers/create', {
            "answer": answer,
            "answer_type": answerType,
            "question_id": questionId
        }).then(res => {
            console.log(res);
            // setAnswers(answer)
        }).catch(err => {
            console.log(err);
        })
    }

    const answersHandler = (event, index) => {
        let answer = event.target.value;
        // answers.push({ answer: answer, answerCount: questions.answerCount })
        setAnswers([...answers, { answer: answer, answerCount: questions.answerCount }]);
        console.log(index)
    }

    const questionsHandler = (event) => {
        let question = event.target.value;
        setQuestions({ questions: question, answerCount: "", questionId: "" })
    }

    const answerCountHandler = (event) => {
        let countAns = event.target.value;
        setQuestions({ questions: questions.questions, answerCount: countAns, questionId: "" });
    }

    // const chooseAnswerHandler = () => {
    //     let totalNoOfAnswers = parseInt(answers.answerCount);
    //     totalNoOfAnswers--;
    //     answers.answerCount = totalNoOfAnswers.toString();
    //     setAnswers({ answer: answers.answer, answerCount: answers.answerCount });
    // }

    return (
        <>
            <div>Enter your question: </div>
            <input type="text" value={questions.questions} onChange={questionsHandler} />
            <div>Number of answers: </div>
            <input type="text" value={questions.answerCount} onChange={answerCountHandler} />
            {
                parseInt(questions.answerCount) > 0 &&
                <>
                    <div>Type answers: </div>
                    {
                        new Array(parseInt(questions.answerCount)).fill(0).map((obj, ind) => {
                            return (
                                <div key={ind}>
                                    <input type="text" value={answers.answer} onChange={(ev) => answersHandler(ev, ind)} /><br />
                                </div>
                            )
                        })
                    }
                </>
            }
            <button onClick={() => {
                CreateQuestions(questions.questions, 'MCQ', questions.answerCount);
                answers.map(obj => {
                    CreateAnswers(obj.answer, 'MCQ', questions.questionId)
                })
            }}>Submit</button>
        </>
    )
}

export default QuizMaster;