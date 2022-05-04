import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
const url = 'https://course-api.com/react-tours-project'
function App() {

  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])

  const fetchTours = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setTours(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }


  const deleteTour = (tourId) => { 
    setTours(tours.filter( (tour) => tour.id !== tourId))
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (loading) {
    return <main>
      <Loading />
    </main>
  }

  if (tours.length === 0) { 
    return <main>
      <div className="title">
        <h2>No Tours Left</h2>
        <button className="btn btn-default"onClick={ () => fetchTours() }>Refresh</button>
      </div>
    </main>
  }
  return <main>
    <Tours tours={tours} deleteTour={deleteTour} />
  </main>
}

export default App
