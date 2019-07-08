pragma solidity ^0.5.0;
import "./orderDairyProducts.sol";
contract FeedbackProducer{
    
    
    orderDairyProducts op;
    
    constructor() public payable{
        
    }
    
    function giveInstance(address _op) public{
        op= orderDairyProducts(_op);
    }
    
    struct feedback {
        uint orderId;
        address payable fromUser;
        address payable toUser;
        string body ;
    }
    
    //mapping of every feedback that has been recorded
    mapping (uint=>feedback) public feedbackList ;
    uint j =0;
    
    function giveFeedback(uint _orderId ,string memory _body)public returns(string memory){
        require(_orderId <= op.getOrdersCount() && msg.sender == op.getOrdered_by(_orderId));
        j++;
        feedbackList[j].fromUser = msg.sender ;
        feedbackList[j].body = _body ;
        feedbackList[j].toUser = op.getFulfilled_by(_orderId) ;
        feedbackList[j].orderId = _orderId;
    }
}
