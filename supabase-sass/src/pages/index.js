import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { supabase } from "../utils/supabase";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ lessons }) {
  return (
    <div className="w-full max-w-3wl mx-auto my-16 px-2">
      {lessons.map((lesson) => (
        <Link key={lesson.id} href={`/${lesson.id}`} legacyBehavior>
          <a className="p-8 h-40 mb-4 rounded shadow text-xl flex">{lesson.title}</a>
        </Link>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await supabase.from("lesson").select("*");
  return {
    props: {
      lessons: data,
    },
  };
};
