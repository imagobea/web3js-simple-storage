// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract SimpleStorage {
    // Initialised to 0!
    uint256 favNumber;

    struct People {
        string firstName;
        uint256 favNumber;
    }
    
    // Dynamic array, vs fixed arrays e.g. People[2] that can't change in size
    People[] public frens;
    mapping(string => uint256) public nameToFavNumber;

    function setFavNumber(uint256 favNumber_) public {
        favNumber = favNumber_;
    }

    function getFavNumber() public view returns(uint256) {
        return favNumber;
    }
    
    function addFren(string memory firstName_, uint256 favNumber_) public {
        // frens.push(People({firstName: firstName_, favNumber: favNumber_}));
        frens.push(People(firstName_, favNumber_));
        nameToFavNumber[firstName_] = favNumber_;
    }
}
