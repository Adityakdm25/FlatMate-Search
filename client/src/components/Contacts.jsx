import { set } from "mongoose";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ post }) => {
  const [poster, setPoster] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPoster= async () => {
      try {
        const res = await fetch(`/api/user/${post.userRef}`);
        const data = await res.json();
        if (data.success === false) {
          return;
        }
        setPoster(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPoster();
  }, [post.userRef]);


  const onChange = (e) => {

    setMessage(e.target.value);

  };

  return (
    <div>
      {poster&& (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{poster.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{post.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${poster.email}?subject=Regarding ${poster.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default Contact;