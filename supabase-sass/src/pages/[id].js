import { supabase } from "../utils/supabase";

const LessonDetails = ({ lesson }) => {
  return (
    <div>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data: ids } = await supabase.from("lesson").select("id");

  // Returning possible IDs that shall be used in different paths i.e different params = different paths/url
  const paths = ids.map((id) => ({
    params: {
      id: id.toString(),
    },
  }));
  console.log(paths[1].params.id.length)

  return {
    paths,
    fallback: false,
  };
};

// This getStaticProps will be called for each possible  path
export const getStaticProps = async ({ params }) => {

  // Select * where id is equal to the provided id
  console.log("id", params.id);

  const { data: lesson } = await supabase
    .from("lesson")
    .select("*")
    .eq("id", params.id)
    .single();

  console.log("lesson", lesson);

  return {
    props: {
      lesson,
    },
  };
};

export default LessonDetails;
