import React from "react"
interface Props {
    msg: string
    isLoading: boolean
}

const LoadingPage:React.FC<Props> = ( {msg, isLoading} ) => {

    if (!isLoading) {
        return null
    }
    return (
        <p className="text-white text-xl text-center mt-30">{msg}</p>
    )
}

export default LoadingPage