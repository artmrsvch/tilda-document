import { category } from "./settigs";


export const initialDragZones = () => {
    let objToState;
    try {
        const store = JSON.parse(localStorage.usedComponents);
        objToState = {
            ...store.dropComponentData,
            header: parseComponentFromSetting("header", store.dropComponentData.header),
            main: parseComponentFromSetting("main", store.dropComponentData.main),
            footer: parseComponentFromSetting("footer", store.dropComponentData.footer),
            initialProps: { ...store.propsComponent }
        };
        return objToState;
    } catch (e) {
        //console.error(e) //оставить для вывода ошибок в консоль
        objToState = {
            count: 1, header: [], footer: [], main: [], initialProps: {
                header: null,
                main: null,
                footer: null,
            }
        };
        return objToState;
    }
};

const parseComponentFromSetting = (categoryName, dataArr) => {
    let tempArr = [];
    const eachForDataArr = objStore => {
        for (const dataObj of dataArr) {
            if (objStore.subName === dataObj.name) {
                tempArr.push({
                    name: dataObj.name,
                    key: dataObj.key,
                    Component: objStore.component
                });
            }
        }
    }
    category.forEach(objectCategory => {
        if (objectCategory.name.toLowerCase() === categoryName) {

            objectCategory.presents.forEach(objComponet => {
                eachForDataArr(objComponet)
            });
        }
    });
    return tempArr;
};
export const createArrForJson = arr => {
    // убираем компоненты из массива, для заворачивания в json
    let tempArr = [];
    arr.forEach(({ name, key }) => {
        tempArr.push({ name, key });
    });
    return tempArr;
};