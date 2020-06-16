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
                ctx.executeSql('select id from song where id=?',[_id], (_, {rows}) => {
                    if(!rows.length)
                    ctx.executeSql(
                        `insert into song (id ,song_name, cd, createdAt, updateAt) values(?,?,?,?,?)`,
                        [_id, song_name, cd.cd_id, createdAt, updateAt],
                    )
                })
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
                    [song_name, cd.cd_id, createdAt, updateAt, _id],
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

export function favorite(song_id, favorite){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql(
                `update song  set favorite=? where id=?`,
                [favorite, song_id]
            )
        },
        error => reject(error),
        () => resolve()
        )
    })
}

export function findByIdSong(song_id){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql(
                'select * from song where id=?',[song_id], 
                (_, {rows}) => resolve(rows), 
                error => reject(error))
        })
    })
}

export function remove(content){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            content.map(song => {
                const {_id} = song;
                ctx.executeSql(
                    `delete from song where id=?`,
                    [_id]
                )
            })
        },
        error => reject(error),
        () => resolve()
        )
    })
}