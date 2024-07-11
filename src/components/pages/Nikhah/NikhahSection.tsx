import Image from 'next/image'
import scss from './NikhahSection.module.scss'
import floral1 from '@/assets/floral-hand-drawn-ornament-collection_1.svg'
import floral2 from '@/assets/floral-hand-drawn-ornament-collection_2.svg'
import { Oswald, Bodoni_Moda } from "next/font/google";
const oswald = Oswald({ subsets: ["latin"] });
const bodoni_Moda = Bodoni_Moda({ subsets: ["latin"] });

const NikhahSection = () => {
  return (
    <section className={scss.NikhahSection}>
      <div className="container">
        <div className={scss.content}>
          <h1>УРМАТТУУ</h1>
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