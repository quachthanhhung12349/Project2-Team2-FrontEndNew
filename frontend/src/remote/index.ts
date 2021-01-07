import axios from 'axios'

export const MedicalSystemBaseClient = axios.create({
    baseURL:"",
    headers:{
        'Content-Type': "application/json"
    }
})