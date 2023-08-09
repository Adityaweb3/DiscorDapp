// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; 

contract DiscorDapp is ERC721 {

    uint256 public totalChannels ; 

    address public owner ;
    uint public totalSupply ; 
    modifier onlyOwner() {
        require(msg.sender == owner );
        _;
    }

    struct Channel {
        uint256 id ;
        string name ;
        uint256 cost ;
    }

    mapping(uint256 =>Channel) public channels ;
    mapping(uint256 => mapping(address=>bool)) public hasJoined ;


   constructor(string memory _name , string memory _symbol) ERC721 (_name , _symbol){

    owner = msg.sender ;



}

function createChannel(string memory _name, uint256 _cost) public onlyOwner {
    require(msg.sender==owner);

    totalChannels++ ;

    channels[totalChannels]= Channel(totalChannels, _name ,_cost);

}

function mint(uint256 _id) public payable {

    hasJoined[_id][msg.sender] = true ;
    totalSupply++ ;
    _safeMint(msg.sender, totalSupply);
}

function getChannel(uint256 _id) public view returns(Channel memory){
    return channels[_id];

}



    
}
