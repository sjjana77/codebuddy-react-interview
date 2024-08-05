import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://codebuddy.review/posts");
        if (response.ok) {
          const data = await response.json();
          setPosts(data.data); 
        } else {
          console.error("Failed to fetch posts:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="rounded-lg bg-white p-7 shadow-lg">
            <div className="flex items-center mb-4">
              <img src={post.avatar} alt={`${post.firstName} ${post.lastName}`} className="w-10 h-10 rounded-full mr-3" />
              <h2 className="text-xl font-bold">{`${post.firstName} ${post.lastName}`}</h2>
            </div>
            <img src={post.image} alt="Post" className="mb-4 w-full h-48 object-cover rounded-lg" />
            <p className="text-gray-700">{post.writeup}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
