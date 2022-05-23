import React from "react";

type Coordinates = {
  latitude: string;
  longitude: string;
};

const StaticMap = (props: Coordinates) => {
  const { latitude, longitude } = props;

  return (
    <>
      <div className="section flex flex-col items-center justify-center gap-y-10 pb-12">
        <h2 className="text-4xl">Map</h2>
        <img
          className="w-11/12 rounded-xl drop-shadow-md sm:w-3/4 "
          width="300"
          height="200"
          src={
            'https://maps.googleapis.com/maps/api/staticmap?center=' +
            `${latitude}` +
            ',' +
            `${longitude}` +
            '&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7Clabel:LL%7C' +
            `${latitude}` +
            ',' +
            `${longitude}` +
            '&key=AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18'
          }
        ></img>
      </div>
    </>
  );
};

export default StaticMap;
