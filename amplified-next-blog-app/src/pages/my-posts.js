import React, { useState, useEffect } from "react";
import { API, Auth } from "aws-amplify";
import { postsByUsername } from "@/graphql/queries";
import { deletePost } from "@/graphql/mutations";
import Link from "next/link";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    const { username, attributes } = await Auth.currentAuthenticatedUser();
    const postData = await API.graphql({
      query: postsByUsername,
      variables: { username: `${attributes.sub}::${username}` },
    });

    setPosts(postData.data.postsByUsername.items);
  };

  const deletePostHandler = async (id) => {
    await API.graphql({
      query: deletePost,
      variables: { input: { id } },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    fetchMyPosts();
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        My Posts
      </h1>
      {posts.map((post, index) => (
        <div
          key={index}
          className="cursor-pointer border-b border-gray-300 mt-8 pb-8"
        >
          <Link href={`/posts/${post.id}`}>
            <div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-grary-500 mt-2">Author: {post.username}</p>
            </div>
          </Link>
          <div className="flex flex-grow mt-4">
            <Link href={`/posts/${post.id}`}>
              <button className="text-sm mr-4 px-4 py-2 border-2 rounded-full text-gree-500 border-slate-400 hover:border-slate-500">
                View Post
              </button>
            </Link>
            <Link href={`/edit-post/${post.id}`}>
              <button className="text-sm mr-4 px-4 py-2 border-2 rounded-full text-blue-500 border-slate-400 hover:border-slate-500">
                Edit Post
              </button>
            </Link>
            <button
              className="text-sm mr-4 text-red-500 hover:text-lg"
              onClick={() => deletePostHandler(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
