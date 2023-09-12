import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    // smart contract address
    "0xFFCAde28fFE0755943db00EfD99182F03653a2Ab"
    //"marketplace"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress(); // smart wallet address
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          // items have to be in the order they were the contract inside createCampaign()
          address, // owner of the campaign
          form.name, // name
          form.title, // title
          form.category, // campaign category
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      toast.success("Campaign created successfully.");
      console.log("contract call success", data);
    } catch (error) {
      toast.error("Error while creating Campaign, please try again");
      console.log("contract call failure", error);
    }
  };

  const updateCampaign = async (form) => {
    try {
      const data = await contract.call("updateCampaign", [
        form.id, // campaign id
        form.name, // campaign name
        form.title, // title
        form.category, // category
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image,
      ]);
      toast.success("Campaign updated successfully.");
      console.log("contract call success", data);
    } catch (error) {
      toast.error("Error while updating Campaign, please try again");
      console.log("contract call failure", error);
    }
  };

  const deleteCampaign = async (pId) => {
    try {
      const data = await contract.call("deleteCampaign", [pId]);

      toast.success("Campaign deleted successfully.");
      console.log("contract call success", data);
      return data;
    } catch (error) {
      toast.error("Error while deleting Campaign, please try again");
      console.log("contract call failure", error);
    }
  };

  const donate = async (pId, amount) => {
    try {
      const data = await contract.call("donateToCampaign", [pId], {
        value: ethers.utils.parseEther(amount),
      });
      toast.success(
        "Campaign funded successfully. Thanks for your collaboration"
      );
      return data;
    } catch (err) {
      toast("Donation failed");
      console.log("Error occurred while making donation", err);
    }
  };

  const withdraw = async (pId) => {
    try {
      const data = await contract.call("withdrawDonations", [pId]);
      toast.success("Campaign funds successfully withdrawn.");
      return data;
    } catch (err) {
      toast.error("Error occurred while withdrawing funds.");
      console.log("Error occurred while withdrawing funds", err);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const parsedCampaigns = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      name: campaign.name,
      title: campaign.title,
      category: campaign.category,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const getSingleCampaign = async (pId) => {
    const allCampaigns = await getCampaigns();

    const filteredCampaign = allCampaigns.filter(
      (campaign) => campaign.pId === pId
    );

    return filteredCampaign;
  };

  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        withdraw,
        getDonations,
        deleteCampaign,
        updateCampaign,
        getSingleCampaign,
      }}
    >
      <ToastContainer />
      {children}
    </StateContext.Provider>
  );
};

// to utilize that context, we create a custom hook
export const useStateContext = () => useContext(StateContext);
