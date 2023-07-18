import React, { Component, Fragment } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="bg-[#4acd8d] ">
        <div className="flex justify-center items-center text-white bg-[#4acd8d] container mx-auto pt-5 pb-5">
          Copyright @{new Date().getFullYear()} by Frankline Kihiu. All rights
          reserved.
        </div>
      </div>
    );
  }
}

export default Footer;
