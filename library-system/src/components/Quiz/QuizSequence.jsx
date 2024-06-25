import { useEffect, useState } from 'react';
import axios from 'axios';

export const QuizSequence = () => {
    const [allQuestions, setAllQuestions] = useState([]);
    const [questionById, setQuestionById] = useState({ _id: "", question: "", question_type: "", answers_count: "", select_flag: "false" });
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [sequenceQuestions, setSequenceQuestions] = useState([]);
    const [sampleQuestions, setSampleQuestions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/masterNode/quiz/all/questions').then(res => {
            setAllQuestions(res?.data.quizDetails);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const setSelectQuestions = (event, selectOperation) => {
        if (selectOperation === '>>') {
            let indexOfSelect = allQuestions.findIndex(obj => {
                return obj._id === event.target.id
            });
            let quesObj = allQuestions[indexOfSelect];
            setQuestionById({ _id: quesObj._id, question: quesObj.question, question_type: quesObj.question_type, answers_count: quesObj.answers_count, select_flag: "false" });
        } else if (selectOperation === '<<') {
            let indexOfSelect = selectedQuestions.findIndex(obj => {
                return obj._id === event.target.id
            });
            let quesObj = selectedQuestions[indexOfSelect];
            setQuestionById({ _id: quesObj._id, question: quesObj.question, question_type: quesObj.question_type, answers_count: quesObj.answers_count, select_flag: "false" });
        } else {

        }
    }

    const setSequenceArr = (selectOperation) => {
        if (selectOperation === '>>') {
            let selectId = questionById._id;
            let selectQuestions = allQuestions.filter(obj => obj._id !== selectId);
            setQuestionById({ _id: questionById._id, question: questionById.question, question_type: questionById.question_type, answers_count: questionById.answers_count, select_flag: "true" });
            setAllQuestions(selectQuestions);
            setSelectedQuestions([...selectedQuestions, { _id: questionById._id, question: questionById.question, question_type: questionById.question_type, answers_count: questionById.answers_count, select_flag: "true" }]);
        } else if (selectOperation === '<<') {
            let selectId = questionById._id;
            setQuestionById({ _id: questionById._id, question: questionById.question, question_type: questionById.question_type, answers_count: questionById.answers_count, select_flag: "false" });
            setAllQuestions([...allQuestions, { _id: questionById._id, question: questionById.question, question_type: questionById.question_type, answers_count: questionById.answers_count, select_flag: "false" }]);
            let unselectQuestion = selectedQuestions.filter(obj => obj._id !== selectId);
            setSelectedQuestions(unselectQuestion);
        } else {

        }
    }

    const handleSubmit = () => {
        for (let i = 0; i < selectedQuestions.length; i++) {
            let quesObj = {
                question_id: selectedQuestions[i]._id
            }
            axios.post('http://localhost:4000/api/v1/masterNode/quiz/sequence/create', quesObj).then(res => {
                setSequenceQuestions(res?.data.sequenceDetails);
            }).catch(err => {
                console.log(err);
            })
        }
        let selectedQuestionIds = selectedQuestions.map(obj => obj._id);
        let selQuesId = {
            question_id: selectedQuestionIds
        }
        axios.post('http://localhost:4000/api/v1/masterNode/quiz/sample', selQuesId).then(res => {
            let resArr = res.data.quizDetails;
            sampleQuestions.push(resArr)
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            {
                allQuestions.map((obj, ind) => {
                    return (
                        <div key={ind}>
                            <div id={obj._id} onClick={(ev) => setSelectQuestions(ev, '>>')}>{obj.question}</div>
                        </div>
                    )
                })
            }
            <button onClick={() => setSequenceArr('>>')}>{'>>'}</button>
            <button onClick={() => setSequenceArr('<<')}>{'<<'}</button>
            {
                selectedQuestions.map((obj, ind) => {
                    return (
                        <div key={ind}>
                            <div id={obj._id} onClick={(ev) => setSelectQuestions(ev, '<<')}>{obj.question}</div>
                        </div>
                    )
                })
            }
            <button onClick={handleSubmit}>Submit</button>
            {
                sampleQuestions.map((obj, ind1) => {
                    return (
                        <div key={ind1}>
                            {/* <iframe title={ind1}> */}
                            {
                                obj.map((elem, ind2) => {
                                    let question = elem['questionDetails'];
                                    let answer = elem['answerDetails'];
                                    return (
                                        <div key={ind2}>
                                            <br />
                                            {question.question}
                                            {
                                                answer.map((ans, ind3) => {
                                                    return (
                                                        <div key={ind3}>
                                                            <input type="radio" />{ans.answer}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                            {/* </iframe> */}
                        </div>
                    )
                })
            }
        </>
    );
};
