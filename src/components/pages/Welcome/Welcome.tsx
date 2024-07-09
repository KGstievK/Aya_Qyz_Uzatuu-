"use client";
import Image from "next/image";
import scss from "./Welcome.module.scss";
import folor from "@/assets/Rectangle_2.svg";
import folor_2 from "@/assets/Rectangle_2.svg";
import { FC, useEffect, useState } from "react";


const Welcome: FC= () => {
  const [animation, setAnimation] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(true);
    }, 3000);
  }, []);

  return (
    <section className={scss.Welcome} style={{
      display: !animation ? "flex" : "none"
    }} >
      <div className="container">
        <div className={scss.content}>
          <div className={scss.We}>
            <Image
              className={scss.img}
              objectFit="cover"
              priority
              src={folor}
              alt="flora-1"
            />
            <div className={scss.We_name}>
              <h1>K</h1>
              <div className={scss.line}></div>
              <h1>Б</h1>
            </div>
            <Image className={scss.img} priority src={folor_2} alt="flora-1" />
          </div>
          <h1>ЧАКЫРУУ</h1>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
