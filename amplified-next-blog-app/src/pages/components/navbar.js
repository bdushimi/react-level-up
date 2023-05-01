import Link from "next/link";
import React, { useState, useEffect } from "react";
import "../../../AmplifyConfig";

import { Auth, Hub } from "aws-amplify";

const Navbar = () => {
  const [signedUser, setSignedUser] = useState(null);

  useEffect(()=>{
    authListener()
  }, [])

  async function authListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "SignIn":
          return setSignedUser(true);

        case "SignOut":
          return setSignedUser(false);
      }
    });

    try {
      await Auth.currentAuthenticatedUser();
      setSignedUser(true);
    } catch (err) {}
  }

  return (
    <nav className="flex justify-center pt-3 pb-3 space-x-4 border-b bg-cyan-500 border-gray-300">
      {[
        ["Home", "/"],
        ["Create Post", "/create-post"],
        ["Profile", "/profile"],
      ].map(([title, url], index) => (
        <Link legacyBehavior href={url} key={index}>
          <a className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slage-100 hover:text-slate-900">
            {title}
          </a>
        </Link>
      ))}

      {signedUser && (
        <Link legacyBehavior href="/my-posts">
          <a className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slage-100 hover:text-slate-900">
            My Posts
          </a>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
