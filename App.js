import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import {
    useFonts,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
} from '@expo-google-fonts/inter'

import AppNavigator from './app/navigation/AppNavigator'
import WordsContext from './app/context/WordsContext'
import useStore from './app/hooks/useStore'

export default function App() {
    const { data, getAllWords, updateWord, getWord, resetAllWords } = useStore()

    useEffect(() => {
        getAllWords()
    }, [])

    let [fontsLoaded] = useFonts({
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <WordsContext.Provider value={{ words: data, updateWord, getWord, resetAllWords }}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </WordsContext.Provider>
    )
}
