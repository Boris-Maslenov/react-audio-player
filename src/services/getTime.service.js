export const getTime = (time) => {
    const hourse = time / 60 / 60;
    const minutes = time / 60;
    const tMinutes = Math.floor(minutes % 60);
    const tSecond = Math.floor(time % 60);
    return `${tMinutes < 10 ? `0${tMinutes}` : tMinutes} : ${tSecond < 10 ? `0${tSecond}` : tSecond}`;
};
//fix:
// const tHours = Math.floor(hourse%60);
//${tHours < 10 ? `0${tHours}` :  tHours} :
