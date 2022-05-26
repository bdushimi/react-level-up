import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
    const [index, setIndex] = useState(0);
    const { name, job, text, image } = people[index];

    const prevPerson = () => {
        // This is the best practice; updating the state using functional state
        // More details : https://www.freecodecamp.org/news/functional-setstate-is-the-future-of-react-374f30401b6b/
        setIndex((index) => { 
            let newIndex = index;
            if (index > 0) {
                newIndex = index-1;
            }
            return newIndex;
        })
    }

    const nextPerson = () => {
    
        // This is the best practice; updating the state using functional state
        // More details : https://www.freecodecamp.org/news/functional-setstate-is-the-future-of-react-374f30401b6b/

    setIndex((index) => {
        let newIndex = index;
        if (index < people.length - 1) {
            newIndex = index + 1;
        }
        return newIndex;
    })
    }
    

    const randomPerson = () => {
        let min = 0;
        let max = people.length;
        let randomPerson = Math.floor(Math.random() * (max - min)) + min;
        console.log(randomPerson);
        setIndex(() => { 
            return randomPerson;
        })
    }
return <article className="review">
    <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span class="quote-icon"><FaQuoteRight /></span>
    </div>
    <div class="author">{name}</div>
    <p class="job">{job}</p>
    <p class="info">{text}</p>
    <div class="button-container">
        <button class="prev-btn" onClick={prevPerson} >
            <FaChevronLeft />
        </button>
        <button class="next-btn" onClick={nextPerson} >
            <FaChevronRight />
        </button>
    </div>
    <button class="random-btn" onClick={randomPerson}>
        Random Review
    </button>
</article>
};

export default Review;
