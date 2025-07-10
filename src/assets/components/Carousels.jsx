import { useEffect, useRef, useState } from "react";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

import kitchen1 from "../imgs/products/kitchen/1.png";
import kitchen2 from "../imgs/products/kitchen/2.png";
import kitchen3 from "../imgs/products/kitchen/3.png";
import kitchen4 from "../imgs/products/kitchen/4.png";
import kitchen5 from "../imgs/products/kitchen/5.png";

import livingRoom1 from "../imgs/products/living-room/1.png";
import livingRoom2 from "../imgs/products/living-room/2.png";
import livingRoom3 from "../imgs/products/living-room/3.png";
import livingRoom4 from "../imgs/products/living-room/4.png";

import bedroom1 from "../imgs/products/bedroom/1.png";
import bedroom2 from "../imgs/products/bedroom/2.png";
import bedroom3 from "../imgs/products/bedroom/3.png";
import bedroom4 from "../imgs/products/bedroom/4.png";

function Carousels() {
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const carouselListRef = useRef({});
  const carouselRefs = useRef({});
  const imageLoaderRefs = useRef({});

  useEffect(() => {
    function handleResize() {
      setPageWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
  }) 

  const generateImageWidth = (pageWidth) => {
    return pageWidth >= 1000 ? 450 : 300;
  }

  const [carouselConfig, setCarouselConfig] = useState({
    isLeftSelected: false,
    isRightSelected: false,
    carouselWidth: 0,
    carouselHeight: 0,
    carouselMargin: 0,
    carouselBorder: 0,
    imageSize: generateImageWidth(pageWidth),
  });

  useEffect(() => {
    setCarouselConfig(prevConfig => {
      return {...prevConfig, imageSize: generateImageWidth(pageWidth) }
    })
  }, [pageWidth]);

  const [kitchenCarouselImages] = useState([
    { imageSource: kitchen1, imageId: 0 },
    { imageSource: kitchen2, imageId: 1 },
    { imageSource: kitchen3, imageId: 2 },
    { imageSource: kitchen4, imageId: 3 },
    { imageSource: kitchen5, imageId: 4 },
  ]);

  const [livingRoomCarouselImages] = useState([
    { imageSource: livingRoom1, imageId: 0 },
    { imageSource: livingRoom2, imageId: 1 },
    { imageSource: livingRoom3, imageId: 2 },
    { imageSource: livingRoom4, imageId: 3 },
  ]);

  const [bedroomCarouselImages] = useState([
    { imageSource: bedroom1, imageId: 0 },
    { imageSource: bedroom2, imageId: 1 },
    { imageSource: bedroom3, imageId: 2 },
    { imageSource: bedroom4, imageId: 3 },
  ]);

  const [carouselData, setCarouselData] = useState([
    {
      id: "kitchen-carousel",
      imageList: kitchenCarouselImages,
      selectedImage: 0,
      imageQuantity: Number(kitchenCarouselImages.length),
      selectCarouselButtonName: "Cozinhas",
      isSelected: true,
    },
    {
      id: "living-room-carousel",
      imageList: livingRoomCarouselImages,
      selectedImage: 0,
      imageQuantity: Number(livingRoomCarouselImages.length),
      selectCarouselButtonName: "Salas de Estar",
      isSelected: false,
    },
    {
      id: "bedroom-carousel",
      imageList: bedroomCarouselImages,
      selectedImage: 0,
      imageQuantity: Number(bedroomCarouselImages.length),
      selectCarouselButtonName: "Quartos",
      isSelected: false,
    },
  ]);

  useEffect(() => {
    if (carouselRefs.current) {
      const element = carouselRefs.current["kitchen-carousel"];
      const elementStyles = getComputedStyle(element);

      setCarouselConfig((prevConfig) => ({
        ...prevConfig,
        carouselWidth: element.offsetWidth,
        carouselHeight: element.offsetHeight,
        carouselMargin: parseInt(elementStyles.marginRight),
        carouselBorder: parseInt(elementStyles.borderRightWidth),
      }));
    }
  }, [pageWidth]);

  const moveRight = (carouselId) => {
    setCarouselData((prevCarouselData) => {
      return prevCarouselData.map((carousel) => {
        if (carousel.id === carouselId) {
          const imageLoaderElement = imageLoaderRefs.current[carouselId];
          if (!imageLoaderElement) {
            return carousel;
          }

          const { scrollLeft, clientWidth, scrollWidth } = imageLoaderElement;
          let newSelectedImageIndex;

          if (
            scrollLeft + clientWidth >= scrollWidth - 1 &&
            carousel.selectedImage >= 2
          ) {
            imageLoaderElement.scrollTo({
              left: 0,
              behavior: "smooth",
            });
            newSelectedImageIndex = 0;
          } else {
            imageLoaderElement.scrollBy({
              left: carouselConfig.imageSize,
              behavior: "smooth",
            });
            newSelectedImageIndex = carousel.selectedImage + 1;
          }

          return { ...carousel, selectedImage: newSelectedImageIndex };
        }

        return carousel;
      });
    });
  };

  const moveLeft = (carouselId) => {
    setCarouselData((prevCarouselData) => {
      return prevCarouselData.map((carousel) => {
        if (carousel.id === carouselId) {
          const imageLoaderElement = imageLoaderRefs.current[carouselId];
          if (!imageLoaderElement) {
            return carousel;
          }

          const { scrollLeft } = imageLoaderElement;
          const imageListLength = carousel.imageList.length;
          let newSelectedImageIndex;

          if (scrollLeft <= 0 && carousel.selectedImage <= 0) {
            imageLoaderElement.scrollTo({
              left: carouselConfig.imageSize * carousel.imageQuantity,
              behavior: "smooth",
            });
            newSelectedImageIndex = imageListLength - 1;
          } else {
            imageLoaderElement.scrollBy({
              left: -carouselConfig.imageSize,
              behavior: "smooth",
            });
            newSelectedImageIndex = carousel.selectedImage - 1;
          }

          console.log(carouselConfig.carouselHeight);

          return { ...carousel, selectedImage: newSelectedImageIndex };
        }

        return carousel;
      });
    });
  };

  function showSelectedCarousel(carouselId) {
    if (carouselListRef.current) {
      const carouselElement = carouselListRef.current;
      const carouselTotalHeight = carouselConfig.carouselHeight;

      setCarouselData((prevCarouselData) => {
        return prevCarouselData.map((carousel) => {
          if (carousel.id === carouselId) {
            return { ...carousel, isSelected: true };
          } else {
            return { ...carousel, isSelected: false };
          }
        });
      });

      switch (carouselId) {
        case "kitchen-carousel":
          carouselElement.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          break;

        case "living-room-carousel":
          carouselElement.scrollTo({
            top: carouselTotalHeight,
            behavior: "smooth",
          });
          break;

        case "bedroom-carousel":
          carouselElement.scrollTo({
            top: carouselTotalHeight * 2,
            behavior: "smooth",
          });
          break;

        default:
          break;
      }
    }
  }
  return (
    <div className="w-auto flex flex-col md:flex-row rounded-lg p-2 lg:p-5 ml-5 mr-5 bg-white shadow-black shadow-md gap-5 justify-center items-center">
      <div
        /*Carousel List*/ className={`block overflow-hidden transition duration-200`}
        style={{
          height: `${carouselConfig.carouselHeight}px`,
          width: `${carouselConfig.carouselHeight}px`,
        }}
        ref={carouselListRef}
      >
        {carouselData.map((carousel) => {
          return (
            <div /*Carousel Div*/
              key={carousel.id}
              className={`w-[${carouselConfig.imageSize}px] h-[${carouselConfig.imageSize}px] flex relative border-[3px] border-secondary rounded-sm transition duration-500`}
              ref={(el) => (carouselRefs.current[carousel.id] = el)}
            >
              <div /*Image Loader*/
                className="h-full flex overflow-hidden"
                ref={(el) => (imageLoaderRefs.current[carousel.id] = el)}
              >
                {carousel.imageList.map((item) => {
                  return (
                    <img
                      key={item.imageId}
                      src={item.imageSource}
                      style={{ width: `${carouselConfig.imageSize}px`, height: `${carouselConfig.imageSize}px` }}
                    />
                  );
                })}
              </div>
              <nav className="absolute h-[50px] w-full flex justify-center items-center bottom-0 gap-[3px]">
                {carousel.imageList.map((image) => {
                  return (
                    <span
                      key={`nav-span-${image.imageId}`}
                      className="w-5 h-5 rounded-full border-[2px] border-secondary flex justify-center items-center"
                    >
                      <button
                        className={`w-[10px] h-[10px] rounded-full transition duration-400 ${
                          carousel.selectedImage === image.imageId
                            ? "bg-primary"
                            : "bg-none"
                        }`}
                      ></button>
                    </span>
                  );
                })}
              </nav>
              <nav className="absolute w-full h-full justify-between flex top-1/2 -translate-y-1/2 overflow-hidden">
                <button
                  className={`h-full w-1/5 flex justify-center items-center text-secondary cursor-pointer hover:text-white transition duration-200 ${carouselConfig.isLeftSelected ? "bg-linear-to-l to-black/50" : "bg-none" }`}
                  onClick={() => moveLeft(carousel.id)}
                  onMouseEnter={() =>
                    setCarouselConfig((prevConfig) => ({
                      ...prevConfig,
                      isLeftSelected: true,
                    }))
                  }
                  onMouseLeave={() =>
                    setCarouselConfig((prevConfig) => ({
                      ...prevConfig,
                      isLeftSelected: false,
                    }))
                  }
                >
                  <ChevronLeftCircle
                    size={30}
                    className={`transition duration-300 ${
                      carouselConfig.isLeftSelected === true ? "scale-120" : ""
                    }`}
                  />
                </button>
                <button
                  className={`h-full w-1/5 flex justify-center items-center text-secondary cursor-pointer hover:text-white transition duration-200 ${carouselConfig.isRightSelected ? "bg-linear-to-r to-black/50" : "bg-none" }`}
                  onClick={() => moveRight(carousel.id)}
                  onMouseEnter={() =>
                    setCarouselConfig((prevConfig) => ({
                      ...prevConfig,
                      isRightSelected: true,
                    }))
                  }
                  onMouseLeave={() =>
                    setCarouselConfig((prevConfig) => ({
                      ...prevConfig,
                      isRightSelected: false,
                    }))
                  }
                >
                  <ChevronRightCircle
                    size={30}
                    className={`transition duration-300 ${
                      carouselConfig.isRightSelected === true ? "scale-120" : ""
                    }`}
                  />
                </button>
              </nav>
            </div>
          );
        })}
      </div>
      <nav className="flex flex-col items-center justify-center gap-2 p-2">
        {carouselData.map((itemData) => {
          return (
            <button
              key={`button-${itemData.id}`}
              className={`w-[200px] h-[50px] text-white font- rounded-lg cursor-pointer transition duration-200 hover:bg-primary ${
                itemData.isSelected ? "bg-primary" : "bg-secondary"
              }`}
              style={{ fontFamily: "NorfolkRegular" }}
              onClick={() => {
                showSelectedCarousel(itemData.id);
              }}
            >
              {itemData.selectCarouselButtonName}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Carousels;
