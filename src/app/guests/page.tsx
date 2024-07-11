"use client"
import { FC, useEffect, useState } from "react";
import scss from "./../../components/pages/Guest/Guest.module.scss";
import axios from "axios";

interface guestType {
  _id?: number;
  name: string;
  dev: string;
  partner: string;
  comment: string;
}

const url = process.env.NEXT_PUBLIC_API_URL;

const page: FC = () => {
  const [guests, setGuests] = useState<guestType[]>([]);
  const fetch = async () => {
    const { data } = await axios.get(`${url}/wedding_v1`);
    console.log(data);
    setGuests(data);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <section className={scss.page}>
      <div className="container">
        <div className={scss.content}>
          <h1>Список Гостей</h1>
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    <h2>№</h2>
                  </th>
                  <th>
                    <h2>Имя</h2>
                  </th>
                  <th>
                    <h2>С кем?</h2>
                  </th>
                  <th>
                    <h2>Определение</h2>
                  </th>
                  <th>
                    <h2>Комментарий</h2>
                  </th>
                </tr>
              </thead>
              <tbody>
                {guests.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <p style={{
                        fontSize: "22px",
                        fontWeight: "300",
                        fontStyle: "italic"
                      }}><strong>{item._id}</strong></p>
                    </td>
                    <td>
                      <p>{item.name}</p>
                    </td>
                    <td>
                      <p>{item.partner}</p>
                    </td>
                    <td>
                      <p>{item.dev}</p>
                    </td>
                    <td>
                      <p>{item.comment}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
