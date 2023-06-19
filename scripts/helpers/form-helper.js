const isStringKey = (key) => {
    const isKeyValid = /[a-zA-Z]/i.test(key);
    return isKeyValid;
}

const onlyNumbersAllowed = (value) => {
    value = value.replace(/\D+/g, '')
    return value;
}