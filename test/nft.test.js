const MyNFT = artifacts.require("MyNFT");


contract("MyNFT", (accounts) => {
  let myNFTInstance;


  // Perform setup before running tests
  before(async () => {
    console.log(accounts)
    myNFTInstance = await MyNFT.deployed();
  });


  // Test minting a token with valid metadata
  // Test minting a token with valid metadata
  it("should mint a token with valid metadata", async () => {
    try {
      const metadataURI =
        "https://ipfs.io/ipfs/QmaH8PpvtxhbSitVed8eKvVLzjw2EkvB31kBXiaeBrEgqk";
      const tokenId = await myNFTInstance.mintWithMetadata(
        accounts[1],
        metadataURI
      );
      console.log("Token ID:", tokenId);
      assert.isTrue(tokenId !== 0, "Token should be minted successfully");
    } catch (error) {
      console.error("Error minting token with valid metadata:", error);
      assert.fail(error);
    }
  });


  // Test minting a token with invalid metadata
  // Test minting a token with invalid metadata
  it("should fail to mint a token with invalid metadata", async () => {
    try {
      await myNFTInstance.mintWithMetadata(accounts[2], "");
      console.log("Token minted with invalid metadata");
      assert.fail("Minting with empty metadata URI should fail");
    } catch (error) {
      console.log("Error:", error.message);
      assert(
        error.message.includes("revert"),
        "Minting with empty metadata URI should revert"
      );
    }
  });

  it("should transfer token safely", async () => {
    const tokenId = 1; // Assuming token with ID 1 exists
    const sender = accounts[3];
    const receiver = accounts[1];

    // Approve the transfer
    await myNFTInstance.approve(receiver, tokenId, { from: sender });

    // Get initial owner of the token
    const initialOwner = await myNFTInstance.ownerOf(tokenId);

    // Perform the transfer
    await myNFTInstance.safeTransferFrom(sender, receiver, tokenId, {
      from: sender,
    });

    // Check if ownership has changed
    const newOwner = await myNFTInstance.ownerOf(tokenId);
    assert.equal(
      newOwner,
      receiver,
      "Ownership should be transferred correctly"
    );
    assert.notEqual(
      newOwner,
      initialOwner,
      "Ownership should change after transfer"
    );
  });

});


