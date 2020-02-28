import React, { useEffect } from "react";
import ButtonDelete from "../Auxially/ButtonDelete";

function MainOne({ iterKey, saveComponentsData, componentsData }) {
    const initialText =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, amet asperiores similique, doloremque veniam quasi molestias tempora debitis, eveniet impedit quam. Doloremque eius molestiae nisi ducimus accusamus, neque et repellendus!";
    useEffect(() => {
        (!componentsData || !componentsData.MainOne) &&
            saveComponentsData({
                componentName: "MainOne",
                nodes: {
                    title: {
                        name: "Заголовок",
                        value: ""
                    },
                    paragraph: {
                        name: "Описание",
                        value: ""
                    }
                }
            });
    }, []);
    return (
        <div data-key={iterKey} data-name="MainOne" className="mainOne mains component">
            <ButtonDelete />
            <h2 className="mainOne__title">
                {(componentsData &&
                    componentsData.MainOne &&
                    componentsData.MainOne.nodes.title.value) ||
                    "Custom title"}
            </h2>
            <p className="mainOne__text">
                {(componentsData &&
                    componentsData.MainOne &&
                    componentsData.MainOne.nodes.paragraph.value) ||
                    initialText}
            </p>
        </div>
    );
}
export default MainOne;
