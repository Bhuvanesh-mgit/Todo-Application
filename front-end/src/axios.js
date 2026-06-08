import axios from "axios"

const AxiosApi = axios.create({
  baseURL: 'http://localhost:4000/api/todo',

});


export default AxiosApi