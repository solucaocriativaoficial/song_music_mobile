function addZero(params){
    return params < 10 ? `0${params}` : params
}
export function currentTime(){
    const date = new Date();
    const day = addZero(date.getDate());
    const month = addZero(date.getMonth());
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}