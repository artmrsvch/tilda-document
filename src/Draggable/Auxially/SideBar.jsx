import React from "react";

function SideBar({ data, setValues, storage, closeData }) {
    const handleClick = ({ target }) => {
        target.dataset.btn === "sidebar" && closeData(null);
    };
    const setChange = ({ target }) => {
        const dataIndex = Number(target.dataset.index);
        const editNode = data.nodes[dataIndex];
        editNode.value = target.value;
        const updateState = {
            ...data,
            nodes: data.nodes
        };
        setValues({ ...storage, [data.componentName]: updateState });
    };

    return (
        <aside
            onClick={handleClick}
            style={data ? { width: "350px" } : { width: "0" }}
            className="sideBar"
            onChange={setChange}
        >
            {data &&
                data.nodes.map(({ name, type }, index) => (
                    <label key={index}>
                        <div>{name}</div>
                        {type === "input" ? (
                            <input name={name} data-index={index} type="text" />
                        ) : (
                            <textarea name={name} data-index={index}></textarea>
                        )}
                    </label>
                ))}
            <button data-btn="sidebar" className="button15" type="button">
                Close
            </button>
        </aside>
    );
}

export default SideBar;
