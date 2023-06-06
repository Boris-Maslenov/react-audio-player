export const urlCheck = (url) => {
    const regExp = /^(http|https):\/\/.{5,}/g;
    return regExp.test(url.trim());
};
