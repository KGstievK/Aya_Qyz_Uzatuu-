"use client";

import Home from "@/components/pages/Home";
import Welcome from "@/components/pages/Welcome/Welcome";
import React from "react";

const page = () => {
  const [animation, setAnimation] = React.useState(false);

    return (
      <div>
        <Welcome setAnimation={setAnimation} />
        <Home/>
      </div>
      )
   
};  

export default page;
