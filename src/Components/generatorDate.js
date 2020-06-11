function addZero(value){
    return value < 10 ? `0${value}`: value; 
}
export function currentTime(){
    const dateInstance = new Date();
    return dateInstance.getTime();
}

export function timeDate(timeParams){
    const dateInstance = new Date(timeParams);
    return dateInstance.getTime();
}