pragma solidity ^0.5.0;
import "./Register.sol";

contract Login{
    string temp;
    uint temp1;
    uint temp2;
   event Instructor(uint val);
    Register registered;
    constructor() public {
        registered = Register(0x6D02449d151b281bd8446EbbFA3A7f154E253408);
    }
    function setAddress(address _adr) public{
         registered = Register(_adr);
    }
    function setLogin(string memory _uname,string memory _pass) public
    returns(uint) {
          temp = registered.getUname(msg.sender);
          temp1 = uint(keccak256(abi.encodePacked(
          registered.getUname(msg.sender))));
          temp2 = uint(keccak256(abi.encodePacked(_uname)));
          if(!registered.getCheck(msg.sender)){
              emit Instructor(1);
          }
 else if ( uint(keccak256(abi.encodePacked(registered.getUname(msg.sender)))) == uint(keccak256(abi.encodePacked(_uname))) && uint(keccak256(abi.encodePacked(registered.getPass(msg.sender)))) == uint(keccak256(abi.encodePacked(_pass)))){
     registered.setStatus(msg.sender,1);
        emit Instructor(2);
    }
   else{
      emit Instructor(3);
}
}
}