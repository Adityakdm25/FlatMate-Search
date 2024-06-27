import React from 'react';
import Picture from "../assets/images/about.jpg";


const About = () => {
  return (
    <div className='py-10 px-2 max-w-6xl mx-auto'>
      <div className='py-15 px-2 max-w-6xl mx-auto flex flex-col items-center'>
        <h1 className='text-4xl lg:text-5xl font-bold mb-6 text-cyan-900 text-center'>
          HomeQuest
        </h1>
        <img
          src={Picture}
          alt='About HomeQuest'
          className='rounded-3xl w-70 max-h-96 object-contain shadow-lg mb-6 '
        />
        <div className='text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto text-justify'>
          <p className='mb-4'>
            Welcome to HomeQuest, your go-to platform for connecting individuals in search of accommodation and flatmates in cities. Designed to simplify the process of finding housing solutions, we bring together seekers and providers in one convenient place.
          </p>
          <p className='mb-4'>
            At HomeQuest, we understand the challenges of relocating for education or career opportunities. Whether you're searching for a private room, an apartment, or seeking a compatible flatmate to share expenses, our platform is here to facilitate seamless connections.
          </p>
          <p className='mb-4'>
            Our comprehensive listings ensure you can find accommodation that fits your needs and budget effortlessly. Search accommodations according to your requirements, connect with potential flatmates, and secure your next living arrangement with ease through HomeQuest.
          </p>
          <p>
            Join us and redefine how individuals find and share living spaces. Start your journey today with HomeQuest.
          </p>
        </div>
      </div>
      
    </div>
    
  );
}

export default About;

