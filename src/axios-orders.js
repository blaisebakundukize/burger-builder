import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-b51d8.firebaseio.com'
})

export default instance;
