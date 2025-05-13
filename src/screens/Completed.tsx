import React, { useEffect, useState } from "react";
import { formFields } from "@root/types";
import { wait } from "@root/utilities/wait";
interface CompletedData {
    data: formFields
}


export default function (props: CompletedData) {

    const [completed, updateCompleted] = useState(false);
    useEffect(() => {
        (async () => {
            //simulate fetching data
            await wait(1.5);
            updateCompleted(true);
        })();
    })

    if (!completed) {
        return (
            <section className="screen fetching">
                <div className="content">
                    <div className="loader" />
                </div>
            </section>
        )
    }
    return (
        <section
            className="screen completed"
        >
            <div className="content">
                <div
                    className="item"
                >
                    <div className="icon">
                        <img src={`./assets/images/icon-thank-you.svg`} />
                    </div>
                    <h2>Thank you!</h2>
                    <p>
                        Thanks for confirming your suscription! We hope you have
                        fun using our platform. If you ever need support, please feel
                        free to email us at support support@loremgamin.com
                    </p>
                </div>
            </div>
        </section>
    )
}