"use client";
import Dad from "./Dad/Dad";
import Gps from "./Gps/Gps";
import NikhahSection from "./Nikhah/NikhahSection";
import Welcome from "./Welcome/Welcome";

const Home = () => {
  return (
    <div
      style={{
        background: "#9c9898",
        backgroundSize: "cover", // Растягивает изображение на всю область
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100%", // Минимальная высота = весь экран
        width: "100%",
      }}
    >
      <Welcome />
      <NikhahSection />
      {/* <Timer/> */}
      {/* <FormGuest/> */}
      <Gps />
      {/* <Map/> */}
      <Dad />
    </div>
  );
};

export default Home;
