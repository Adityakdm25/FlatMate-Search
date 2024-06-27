import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";

import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showPostsError, setShowPostsError] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);

    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(data.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/sign-out`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowPosts = async () => {
    try {
      setShowPostsError(false);
      const res = await fetch(`/api/user/posts/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowPostsError(true);
        return;
      }

      setUserPosts(data);
      setPostsLoaded(true);
    } catch (error) {
      setShowPostsError(true);
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      const res = await fetch(`/api/post/delete/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(error.message);
        return;
      }

      setUserPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-cyan-50">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-center my-7 text-cyan-950">YOUR PROFILE</h1>
        <div className="flex flex-col lg:flex-row gap-10 justify-center">
          <div className="lg:w-1/2 p-3 max-w-lg border rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-center my-7 text-cyan-900">PROFILE SETTINGS</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt="profile-pic"
                className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
              />
              <p className="text-sm self-center">
                {fileUploadError ? (
                  <span className="text-red-700">Error Image upload (image must be less than 2 mb)</span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-700">Image successfully uploaded!</span>
                ) : (
                  ""
                )}
              </p>
              <input
                type="text"
                placeholder="username"
                defaultValue={currentUser.username}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                placeholder="email"
                id="email"
                defaultValue={currentUser.email}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />
              <input
                type="password"
                placeholder="password"
                onChange={handleChange}
                id="password"
                className="border p-3 rounded-lg"
              />
              <button
                disabled={loading}
                className="bg-cyan-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
              >
                {loading ? "Loading..." : "Save"}
              </button>
            </form>
            <p className="text-red-700 mt-5">{error ? error : " "}</p>
            <p className="text-green-700 mt-5">{updateSuccess ? "Profile updated successfully!" : ""}</p>
            <div className="flex justify-between mt-5">
              <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
              <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
            </div>
          </div>
          <div className="lg:w-1/2 p-3 max-w-lg mx-auto border rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold text-center my-7 text-cyan-900"> CHOOSE AN ACTIVITY</h3>
            <div className="flex flex-col items-center gap-6">
              <Link
                className="bg-cyan-800 text-white font-bold py-10 px-12 w-56 h-32 rounded-lg flex items-center justify-center uppercase text-center hover:opacity-95"
                to={"/post-vacancy"}
              >
                Post a Vacancy
              </Link>
              <button
                onClick={handleShowPosts}
                className="bg-cyan-800 text-white font-bold py-10 px-12 w-56 h-32 rounded-lg flex items-center justify-center uppercase text-center hover:opacity-95"
              >
                See Your Posts
              </button>
            </div>

            <p className="text-red-700 mt-5">{showPostsError ? "Error showing listings" : ""}</p>
            {postsLoaded && (userPosts.length > 0 ? (
              <div className="flex flex-col gap-4">
                <h1 className="text-center mt-7 text-2xl font-semibold">Your Posts</h1>
                {userPosts.map((post) => (
                  <div key={post._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
                    <Link to={`/post/${post._id}`} className="flex items-center gap-4">
                      <img src={post.imageUrls[0]} className="h-16 w-16 object-contain" alt={post.name} />
                      <p>{post.name}</p>
                    </Link>
                    <div className="flex flex-col items-center">
                      <button onClick={() => handlePostDelete(post._id)} className="text-red-700 uppercase">
                        Delete
                      </button>
                      <Link to={`/update-post/${post._id}`}>
                        <button className='text-green-700 uppercase'>Edit</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-700 mt-5">No posts found.</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

