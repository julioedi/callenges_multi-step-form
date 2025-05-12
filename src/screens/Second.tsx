import React, { ChangeEvent, Component, ReactNode } from "react";
import { Screen } from "@root/components/Screen";
import { Input } from "@root/components/Input";

type SecondKeys = "plan_type" | "plan_time";
type plan_type = "arcade" | "advanced" | "pro" | "";
type plan_time = "year" | "month" | "";
interface secondDefaultData {
    plan_type: plan_type,
    plan_time: plan_time,
}
interface SecondProps {
    defaultData?: secondDefaultData
    onNext?: (data: null | secondDefaultData) => void,
    container?: (ref: HTMLElement | null) => void,
    onChange?:(value:string,key:string) => void,
    onBefore?:() => void
}

interface singlePlan {
    name:plan_type,
    value:string,
}
const plans:singlePlan[] = [
    {
        name: "arcade",
        value: "Arcade"
    },
    {
        name: 'advanced',
        value: "Advanced"
    },
    {
        name:"pro",
        value: "Pro",
    }
];

export default class Second extends Component<SecondProps> {
    defaultData: secondDefaultData = {
        plan_type: "",
        plan_time: "",
        ...this.props.defaultData
    }

    

    onNext = () => {
        if (!this.props.onNext) {
            return;
        }
        this.props.onNext(this.defaultData)

    }

    state = {
        plan_type:"",
        plan_time: "",
        ...this.props.defaultData
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
                <input type="radio" />
            </Screen>
        )
    }
}