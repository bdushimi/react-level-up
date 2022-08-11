import React, { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa'
import items from './data';

const url = 'https://course-api.com/react-tabs-project'


function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);


  const fetchJobs = async () => {
    const response = await fetch(url)
    const _jobs = await response.json(response)
    setJobs(_jobs)
    setLoading(false)
  }

  useEffect(() => {
    fetchJobs();
  }, [])

  loading && (
    <section class="section loading">
      <h1>Loading....</h1>
    </section>
  )
  

  return <main>
    <h2>Resume</h2>
  </main>
}

export default App;
