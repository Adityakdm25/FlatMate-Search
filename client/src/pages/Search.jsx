import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PostItem from '../components/PostItem';

const limit = 6; // Number of posts to fetch at a time

const Search = () => {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    city: '',
    furnished: false,
    sort: 'createdAt',
    order: 'desc',
    gender: '',
    rentSort: '', // Add rentSort to the state
  });
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [pageIndex, setPageIndex] = useState(0); // Page index for fetching posts
  const [showMore, setShowMore] = useState(false); // Show more button visibility
  const [noPreviousPosts, setNoPreviousPosts] = useState(false); // No previous posts message visibility
  const [noNextPosts, setNoNextPosts] = useState(false); // No next posts message visibility
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load
  const postListRef = useRef(null); // Reference to the post list for scrolling

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const cityFromUrl = urlParams.get('city');
    const furnishedFromUrl = urlParams.get('furnished');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    const genderFromUrl = urlParams.get('gender');
    const rentSortFromUrl = urlParams.get('rentSort');

    if (
      searchTermFromUrl ||
      cityFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      genderFromUrl ||
      rentSortFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        city: cityFromUrl || '',
        furnished: furnishedFromUrl === 'true',
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
        gender: genderFromUrl || '',
        rentSort: rentSortFromUrl || '',
      });
    }

    fetchPosts(0);
  }, [window.location.search]);

  const fetchPosts = async (page) => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('limit', limit);
    urlParams.set('startIndex', page * limit);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/get?${searchQuery}`);
    const data = await res.json();
    setPosts(data);
    setShowMore(data.length === limit);
    setLoading(false);

    if (!isInitialLoad && postListRef.current) {
      postListRef.current.scrollTo({top:0 , behavior: 'smooth' });
    }

    setNoPreviousPosts(page === 0 && data.length === 0);
    setNoNextPosts(data.length < limit);

    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('city', sidebardata.city);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    urlParams.set('rentSort', sidebardata.rentSort); // Add rentSort to the URL params
    if (sidebardata.gender) {
      urlParams.set('gender', sidebardata.gender);
    }
    navigate(`/search?${urlParams.toString()}`);
    setPageIndex(0);
    fetchPosts(0);
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setSidebardata({
      ...sidebardata,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleShowMore = (direction) => {
    const newPageIndex = pageIndex + direction;
    setPageIndex(newPageIndex);
    fetchPosts(newPageIndex);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">City:</label>
            <input
              type="text"
              id="city"
              placeholder="Enter city..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Gender:</label>
            <select
              id="gender"
              className="border rounded-lg p-3 w-full"
              value={sidebardata.gender}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Furnished:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort by Rent:</label>
            <select
              id="rentSort"
              className="border rounded-lg p-3 w-full"
              value={sidebardata.rentSort}
              onChange={handleChange}
            >
              <option value="">Default</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
          <button className="bg-cyan-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Results:
        </h1>
        <div ref={postListRef} className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-slate-700">No post found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostItem key={post._id} post={post} />)}
          {!loading && (
            <div className="w-full flex flex-col items-center mt-5 gap-2">
              <div className="w-full flex justify-between">
                <button
                  onClick={() => handleShowMore(-1)}
                  className="bg-cyan-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
                  disabled={pageIndex === 0}
                >
                  Previous
                </button>
                <button
                  onClick={() => handleShowMore(1)}
                  className="bg-cyan-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
                  disabled={posts.length < limit}
                >
                  Next
                </button>
              </div>
              {noPreviousPosts && (
                <p className="text-sm text-red-500">No previous posts</p>
              )}
              {noNextPosts && (
                <p className="text-sm text-red-500">You've explored all options</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
