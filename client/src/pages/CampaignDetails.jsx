import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";

// local imports
import { useStateContext } from "../context";
import { CustomButton } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
const CampaignDetails = () => {
  const { state } = useLocation();
  console.log(state);

  return <div>CampaignDetails</div>;
};

export default CampaignDetails;
