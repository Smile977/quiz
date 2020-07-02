import React, {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

export default class Quiz extends Component {
  state = {
    results: {}, // {[id]: 'success' / 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {[id]: 'success' / 'error'}
    quiz: [
      {
        id: 1,
        question: 'Какого цвета небо?',
        rightAnswerId: 2,
        answers: [
          {id: 1, text: 'Черный'},
          {id: 2, text: 'Синий'},
          {id: 3, text: 'Крсный'},
          {id: 4, text: 'Зеленый'}
        ]
      },
      {
        id: 2,
        question: 'В каком году основали Санкт-Петукбург?',
        rightAnswerId: 3,
        answers: [
          {id: 1, text: '1700'},
          {id: 2, text: '1702'},
          {id: 3, text: '1703'},
          {id: 4, text: '1803'}
        ]
      }
    ]
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.activeQuestion)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }
    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {

      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout)
      }, 1000)


    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }
  }

  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null
    })
  }

  componentDidMount() {
    console.log('Quiz ID ', this.props.match.params.id)
  }

  render() {
    return (
      <div className={classes.Quiz}>

        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.isFinished
              ? <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRetry={this.retryHandler}
              />
              : <ActiveQuiz
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLenth={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }
        </div>
      </div>
    )
  }
}
