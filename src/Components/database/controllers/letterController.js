import Connection from '../Conection';

export function findAll(){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql(
                'select * from letter',[], 
                (_, {rows}) => resolve(rows), 
                error => reject(error))
        })
    })
}

export function findById(song){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql(
                'select * from letter where song=? order by sequence',[song], 
                (_, {rows}) => resolve(rows), 
                error => reject(error))
        })
    })
}

export function insert(content){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            content.map(letter => {
                const {_id, strofe, song, sequence, createdAt, updateAt} = letter;
                ctx.executeSql('select id from letter where id=?',[_id], (_, {rows}) => {
                    if(!rows.length)
                    ctx.executeSql(
                        `insert into letter (id ,strofe, song, sequence, createdAt, updateAt) values(?,?,?,?,?,?)`,
                        [_id, strofe, song, sequence, createdAt, updateAt],
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
            content.map(letter => {
                const {_id, strofe, song, sequence, createdAt, updateAt} = letter;
                ctx.executeSql(
                    `update letter  set strofe=?, song=?, sequence=?, createdAt=?, updateAt=? where id=?`,
                    [strofe, song, sequence, createdAt, updateAt, _id],
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

export function remove(content){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            content.map(letter => {
                const {_id} = letter;
                ctx.executeSql(
                    `delete from letter where id=?`,
                    [_id]
                )
            })
        },
        error => reject(error),
        () => resolve()
        )
    })
}