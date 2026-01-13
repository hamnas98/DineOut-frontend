import { useState, useEffect } from 'react'

const STORAGE_KEY = 'fooddash_search_history'
const MAX_HISTORY = 5

function useSearchHistory() {
  const [history, setHistory] = useState([])

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setHistory(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading search history:', error)
    }
  }, [])

  // Save search to history
  const saveSearch = (query) => {
    if (!query.trim()) return

    const trimmed = query.trim()
    
    // Remove duplicates and add to front
    const newHistory = [
      trimmed,
      ...history.filter(item => item.toLowerCase() !== trimmed.toLowerCase())
    ].slice(0, MAX_HISTORY)

    setHistory(newHistory)
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
    } catch (error) {
      console.error('Error saving search history:', error)
    }
  }

  // Clear all history
  const clearHistory = () => {
    setHistory([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing search history:', error)
    }
  }

  // Remove single item
  const removeFromHistory = (query) => {
    const newHistory = history.filter(item => item !== query)
    setHistory(newHistory)
    console.log('h',history)
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
    } catch (error) {
      console.error('Error removing from history:', error)
    }
  }

  return {
    history,
    saveSearch,
    clearHistory,
    removeFromHistory
  }
}

export default useSearchHistory