import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { API } from "aws-amplify";
import { uuid } from "uuidv4";
import { createPost } from "@/graphql/mutations";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const initialState = { title: "", content: "" };

const CreatePost = () => {
  const [post, setPost] = useState(initialState);
  const { title, content } = post;
  const router = useRouter();

  function onChange(e) {
    e.preventDefault();
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  }

  async function createNewPost() {
    if (!title || !content) return;

    const id = uuid();
    post.id = id;

    await API.graphql({
      query: createPost,
      variables: { input: post },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    router.push(`/posts/${id}`);
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt -6">
        Create new Post
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500"
      />
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg "
        onClick={createNewPost}
      >
        Create Post
      </button>
    </div>
  );
};

export default withAuthenticator(CreatePost);