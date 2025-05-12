import React, { ChangeEvent, Component, ReactNode } from "react";
import { Screen } from "@root/components/Screen";
import { Input } from "@root/components/Input";

type FirstKeys = "name" | "email" | "phone";
interface firstDefaultData {
    name: string,
    email: string,
    phone: string,
}
interface FirstProps {
    defaultData?: firstDefaultData
    onNext?: (data: null | firstDefaultData) => void,
    container?: (ref: HTMLElement | null) => void,
    onChange?:(value:string,key:string) => void
}
export default class First extends Component<FirstProps> {
    defaultData: firstDefaultData = {
        name: "",
        email: "",
        phone: "",
        ...this.props.defaultData
    }

    renderInputs: { [key in FirstKeys]: Input | null } = {
        name: null,
        email: null,
        phone: null
    }

    validateField = (key:FirstKeys,customMEssage?:string):number => {
        const field = this.renderInputs[key];
        const data = this.defaultData[key];
        if (!field) {
            return 0;
        }
        if (data == "") {
                field.setError();
                return 1;
            } else {
                const valid = field.inputElement?.reportValidity();
                if (!valid) {
                    field.setError();
                    field.inputElement?.setCustomValidity("");  // optional: reset custom error
                    return 1;
                }
            }
        return 0
    }

    onNext = () => {
        const {validateField} = this;
        const next = this.props.onNext;
        let error = validateField("name") + validateField("email") + validateField("phone","Please use a valid phone number");
        if (error === 0 && this.props.onNext) {
           this.props.onNext(this.defaultData)
        }

    }
    currentElement: null| HTMLElement = null;
    render(): ReactNode {
        const { onNext } = this;
        return (
            <Screen
                title="Personal Info"
                description="Please provide you name, email address, and phone number"
                onNext={onNext}
                ref={ref =>{
                    if (ref && ref.container) {
                       this.currentElement =  ref.container
                    }
                    this.currentElement = null;
                }}
            >
                <Input
                    label="Name"
                    name="name"
                    placeholder="e.g Stephen King"
                    type="text"
                    defaultValue={this.defaultData.name}
                    onChange={(e) => {
                        const { value } = e.target;
                        this.defaultData.name = value;
                    }}
                    ref={ref => {
                        this.renderInputs["name"] = ref;
                    }}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="e.g stephenkint@lorem.com"
                    defaultValue={this.defaultData.email}
                    onChange={(e) => {
                        const { value } = e.target;
                        this.defaultData.email = value;
                    }}
                    ref={ref => {
                        this.renderInputs["email"] = ref;
                    }}
                />
                <Input
                    label="Phone number"
                    name="phone"
                    type="tel"
                    placeholder="e.g Stephen King"
                    defaultValue={this.defaultData.phone}
                    pattern="^[0-9\- +\(\)]+$"
                    minLength={10}
                    onChange={(e) => {
                        const { value } = e.target;
                        this.defaultData.phone = value;
                    }}
                    ref={ref => {
                        this.renderInputs["phone"] = ref;
                    }}
                />
            </Screen>
        )
    }
}