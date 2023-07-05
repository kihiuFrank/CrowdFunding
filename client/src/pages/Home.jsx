import React, { useState, useEffect } from "react";

import { useStateContext } from "../context";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  // to fetch campaigns we need to call getCampaigns which is an async func and hence we can't use it directly in the useEffect
  // so we create another method (fetchCampaigns) and call that instead.
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return <div>Home</div>;
};

export default Home;
