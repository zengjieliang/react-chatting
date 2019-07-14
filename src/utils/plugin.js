const plugins = new Map();

export const registerPluginClass = (pluginType, puginClass) => {
    plugins.set(pluginType, puginClass);
};

export const getPluginClass= (pluginType) => {
    return plugins.get(pluginType);
};

export const hasPluginClass = (pluginType) => {
    return plugins.has(pluginType);
};