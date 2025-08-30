import { AuthService } from "../service/auth.service";

const loaderAuth = async (role: 'manager' | 'student') => {
    try {
        // get response 
        const response = await AuthService.getAuthUser();

        if (!response.success) {
            window.location.replace('/manager/sign-in')
        } else {
            if (response.data.role !== role) {
                window.location.replace('/manager/sign-in')
            }
        }

        if (response.success) {
            return response.data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'something went wrong'
        }
    }
}

export default loaderAuth;