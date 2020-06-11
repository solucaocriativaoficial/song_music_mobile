import Api from '../../services/Api';
import {findAll, insert, update} from './controllers/cdController';
import {getAccessDevice} from './controllers/Access_devicesController';

async function firstAccess(){
    try {
        const getDataCloud = await Api.get('/cd/list/');
        const {count, content} = getDataCloud.data;

        if(count)
        await insert(content);

        return {sync: true, message: 'Cd atualizado com sucesso!'}
        
    } catch (error) {
        return {sync: false, message: error}
    }
}

async function syncUpdate(){
    try {
        const dataAccessDevices = await getAccessDevice();
        const {date_current_access} = dataAccessDevices._array[0];
        const getDataCloud = await Api.post('/sync/cd/',{dateTime: date_current_access});
        const {count, content} = getDataCloud.data;

        if(count)
        await update(content);

        return {sync: true, message: 'Cd atualizado com sucesso!'}
        
    } catch (error) {
        return {sync: false, message: error}
    }
}

const SyncCd = async () => {
    try {
        const contentListCd = await findAll();
        const {length} = contentListCd;
        if(length)
        return await syncUpdate()

        else
        return await firstAccess()

    } catch (error) {
        console.log(error)
    }
}


export default SyncCd;