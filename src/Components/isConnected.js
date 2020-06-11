import * as Network from 'expo-network';

const isConnected = async () => {
    const {isConnected, isInternetReachable} = await Network.getNetworkStateAsync();
    if(isConnected & isInternetReachable)
    return true;

    else
    return false;
}

export default isConnected;