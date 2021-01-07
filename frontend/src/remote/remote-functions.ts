import { MedicalSystemBaseClient } from "."

// export const userLogin = async (username:string, password:string) => {
//     let credentials = {
//         username,
//         password
//     }

//     try{
//         let res = await MedicalSystemBaseClient.post('/login', credentials)
        
//         return res.data
//     }catch(e){
//         console.log(e);
//         if(e.response){
//             throw new Error(e.response.data)
//         } else {
//             throw new Error("OOps Something went wrong?")
//         }
        
//     }

// }