// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BotRepo {
    struct BotData {
        bool isBot;
        uint256 score;
    }

    mapping(address => BotData) public botRepository;

    event BotRegistered(address indexed botAddress, bool isBot, uint256 score);

    function isBot(address _address) public view returns (bool) {
        return botRepository[_address].isBot;
    }

    function getScore(address _address) public view returns (uint256) {
        return botRepository[_address].score;
    }

    function register(address _address, bool _isBot, uint256 _score) public {
        botRepository[_address] = BotData(_isBot, _score);
        emit BotRegistered(_address, _isBot, _score);
    }
}

