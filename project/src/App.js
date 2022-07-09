import React, { useState } from 'react';
import data from './data';
import SingleQuestion from './Question';
import Counter from './Counter';
function App() {

  const [questions, setQuestions] = useState(data)
  return <main>
    <div class="container">
      {/* <h3>Questions and answers about login</h3>
      <section class="info">
        {
          questions.map((question) => {
            return <SingleQuestion key={question.id} {...question} />
          })
        }
      </section> */}
      <Counter />
    </div>
  </main>
}

export default App;
