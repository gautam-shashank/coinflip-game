
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoinFlip {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function flip(bool _guess) external payable returns (bool) {
        require(msg.value > 0, "Must send some ether to play");

        bool result = (block.timestamp % 2 == 0);
        if (result == _guess) {
            payable(msg.sender).transfer(msg.value * 2);
            return true;
        }
        return false;
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}
