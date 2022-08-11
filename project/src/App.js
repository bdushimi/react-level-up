import React, { useState, useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa'
import items from './data';

const url = 'https://course-api.com/react-tabs-project'


function App() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0)


  const fetchJobs = async () => {
    const response = await fetch(url)
    const _jobs = await response.json(response)
    setJobs(_jobs)
    setLoading(false)
  }

  useEffect(() => {
    fetchJobs();
  }, [])

  if (loading) {
    return (
      <section class="section loading">
        <h1>Loading....</h1>
      </section>
    )
  }
  
const {company, dates, duties, title} = jobs[value]
  return <section className="section">
    <div class="title">
      <h2>Experience</h2>
      <div class="underline"></div>
    </div>

    <div class="jobs-center">
      <article class="job-info">
        <h3>{title}</h3>
        <h3>{company}</h3>
        <p class="job-date">{dates}</p>
        {
          duties.map((duty, index) => {
            return (
              <div class="job-desc" key={index}>
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{ duty }</p>
              </div>
            )
          })
        }
      </article>
    </div>
  </section>
}

export default App;
