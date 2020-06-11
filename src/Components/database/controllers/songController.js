import Connection from '../Conection';

export function findAll(){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql(
                'select * from song',[], 
                (_, {rows}) => resolve(rows), 
                error => reject(error))
        })
    })
}

export function insert(content){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            content.map(song => {
                const {_id, song_name, cd, createdAt, updateAt} = song;
                ctx.executeSql(
                    `insert into song (id ,song_name, cd, createdAt, updateAt) values(?,?,?,?,?)`,
                    [_id, song_name, cd.cd_id, createdAt, updateAt]
                )
            })
        },
        error => reject(error),
        () => resolve()
        )
    })
}

export function update(content){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            content.map(song => {
                const {_id, song_name, cd, createdAt, updateAt} = song;
                ctx.executeSql(
                    `update song  set song_name=?, cd=?, createdAt=?, updateAt=? where id=?`,
                    [song_name, cd, createdAt, updateAt, _id],
                    () => {},
                    err => {
                        console.log(err)
                    }
                )
            })
        },
        error => reject(error),
        () => resolve()
        )
    })
}