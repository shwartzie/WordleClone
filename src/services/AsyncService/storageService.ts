
function store(key: string, value: any) {
    sessionStorage[key] = JSON.stringify(value);
}

function load(key: string, defaultValue: any = null) {
    var value = sessionStorage[key] || defaultValue;
    return JSON.parse(value);
}
export const storageService = {
    store,
    load
}
