import { MedicalSystemBaseClient } from "."

export const userLogin = async (credentials:any) => {

    try{
        let res = await MedicalSystemBaseClient.post('/login', credentials)

        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }

}

export const doctorRegister = async (doctorCredentials:any) => {
    try{
        let res = await MedicalSystemBaseClient.post('/doctorRegister', doctorCredentials)

        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}

export const patientRegister = async (patientCredentials:any) => {
    try{
        let res = await MedicalSystemBaseClient.post('/patientRegister', patientCredentials)

        return res.data;
    }catch(e){
        console.log(e);
        if(e.response){
            throw new Error(e.response.data)
        } else {
            throw new Error("OOps Something went wrong?")
        }
        
    }
}