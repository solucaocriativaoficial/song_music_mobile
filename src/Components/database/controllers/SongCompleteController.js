import Connection from '../Conection';

export function SongCompleteController(){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql('select * from song_complete order by favorite', [],
            (_,{rows}) => resolve(rows))
        }, error => reject(error))
    })
}
export function SearchSong(search){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql(`select * from song_complete where song_name like '%${search}%' or cd_name like '%${search}%'`, [],
            (_,{rows}) => resolve(rows))
        }, error => reject(error))
    })
}