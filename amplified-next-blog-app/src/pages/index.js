import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import Link from "next/link";

import { listPosts } from "@/graphql/queries";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const postsData = await API.graphql({
      query: listPosts,
    });

    setPosts(postsData.data.listPosts.items);
  }

  return (
    <div>
      <h1 className="text-sky-400 text-3xl font-bold underline tracking-wide mt-6 mb-2">
        Posts!
      </h1>
      {posts.map((post, index) => (
        <Link key={index} href={`/posts/${post.id}`}>
          <div className="cursor-pointer border-b boder-gray-300 mt-8 pb-4">
            <h2 className="text-xl font-semibold" key={post.id}>
              {post.title}
            </h2>
            <p className="text-gray-500 mt-2">Author: {post.username}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
