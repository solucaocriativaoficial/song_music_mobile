import NetInfo from '@react-native-community/netinfo'

const verifyConnectionNetwork = () => {
    return new Promise((resolve, reject) => {
        NetInfo.addEventListener(state => {
            if(state.type === "wifi")
            {
                if(state.isInternetReachable)
                resolve()

                else
                reject("Você está sem internet!")
            }
    
            else
            reject('Você está offline!')
        });
    })
}

export default verifyConnectionNetwork;