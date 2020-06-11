import Connection from '../Conection';

export function SongCompleteController(){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql('SELECT song.id AS song_id, song.song_name, song.favorite, song.cd AS cd_id, cd.cd_name, cd.year FROM song INNER JOIN cd ON song.cd = cd.id', [],
            (_,{rows}) => resolve(rows))
        }, error => reject(error))
    })
}