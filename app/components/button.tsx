import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { v4 as uuid } from "uuid";
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  submitType?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  active: boolean;
  file?: boolean;
  icon?: boolean;
}> = ({ onChange, submitType, file, active, children, onClick, icon }) => {
  const rand = uuid();
  return file ? (
    <>
      <input
        type={"file"}
        multiple={false}
        accept="image/*"
        id={rand}
        className="hidden absolute"
        onChange={onChange}
      />
      <label
        htmlFor={rand}
        className={`p-2 rounded-lg border overflow-hidden border-gray-400   ${
          active ? "bg-slate-800 text-white" : "bg-transparent"
        }`}
      >
        {children}
      </label>
    </>
  ) : (
    <button
      onClick={onClick}
      type={submitType ? "submit" : "button"}
      className={`p-2 w-full ${
        icon ? "aspect-square" : "h-full"
      } border-0 rounded-lg [&>svg]:w-full [&>svg]:h-full bg-opacity-80 ${
        active ? "bg-slate-800 text-white" : "bg-transparent"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
