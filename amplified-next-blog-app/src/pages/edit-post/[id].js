import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import "../../../AmplifyConfig";
import { getPost } from "@/graphql/queries";
import { updatePost } from "@/graphql/mutations";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
    async function fetchPost() {
      if (!id) return;

      const postData = await API.graphql({
        query: getPost,
        variables: { id },
      });

      setPost(postData.data.getPost);
    }
  }, [id]);

  if (!post) return null;

  function onChange(e) {
    e.preventDefault();
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }

  const { title, content } = post;

  async function updateCurrentPost() {
    if (!title || !content) return null;

    const postUpdated = {
      id,
      content,
      title,
    };

    await API.graphql({
      query: updatePost,
      variables: { input: postUpdated },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    router.push("/my-posts");
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
        Edit Post
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus text-gray-500 placeholder-gray-500 y-2"
      />

      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />

      <button
        onClick={updateCurrentPost}
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
      >
        Update Post
      </button>
    </div>
  );
}
