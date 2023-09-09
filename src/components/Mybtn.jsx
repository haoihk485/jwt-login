import React from "react";

function Mtbtn ( {onClick, children} ){
    return(
        <button
            className="border w-full my-5 py-2 bg-teal-400 hover:bg-teal-300 text-white"
            onClick={onClick}>
                {children}
        </button>
    )
}
export default Mtbtn