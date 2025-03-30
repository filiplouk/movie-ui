import { forwardRef } from "react";
import classes from "./Input.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, className, ...props }, ref) => {
    return (
      <div className="text-18">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          ref={ref}
          name={name}
          className={`${classes.input} ${className} bg-white`}
          {...props}
        />
        {error && <span className="font-error">{error}</span>}
      </div>
    );
  }
);

export default Input;
