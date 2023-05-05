import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { API, Storage } from "aws-amplify";
import { v4 as uuid_v4 } from "uuid";
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
  const [image, setImage] = useState(null);
  const { title, content } = post;
  const router = useRouter();

  const imageFileInput = useRef(null);

  function onChange(e) {
    e.preventDefault();
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  }

  async function createNewPost() {
    if (!title || !content) return;

    const id = uuid_v4();
    post.id = id;

    if (image) {
      const filename = `${image.name}_${uuid_v4()}`;
      await Storage.put(filename, image);
      const imageKey = await Storage.get(filename)
      post.coverImage = imageKey;

    }

    await API.graphql({
      query: createPost,
      variables: { input: post },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });

    router.push(`/posts/${id}`);
  }

  async function uploadImage() {
    imageFileInput.current.click();
  }

  function handleChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setImage(fileUploaded);
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6">
        Create new Post
      </h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="title"
        value={post.title}
        className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500"
      />
      {
        image && (
          <img src={URL.createObjectURL(image)} className="my-4"/>
        )
      }
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />

      <input
        type="file"
        ref={imageFileInput}
        className="absolute w-0 h-0"
        onChange={handleChange}
      />
      <button
        type="button"
        className="mb-4 bg-green-500 text-white font-semibold px-4 py-2 rounded-lg ml-3 "
        onClick={uploadImage}
      >
        Upload Cover Image
      </button>
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
