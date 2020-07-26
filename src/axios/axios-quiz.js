import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz2-e7d7a.firebaseio.com/'
})