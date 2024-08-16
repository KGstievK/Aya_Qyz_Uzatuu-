"use client"
import { SetStateAction } from "react"
import Dad from "./Dad/Dad"
import FormGuest from "./FormGuest/FormGuest"
import Gps from "./Gps/Gps"
import Map from "./Map/Map"
import NikhahSection from "./Nikhah/NikhahSection"
import Timer from "./Timer/Timer"
import Welcome from "./Welcome/Welcome"

const Home = () => {
  return (
    <div>
      <Welcome />
      <NikhahSection/>
      {/* <Timer/> */}
      {/* <FormGuest/> */}
      <Gps/>
      {/* <Map/> */}
      <Dad/>
    </div>

  )
}

export default Home