import {
  CookingPot,
  Drill,
  Hammer,
  Laptop,
  Shirt,
  Toilet,
  Tv,
} from "lucide-react";
import Carousels from "./Carousels";
import { forwardRef, useState } from "react";

const Products = forwardRef((props, ref) => {
  const [productsDisplay] = useState([
    {
      title: "Armários de Cozinha:",
      description:
        "Criamos cozinhas dos sonhos, com armários robustos, práticos e com acabamento impecável, que resistem ao dia a dia e otimizam cada centímetro.",
      icon: <CookingPot size={20} />,
    },
    {
      title: "Móveis para Banheiros:",
      description:
        "Desenvolvemos gabinetes elegantes e funcionais, preparados para lidar com a umidade e trazer sofisticação ao seu banheiro.",
      icon: <Toilet size={20} />,
    },
    {
      title: "Estantes e Painéis para Salas de Estar:",
      description:
        "Projetamos ambientes aconchegantes e modernos, com painéis para TV, estantes personalizadas e nichos que organizam e decoram com harmonia.",
      icon: <Tv size={20} />,
    },
    {
      title: "Guarda-roupas e Closets:",
      description:
        "Produzimos soluções inteligentes para seus quartos, com guarda-roupas planejados que maximizam o espaço e atendem às suas necessidades de organização.",
      icon: <Shirt size={20} />,
    },
    {
      title: "Móveis para Escritórios:",
      description:
        "Criamos ambientes de trabalho produtivos e estéticos, com mesas, armários e prateleiras que combinam funcionalidade e design.",
      icon: <Laptop size={20} />,
    },
  ]);

  return (
    <main ref={ref} className="pt-20 pb-20 lg:p-20 w-full flex flex-col justify-center items-center bg-primary gap-[25px] lg:gap-[50px]">
      <section className="flex flex-col justify-center gap-5 p-5">
        <h1
          style={{ fontFamily: "NorfolkBold" }}
          className="text-[26pt] text-center md:text-[33pt] text-obsidian"
        >
          Nossos produtos são pensados exclusivamente em você
        </h1>
        <p
          className="text-[13pt] text-center text-white w-4/5 self-center"
          style={{ fontFamily: "Coolvetica" }}
        >
          Acreditamos que a excelência começa na escolha dos materiais. É por
          isso que o MDF é a base da nossa produção, garantindo que cada peça
          que criamos seja sinônimo de qualidade e durabilidade inquestionáveis.
          Por isso, cada um dos nossos produtos são pensados visando a
          necessidade e a qualidade para o cliente:
        </p>
      </section>

      <div className="flex flex-col xl:flex-row gap-10 justify-center items-center">
        <Carousels />

        <section
          className="text-white text-justify"
          style={{ fontFamily: "NorfolkRegular" }}
        >
          <ul className="flex flex-col gap-5 justify-center items-center">
            {productsDisplay.map((product) => {
              return (
                <li key={product.title} className="w-4/5 lg:w-full flex flex-col gap-2">
                  <h2 className="w-auto flex gap-2 items-center text-[12pt]">
                    <span className="bg-cloud-wisp text-primary rounded-full p-[6px] shadow-md shadow-black">
                      {product.icon}
                    </span>
                    {product.title}
                  </h2>
                  <p
                    className="text-[11pt]"
                    style={{ fontFamily: "Coolvetica" }}
                  >
                    {product.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
})

export default Products;
