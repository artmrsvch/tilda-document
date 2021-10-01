export const getArrayComponents = lib => {
  const keys = Object.keys(lib);
  const build = {};

  keys.forEach(key => {
    const category = lib[key].category;
    const data = {
      name: key,
      component: lib[key].component,
      id: lib[key].id
    };

    if (build[category]) {
      build[category].push(data);
    } else {
      build[category] = [data];
    }
  });

  return build;
};
