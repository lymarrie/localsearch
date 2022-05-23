import React from "react";
import Cta from './cta';

type Banner = {
  name?: string;
  secondaryColor: string;
  photo: string;
  position?: string;
};


const Banner = (props: Banner) => {
  const { name, secondaryColor, photo, position } = props;

  return (
    <>
      <div className="h-96">
        <div
          className={`${position} ` + 'hero text-5xl font-bold text-white p-10 flex items-center justify-center flex-row space-x-20 drop-shadow-md bg-cover'} style={{ backgroundImage: `url(${photo})` }}>
            
          <div className="flex-col space-y-10 text-center">
            <div>{name}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;