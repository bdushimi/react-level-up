import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import people from './data';

function App() {

  const [profiles, setProfiles] = useState(people);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = profiles.length - 1
    if (index < 0) setIndex(lastIndex)
    if (index > lastIndex) setIndex(0)
    
  }, [index, profiles])


/* The below code is setting an interval to change the index every 3 seconds. */
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1)
    }, 3000)

    return ()=> clearInterval(slider)
  }, [index])
  
  // since this useEffect runs everytime the index is updated 
  // we have to clearInterval before setting the new/updated interval
  // Therefore, the cleanUp function will be called every time the index is updated.

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>Reviews
        </h2>
      </div>

      <div class="section-center">
        {
          profiles.map((profile, profileIndex) => {
            const { id, image, name, title, quote } = profile

            let position = "nextSlide";

            if (profileIndex === index) {
              position = "activeSlide"
            }

            if (profileIndex === index - 1 || (index === 0 && profileIndex === profiles.length - 1)) {
              position = "lastSlide"
            }
            return (
              <article key={id} className={position}>
                <img src={image} alt={name} className="person-img" />
                <h4>{name}</h4>
                <p class="title">{title}</p>
                <p class="text">{quote}</p>
                <FaQuoteRight className="icon" />
              </article>
            )
          })
        }

        <button className="prev" onClick={() => setIndex(index-1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index+1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  )
}

export default App;
