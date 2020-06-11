import Connection from '../Conection';
export function getAccessDevice(){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql(
                'select * from access_devices', [], 
                (_, { rows }) => resolve(rows), 
                error => reject(error)
            );
        })
    })
}

export function addCurrentTime(time){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql(
                "update access_devices set date_current_access=? where id='1'", [time],
                () => resolve({success: true}), 
                error => reject(error)
            );
        })
    })
}