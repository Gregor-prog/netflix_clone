import { useContext, createContext, useState,SetStateAction,ReactNode,FC } from "react"

type authContextType = [boolean,React.Dispatch<SetStateAction<boolean>> ]
interface providerPropType {
    children:ReactNode
}

    const IsLogincontext = createContext<authContextType>([false,() => {}])

    
const  Authcontextprovider:  FC<providerPropType> = ({children}) => {
    const [isLogin, setisLogin] = useState(false)

    return (
        <IsLogincontext.Provider value={[isLogin, setisLogin]}>
            {children}
        </IsLogincontext.Provider>
    )
}

export {Authcontextprovider}
export default IsLogincontext   