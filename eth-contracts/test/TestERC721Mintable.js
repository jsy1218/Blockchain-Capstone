var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const owner = accounts[0];
    const account_one = accounts[1];
    const account_two = accounts[2];

    const account_one_tokens = 10;
    const account_two_tokens = 20;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: owner});

            // TODO: mint multiple tokens
            for(let i = 0; i < account_one_tokens; ++i){
                await this.contract.mint(account_one, i);
            }
            for(let i = account_one_tokens; i < account_one_tokens + account_two_tokens; ++i){
                await this.contract.mint(account_two, i);
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply, account_one_tokens + account_two_tokens, "total supply should be " + (account_one_tokens + account_two_tokens));
        })

        it('should get token balance', async function () { 
            let balanceOne = await this.contract.balanceOf.call(account_one);
            let balanceTwo = await this.contract.balanceOf.call(account_two);
            assert.equal(balanceOne.toNumber(), account_one_tokens, "account one total balance should be " + account_one_tokens);
            assert.equal(balanceTwo.toNumber(), account_two_tokens, "account two total balance should be " + account_two_tokens);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            for(let i = 0; i < account_one_tokens; ++i){
                let tokenURI = await this.contract.tokenURI.call(i);
                assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/" + i, "token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/" + i);
            }
            for(let i = account_one_tokens; i < account_one_tokens + account_two_tokens; ++i){
                let tokenURI = await this.contract.tokenURI.call(i);
                assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/" + i, "token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/" + i);
            }
        })

        it('should transfer token from one owner to another', async function () { 
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})