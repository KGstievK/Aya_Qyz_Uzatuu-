import Image from "next/image";
import scss from "./NikhahSection.module.scss";
import floral1 from "@/assets/floral-hand-drawn-ornament-collection_1.svg";
import floral2 from "@/assets/floral-hand-drawn-ornament-collection_2.svg";
import name from "@/assets/Vector.svg";
import { Oswald } from "next/font/google";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
const oswald = Oswald({ subsets: ["latin"] });

interface FormType {
  _id?: number;
  name?: string;
  partner?: string;
  dev: string;
}

const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
const url = process.env.NEXT_PUBLIC_API_URL;

const devs = [
  {
    dev: "---ТАҢДАҢЫЗ---",
  },
  {
    dev: "Кудалар",
  },
  {
    dev: "Туугандар",
  },
  {
    dev: "Тайкелер",
  },
  {
    dev: "Өкүл Ата, Өкүл Апа",
  },
  {
    dev: "Жезде, Эже, Кыздар, Күйө балдар",
  },
  {
    dev: "Бөлөлөр",
  },
  {
    dev: "Жекжат Дос Аяш.",
  },
  {
    dev: "Коллегалар",
  },
  {
    dev: "Кошуналар",
  },
  {
    dev: "Бала, келиндин достору.",
  },
  {
    dev: "Катташ асылдар",
  },
];

const NikhahSection = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<FormType | null>(null);
  const [star, setStar] = useState<FormType | null>(null);
  const { register, handleSubmit } = useForm<FormType>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShow(JSON.parse(String(localStorage.getItem("show"))));
      setUser(JSON.parse(String(localStorage.getItem("name"))));
    }
  }, []);

  const onSubmit: SubmitHandler<FormType> = async (FormData) => {
    try {
      const nameData = {
        id: FormData._id,
        name: FormData.name,
        partner: FormData.partner,
        dev: FormData.dev,
      };
      const { data: responseName } = await axios.post(
        `${url}/wedding_v1`,
        nameData,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );

      const messageModel = (FormData: FormType) => {
        let messageTG = `КИМ: <b>${FormData.name}</b>\n`;
        messageTG += `ЖААРЫ: <b>${FormData.partner}</b>\n`;
        messageTG += `Ким Болот: <b>${FormData.dev}</b>\n`;
        return messageTG;
      };
      const message = messageModel(FormData);
      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      });
      localStorage.setItem("name", JSON.stringify(FormData));
      localStorage.setItem("show", JSON.stringify(true));
      window.location.reload();
      setStar(responseName);
    } catch (e) {
      console.error(e);
    }
  };

  if (show) {
    return (
      <section className={scss.NikhahSection}>
        <div className="container">
          <div className={scss.content}>
            <h1>УРМАТТУУ</h1>
            <p className={scss.GuestName}>
              {user?.name?.toUpperCase()}{" "}
              {user?.partner && user?.name !== undefined ? "ЖАНА" : null}{" "}
              {user?.partner?.toUpperCase()} СИЗДЕРДИ СҮЙҮКТҮҮ КЫЗЫБЫЗ А-Я КЫЗ
              УЗАТУУ ТОЮНА АРНАЛГАН АК ДАСТАРКОНКБУЗДУН КАДЫРЛУУ КОНОГУ БОЛУУГА
              ЧАКЫРАБЫЗ
            </p>
            <div className={scss.name}>
              <Image
                className={scss.img}
                priority
                src={floral1}
                alt="flora-1"
              />
              <div className={scss.we}>
                {/* <h1>Нестан-Дарежан</h1>
              <h1 className={oswald.className}>Кыз узатуу</h1> */}
                <Image priority src={name} alt="name" />
                <div className={scss.date}>
                  <h2 className={oswald.className}>АВГУСТ</h2>
                  <div className={scss.day}>
                    <h3 className={oswald.className}>1</h3>
                    <p className={oswald.className}>2025</p>
                  </div>
                  <h2 className={oswald.className}>ЖУМА</h2>
                </div>
              </div>
              <Image className={scss.img} src={floral2} alt="flora-1" />
            </div>
            <div className={scss.name}>
              <div className={scss.we}>
                <div className={scss.dateCopy}>
                  <h2 className={oswald.className}>АВГУСТ</h2>
                  <div className={scss.day}>
                    <h3 className={oswald.className}>1</h3>
                    <p className={oswald.className}>2025</p>
                    <p>13:00</p>
                  </div>
                  <h2 className={oswald.className}>ЖУМА</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={scss.NikhahSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>УРМАТТУУ</h1>
          {/* <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Сиздин аты-жөнүңүз"
              {...register("name", { required: true })}
            />
            <input
              type="text"
              placeholder="Жаарыңыздын аты-жөнү"
              {...register("partner", { required: false })}
            />
            <select {...register("dev")}>
            {
              devs.map((item, idx) => (
                <>
                  <option value={item.dev}>{item.dev}</option>
                </>
              ))
            }
            </select>
            <button type="submit">Отправить</button>
          </form> */}

          <p>
            СИЗДЕРДИ СҮЙҮКТҮҮ КЫЗЫБЫЗ А-Я КЫЗ УЗАТУУ ТОЮНА АРНАЛГАН АК
            ДАСТАРКОНКБУЗДУН КАДЫРЛУУ КОНОГУ БОЛУУГА ЧАКЫРАБЫЗ
          </p>
          <div className={scss.name}>
            <Image className={scss.img} priority src={floral1} alt="flora-1" />
            <div className={scss.we}>
              {/* <h1>Нестан-Дарежан</h1>
              <p className={bodoni_Moda.className}></p>
              <h1 className={oswald.className}>Кыз узатуу</h1> */}
              <Image priority src={name} alt="name" />
              <div className={scss.date}>
                <h2 className={oswald.className}>АВГУСТ</h2>
                <div className={scss.day}>
                  <h3 className={oswald.className}>1</h3>
                  <p className={oswald.className}>2025</p>
                </div>
                <h2 className={oswald.className}>ЖУМА</h2>
              </div>
            </div>
            <Image className={scss.img} src={floral2} alt="flora-1" />
          </div>
          <div className={scss.name}>
            <div className={scss.we}>
              <div className={scss.dateCopy}>
                <h2 className={oswald.className}>АВГУСТ</h2>
                <div className={scss.day}>
                  <h3 className={oswald.className}>1</h3>
                  <p className={oswald.className}>2025</p>
                  <p>13:00</p>
                </div>
                <h2 className={oswald.className}>ЖУМА</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NikhahSection;
