import React from 'react';
import {
    createStackNavigator,
} from '@react-navigation/stack';
import BadgesTabNavigator from '../BadgesScreen/BadgesTabNavigator';
import BadgeLanding from '../BadgesLanding/BadgeLanding'
import Login from '../UserScreen/Login';
import Colors from '../../res/Colors';
import Signup from '../UserScreen/Signup';


const Stack = createStackNavigator();

//Here are the main screns on the app 

const AppStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: Colors.charade,
                    shadowColor: Colors.charade
                },
                headerTintColor: Colors.white,
            }}
        >
            <Stack.Screen 
                name='Landing' 
                component={BadgeLanding} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BadgesTabNavigator"
                component={BadgesTabNavigator}
            />
        </Stack.Navigator>
    );
};

export default AppStack;
