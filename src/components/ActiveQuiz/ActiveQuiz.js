import React from 'react'
import classes from './ActiveQuiz.module.scss'
import AnswerList from '../../components/ActiveQuiz/AnswersList/AnswersList'

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>2.</strong>&nbsp;
          Какого цвета небо?
        </span>

        <small>4 из 12</small>
      </p>

      <AnswerList
        answers={props.answers}
      />
    </div>
  )
}

export default ActiveQuiz
