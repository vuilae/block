// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CustomToken is ERC20 {
    address public owner;
    uint256 private blockReward;

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) ERC20(_name, _symbol) {
        owner = msg.sender;
        _mint(msg.sender, _totalSupply);
    }

    function mintMinerReward() external {
    require(blockReward > 0, "Block reward not set");
    require(block.coinbase != address(0), "Miner address cannot be zero");
    _mint(block.coinbase, blockReward);
    }


    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        super._beforeTokenTransfer(from, to, amount);
        if (from == address(0)) {
            // Minting new tokens
            require(msg.sender == owner, "Only owner can mint tokens initially");
        } else if (to == address(0)) {
            // Burning tokens
            require(msg.sender == owner, "Only owner can burn tokens");
        }
    }

    function setBlockReward(uint256 _amount) external {
        require(msg.sender == owner, "Only owner can set block reward");
        blockReward = _amount;
    }

    function destroy() external {
        require(msg.sender == owner, "Only owner can destroy the contract");
        selfdestruct(payable(owner));
    }
}
