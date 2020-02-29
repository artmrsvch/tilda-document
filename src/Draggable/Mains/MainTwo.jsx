import React, { useEffect } from "react";
import ButtonDelete from "../Auxially/ButtonDelete";

function MainTwo({ iterKey, saveComponentsData, componentsData }) {
    const initialText =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, amet asperiores similique, doloremque veniam quasi molestias tempora debitis, eveniet impedit quam. Doloremque eius molestiae nisi ducimus accusamus, neque et repellendus!";
    useEffect(() => {
        (!componentsData || !componentsData.MainTwo) &&
            saveComponentsData({
                componentName: "MainTwo",
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
        <div data-key={iterKey} data-name="MainTwo" className="mainTwo mains component">
            <ButtonDelete />
            <h2 className="mainTwo__title">
                {(componentsData &&
                    componentsData.MainTwo &&
                    componentsData.MainTwo.nodes[0].value) ||
                    "Custom title"}
            </h2>
            <h2 className="mainTwo__title">
                {(componentsData &&
                    componentsData.MainTwo &&
                    componentsData.MainTwo.nodes[1].value) ||
                    "And one more  custom title"}
            </h2>
            <p className="mainTwo__text">
                {(componentsData &&
                    componentsData.MainTwo &&
                    componentsData.MainTwo.nodes[2].value) ||
                    initialText}
            </p>
            <p className="mainTwo__text">
                {(componentsData &&
                    componentsData.MainTwo &&
                    componentsData.MainTwo.nodes[3].value) ||
                    initialText}
            </p>
        </div>
    );
}
export default MainTwo;
