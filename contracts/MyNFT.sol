// MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage {
    uint256 private _currentTokenId = 0;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintWithMetadata(address to, string memory metadataURI) external returns (uint256) {
    require(bytes(metadataURI).length > 0, "Metadata URI must not be empty");
    uint256 newTokenId = _getNextTokenId();
    _mint(to, newTokenId);
    _setTokenURI(newTokenId, metadataURI);
    _incrementTokenId();
    return newTokenId;
}


    function _getNextTokenId() private view returns (uint256) {
        return _currentTokenId + 1;
    }

    function _incrementTokenId() private {
        _currentTokenId++;
    }
}
