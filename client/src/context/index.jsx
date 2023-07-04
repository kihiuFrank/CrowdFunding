import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    // smart contract address
    "0xcebB09233dd3D5023060C96aeb6C448fc4be1307"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress(); // smart wallet address
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        // items have to be in the order they were the contract inside createCampaign()
        address, // owner of the campaign
        form.title, // title
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);

      console.log("Contract call success!", data);
    } catch (error) {
      console.log("Contract call failed!", error);
    }
  };

  return (
    <StateContext.Provider
      value={{ address, contract, createCampaign: publishCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};

// to utilize that context, we create a custom hook
export const useStateContext = () => useContext(StateContext);
