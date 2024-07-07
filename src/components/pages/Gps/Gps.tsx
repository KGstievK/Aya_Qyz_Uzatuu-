import scss from './Gps.module.scss'

const Gps = () => {
  return (
    <section className={scss.Gps}>
      <div className="container">
        <div className={scss.content}>
          <h1>Место Торжества</h1>
          <p>Город Талас, Чингиз Айтматова 246</p>
        </div>
      </div>
    </section>
  )
}

export default Gps