import axios from "axios";

export default {
    async login(name,password, url){
        return await axios.post(url+'/auth/loggin',
        {
            username:name,
            password:password
        });
    }
}
