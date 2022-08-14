import React, { useState } from 'react';
import data from './data';
function App() {

  const [count, setCount] = useState(0)
  const [text, setText] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    let nOfParagraphs = parseInt(count)
    if (nOfParagraphs < 0) nOfParagraphs = 1
    if (nOfParagraphs > 8) nOfParagraphs = 8

    setText(data.slice(0, nOfParagraphs))
  }

  return (
    <section className="section-center">
      <h3>Generate lorem ipsum paragraphs</h3>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">Paragraphs : </label>
        <input
          type="number"
          name="amount"
          id="amount" value={count}
          onChange={(e) => setCount(e.target.value)} />
        <button className="btn" type="submut">Generate</button>
      </form>
      <article className="lorem-text">
        {
          text.map((item, index) => {
            return (
              <p id={index}>{ item}</p>
            )
          })
         }
      </article>
    </section>
  )
}

export default App;
