import React, { ChangeEventHandler, MouseEventHandler } from 'react'
import {v4 as uuid} from "uuid"
const Button:React.FC<{children:React.ReactNode,onClick?:MouseEventHandler<HTMLButtonElement>,submitType?:boolean,onChange?:ChangeEventHandler<HTMLInputElement>,active:boolean,file?:boolean}> = ({onChange,submitType,file,active,children,onClick}) => {

    const rand=uuid()
    return file?
  <>
        <input type={"file"} multiple={false} accept="image/*" id={rand} className="hidden absolute" onChange={onChange} />
  <label htmlFor={rand} className={`p-2 rounded-lg border overflow-hidden border-gray-400   ${active ? "bg-blue-400 text-white":"bg-transparent"}`}>{children}</label>
  </>
  :
    <button onClick={onClick} type={submitType?"submit":"button"} className={`p-2 w-full h-full rounded-lg border border-white-400  [&>svg]:w-full [&>svg]:h-full ${active ? "bg-blue-400 text-white":"bg-transparent"}`}>
      {children}
    </button>
  
  
}

export default Button