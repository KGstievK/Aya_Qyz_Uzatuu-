"use client";
import Image from "next/image";
import scss from "./Welcome.module.scss";
import folor from "@/assets/Rectangle_2.svg";
import folor_2 from "@/assets/Rectangle_2.svg";
import { FC, useEffect, useState } from "react";

const Welcome: FC = () => {
  const [animation, setAnimation] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 3000);
  }, []);

  return (
    <section
      className={scss.Welcome}
      style={{
        display: !animation ? "flex" : "none",
      }}
    >
      <div className="container">
        <div className={scss.content}>
          <div className={scss.We}>
            <div className={scss.We_name}>
              <h1>01</h1>
              <h1>08</h1>
              <h1>25</h1>
              <h2>ЧАКЫРУУ</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
