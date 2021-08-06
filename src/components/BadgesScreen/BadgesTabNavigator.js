import React from 'react';
import {
    Image
} from 'react-native';
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import { 
    createMaterialTopTabNavigator 
} from '@react-navigation/material-top-tabs';
import BadgesStack from './BadgesStack';
import Colors from '../../res/Colors';

const Tabs = createMaterialTopTabNavigator();

const BadgesTabNavigator = () => {
    return(
        <Tabs.Navigator
            tabBarOptions = {{
                showLabel: false,
                tintColor: Colors.white,
                activeTintColor: Colors.white,
                style: {
                    backgroundColor: '#FF5733',
                },
            }}
        >
            <Tabs.Screen
                name = "Badges2"
                component = {BadgesStack}
                options = {{
                    tabBarIcon: ({size, color}) => (
                        <Image
                            style = {{tintColor: color, width: size, height: size}} 
                            source = {require('../../assets/home.png')}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name = "Badges3"
                component = {BadgesStack}
                options = {{
                    tabBarIcon: ({size, color}) => (
                        <Image
                            style = {{tintColor: color, width: size, height: size}} 
                            source = {require('../../assets/edit_icon.png')}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name = "Badges"
                component = {BadgesStack}
                options = {{
                    tabBarIcon: ({size, color}) => (
                        <Image
                            style = {{tintColor: color, width: size, height: size}} 
                            source = {require('../../assets/delete_icon.png')}
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default BadgesTabNavigator;