import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AllWordsNavigator from './AllWordsNavigator'
import TabBar from './TabBar'
import SwipeGuessScreen from '../screens/SwipeGuessScreen'

const Tab = createBottomTabNavigator()

export default function AppNavigator(props) {
    return (
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{}}>
            <Tab.Screen
                name="AllWordsNavigator"
                component={AllWordsNavigator}
                options={{
                    headerShown: false,
                    tabBarLabel: 'All Words',
                }}
            />
            <Tab.Screen
                name="Guess"
                component={SwipeGuessScreen}
                options={{
                    headerTitleStyle: {
                        fontFamily: 'Inter_500Medium',
                        fontSize: 18,
                        color: '#333333',
                    },
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#eee',
                    },
                }}
            />
        </Tab.Navigator>
    )
}
