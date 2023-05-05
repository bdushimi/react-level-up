import { useState, useEffect } from "react";
import { API, Auth, Hub, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid_v4 } from "uuid";
import "../../../AmplifyConfig";
import { listPosts, getPost } from "@/graphql/queries";
import { createComment as createCommentMutation } from "@/graphql/mutations";
import dynamic from "next/dynamic";

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: false,
});
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const initialCommentState = { message: "" };

const Post = ({ post }) => {
  const router = useRouter();
  const [comment, setComment] = useState(initialCommentState);
  const [showMe, setShowMe] = useState(false);
  const { message } = comment;

  if (router.isFallback) {
    return <div>Loading....</div>;
  }

  async function createComment() {
    if (!comment.message) return;
    const id = uuid_v4();
    comment.id = id;

    try {
      await API.graphql({
        query: createCommentMutation,
        variables: { input: comment },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    } catch (error) {
      console.log(error);
    }

    router.push("/my-posts");
  }

  function toggle() {
    setShowMe(!showMe);
  }

  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold tracing-wide">{post.title}</h1>
      {post.coverImage && <img src={post.coverImage} className="my-4" />}
      <p className="text-sm font-light my-4"> By {post.username}</p>
      <div className="mt-8">
        <ReactMarkdown className="prose" children={post.content} />
      </div>
      <div className="tracking-wide text-gray-500 my-4">
        {post?.comments.items.length > 0 &&
          post.comments.items.map((comment, index) => (
            <div
              key={index}
              className="py-8 px-8 max-w-xl mx-auto bg-white shadow-lg space-y-2 sm:py-1 sm:flex my-6 mx-12
            sm:items-center sm:space-y-0 sm:space-x-6 mb-2"
            >
              <div>
                <p className="text-gray-500 mt-2">{comment.message}</p>
                <p className="text-gray-200 mt-1">{comment.createdBy}</p>
              </div>
            </div>
          ))}
      </div>
      <div>
        <button
          type="button"
          className="mb-4 mt-4 bg-green-600 text-white font-semibold px-4 py-2 rounded-lg"
          onClick={toggle}
        >
          Post a comment
        </button>
        {
          <div style={{ display: showMe ? "block" : "none" }}>
            <SimpleMDE
              value={comment.message}
              onChange={(value) =>
                setComment({ ...comment, message: value, postID: post.id })
              }
            />
            <button
              type="button"
              className="mb-4 mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg"
              onClick={createComment}
            >
              Post
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const posts = await API.graphql({
    query: listPosts,
  });

  const paths = posts.data.listPosts.items.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const postData = await API.graphql({
    query: getPost,
    variables: { id },
  });

  const post = postData.data.getPost;
  // Get the updated URL
  const coverImageURL = await Storage.get(post.coverImage);
  post.coverImage = coverImageURL;

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
}

export default Post;
