exports.getService = function (name) {
    return {
        type: 'x-data-tier',
        display: name,
        print: () => {
            console.log('Hello World');
        }
    };
}