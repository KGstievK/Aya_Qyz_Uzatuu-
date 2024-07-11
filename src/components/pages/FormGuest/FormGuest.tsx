"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./FormGuest.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

interface FormType {
  _id?: number;
  name?: string;
  partner?: string;
  dev: string;
  comment?: string;
}

const url = process.env.NEXT_PUBLIC_API_URL;

const FormGuest = () => {
  const [star, setStar] = useState<FormType | null>(null)
  const { register, handleSubmit } = useForm<FormType>({});
  const onSubmit: SubmitHandler<FormType> = async (FormData) => {
    const { data } = await axios.post(`${url}/wedding_v1`, FormData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
    console.log(data);
    setStar(data)  
  };

  return (
    <section className={scss.FormGuest}>
      <div className="container">
        <div className={scss.content}>
          <h1>КОНОКТУН АНКЕТАСЫ</h1>
          <p>Сураныч, бир нече суроолорго жооп берип, катышууңузду ырастаңыз</p>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Сиздин аты-жөнүңүс"
              {...register("name", { required: true })}
            />
            <p>ТАКТОО</p>
            <div className={scss.radio}>
              <input
                type="radio"
                value="Приду✅"
                {...register("dev", { required: true })}
              />
              <p>КЕЛЕМ</p>
            </div>
            <div className={scss.radio}>
              <input
                type="radio"
                value="Не смогу❌"
                {...register("dev", { required: true })}
              />
              <p>КЕЛЕ АЛБАЙМ</p>
            </div>
            <input
              type="text"
              placeholder="Сиз ким менен келесиз, аты-жөнүн жазып коюңуз"
              {...register("partner", { required: false })}
            />
            <input
              type="text"
              placeholder="Эгер суроолоруңуз болсо жазып коюңуз"
              {...register("comment", { required: false })}
            />
            <button type="submit">ЖӨНӨТҮҮ</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormGuest;
