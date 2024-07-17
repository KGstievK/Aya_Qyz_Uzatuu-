import Image from 'next/image'
import scss from './NikhahSection.module.scss'
import floral1 from '@/assets/floral-hand-drawn-ornament-collection_1.svg'
import floral2 from '@/assets/floral-hand-drawn-ornament-collection_2.svg'
import { Oswald, Bodoni_Moda } from "next/font/google";
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
const oswald = Oswald({ subsets: ["latin"] });
const bodoni_Moda = Bodoni_Moda({ subsets: ["latin"] });

interface FormType {
  _id?: number;
  name?: string;
  partner?: string;
  dev: string;
}

const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
const CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
const url = process.env.NEXT_PUBLIC_API_URL;



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
      };
      const { data: responseName } = await axios.post(`${url}/wedding_v1`, nameData, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      const messageModel = (FormData: FormType) => {
        let messageTG = `КИМ: <b>${FormData.name}</b>\n`;
        messageTG += `ЖААРЫ: <b>${FormData.partner}</b>\n`;
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
          <p>
          {user?.name?.toUpperCase()} {user?.partner && user?.name !== undefined ? "ЖАНА" : null } {user?.partner?.toUpperCase()} СИЗДЕРДИ УУЛУБУЗ КУДАЙБЕРГЕН КЕЛИНИБИЗ БУРУЛДУН ҮЙЛӨНҮҮ ТОЮНУНУН ЧАКЫРАБЫЗ
          </p>
          <div className={scss.name}>
            <Image className={scss.img} priority src={floral1} alt='flora-1'/>
            <div className={scss.we}>
              <h1>Кудайберген</h1>
              <p className={bodoni_Moda.className}>&</p>
              <h1>Бурул</h1>
              <div className={scss.date}>
                <h2 className={oswald.className}>АВГУСТ</h2>
                <div className={scss.day}>
                <h3 className={oswald.className}>8</h3>
                <p className={oswald.className}>2024</p>
                </div>
                <h2 className={oswald.className}>БЕЙШЕМБИ</h2>
              </div>
            </div>
            <Image className={scss.img} src={floral2} alt='flora-1'/>
          </div>
          <div className={scss.name}>
            <div className={scss.we}>
              <div className={scss.dateCopy}>
                <h2 className={oswald.className}>АВГУСТ</h2>
                <div className={scss.day}>
                <h3 className={oswald.className}>8</h3>
                <p className={oswald.className}>2024</p>
                </div>
                <h2 className={oswald.className}>БЕЙШЕМБИ</h2>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    )
  }

  return (
    <section className={scss.NikhahSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>УРМАТТУУ</h1>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
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
            <button type="submit">ЖӨНӨТҮҮ</button>
          </form>
          <p>
            КАДЫРЛУУ КОНОГУБУЗ СИЗДЕРДИ УУЛУБУЗ КУДАЙБЕРГЕН КЕЛИНИБИЗ БУРУЛДУН ҮЙЛӨНҮҮ ТОЮНУНУН ЧАКЫРАБЫЗ
          </p>
          <div className={scss.name}>
            <Image className={scss.img} priority src={floral1} alt='flora-1'/>
            <div className={scss.we}>
              <h1>Кудайберген</h1>
              <p className={bodoni_Moda.className}>&</p>
              <h1>Бурул</h1>
              <div className={scss.date}>
                <h2 className={oswald.className}>АВГУСТ</h2>
                <div className={scss.day}>
                <h3 className={oswald.className}>8</h3>
                <p className={oswald.className}>2024</p>
                </div>
                <h2 className={oswald.className}>БЕЙШЕМБИ</h2>
              </div>
            </div>
            <Image className={scss.img} src={floral2} alt='flora-1'/>
          </div>
          <div className={scss.name}>
            <div className={scss.we}>
              <div className={scss.dateCopy}>
                <h2 className={oswald.className}>АВГУСТ</h2>
                <div className={scss.day}>
                <h3 className={oswald.className}>8</h3>
                <p className={oswald.className}>2024</p>
                </div>
                <h2 className={oswald.className}>БЕЙШЕМБИ</h2>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default NikhahSection