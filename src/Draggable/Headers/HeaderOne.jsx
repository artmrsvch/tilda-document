import React, { useEffect } from "react";
import ButtonDelete from "../Auxially/ButtonDelete";

function HeaderOne({ iterKey, saveComponentsData, componentsData }) {
    useEffect(() => {
        (!componentsData || !componentsData[`HeaderOne${iterKey}`]) &&
            saveComponentsData({
                componentName: `HeaderOne${iterKey}`,
                nodes: [
                    {
                        name: "Заголовок",
                        value: "",
                        type: "input"
                    }
                ]
            });
    }, []);
    return (
        <div
            data-key={iterKey}
            className="headerOne titles component"
            data-name={
                (componentsData &&
                    componentsData[`HeaderOne${iterKey}`] &&
                    componentsData[`HeaderOne${iterKey}`].componentName) ||
                "HeaderOne"
            }
        >
            <ButtonDelete />
            <h1 className="headerOne__title">
                {(componentsData &&
                    componentsData[`HeaderOne${iterKey}`] &&
                    componentsData[`HeaderOne${iterKey}`].nodes[0].value) ||
                    "Awesome One Title"}
            </h1>
        </div>
    );
}
export default HeaderOne;
