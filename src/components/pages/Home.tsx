import FormGuest from "./FormGuest/FormGuest"
import Gps from "./Gps/Gps"
import Map from "./Map/Map"
import NikhahSection from "./Nikhah/NikhahSection"
import Timer from "./Timer/Timer"

const Home = () => {
  return (
    <div style={{
      zIndex: '1',
      position: 'relative'
    }}>
      <NikhahSection/>
      <Timer/>
      <FormGuest/>
      <Gps/>
      <Map/>
    </div>

  )
}

export default Home