import Connection from '../Conection';

export function findAll(){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            ctx.executeSql(
                'select * from cd',[], 
                (_, {rows}) => resolve(rows), 
                error => reject(error))
        })
    })
}

export function insert(content){
    return new Promise((resolve, reject) => {
        Connection.transaction(ctx => {
            content.map(cd => {
                const {_id, cd_name, year, createdAt, updateAt} = cd;
                ctx.executeSql(
                    `insert into cd (id ,cd_name, year, createdAt, updateAt) values(?,?,?,?,?)`,
                    [_id, cd_name, year, createdAt, updateAt]
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
            content.map(cd => {
                const {_id, cd_name, year, createdAt, updateAt} = cd;
                ctx.executeSql(
                    `update cd  set cd_name=?, year=?, createdAt=?, updateAt=? where id=?`,
                    [cd_name, year, createdAt, updateAt, _id],
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