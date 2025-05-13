import React, { Component, InputHTMLAttributes, ReactNode } from "react";
import "@root/styles/input.scss";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    errorLabel?: string,
}
class Input extends Component<InputProps> {
    refElement: HTMLDivElement | null = null;
    inputElement: HTMLInputElement | null = null;
    iserror = false;
    setError = (add = true) => {
        if (this.iserror === add) {
            return;
        }
        this.iserror = add;
        if (add) {
            this.refElement?.classList.add("error");
        } else {
            this.refElement?.classList.remove("error");
        }
    }
    render(): ReactNode {
        const { label, name, onInput, errorLabel, ...props } = this.props;

        const tag_name = 'field_' + name;
        return (
            <div
                className="field_text"
                ref={ref => {
                    this.refElement = ref;
                }}
                data-error={errorLabel ?? "This field is required"}
            >
                <label htmlFor={tag_name}>{label}</label>
                <input {...props} name={tag_name} id={tag_name} onInput={(e) => {
                    this.setError(false);
                }}
                    ref={ref =>{
                        this.inputElement = ref;
                    }}
                />
            </div>
        )
    }
}

export { Input }