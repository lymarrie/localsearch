import React from "react";

const About = (props:any) => {
  const { description } = props;

    return (
        <>
          <div className="centered-container">
            <div className="section text-center grid gap-y-5">
                <h2 className="text-4xl">
                  <a id="about">About Us</a>
                </h2>
                <p className="pt-10 px-10 pb-2">{description}</p>
              </div>
          </div>
        </>
      );
    };

export default About;