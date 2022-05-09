// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
const Verifier = artifacts.require('Verifier');
const zokratesProof = require("../../zokrates/code/square/proof.json");

contract('TestVerifier', accounts => {
    const owner = accounts[0];
    const { proof: proof, inputs: inputs } = zokratesProof;

    describe('match verifier', function () {
        beforeEach(async function () { 
            this.contract = await Verifier.new({from: owner});
        })

        // Test verification with correct proof
        // - use the contents from proof.json generated from zokrates steps
        it('should verify correct proof', async function () { 
            let result = await this.contract.verifyTx.call(proof, inputs);
            assert.equal(result, true, "Correct proof"); 
        })
            
        // Test verification with incorrect proof
        it('should verify incorrect proof', async function () { 
            let result = await this.contract.verifyTx.call(proof, [0, 1]);
            assert.equal(result, false, "Incorrect proof"); 
        })
    });
})