import React, { Children, useEffect } from "react";

function Myinput ( {value, type, onChange, onBlur, children}){
    

    return(
        <div className="flex flex-col py-2">
            <label>{children}</label>
            <input
                value={value}
                onChange={onChange}
                className="border p-2"
                type={type}
                onBlur={onBlur}
            />
        </div>
    )
}
export default Myinput