import React from "react";
import { Carousel } from "@material-tailwind/react";
import one from '../assets/image/1.JPG';
import two from '../assets/image/2.JPG';
import three from '../assets/image/3.JPG';
import four from '../assets/image/4.JPG';
import five from '../assets/image/5.JPG';
import tokura from '../assets/image/tokura.png';

const slides = [one, two, three, four, five];

export default function CarouselWithContent() {
  return (
    <div
      className="relative w-full overflow-hidden flex-none"
      style={{ height: "calc(100vh - 300px)" }} // 👈 Adjust value as needed
    >
      {/* Carousel Background (Slides Only) */}
      <Carousel
        className="w-full h-full"
        transition={{ type: "fade", duration: 2 }}
        autoplay={true}
        loop={true}
        navigation={false}
        prevArrow={false}
        nextArrow={false}
      >
        {slides.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="h-full w-full object-cover"
          />
        ))}
      </Carousel>

      {/* Fixed Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 text-center px-4">
        <img
          src={tokura}
          alt="Overlay"
          className="max-w-xs md:max-w-md lg:max-w-lg"
        />
      </div>
    </div>
  );
}
