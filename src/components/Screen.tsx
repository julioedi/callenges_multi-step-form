import React, { Component, PropsWithChildren, ReactNode } from "react";
import "@root/styles/screen.scss";


export declare interface globalScreenProps {
    next?: string,
    before?: string,
    onNext?: (data: any) => void,
    onBefore?: (data: any) => void,
    container?: (ref: HTMLElement | null) => void,
    screenProps?: React.HTMLAttributes<HTMLElement>
    nextButtonClassname?:string
}
interface Screenprops extends PropsWithChildren, React.HTMLAttributes<HTMLElement>, globalScreenProps {
    title: string,
    description?: string
}
class Screen extends Component<Screenprops> {
    Title = () => {
        return (
            <h2>{this.props.title}</h2>
        )
    }

    Description = () => {
        if (!this.props.description) {
            return null;
        }
        return (
            <h3>
                {this.props.description}
            </h3>
        )
    }

    BtnBefore = () => {
        const { before, onBefore } = this.props;
        return (
            <div className="before">
                {
                    onBefore && (
                        <div className="btn" onClick={onBefore}>
                            {before ?? "Go back"}
                        </div>
                    )
                }
            </div>
        )
    }


    BtnAfter = () => {
        const { next, onNext,nextButtonClassname } = this.props;
        return (
            <div className="after">
                <div className={"btn default" + (nextButtonClassname ? " " + nextButtonClassname : "")} onClick={onNext}>
                    {next ?? "Next Step"}
                </div>
            </div>
        )
    }

    render(): ReactNode {
        const { Title, Description, BtnAfter, BtnBefore } = this;
        const { title, description, next, onBefore, onNext, before, screenProps, className, ...props } = this.props
        return (
            <>
                <section
                    {...screenProps}
                    className={"screen" + (screenProps?.className && screenProps.className != "" ? ` ${screenProps.className}` : "")}
                    ref={ref => {
                        if (this.props.container) {
                            this.props.container(ref);
                        }
                    }}
                >
                    <header>
                        <Title />
                        <Description />
                    </header>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <footer>
                        <BtnBefore />
                        <BtnAfter />
                    </footer>
                </section>
                <footer>
                    <BtnBefore />
                    <BtnAfter />
                </footer>
            </>
        )
    }
}

export { Screen }