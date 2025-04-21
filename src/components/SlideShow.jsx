import React from 'react';

const Slide1 = () => (
  <div className="slide-content">
    <h2>Make a Difference Today</h2>
    <p>Your small contribution can change someone's life forever</p>
  </div>
);

const Slide2 = () => (
  <div className="slide-content">
    <h2>Community Support</h2>
    <p>Join thousands of donors helping people in need</p>
  </div>
);

const Slide3 = () => (
  <div className="slide-content">
    <h2>Transparent Giving</h2>
    <p>Track your donations and see the direct impact of your generosity</p>
  </div>
);

const HomeSlideshow = () => {
  const slides = [Slide1, Slide2, Slide3];

  return (
    <div className="main-show">
      <div className="slides-cont">
        {slides.map((Slide, index) => (
          <div className="slide-item" id={`slide-${index + 1}`} key={index}>
            <Slide key={index} />
          </div>
        ))}
      </div>
      <div className="slider-nav">
        {slides.map((_, index) => (
          <a href={`#slide-${index + 1}`} key={index} className="slider-nav-btn"></a>
        ))}
      </div>
    </div>
  );
};

export default HomeSlideshow;