import React, { Component, ReactNode } from "react";
import { Screen } from "@root/components/Screen";
import "@root/styles/summary.scss";
import { globalScreenProps } from "@root/components/Screen";
import { formFields } from "@root/types";
import { plans } from "./Second";
import { checkBoxes } from "./Third";
import { singlecheck } from "./Third";

interface FourProps extends globalScreenProps {
    defaultData: formFields,
    yearly?: boolean,
    changePlan?: () => void
}


interface renderListItem extends singlecheck {
    monthly: boolean,
}


export default class Four extends Component<FourProps> {
    onNext = () => {
        if (!this.props.onNext) {
            return;
        }
        this.props.onNext(this.state)
    }

    currentElement: null | HTMLElement = null;


    RenderBox = ({ title, price, monthly }: renderListItem) => {
        return (
            <li>
                <span>{title}</span>
                <span>+${monthly ? price : price * 10}/{monthly ? "mo" : "yr"}</span>
            </li>
        );
    }


    render(): ReactNode {
        const { RenderBox } = this;
        const { defaultData, ...props } = this.props;
        const { plan_time, plan_type } = defaultData;
        const pre = plans.filter(item => item.name == defaultData?.plan_type);
        const active = pre[0] ?? plans[0];
        const monthly = plan_time == "";

        const addons = checkBoxes.filter(item => defaultData[item.name] == true);
        const preTotal = addons.map(item => monthly ? item.price : item.price * 10).reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0) + (monthly ? active.prices[0] : active.prices[1]);
        
        return (
            <Screen
                title="Finishing up"
                description="Add-onns help enhance your gaming experience"
                {...props}
            >
                <div className="summary_wrap">
                    <div className="info">
                        <div className="title">
                            <h4>{active.value} ({monthly ? "Monthly" : "Yearly"})</h4>
                            <div className="link" onClick={this.props.changePlan}>
                                Change
                            </div>
                        </div>
                        <div className="price">
                            {
                                monthly
                                    ? `$${active.prices[0]}/mo`
                                    : `$${active.prices[1]}/yr`
                            }
                        </div>
                    </div>
                    {
                        addons.length == 0 ? null :
                            (
                                <ul>
                                    {
                                        addons.map((item, index) => (
                                            <RenderBox {...item} key={index} monthly={monthly} />
                                        ))
                                    }
                                </ul>
                            )
                    }
                </div>
                <div className="summary_result">
                    {/* {preTotal} */}
                    <div className="tag">Total (per {monthly ? "month" : "year"})</div>
                    <div className="total">+${preTotal}/{monthly ? "mo" : "yr"}</div>
                </div>
            </Screen>
        )
    }
}