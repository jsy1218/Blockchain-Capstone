const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require("Verifier");
const zokratesProof = require("../../zokrates/code/square/proof.json");

contract('TestSolnSquareVerifier', accounts => {
    const owner = accounts[0];
    const account_one = accounts[1];
    const { proof: { a, b, c }, inputs: input } = zokratesProof;

    describe('match soln square verifier', function () {
        beforeEach(async function () { 
            this.verifier = await Verifier.new({from: owner});
            this.contract = await SolnSquareVerifier.new(this.verifier.address, {from: owner});
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('should add new solution', async function () { 
            let tokenId = 0;
            let key = await this.contract.getVerifierKey.call(a, b, c, input);
            let result = await this.contract.addSolution(account_one, tokenId, key);
            let solutionAddedEvent = result.logs[0].event;
            assert.equal(solutionAddedEvent, "SolutionAdded", "SolutionAdded event should be emitted"); 
        })
        
        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('should mint ERC721 token', async function () { 
            let totalSupplyBeforeMint = await this.contract.totalSupply.call();
            let tokenId = 1;
            let result = await this.contract.mint(account_one, tokenId, a, b, c, input);
            let transferEvent = result.logs[1].event;
            assert.equal(transferEvent, "Transfer", "Transfer event should be emitted");
            let totalSupplyAfterMint = await this.contract.totalSupply.call();
            assert.equal(totalSupplyAfterMint - totalSupplyBeforeMint, 1, "Total supply should increase by 1");
        })
    });
})