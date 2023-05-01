import { useState, useEffect } from "react";
import { API } from "aws-amplify";

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

  return <div>
    <h1 className="text-3xl font-bold underline">Posts!</h1>
    {
      posts.map((post) => (
        <p>{post.title}</p>
      ))
    }
  </div>;
}
