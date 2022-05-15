pragma solidity >=0.4.21 <0.6.0;
pragma experimental ABIEncoderV2;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete {
    Verifier public squareVerifier;

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        bytes32 index;
        address addr;
    }

    // TODO define an array of the above struct
    Solution[] solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => address) private uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(bytes32 indexed index, address indexed addr);

    constructor(address verifierAddress) ERC721MintableComplete("Siyu NFT", "SNFT") public
    {
        squareVerifier = Verifier(verifierAddress);
    }

    function getVerifierKey(uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public returns(bytes32) {
        return keccak256(abi.encodePacked(a, b, c, input));
    }

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address addr, uint256 tokenId, bytes32 key) public {
        Solution memory solution = Solution(key, addr);
        solutions.push(solution);
        uniqueSolutions[key] = addr;

        emit SolutionAdded(key, addr);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mint(address to, uint256 tokenId, uint[2] calldata a, uint[2][2] calldata b, uint[2] calldata c, uint[2] calldata input) external returns(bool) {
        bytes32 key = getVerifierKey(a, b, c, input);
        require(uniqueSolutions[key] == address(0), "solution is not unique");

        Verifier.Proof memory proof;
        proof.a = Pairing.G1Point(a[0], a[1]);
        proof.b = Pairing.G2Point([b[0][0], b[0][1]], [b[1][0], b[1][1]]);
        proof.c = Pairing.G1Point(c[0], c[1]);
        bool verified = squareVerifier.verifyTx(proof, input);
        require(verified, "Proof is not verified");

        addSolution(to, tokenId, key);

        return super.mint(to, tokenId);
    }
}