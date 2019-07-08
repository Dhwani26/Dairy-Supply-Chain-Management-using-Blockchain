pragma solidity ^0.5.0;


contract Register {
  struct User{
        uint id;
        string password;
        string email;
        string username;
        string category;
        bool check;
    }
    mapping(address=>User) public users;
    uint i=0;

    function register(string memory _uname,string memory _pass,string memory _email,string memory _category) public  returns(bool){
      require(users[msg.sender].check == false, "handling require");
    i++;
    users[msg.sender].id = i;
    users[msg.sender].username = _uname;
    users[msg.sender].password = _pass;
    users[msg.sender].email = _email;
    users[msg.sender].category = _category;
    users[msg.sender].check = true;
    return true;
  }

  function getUsersCount() public view returns(uint){
    return i;
  }
}
