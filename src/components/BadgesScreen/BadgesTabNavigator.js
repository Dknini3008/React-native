import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BadgesStack from './BadgesStack';
import Colors from '../../res/Colors';
import FavoritesStack from '../Favorites/FavoritesStack';
import UserStack from '../UserScreen/UserStack';

const Tabs = createBottomTabNavigator();

//this is the tab that we are going to see to navigate behind all the views
const BadgesTabNavigator = () => {
    return(
        <Tabs.Navigator
            tabBarOptions = {{
                showLabel: false,
                showIcon: true,
                tintColor: Colors.white,
                activeTintColor: Colors.white,
                style: {
                    backgroundColor: '#FF5733',
                },
            }}
        >
            <Tabs.Screen
                name = "Favorites"
                component = {FavoritesStack}
                options = {{
                    tabBarIcon: ({size, color}) => (
                        <Image
                            style = {{tintColor: color, width: size, height: size}} 
                            source = {require('../../assets/notFavorite.png')}
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
                            source = {require('../../assets/home.png')}
                        />
                    ),
                }}
            />
            <Tabs.Screen 
                name="Profile"
                component={UserStack}
                options={{
                    tabBarIcon: ({size, color}) => (
                        <Image 
                            style={{tintColor: color, width: size, height: size }}
                            source={require('../../assets/profile.png')} 
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default BadgesTabNavigator;