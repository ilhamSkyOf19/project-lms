// import { useEffect, useState } from "react"
// import type { UserModel } from "../model/auth-model"
// import { AuthService } from "../service/auth.service";

// const useAuth = (): { user: UserModel | null; loading: boolean } => {
//     // state user
//     const [user, setUser] = useState<UserModel | null>(null);

//     // loading
//     const [loading, setLoading] = useState<boolean>(false);


//     useEffect(() => {
//         const fetch = async () => {
//             // get auth user
//             const response = await AuthService.getAuthUser(setLoading);

//             if (response.success) {
//                 setUser(response.data);
//             } else {
//                 setUser(null);
//             }
//         }

//         fetch();
//     }, [])


//     return { user, loading };
// }

// export default useAuth;