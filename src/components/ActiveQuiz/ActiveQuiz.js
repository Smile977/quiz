import React from 'react'
import classes from './ActiveQuiz.module.scss'
import AnswerList from '../../components/ActiveQuiz/AnswersList/AnswersList'

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{props.answerNumber}.</strong>&nbsp;
          {props.question}
        </span>

        <small>{props.answerNumber} из {props.quizLenth}</small>
      </p>

      <AnswerList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  )
}

export default ActiveQuiz
