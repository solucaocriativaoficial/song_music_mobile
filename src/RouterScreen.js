import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Initial from './screen/Initial';
import SelectedSong from './screen/SelectedSong';
import Favorite from './screen/Favorite';

const Stack = createStackNavigator();

export default function RouterScreen(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Initial" headerMode="none">
                <Stack.Screen name="Initial" component={Initial} options={{
                    animationEnabled: false,
                }}/>
                <Stack.Screen name="SelectedSong" component={SelectedSong} options={{
                    animationEnabled: false,
                }}/>
                <Stack.Screen name="Favorite" component={Favorite} options={{
                    animationEnabled: false,
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}