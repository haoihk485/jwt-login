import React, { Children } from "react";

function Myinput ( {value, onChange, type, children}){
    return(
        <div className="flex flex-col py-2">
            <label>{children}</label>
            <input
                value={value}
                onChange={onChange}
                className="border p-2"
                type={type}
            />
        </div>
    )
}
export default Myinput