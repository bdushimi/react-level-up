import React, { useEffect, useState, useRef } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import "../../../AmplifyConfig";
import { getPost } from "@/graphql/queries";
import { updatePost } from "@/graphql/mutations";
import { v4 as uuid_v4 } from "uuid";
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
  const [isPostCoverImageUpdated, setIsPostCoverImageUpdated] = useState(false);
  const [image, setImage] = useState(null);

  const imageFileInput = useRef(null);

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

  async function uploadImage() {
    imageFileInput.current.click();
  }

  function handleChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setImage(fileUploaded);
    setIsPostCoverImageUpdated(true);
  }

  const { title, content } = post;

  async function updateCurrentPost() {
    if (!title || !content) return null;

    const postUpdated = {
      id,
      content,
      title,
    };

    if (isPostCoverImageUpdated && image) {
      //Upload the image to the AWS s3
      if (image) {
        const filename = `${image.name}_${uuid_v4()}`;
        await Storage.put(filename, image);
        postUpdated.coverImage = filename;
      }
    }

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

      {image ? (
        <img src={URL.createObjectURL(image)} className="my-4" />
      ) : (
        <img src={post.coverImage} className="my-4" />
      )}

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
        onClick={updateCurrentPost}
        className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
      >
        Update Post
      </button>
    </div>
  );
}
