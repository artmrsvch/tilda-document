import React, { useEffect } from "react";
import ButtonDelete from "../Auxially/ButtonDelete";

function MainTwo({ iterKey, saveComponentsData, componentsData }) {
    const initialText =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, amet asperiores similique, doloremque veniam quasi molestias tempora debitis, eveniet impedit quam. Doloremque eius molestiae nisi ducimus accusamus, neque et repellendus!";
    useEffect(() => {
        (!componentsData || !componentsData[`MainTwo${iterKey}`]) &&
            saveComponentsData({
                componentName: `MainTwo${iterKey}`,
                nodes: [
                    {
                        name: "Заголовок 1",
                        value: "",
                        type: "input"
                    },
                    {
                        name: "Заголовок 2",
                        value: "",
                        type: "input"
                    },
                    {
                        name: "Описание 1",
                        value: "",
                        type: "area"
                    },
                    {
                        name: "Описание 2",
                        value: "",
                        type: "area"
                    }
                ]
            });
    }, []);
    return (
        <div
            data-key={iterKey}
            data-name={
                (componentsData &&
                    componentsData[`MainTwo${iterKey}`] &&
                    componentsData[`MainTwo${iterKey}`].componentName) ||
                `MainTwo${iterKey}`
            }
            className="mainTwo mains component"
        >
            <ButtonDelete />
            <h2 className="mainTwo__title">
                {(componentsData &&
                    componentsData[`MainTwo${iterKey}`] &&
                    componentsData[`MainTwo${iterKey}`].nodes[0].value) ||
                    "Custom title"}
            </h2>
            <h2 className="mainTwo__title">
                {(componentsData &&
                    componentsData[`MainTwo${iterKey}`] &&
                    componentsData[`MainTwo${iterKey}`].nodes[1].value) ||
                    "And one more  custom title"}
            </h2>
            <p className="mainTwo__text">
                {(componentsData &&
                    componentsData[`MainTwo${iterKey}`] &&
                    componentsData[`MainTwo${iterKey}`].nodes[2].value) ||
                    initialText}
            </p>
            <p className="mainTwo__text">
                {(componentsData &&
                    componentsData[`MainTwo${iterKey}`] &&
                    componentsData[`MainTwo${iterKey}`].nodes[3].value) ||
                    initialText}
            </p>
        </div>
    );
}
export default MainTwo;
