# Dairy-Supply-Chain-Management-using-Blockchain
This project is an attempt to implement dairy supply chain with the help of blockchain.

The dairy supply chain is a sequence of activities to bring milk from farms to dairy products available in market.
# Problems in existing systems
The current system significantly lacks transperancy which makes it incredibaly difficult for customers and buyers to truly know the value of products. Also th supply chains aren't particularly agile which makes it difficult to meet constantly changing supply and demand.

# What are we providing 
We are providing a system that is more trustworthy by implementing smart contracts to store critical data which is immutable and can be verified by everyone associated with the supply chain. We have also intoduced system checks that will help detect adulteration in milk.

# Actors associated with our system
1. Farmer 
   - The farmer can access the system by first completing the registration process.
   - He can then put up the farm produce i.e various types of milk on sale. The details of the farm produce will be validated by the system to detect adulteration.
2. Producer
   - The producer can access the system by first completing the registration process.
   - The producer can buy the raw materials put up on sale by the farmer.
   - He can also put up various dairy products such as cheese, butter,buttermilk etc for sale.
   - He can also add the products to warehouses for storage.
   - He can provide feedback on the orders placed.
3. Customer
   - The customer can access the system by first completing the registration process.
   - He can buy various dairy products put up on sale by the producer.
   - He can provide feedback on the orders placed.
4. Warehouse Owner 
   - The warehouse owner can access the system by first completing the registration process.
   - He can make entries of the warehouses he owns in the system.
5. Transporter
   - The transporter can access the system by first completing the registration process.
   - He is responsible for delivering the goods from loading location to the unloading location.
# Software Requirements
1. Node Package Manager
2. Truffle framework (allows to build decentralized applications on Ethereum blockchain)
3. Ganache (local in-memory blockchain)
4. Metamask (Chrome Extension)
5. Syntax Highlighing(recommended for Solidity)

# Procedure Adopted
1. Create a project directory  
`mkdir project`  
`cd project`

2. I have used Pet Shop box for this. Install it from command line like this:  
`truffle unboc pet-shop`  
The pet-shop box will provide us with the basic directory structure. It is also configured to communicate directly with ganache.

3. From the root of the project create a smart contract  
`truffle create contract Register.sol`

4. Now deploy the smart contract to the blockchain. For this create a new file in the migrations directory.  
`touch migrations/2_deploy_contracts.js`  
We number the files in migrations directory to specify the execution order.

5. Create a migration to deploy the contract  
```
var Register = artifacts.require("./Register.sol");
module.exports = function(deployer) {
  deployer.deploy(Register);
};
```

6. Run the migrations from the command line  
`truffle deploy --reset`

7. Interact with the smart contract from console  
`truffle console`
