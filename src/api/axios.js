
const axios = require('axios')

const instance = axios.create({
    baseURL: ' http://ec2-3-123-32-242.eu-central-1.compute.amazonaws.com:8080/',
})


export default class API {

    async login(payload) {
        try {
            return await instance.post('/login', payload)
        } catch (error) {
            console.log('axios error', error)
            return error
        }
    }

    async register(payload) {
        console.log('api/register/payload', payload)
        
        try {
            return await instance.post('api/user/add', payload)
        } catch (error) {
            console.log('axios error', error)
            return error
        }
    }

}