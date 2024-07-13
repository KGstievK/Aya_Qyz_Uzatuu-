"use client"
import { FC, useEffect, useState } from "react";
import scss from "./Guest.module.scss";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { delet, edit } from "@/components/icons";

interface guestType {
  _id?: number;
  name?: string;
  dev?: string;
  partner?: string;
  comment?: string;
}

const url = process.env.NEXT_PUBLIC_API_URL;

const GuestData: FC = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [guests, setGuests] = useState<guestType[]>([]);
  const { register: registerEdit, handleSubmit: handleSubmitEdit, formState: { isSubmitting: isSubmittingEdit }, setValue } = useForm<guestType>({});

  const onSubmitEdit: SubmitHandler<guestType> = async (data) => {
    try {
      const { data: responseTodos } = await axios.patch(`${url}/wedding_v1/${editId}`, data);
      setGuests(responseTodos);
      setEditId(null);
    } catch (e) {
      console.error(e);
    }
  }

  const handleComplete = async (_id: number, isCompleted: boolean) => {
    const updateData = {
      isCompleted: !isCompleted,
    };
    const { data } = await axios.patch(`${url}/wedding_v1/${_id}`, updateData);
    setGuests(data);
  };

  const deleteTodo = async (_id: number) => {
    const { data } = await axios.delete(`${url}/wedding_v1/${_id}`);
    setGuests(data);
  }

  const fetchGuests = async () => {
    try {
      const { data } = await axios.get(`${url}/wedding_v1`);
      setGuests(data);
    } catch (error) {
      console.error("Error fetching guest data:", error);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const attendingCount = guests.filter(guest => guest.dev === "Приду✅").length;
  const notAttendingCount = guests.filter(guest => guest.dev === "Не смогу❌").length;

  return (
    <section className={scss.guest}>
      <div className="container">
        <div className={scss.content}>
          <h1>Список Гостей</h1>
          <div>
            <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
              <table>
                <thead>
                  <tr>
                    <th><h2>№</h2></th>
                    <th><h2>Имя</h2></th>
                    <th><h2>Определение</h2></th>
                    <th><h2>{editId !== null ? "Действия" : "Кнопки"}</h2></th>
                    {editId !== null ? <th><h2>Кнопки</h2></th> : ''}
                  </tr>
                </thead>
                <tbody>
                  {guests.map((item, index) => (
                    <tr key={item._id}>
                      {editId === item._id ? (
                        <>
                          <td>
                            <p style={{ fontSize: "22px", fontWeight: "300", fontStyle: "italic" }}>
                              <strong>{index + 1}</strong>
                            </p>
                          </td>
                            <td>
                              <input type="text" placeholder="Сиздин аты-жөнүңүз" {...registerEdit("name")} defaultValue={item.name} />
                            </td>
                            <td>
                              <input type="text" placeholder="Жаарыңыздын аты-жөнү" {...registerEdit("partner")} defaultValue={item.partner} />
                            </td>
                            <td>
                              <input type="radio" value="Приду✅" {...registerEdit("dev")} defaultChecked={item.dev === "Приду✅"} /> Приду✅
                              <input type="radio" value="Не смогу❌" {...registerEdit("dev")} defaultChecked={item.dev === "Не смогу❌"} /> Не смогу❌
                            </td>
                            <td style={{
                              display: "flex", 
                              alignItems: "flex-start",
                              flexDirection: "column",
                              justifyContent: "center",
                              // gap: "20px"
                            }}>
                              <button type={isSubmittingEdit ? "button" : "submit" } style={{
                                width: "100px",
                                height: "30px",
                                backgroundColor: '#3067c6',
                                color: "#FFF"
                              }}>
                                {isSubmittingEdit ? "Loading..." : "Сохранить"}
                              </button>
                              <button type="button" onClick={() => setEditId(null)}  style={{
                                width: "100px",
                                height: "30px",
                                backgroundColor: '#3067c6',
                                color: "#FFF"
                              }}>Отмена</button>
                            </td>
                        </>
                      ) : (
                        <>
                          <td>
                            <p style={{ fontSize: "22px", fontWeight: "300", fontStyle: "italic" }}>
                              <strong>{index + 1}</strong>
                            </p>
                          </td>
                          <td><p>{item.name || item.partner}</p></td>
                          <td><p>{item.dev}</p></td>
                          <td style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"
                          }}>
                            <button onClick={() => { setEditId(item._id!); setValue("name", item.name); setValue('partner', item.partner); setValue('dev', item.dev); setValue('comment', item.comment); }} style={{
                              width: "30px"
                            }}>{edit}</button>
                            <button onClick={() => deleteTodo(item._id!)} style={{
                              width: "30px"
                            }}>{delet}</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                    <tr>
                      <td ><p><strong>Кол-о: {guests.length}</strong></p></td>
                      <td ><p><strong>Приду✅: {attendingCount}</strong></p></td>
                      <td ><p><strong>Не смогу❌: {notAttendingCount}</strong></p></td>
                    </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestData;
