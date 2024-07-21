"use client";
import { FC, useEffect, useState } from "react";
import scss from "./Guest.module.scss";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { delet, edit } from "@/components/icons";
import * as XLSX from "xlsx";

interface guestType {
  _id?: number;
  name?: string;
  partner?: string;
  dev?: string;
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
  };

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
  };

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

  const attendingCount = guests.filter(guest => guest.dev === "Кудалар").length;
  const notAttendingCount = guests.filter(guest => guest.dev === "Туугандар").length;
  const taykeler = guests.filter(guest => guest.dev === "Тайкелер").length;
  const okulAtaApa = guests.filter(guest => guest.dev === "Өкүл Ата, Өкүл Апа").length;
  const jezdeEje = guests.filter(guest => guest.dev === "Жезде, Эже, Кыздар, Күйө балдар").length;
  const bololor = guests.filter(guest => guest.dev === "Бөлөлөр").length;
  const jekjatDosAyash = guests.filter(guest => guest.dev === "Жекжат Дос Аяш").length;
  const kollega = guests.filter(guest => guest.dev === "Коллегалар").length;
  const koshunalar = guests.filter(guest => guest.dev === "Кошуналар").length;
  const BalaKelin = guests.filter(guest => guest.dev === "Бала, келиндин достору").length;
  const Asyldar = guests.filter(guest => guest.dev === "Катташ асылдар").length;

  const exportToExcel = () => {
    const guestsWithNumbers = guests.map((guest, index) => ({
      ...guest,
      _id: index + 1,
    }));
    const worksheet = XLSX.utils.json_to_sheet(guestsWithNumbers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Guests");
    XLSX.writeFile(workbook, "guests.xlsx");
  };

  return (
    <section className={scss.guest}>
      <div className="container">
        <div className={scss.content}>
          <h1>Список Гостей</h1>
          <button onClick={exportToExcel} style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#3067c6",
            color: "#FFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}>Экспорт в Excel</button>
          <div>
            <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
              <table>
                <thead>
                  <tr>
                    <th><h2>№</h2></th>
                    <th><h2>Имя</h2></th>
                    <th><h2>Партнёр</h2></th>
                    <th><h2>Кто</h2></th>
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
                            {/* <input type="radio" value="Приду✅" {...registerEdit("dev")} defaultChecked={item.dev === "Приду✅"} /> Приду✅
                            <input type="radio" value="Не смогу❌" {...registerEdit("dev")} defaultChecked={item.dev === "Не смогу❌"} /> Не смогу❌ */}
                          </td>
                          <td style={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}>
                            <button type={isSubmittingEdit ? "button" : "submit"} style={{
                              width: "100px",
                              height: "30px",
                              backgroundColor: '#3067c6',
                              color: "#FFF"
                            }}>
                              {isSubmittingEdit ? "Loading..." : "Сохранить"}
                            </button>
                            <button type="button" onClick={() => setEditId(null)} style={{
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
                          <td><p>{item.name}</p></td>
                          <td>{<p>{item.partner}</p>}</td>
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
                </tbody>
              </table>
            </form>
            <table>
              <thead>
                <tr>
                  <th><p><strong>Кол-о:</strong></p></th>
                  <th><p><strong>Кудалар:</strong></p></th>
                  <th><p><strong>Туугандар:</strong></p></th>
                  <th><p><strong>Тайкелер: </strong></p></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><p><strong>{guests.length}</strong></p></td>
                  <td><p><strong>{attendingCount}</strong></p></td>
                  <td><p><strong>{notAttendingCount}</strong></p></td>
                  <td><p><strong>{taykeler}</strong></p></td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th><p><strong>Өкүл Ата, Өкүл Апа:</strong></p></th>
                  <th><p><strong>Жезде, Эже, Кыздар, Күйө балдар:</strong></p></th>
                  <th><p><strong>Бөлөлөр:</strong></p></th>
                  <th><p><strong>Жекжат Дос Аяш:</strong></p></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><p><strong>{okulAtaApa}</strong></p></td>
                  <td><p><strong>{jezdeEje}</strong></p></td>
                  <td><p><strong>{bololor}</strong></p></td>
                  <td><p><strong>{jekjatDosAyash}</strong></p></td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th><p><strong>Коллегалар:</strong></p></th>
                  <th><p><strong>Кошуналар:</strong></p></th>
                  <th><p><strong>Бала, келиндин достору:</strong></p></th>
                  <th><p><strong>Катташ асылдар:</strong></p></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><p><strong>{kollega}</strong></p></td>
                  <td><p><strong>{koshunalar}</strong></p></td>
                  <td><p><strong>{BalaKelin}</strong></p></td>
                  <td><p><strong>{Asyldar}</strong></p></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestData;
