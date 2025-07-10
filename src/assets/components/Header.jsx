import { useState } from "react";
import logo from "../imgs/logo.png";
import { Menu } from "lucide-react";

function Header(props) {
  const [pageSectionMenu, setOpenSectionMenu] = useState({
    isOpen: false,
  });


  const [sectionList] = useState([
    { sectionName: "Sobre", scrollTo: props.scrollToAbout },
    { sectionName: "Produtos", scrollTo: props.scrollToProducts },
    { sectionName: "Contatos", scrollTo: props.scrollToContact },
  ]);

  return (
    <main className="relative">
      <header className="w-full h-[80px] bg-obsidian flex justify-between items-center pr-12 pl-12">
        <img src={logo} alt="" className="w-[110px]" />

        {/*Botão disponível apenas no mobile*/}
        <button
          onClick={() => {
            setOpenSectionMenu((prevConfig) => ({
              ...prevConfig,
              isOpen: !pageSectionMenu.isOpen,
            }));
          }}
          className={`${
            pageSectionMenu.isOpen ? "rotate-90" : ""
          } transition duration-200 sm:hidden`}
        >
          <Menu color="white" size={30} />
        </button>

        <div className="hidden sm:block">
          <ul className="flex gap-5 justify-center items-center">
            {sectionList.map((item) => (
              <li
                key={item.sectionName}
                className={`pl-1 pr-1 border-2 border-obsidian hover:border-b-white text-white font-bold transition duration-200 cursor-pointer`}
                style={{ fontFamily: "NorfolkRegular" }}
              >
                <button onClick={item.scrollTo}>{item.sectionName}</button>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div
        className={`absolute sm:hidden w-full h-[120px] ${
          pageSectionMenu.isOpen ? "block" : "hidden"
        }`}
      >
        <ul className={`flex flex-col justify-center items-center bg-primary `}>
          {sectionList.map((item) => (
            <li
              key={item.sectionName}
              className={`w-full text-center text-cloud-wisp p-2 bg-primary active:bg-secondary transition duration-150`}
              style={{ fontFamily: "NorfolkRegular" }}
            >
              <button onClick={item.scrollTo}>{item.sectionName}</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Header;
