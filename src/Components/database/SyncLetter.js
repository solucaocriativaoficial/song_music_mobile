import Api from '../../services/Api';
import {findAll, insert, update} from './controllers/letterController';
import {getAccessDevice} from './controllers/Access_devicesController';

async function firstAccess(){
    try {
        const getDataCloud = await Api.get('/letter/list/');
        const {count, content} = getDataCloud.data;

        if(count)
        {
            await insert(content);
            return {sync: true, message: 'Letras atualizadas com sucesso!'}
        }

        else
        return {sync: false, message: 'Nenhuma letra encontrada'}
        
    } catch (error) {
        return {sync: false, message: error}
    }
}

async function syncUpdate(){
    try {
        const dataAccessDevices = await getAccessDevice();
        const {date_current_access} = dataAccessDevices._array[0];
        const getDataCloud = await Api.post('/sync/letter/',{dateTime: date_current_access});
        const {count, content} = getDataCloud.data;
        if(count)
        {
            const {update: updateList, news} = content;
            if(updateList.length)
            await update(updateList);

            if(news.length)
            await insert(news);

            return {sync: true, message: 'Letras atualizadas com sucesso!'}
        }
        else
        return {sync: true, message: 'Letras estão atualizadas!'}
        
    } catch (error) {
        return {sync: false, message: error}
    }
}

const SyncLetter = async () => {
    try {
        const contentListLetter = await findAll();
        const {length} = contentListLetter;
        if(length)
        return await syncUpdate()

        else
        return await firstAccess()

    } catch (error) {
        console.log(error)
    }
}


export default SyncLetter;