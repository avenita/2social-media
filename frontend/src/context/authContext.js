import { createContext, useReducer } from "react";
import { authSReducer } from "./authReduce";


const authInitialValue = {
    user:null,
    // user:{
    //     city: "punata",
    //     coverPicture: "",
    //     createdAt: "2021-07-29T17:51:11.611Z",
    //     desc: "soy una de las virgen. Soy Maria",
    //     email: "maria@hotmail.com",
    //     followers: ["6102eac86ccd06415c59603f"],
    //     followings: [],
    //     from: "cochabamba",
    //     isAdmin: false,
    //     password: "$2b$10$KYOY0WLLN05JChVNgBGY3uqbCVy18XwnqLaTMuXFc8lkSBIgzndkC",
    //     profilePicture: "http://localhost:4040/public/images/persons/1.jpeg",
    //     relationship: 1,
    //     updatedAt: "2021-08-01T03:27:36.777Z",
    //     username: "maria",
    //     __v: 0,
    //     _id: "6102ea8fb7575e3df0e83579",
    // },
    isPromise: false,
    error: null
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authSReducer,authInitialValue)
    console.log(state);
    
    const values = {
        user: state.user,
        isPromise: state.isPromise,
        error: state.error,
        dispatch
    }
    console.log(values)

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

