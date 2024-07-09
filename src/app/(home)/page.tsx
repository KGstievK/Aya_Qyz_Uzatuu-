"use client";

import Home from "@/components/pages/Home";
import Welcome from "@/components/pages/Welcome/Welcome";
import React from "react";
import { usePathname } from "next/navigation";

const page = () => {
  const [animation, setAnimation] = React.useState(false);

  const pathname = usePathname();

  if (pathname === "/" && animation === false) {
    return (
      <div>
        <Welcome setAnimation={setAnimation} />
        <Home/>
      </div>
      )
    } else {
      return (
      <div>
        <Home />
      </div>
      ) 
    }
};  

export default page;
