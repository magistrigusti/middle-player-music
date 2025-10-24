import {  useEffect } from 'react'
import './App.css'

function App() {
  
  useEffect(() => {
    fetch('https://musicfun.it-incubator.app/api/1.0/playlists', {
      headers: {
        'api-key':
      }
    })
  }, []);

  return (
    <>
      fuck you
    </>
  )
}

export default App
