import React from 'react';
import { Link } from 'react-router-dom';import backgroundImage from '../assets/images/img1.jpg'
const Home = () => {
  return (
    <div
      className="relative h-screen flex p-20 justify-center"

    >
   
      {/* top */}
      <div className="flex flex-col gap-6  lg:p-20 px-3 max-w-6xl mx-auto text-center items-center mt- lg:mt-0 text-opacity-1=">
        <h1 className="relative text-cyan-900 font-bold text-4xl lg:text-6xl drop-shadow-lg">
          Moving to a new city?<br/>
          </h1>
          <p className='text-4xl text-gray-700'>Find your  <span className="text-cyan-800">perfect</span>
          <br/>
          living accommodation with ease
          </p>
        
        <p className="text-gray-700 text-xs sm:text-sm max-w-md mx-auto drop-shadow-lg">
          HomeQuest is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of options for you to choose from.
        </p>
        <Link
          to={'/search'}
          className="bg-cyan-600 text-white font-bold py-4 px-6 rounded-lg hover:opacity-75 transition duration-300 transform hover:scale-105 shadow-lg p-4"
        >
          Let's get started
        </Link>
      </div>
     
    </div>
  );
}

export default Home;
