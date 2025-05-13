import React, { ChangeEvent, Component, ReactNode } from "react";
import { Screen } from "@root/components/Screen";
import "@root/styles/plans.scss";
import { globalScreenProps } from "@root/components/Screen";
import { plan_time, plan_type } from "@root/types";


interface secondDefaultData {
    plan_type: plan_type,
    plan_time: plan_time,
}
interface SecondProps extends globalScreenProps {
    defaultData?: secondDefaultData
}

interface singlePlan {
    name: plan_type,
    value: string,
    prices: [number, number]
}
export const plans: singlePlan[] = [
    {
        name: "arcade",
        value: "Arcade",
        prices: [9, 90]
    },
    {
        name: 'advanced',
        value: "Advanced",
        prices: [12, 120],
    },
    {
        name: "pro",
        value: "Pro",
        prices: [15, 150],
    }
];


export default class Second extends Component<SecondProps> {
    onNext = () => {
        if (!this.props.onNext) {
            return;
        }
        this.props.onNext(this.state)

    }

    state: secondDefaultData = {
        plan_type: "",
        plan_time: "",
        ...this.props.defaultData
    }

    currentElement: null | HTMLElement = null;


    RenderBox = ({ name, value, prices }: singlePlan) => {
        const year = this.state.plan_time == "year";
        const price = year ? `$${prices[1]}/yr` : `$${prices[0]}/mo`;
        return (
            <div className="item">
                <div className="icon">
                    <img src={`./assets/images/icon-${name}.svg`} alt={value} />
                </div>
                <div className="info">
                    <h4>{value}</h4>
                    <span>{price}</span>
                </div>
                <div className={`legend${year ? " active" : ""}`}>2 Months free</div>
            </div>
        )
    }

    switchRef: HTMLInputElement | null = null;
    onCheckYear = () => {
        const time = this.switchRef?.checked ? "year" : "";
        if (this.props.defaultData) {
            this.props.defaultData.plan_time = time
        }
        this.setState({
            plan_time: time
        });
    }
    Switch = () => {
        return (
            <div className="switch_card">
                <input
                    type="checkbox"
                    name="plan_time"
                    tabIndex={-1}
                    defaultChecked={this.state.plan_time == "year"}
                    onChange={(e) => {
                        const time = e.target.checked ? "year" : "";
                        if (this.props.defaultData) {
                            this.props.defaultData.plan_time = time
                        }
                        this.setState({
                            plan_time: time
                        });
                    }}
                    ref={(ref) => {
                        this.switchRef = ref;
                    }}
                />
                <span>
                    Monthly
                </span>
                <div
                    className="toggle"
                    tabIndex={4}
                    onKeyUp={(e) => {
                        if (e.key.match(/^(enter|space|\s+)$/i)) {
                           this.switchRef?.click();
                        }
                    }}
                >
                    <div className="dot" />
                </div>
                <span>
                    Yearly
                </span>
            </div>
        )
    }

    render(): ReactNode {
        const { RenderBox, Switch } = this;
        const checked = this.state.plan_type == "" ? "arcade" : this.state.plan_type;

        const { defaultData, ...props } = this.props
        return (
            <Screen
                title="Select your plan"
                description="You have the option of monthly or yearly billing."
                {...props}
            >
                <div className="plans_wrap">
                    {
                        plans.map((item, index) => {

                            const setItem = () => {

                                if (this.props.defaultData) {
                                    this.props.defaultData.plan_type = item.name
                                }
                                this.setState({
                                    plan_type: item.name
                                })
                            }
                            return (
                                <div
                                    className={`single_plan${checked == item.name ? " active" : ""}`}
                                    key={index}
                                    tabIndex={index + 1}
                                    onClick={setItem}
                                    onKeyUp={(e) => {
                                        if (e.key.match(/^(enter|space|\s+)$/i)) {
                                            setItem();
                                        }
                                    }}
                                >
                                    <RenderBox {...item} />
                                </div>
                            )
                        })
                    }
                </div>
                <Switch />

            </Screen>
        )
    }
}