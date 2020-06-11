import Axios from 'axios';

const Api = Axios.create({
    baseURL: "https://songmusic.herokuapp.com"
})

export default Api;