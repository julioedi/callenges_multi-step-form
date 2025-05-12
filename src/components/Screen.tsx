import React, { Component, PropsWithChildren, ReactNode } from "react";
import "@root/styles/screen.scss";

interface Screenprops extends PropsWithChildren, React.HTMLAttributes<HTMLElement> {
    title: string,
    description?: string
    next?: string,
    before?: string,
    onNext?: () => void,
    onBefore?: () => void,
}
class Screen extends Component<Screenprops> {
    Title = () => {
        return (
            <h2>{this.props.title}</h2>
        )
    }

    container:null|HTMLElement = null

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
                    before && (
                        <div className="btn" onClick={onBefore}>
                            {before}
                        </div>
                    )
                }
            </div>
        )
    }


    BtnAfter = () => {
        const { next, onNext } = this.props;
        return (
            <div className="after">
                <div className="btn default" onClick={onNext}>
                    {next ?? "Next Step"}
                </div>
            </div>
        )
    }

    render(): ReactNode {
        const { Title, Description, BtnAfter, BtnBefore } = this;
        const {title,description,next,onBefore,onNext,before,...props} = this.props
        return (
            <section className="screen" {...props} ref={ref =>{
                this.container = ref;
            }}>
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
        )
    }
}

export { Screen }