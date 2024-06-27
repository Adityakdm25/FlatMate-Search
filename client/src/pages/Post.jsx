import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaCouch, FaBuilding, FaPhoneAlt, FaShare } from "react-icons/fa";

SwiperCore.use([Navigation]);

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const params = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/get/${params.postId}`);
        const data = await res.json();
        if (!data || data.success === false) {
          setError(true);
        } else {
          setPost(data);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.postId]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopyMessage("Contact copied to clipboard");
    setTimeout(() => {
      setCopyMessage("");
    }, 2000);
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && <p className="text-center my-7 text-2xl">Something went wrong</p>}
      {post && !loading && !error && (
        <div>
          <div className="max-w-4xl mx-auto p-6 my-7 bg-white shadow-lg rounded-lg">
            {post && !loading && !error && (
              <Swiper navigation pagination={{ clickable: true }} lazy={{ loadPrevNext: true }}>
                {post.imageUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={url}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-[550px] object-cover"
                      loading="lazy"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          
          <div className='max-w-4xl mx-auto p-6 my-7 bg-white shadow-lg rounded-lg'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-2xl font-semibold'>{post.name}</h2>
              <p className='text-2xl font-semibold'>
                ₹{post.Totalrent.toLocaleString('en-IN')} / month
              </p>
            </div>
            <p className='flex items-center text-gray-600 mb-2'>
              <FaMapMarkerAlt className='inline-block mr-2 text-green-700' />
              {post.city} 
            </p>
            <p className='flex items-center text-gray-600 mb-2'>
              Address : {post.address}
            </p>
            <div className='flex justify-between items-center mt-2'>
              <div className='flex items-center'>
               
                <FaPhoneAlt className='inline-block mr-1 text-gray-700' />
                Contact: {post.contact}
             
                <div 
                  className='inline-block ml-2 cursor-pointer text-gray-700 bg-gray-200 rounded-full p-2'
                  onClick={() => copyToClipboard(post.contact)}
                >
                  <FaShare />
                </div>
                {copyMessage && (
                  <span className="ml-2 text-sm text-green-700">{copyMessage}</span>
                )}
              </div>
              <div className='flex items-center'>
                <FaRupeeSign className='inline-block mr-1' />
                {post.Totaldeposit.toLocaleString('en-IN')} Deposit
              </div>
            </div>
            <hr className='my-4' />
            <div className='mb-4'>
              <h3 className='text-lg font-semibold mb-2'>Description</h3>
              <div className='border-b-2 border-gray-300 w-12'></div>
              <p className='text-lg text-gray-800 mt-2'>{post.description}</p>
            </div>
            <div className='flex justify-between mt-4'>
              <div className='w-1/2'>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Brokerage: </span>
                  {post.brokerage}
                </p>
                <p className='text-gray-700'>
                  <FaCouch className='inline-block mr-1' />
                  {post.furnished ? 'Furnished' : 'Unfurnished'}
                </p>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Amenities: </span>
                  {post.amenities}
                </p>
              </div>
              <div className='w-1/2 text-right'>
                <p className='text-gray-700'>
                  <FaBuilding className='inline-block mr-1' />
                  Available From{' '}
                  <FaCalendarAlt className='inline-block ml-1' />{' '}
                  {new Date(post.availablefrom).toLocaleDateString('en-IN')}
                </p>
              </div>
            </div>
            <hr className='my-4' />
            <div className='mb-4'>
              <h3 className='text-lg font-semibold mb-2'>Posted By</h3>
              <div className='border-b-2 border-gray-300 w-12'></div>
              <p className='text-lg text-gray-800 mt-2'>{post.postby}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Post;


