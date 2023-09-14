import React,{useEffect} from "react";

function Mybtn ( {onClick, loading, children} ){
    // useEffect(() => {
    //     console.log('isLoading:', loading);
    //   }, [loading]);

    return(
        <button
            className="border w-full my-5 py-2 bg-teal-400 hover:bg-teal-300 text-white"
            onClick={onClick}
            disabled={loading}>
                {children}
        </button>
    )
}
export default Mybtn