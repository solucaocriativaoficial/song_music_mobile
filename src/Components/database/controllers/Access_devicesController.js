import Connection from '../Conection';
import {currentTime} from '../../generatorDate';
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

export function addLastAcess(){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql(
                "update access_devices set last_acess=? where id='1'", [currentTime()],
                () => resolve({success: true}), 
                error => reject(error)
            );
        })
    })
}