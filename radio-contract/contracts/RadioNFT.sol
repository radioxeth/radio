pragma solidity >=0.5.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// SPDX-License-Identifier: UNLICENSED
contract RadioNFT is ERC721 {
    constructor() public ERC721("RadNFT", "NFT") {}

    mapping(uint256 => string) private _CIDS;
    uint256 private _count = 0;

    function CID(uint256 tokenId) public view returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: CID query for nonexistent token"
        );
        string memory _CID = _CIDS[tokenId];
        return _CID;
    }

    function _setTokenCID(uint256 tokenId, string memory _CID)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: CID set of nonexistent token"
        );
        _CIDS[tokenId] = _CID;
    }

    function mint(string memory _CID) public {
        _safeMint(msg.sender, (_count));
        _setTokenCID((_count), _CID);
        _count++;
    }
}
