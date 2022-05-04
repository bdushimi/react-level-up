import React from 'react';
import Tour from './Tour';
const Tours = ({ tours, deleteTour, fetchTours}) => {
    return <section className="">
        <div className="title">
            <h2>Our Tours</h2>
            <div className="underline"></div>
        </div>
        <div>
            {tours.map(tour => {
                return <Tour key={tour.id} {...tour} deleteTour={deleteTour} />
            })}
        </div>

        
    </section>
};

export default Tours;
