import * as SQLite from 'expo-sqlite';
import {currentTime} from '../generatorDate';
const db = SQLite.openDatabase("song_iasd.db");

// initialization tables
const queryTableCD = `create table if not exists cd (id	TEXT, cd_name	TEXT UNIQUE, year	INTEGER, createdAt INTEGER, updateAt INTEGER, PRIMARY KEY(id))`;
const queryTableSong = `create table if not exists song (id	TEXT,song_name	TEXT,cd	INTEGER, favorite	INTEGER DEFAULT 0, createdAt INTEGER, updateAt INTEGER,FOREIGN KEY(cd) REFERENCES cd(id) ON DELETE CASCADE ON UPDATE CASCADE,PRIMARY KEY(id))`;
const queryTableStrofes = `create table if not exists letter (id TEXT, strofe TEXT, song	INTEGER, sequence	INTEGER, createdAt INTEGER, updateAt INTEGER, FOREIGN KEY(song) REFERENCES song(id) ON DELETE CASCADE ON UPDATE CASCADE,PRIMARY KEY(id))`;
const queryTableAccess = `create table if not exists access_devices (id INTEGER, date_first_access	INTEGER, date_current_access INTEGER, PRIMARY KEY(id AUTOINCREMENT))`;
const queryViewSongComplete = `create view if not exists song_complete AS SELECT song.id AS song_id, song.song_name, song.favorite, song.cd AS cd_id, cd.cd_name, cd.year FROM song INNER JOIN cd ON song.cd = cd.id`;

db.transaction(ctx => {
    ctx.executeSql(queryTableCD);
    ctx.executeSql(queryTableSong);
    ctx.executeSql(queryTableStrofes);
    ctx.executeSql(queryTableAccess);
    ctx.executeSql(queryViewSongComplete);
}, error => console.log(error))

const insertDateFirstAccess = `insert into access_devices (date_first_access, date_current_access) values (?,?)`;

db.transaction(ctx => {
    ctx.executeSql('select * from access_devices', null, (_,{rows : _array}) => {
        if(!_array.length)
        ctx.executeSql(insertDateFirstAccess, [currentTime(), currentTime()]);
    });
}, error => console.log(error))

export default db;