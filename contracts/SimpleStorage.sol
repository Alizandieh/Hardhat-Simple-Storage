// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 FavNumber = 0;

    struct People {
        uint256 number;
        string name;
    }

    mapping(string => uint256) public nameToNumber;

    People[] public people;

    function store(uint256 _FavNumber) public virtual {
        FavNumber = _FavNumber;
    }

    function retrieve() public view returns (uint256) {
        return FavNumber;
    }

    function addPerson(string memory _name, uint256 _number) public {
        people.push(People(_number, _name));
        nameToNumber[_name] = _number;
    }
}
