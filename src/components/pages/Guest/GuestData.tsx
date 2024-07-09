import { FC, useEffect, useState } from "react";
import scss from "./Guest.module.scss";
import axios from "axios";

interface guestType {
  _id?: number;
  name: string;
  dev: string;
  partner: string;
  comment: string;
}

const url = process.env.NEXT_PUBLIC_API_URL;

const GuestData: FC = () => {
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
    <section className={scss.GuestData}>
      <div className="container">
        <div className={scss.content}>
          <h1>Список Гостей</h1>
          <div>
            <table>
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
              {guests.map((item) => (
                <tr key={item._id}>
                  <td>
                    <p>{item._id!}</p>
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
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestData;
