// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Errors
error CrowdFunding__CampaignDoesNotExist();
error InputsCantBeNull();
error DeadlineShouldBeInFuture();

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    address public manager;

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns;

    constructor() {
        manager == msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "not owner");
        _;
    }

    modifier authorisedPerson(uint _id) {
        require(msg.sender == campaigns[_id].owner, "Not Authorised");
        _;
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        // check if everything is ok
        require(
            campaign.deadline < block.timestamp,
            "deadline should be a date in the future"
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function updateCampaign(
        uint256 _id,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public authorisedPerson(_id) returns (bool) {
        Campaign storage campaign = campaigns[_id];

        // make sure the inputs can't be null
        if (
            (bytes(_title).length <= 0 &&
                bytes(_description).length <= 0 &&
                _target <= 0 &&
                _deadline <= 0 &&
                bytes(_image).length <= 0)
        ) {
            revert InputsCantBeNull();
        }

        if (block.timestamp > _deadline) {
            revert DeadlineShouldBeInFuture();
        }

        require(campaign.owner > address(0), "No campaign exist with this ID");

        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;

        emit Action(_id, "Campaign updated", msg.sender, block.timestamp);

        return true;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function deleteCampaign(
        uint256 _id
    ) public authorisedPerson(_id) returns (bool) {
        // ensure only the owner can call the function
        if (campaigns[_id].owner == address(0)) {
            revert CrowdFunding__CampaignDoesNotExist();
        }

        // refund the donators if any
        if (campaigns[_id].amountCollected > 0) {
            _refundDonators(_id);
        }

        delete campaigns[_id];

        emit Action(_id, "Campaign Deleted", msg.sender, block.timestamp);

        numberOfCampaigns = numberOfCampaigns - 1;
        return (true);
    }

    function _refundDonators(uint _id) public {
        Campaign storage campaign = campaigns[_id];
        for (uint i; i < campaign.donators.length; i++) {
            _payTo(campaign.donators[i], campaign.donations[i]);
            campaign.donations[i] = 0;
            campaign.amountCollected = 0;
        }
    }

    function _payTo(address to, uint256 amount) public {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns); // creates an empty array of as many structs as there are campaigns

        // now we loop through the campaigns and populate the variable
        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}
