import { forwardRef, useRef } from "react";
import backgroundImage from "../imgs/background-image.jpg";

const About = forwardRef((props, ref) => {
  const imageRef = useRef(null);

  return (
    <div ref={ref} className="w-full flex flex-col md:flex-row justify-center items-center bg-cloud-wisp gap-5 md:gap-15 p-7 md:p-20">
      <div className="w-full md:w-[300px] lg:w-[500px] flex flex-col gap-3">
        <h1
          style={{ fontFamily: "NorfolkBold" }}
          className="text-[26pt] sm:text-[33pt] text-primary text-center sm:text-justify"
        >
          Seus móveis com a maior qualidade de Goianésia
        </h1>
        <p
          className="text-black text-justify pt-2 text-[13pt]"
          style={{ fontFamily: "Coolvetica" }}
        >
          Há mais de 25 anos, temos a honra de servir Goianésia e toda a região,
          construindo uma história sólida de confiança e credibilidade com cada
          um de nossos clientes. Sua satisfação é nosso maior compromisso, e é
          por isso que continuamos a oferecer serviços e soluções com a
          excelência que você merece.
        </p>
      </div>
      <img
        src={backgroundImage}
        alt=""
        ref={imageRef}
        className="w-4/5 sm:w-[350px] lg:w-[550px] rounded-lg shadow-md shadow-black"
      />
    </div>
  );
})

export default About;
