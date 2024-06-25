import React from 'react';

const answersList = [
    {
        id: 1,
        answer: 'Yes'
    },
    {
        id: 2,
        answer: 'No'
    },
    {
        id: 3,
        answer: 'None'
    },
];

const handleClick = (event) => {
    return event.target.value;
}

const QuizAnswers = (props) => {
    return (
        <div>
            {
                answersList.map((obj, key) => {
                    return (
                        <div key={obj.id}>
                            <input type="radio" id={key} value={obj.id} name="answer" onChange={(event)=>props.func(handleClick(event))} />{obj.answer}
                        </div>
                    )
                })
            }
        </div>
    ) 
}

export default QuizAnswers;