import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Initial from './screen/Initial';
import SelectedSong from './screen/SelectedSong';

const Stack = createStackNavigator();

export default function RouterScreen(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Initial" headerMode="none" screenOptions={{
                transitionSpec:{
                    open: {
                        animation: "spring",
                        config: {
                            speed: 3000,
                            velocity: 1000,
                        }
                    },
                    close: {
                        animation: "spring",
                        config: {
                            speed: 1000,
                        }
                    }
                }
            }}>
                <Stack.Screen name="Initial" component={Initial}/>
                <Stack.Screen name="SelectedSong" component={SelectedSong}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}