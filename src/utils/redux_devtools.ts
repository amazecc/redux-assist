export const withDevtools = () => {
    const tools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
    return tools ? tools() : undefined;
};
