"use client";

import CustomSlider from "../CustomSlider";
import TeamCard from "./TeamCard";

export default function TeamSection({ 
  title, 
  highlight, 
  description, 
  data,
desktopGrid = false 
 }) {

  console.log(data);

  return (
    <section className="bg-black py-16 text-white container">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h2>
          {title} <span className="text-yellow-400">{highlight}</span>
        </h2>

        {description && (
          <p className="text-white text-sm mt-3">
            {description}
          </p>
        )}
      </div>

      <div>

         <div className={desktopGrid ? "lg:hidden" : ""}>
          <CustomSlider
            items={data}
            renderItem={(member) => <TeamCard member={member} />}
            showProgress={false}
            swiperConfig={{
              autoplay: {
                delay: 3000,
                disableOnInteraction: false,
              },
              loop: true,
              centeredSlides: false,
              spaceBetween: 20,
              breakpoints: {
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                }
              },
            }}
          />
        </div>  

        {/* DESKTOP GRID */}
       {desktopGrid && (
          <div className="hidden lg:grid grid-cols-4 gap-6 mt-6">
            {data.slice(0, 9).map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        )}


      </div>
    </section>
  );
}