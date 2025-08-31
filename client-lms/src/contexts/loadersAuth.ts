import { redirect } from "react-router";
import { AuthService } from "../service/auth.service";

const loaderAuth = async (role: 'manager' | 'student') => {
    try {
        // get response 
        const response = await AuthService.getAuthUser();


        if (!response.success) {
            return redirect('/manager/sign-in');
        }

        if (!response.data) {
            return redirect('/manager/sign-in');
        }

        if (response.data.role !== role) {
            return redirect('/manager/sign-in');
        }


        return response.data;
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'something went wrong'
        }
    }
}

export default loaderAuth;