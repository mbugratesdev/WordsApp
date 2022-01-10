import { useState } from 'react'

import wordsStore from '../store/wordsStore'
import wordsData from '../data/wordsData'

export default function useStore() {
    const [data, setData] = useState([])

    const getAllWords = async () => {
        let result = await wordsStore.get('words')
        if (!result) {
            // Store and try again
            await storeAllWords(wordsData)

            result = await wordsStore.get('words')
        }
        setData(result)
        return result
    }

    const storeAllWords = async (words) => {
        words.sort((a, b) => a.id - b.id)
        await wordsStore.store('words', words)
        setData(words)
    }

    const updateWord = async (item) => {
        const updatedWords = [...data.filter((i) => i.id !== item.id), item]
        storeAllWords(updatedWords)
    }

    const getWord = (id) => {
        return data.find((word) => word.id === id)
    }

    const resetAllWords = () => {
        storeAllWords(data.map((word) => ({ ...word, done: false })))
    }

    return { getAllWords, storeAllWords, data, updateWord, getWord, resetAllWords }
}
