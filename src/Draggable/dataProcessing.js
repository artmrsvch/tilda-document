import { lib } from "./settigs";

export const initialDragZones = () => {
  let objToState;
  try {
    const store = JSON.parse(localStorage.usedComponents);

    objToState = {
      ...store.dropComponentData,
      main: parseComponentFromSetting(store.dropComponentData.main),
      initialProps: { ...store.propsComponent }
    };

    return objToState;
  } catch (e) {
    //console.error(e) //оставить для вывода ошибок в консоль
    objToState = {
      count: 1,
      main: [],
      initialProps: {
        main: null
      }
    };
    return objToState;
  }
};

const parseComponentFromSetting = dataArr =>
  dataArr.map(data => ({
    name: data.name,
    key: data.key,
    Component: lib[data.name].component
  }));

// убираем компоненты из массива, для заворачивания в json
export const createArrForJson = arr =>
  arr.map(({ name, key }) => ({ name, key }));
