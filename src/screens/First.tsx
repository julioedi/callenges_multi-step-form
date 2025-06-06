import React, { ChangeEvent, Component, ReactNode } from "react";
import { Screen } from "@root/components/Screen";
import { Input } from "@root/components/Input";
import { globalScreenProps } from "@root/components/Screen";

type FirstKeys = "name" | "email" | "phone";
interface firstDefaultData {
    name: string,
    email: string,
    phone: string,
}
interface FirstProps extends globalScreenProps {
    defaultData?: firstDefaultData,
    setData?: (data: firstDefaultData) => void
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

    validateField = (key: FirstKeys, customMEssage?: string): number => {
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
                if (key == "email") {
                    field.inputElement?.setCustomValidity("Please enter a valid email adress");
                } else if (key == "phone") {
                    field.inputElement?.setCustomValidity("Please enter a valid Phone Number");
                }
                else {
                    field.inputElement?.setCustomValidity("")
                }
                // field.inputElement?.setCustomValidity("");  // optional: reset custom error
                return 1;
            }
        }
        return 0
    }

    onNext = () => {
        const { validateField } = this;
        const next = this.props.onNext;
        let error = validateField("name") + validateField("email") + validateField("phone", "Please use a valid phone number");
        if (error === 0 && this.props.onNext) {
            this.props.onNext(this.defaultData)
        }

    }
    currentElement: null | HTMLElement = null;
    render(): ReactNode {
        const { onNext } = this;
        const { defaultData, ...props } = this.props
        return (
            <Screen
                title="Personal Info"
                description="Please provide you name, email address, and phone number"
                {...props}
                onNext={onNext}
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
                    pattern="^.*?\.[a-zA-Z0-9]{2,}$"
                    placeholder="e.g stephenkint@lorem.com"
                    defaultValue={this.defaultData.email}
                    onChange={(e) => {
                        const { value } = e.target;
                        this.defaultData.email = value;
                    }}
                    onKeyUp={e => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z0-9._%+-@]+/, "");
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