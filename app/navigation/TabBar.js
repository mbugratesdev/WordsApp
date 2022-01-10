import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import colors from '../config/colors'

export default function TabBar({ state, descriptors, navigation }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: colors.light,
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    })
                }

                return (
                    <TouchableWithoutFeedback
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={index}
                    >
                        <View
                            style={{
                                flex: 1,
                                paddingVertical: 20,
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: isFocused ? colors.black : colors.medium,
                                    fontFamily: isFocused ? 'Inter_700Bold' : 'Inter_400Regular',
                                    fontSize: 18,
                                    textDecorationLine: isFocused ? 'underline' : 'none',
                                }}
                            >
                                {label}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })}
        </View>
    )
}
