pragma solidity ^0.5.0;
import "./orderRawMaterials.sol";
contract FeedbackFarmer {
    
    orderRawMaterials or ;
    
    constructor() public payable {}
    
     function giveInstance(address _or) public{
        or = orderRawMaterials(_or);
    }
    struct feedback {
        uint orderId;
        address fromUser;
        address toUser;
        string body ;
    }
    
    //mapping of every feedback that has been recorded
    mapping (uint=>feedback) public feedbackList ;
    uint j =0;
    
    function giveFeedback(uint _orderId ,string memory _body)public returns(string memory){
        require(_orderId <= or.getOrdersCount() && msg.sender == or.getOrdered_by(_orderId));
        j++;
        feedbackList[j].fromUser = msg.sender ;
        feedbackList[j].body = _body ;
        feedbackList[j].toUser = or.getFulfilled_by(_orderId) ;
        feedbackList[j].orderId = _orderId;
    }
}