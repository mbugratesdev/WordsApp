import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AllWordsScreen from '../screens/AllWordsScreen'
import WordDetailsScreen from '../screens/WordDetailsScreen'

const Stack = createStackNavigator()

export default function AllWordsNavigator(props) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#eee',
                },
            }}
        >
            <Stack.Screen
                name="AllWords"
                component={AllWordsScreen}
                options={{
                    headerTitle: 'All Words',
                    headerTitleStyle: {
                        fontFamily: 'Inter_500Medium',
                        fontSize: 18,
                        color: '#333333',
                    },
                }}
            />
            <Stack.Screen
                name="WordDetails"
                component={WordDetailsScreen}
                options={{
                    headerTitle: 'Word Details',
                    headerTitleStyle: {
                        fontFamily: 'Inter_500Medium',
                        fontSize: 18,
                        color: '#333333',
                    },
                }}
            />
        </Stack.Navigator>
    )
}
