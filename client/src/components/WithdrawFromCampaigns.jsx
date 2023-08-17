import React from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import WithdrawCard from "./WithdrawCard";
import { useStateContext } from "../context";
import { loader } from "../assets";

const WithdrawFromCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const { withdraw } = useStateContext();

  console.log("campaigns", campaigns);

  const handleWithdraw = async () => {
    isLoading(true);

    await withdraw(pId);

    navigate("/");
    isLoading(false);
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <WithdrawCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleWithdraw}
            />
          ))}
      </div>
    </div>
  );
};

export default WithdrawFromCampaigns;
