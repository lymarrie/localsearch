import React from "react";
import Information from './information'
import Hours from './hours'

const Contact = (props:any) => {
    const {address, mainPhone, hours} = props;
      return (
          <>
            <div className="section p-8 grid gap-y-10">
              <div className="bg-white p-10 rounded-xl drop-shadow-md">
                <div className="grid grid-cols-2">
                  <div>
                    <h3 className="text-3xl mb-3">Information</h3>
                    <Information address={address} phone={mainPhone}></Information>
                  </div>
                  <div>
                    <h3 className="text-3xl">Opening Hours</h3>
                    <div>{hours && <Hours title={''} hours={hours} />}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      };
  
  export default Contact;