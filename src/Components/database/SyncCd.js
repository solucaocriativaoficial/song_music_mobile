import Api from '../../services/Api';
import {findAll, insert, update, remove} from './controllers/cdController';
import {getAccessDevice} from './controllers/Access_devicesController';

async function firstAccess(){
    try {
        const getDataCloud = await Api.get('/cd/list/');
        const {count, content} = getDataCloud.data;

        if(count)
        await insert(content);

        return {sync: true, message: 'Cd atualizado com sucesso!'}
        
    } catch (error) {
        return {sync: false, message: error.message}
    }
}

async function syncUpdate(){
    try {
        const dataAccessDevices = await getAccessDevice();
        const {last_acess} = dataAccessDevices._array[0];
        const getDataCloud = await Api.post('/sync/cd/',{dateTime: last_acess});
        const {content} = getDataCloud.data;
        const {update: updateList, news, remove:removeList} = content;            
        if(removeList.length)
        await remove(removeList);

        if(updateList.length)
        await update(updateList);

        if(news.length)
        await insert(news);

        return {sync: true, message: 'Cds atualizados com sucesso!'}
        
    } catch (error) {
        return {sync: false, message: error}
    }
}

const SyncCd = async () => {
    try {
        const contentListCd = await findAll();
        const {length} = contentListCd;
        if(length)
        return await syncUpdate();

        else
        return await firstAccess()

    } catch (error) {
        return {sync: false, message: error}
    }
}


export default SyncCd;