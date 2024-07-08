import scss from './Map.module.scss'
const Map = () => {
  return (
    <section className={scss.Map}>
      <div className="container">
        <div className={scss.content}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d735.0870451446333!2d72.2364743!3d42.526658!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38a15d00500feeff%3A0xb9fec66a0d1837e6!2z0JDQu9CwLdCi0L7QviDRgNC10YHRgtC-0YDQsNC90Ys!5e0!3m2!1sru!2skg!4v1720338469039!5m2!1sru!2skg"  height="450" loading="lazy" ></iframe>
        </div>
      </div>
    </section>
  )
}

export default Map