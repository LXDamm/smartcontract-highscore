// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract Greeter {
    address private owner;
    bytes32 public message;
    uint8 private owners = 0;

    constructor(bytes32 _message) {
        owner = msg.sender;
        owners++;
        message = _message;
    }

    function claim() public payable {
        require(owners < 5, 'Max owners reached');
        owner = msg.sender;
    }

    function setMessage(bytes32 _message) public {
        require(msg.sender == owner, 'You are not the owner');
        require(_message.length > 0, 'A defined message is required');
        message = _message;
    }
}