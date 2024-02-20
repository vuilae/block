const CustomToken = artifacts.require("CustomToken");

contract("CustomToken", (accounts) => {
  let customTokenInstance;

  // Perform setup before running tests
  before(async () => {
    customTokenInstance = await CustomToken.deployed();
  });

  it("should deploy and mint initial tokens to owner", async () => {
    const ownerBalance = await customTokenInstance.balanceOf(accounts[0]);
    assert.equal(ownerBalance.toString(), web3.utils.toWei("1000000", "ether"));
  });
  // Test case to set block reward
  it("should set block reward", async () => {
    try {
      await customTokenInstance.setBlockReward(100); // Set block reward to 100 tokens
      console.log("Block reward set successfully");
    } catch (error) {
      console.error("Error setting block reward:", error);
      assert.fail(error); // Fail the test if an error occurs
    }
  });

  // Test case to mint miner reward
//   it("should mint miner reward", async () => {
//     try {
//       await customTokenInstance.mintMinerReward(); // Call mintMinerReward without any parameters
//       console.log("Miner reward minted successfully");
//     } catch (error) {
//       console.error("Error minting miner reward:", error);
//       assert.fail(error); // Fail the test if an error occurs
//     }
//   });




  // Test case to destroy contract
  it("should destroy contract", async () => {
    try {
      await customTokenInstance.destroy(); // Destroy the contract
      console.log("Contract destroyed successfully");
    } catch (error) {
      console.error("Error destroying contract:", error);
      assert.fail(error); // Fail the test if an error occurs
    }
  });
});
