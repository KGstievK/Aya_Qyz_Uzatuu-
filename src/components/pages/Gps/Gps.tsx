import scss from './Gps.module.scss'

const Gps = () => {
  return (
    <section className={scss.Gps}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.line}></div>
          <h1>ДАРЕГИ</h1>
          <div className={scss.line}></div>
        </div>
          <h1>АЛА-ТОО</h1>
          <p>РЕСТОРАНЫ</p>
          <p>ТАЛАС ШААРЫ, ЧЫНГЫЗ АЙТМАТОВ КӨЧӨСҮ, 246</p>
      </div>
    </section>
  )
}

export default Gps