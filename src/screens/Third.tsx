import React, { Component, ReactNode } from "react";
import { Screen } from "@root/components/Screen";
import "@root/styles/checkBoxes.scss";
import { globalScreenProps } from "@root/components/Screen";
import Check from "@root/components/Check";


type plan_type = "online_service" | "large_storage" | "custom_profile";
interface thirdDefaultData {
    online_service: boolean,
    large_storage: boolean,
    custom_profile: boolean,
}
interface ThirdProps extends globalScreenProps {
    defaultData?: thirdDefaultData,
    yearly?: boolean,
}

interface singlecheck {
    name: plan_type,
    title: string,
    desc: string,
    price: number,
}
const checkBoxes: singlecheck[] = [
    {
        name: "online_service",
        title: "Online Service",
        desc: "Access to multiplayer games",
        price: 1
    },
    {
        name: "large_storage",
        title: "Large Storage",
        desc: "Extra 1TB of cloud save",
        price: 1
    },
    {
        name: "custom_profile",
        title: "Customizable Profile",
        desc: "Custom theme on your profile",
        price: 2
    }
];


export default class Third extends Component<ThirdProps> {
    onNext = () => {
        if (!this.props.onNext) {
            return;
        }
        this.props.onNext(this.state)

    }

    state: thirdDefaultData = {
        online_service: false,
        large_storage: false,
        custom_profile: false,
        ...this.props.defaultData
    }

    currentElement: null | HTMLElement = null;


    RenderBox = ({ title, desc, price }: singlecheck) => {
        const {yearly} = this.props;
        return (
            <div className="item">
                <div className="checkmark">
                    <Check />
                </div>
                <div className="info">
                    <h4>{title}</h4>
                    <p>{desc}</p>
                </div>
                <div className="price">
                    +${yearly ? price * 10 : price}/{yearly ? "yr" : "mo"}
                </div>
            </div>
        );
    }

    render(): ReactNode {
        const { onNext, RenderBox } = this;

        console.log({
            year: this.props.yearly
        })
        const { defaultData, ...props } = this.props
        return (
            <Screen
                title="Pick Add-ons"
                description="Add-onns help enhance your gaming experience"
                {...props}
            >
                <div className="checkBoxes_wrap">
                    {
                        checkBoxes.map((item, index) => (
                            <div
                                className={`single_checkbox${this.state[item.name] ? " active" : ""}`}
                                key={index}
                                onClick={() => {

                                    if (this.props.defaultData) {
                                        this.props.defaultData[item.name] = !this.state[item.name]
                                    }
                                    this.setState({
                                        [item.name]: !this.state[item.name]
                                    })
                                }}
                            >
                                <RenderBox {...item} />
                            </div>
                        ))
                    }
                </div>
            </Screen>
        )
    }
}