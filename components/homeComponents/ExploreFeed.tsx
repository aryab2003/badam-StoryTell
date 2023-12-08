"use client";
import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface Post {
  id: number;
  user: string;
  content: string;
  likes: number;
  tags: string[];
  liked: boolean;
}

interface ExploreFeedProps {
  stories: Post[];
}

const ExploreFeed: React.FC<ExploreFeedProps> = ({ stories }) => {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>(stories);

  const handleLike = (postId: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId && !post.liked
        ? { ...post, likes: post.likes + 1, liked: true }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleDislike = (postId: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId && post.liked
        ? { ...post, likes: post.likes - 1, liked: false }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleClick = (postId: number) => {
    setSelectedPost(postId === selectedPost ? null : postId);
  };

  return (
    <div>
      <h2 className="mt-5 py-14 text-3xl font-bold text-center">
        Explore Feed
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-7">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`border rounded-lg overflow-hidden ${
              post.id === selectedPost ? "transform scale-110" : ""
            }`}
            style={{
              width: post.id === selectedPost ? "90%" : "auto",
              margin: post.id === selectedPost ? "auto" : "initial",
              zIndex: post.id === selectedPost ? 1 : "initial",
            }}
            onClick={() => handleClick(post.id)}
          >
            <div className="p-4">
              <p className="text-lg font-semibold">{post.user}</p>
              <p className="text-gray-600 mt-2">{post.content}</p>
              <p className="text-gray-500 mt-2">Likes: {post.likes}</p>
              <div className="flex justify-between mt-4">
                <div>
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <button
                    onClick={() => handleLike(post.id)}
                    disabled={post.liked}
                    className={`bg-blue-500 text-white px-3 py-1 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ${
                      post.liked ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {post.liked ? "Liked" : <FaThumbsUp />}
                  </button>
                  <button
                    onClick={() => handleDislike(post.id)}
                    disabled={!post.liked}
                    className={`bg-red-500 text-white px-3 py-1 rounded-md mt-4 ml-2 hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300 ${
                      !post.liked ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {post.liked ? <FaThumbsDown /> : "Disliked"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreFeed;
