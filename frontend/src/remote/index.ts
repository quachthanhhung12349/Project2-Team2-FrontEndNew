import axios from 'axios'

export const MedicalSystemBaseClient = axios.create({
    baseURL:"https://hospital-management-project-c2ee5ec6fcb6.herokuapp.com/",
    headers:{
        'Content-Type': "application/json"
    }
})
