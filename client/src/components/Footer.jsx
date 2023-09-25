import React, { Component, Fragment } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="bg-[#b6049f] bg-[#b6049f] ">
        <div className="flex justify-center items-center text-white bg-[#b6049f] container mx-auto pt-5 pb-5">
          Copyright @{new Date().getFullYear()} by Frankline Kihiu. All rights
          reserved.
        </div>
      </div>
    );
  }
}

export default Footer;
