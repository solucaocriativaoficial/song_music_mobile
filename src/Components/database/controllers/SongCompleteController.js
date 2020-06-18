import Connection from '../Conection';

export function SongCompleteController(favoriteScreen){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            if(favoriteScreen)
            ctx.executeSql("select * from song_complete where favorite='1'", [],
            (_,{rows}) => resolve(rows))

            else
            ctx.executeSql('select * from song_complete', [],
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