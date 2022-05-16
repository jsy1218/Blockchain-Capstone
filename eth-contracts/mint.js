require('dotenv').config()

const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const infuraKey = process.env.API_KEY;
const MNEMONIC = process.env.MNEMONIC;
let NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
let OWNER_ADDRESS = process.env.OWNER_ADDRESS;

const correctProof1 = {
    proof: {
      a: [
        "0x2456ef3206f8dda67d38aac63d92044e3c2c35b045b672fb1873e04c012f2b2e",
        "0x0f74562d2ea90baa311e37301808d529b378732c231abaa7bc0b11fdeefdd146",
      ],
      b: [
        [
          "0x1c7dba13d8d9e0aae7bda7743c9d817e8604d2534260fe4d0d5e19775ca8b720",
          "0x15af01dd3cf60ae68a1f45a6b545861b88375b9669e46d6e657b3d92de306d36",
        ],
        [
          "0x138a1649175b4e5f05468c6c08ed77192826fe0d1d7d913970516d65cd8a4992",
          "0x2b7ec002c45029b2ad89e41a8f78c880e5340e92ae01fd7b4705ca7708d253e3",
        ],
      ],
      c: [
        "0x1fd8899f87a7577c8bee61bc53336def31126fe4436f397595724480cb06dc46",
        "0x1b94406d4aef54390402220369127fbdbe6ea77fdeb00e95e3a7fefa5b038f63",
      ],
    },
    inputs: [
      "0x0000000000000000000000000000000000000000000000000000000000000009",
      "0x0000000000000000000000000000000000000000000000000000000000000001",
    ],
  };

const correctProof2 = {
  proof: {
    a: [
      "0x200fcb61ca404c5cb23bf383e38acfd19def789a38363e0fc6ec96d6fc875366",
      "0x1b4b2079c0c9884d81fa95eb15cec22a23bc55242cb69bfc7c4d7c41487fbe1f",
    ],
    b: [
      [
        "0x26d34c776876952969a75094ea8aa1065d0c07da618531cf8980e5c1f384930c",
        "0x2591b43a5751e73f8d51e2eb231a1063b4d81eb6db158f2bb27d4d3d328bba81",
      ],
      [
        "0x1d9b5104c81f861f67fba5e665e9bb77ca5ae858ac1474ed3ae3bfbec97d4a93",
        "0x284c4ab3a2247b6ba5c4febeb44482ab4f0b2c231597373837464991f5566ac8",
      ],
    ],
    c: [
      "0x206a42e055add838000256e7f832759457cf5e38d5a90baaf816d1cdb12f139c",
      "0x22c29ee690d2c199e3e64ad3942475e65f8d2eef2c3b6f2544ba67ac078d0555",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof3 = {
  proof: {
    a: [
      "0x232f6f2c4a5697d93022e2d839a1171cfe3ec38860bb2e8120059ed9c75ab1bc",
      "0x0e50125a5abb7da79ae27b3cc39ea23bfaabd49d53a809a2bdc59a220759d53c",
    ],
    b: [
      [
        "0x25f502be9c798cb0070dc6a5226d866d0466c718f4e0e2b13efc512307b268c7",
        "0x23bd55c9fef5c77a1b23577a66783dbdd5fcc84bc0b321069deb557540170e4c",
      ],
      [
        "0x057ce90759827b007fcfc9e12044afe6b9b58ecaa0590c73fc30a703cc42ab9c",
        "0x02c8a4e65773375ce6f1475f68ed6f83a96948130f0c9fc73af1862afb531af2",
      ],
    ],
    c: [
      "0x0b9440b5cfa2cb2c00afe733dd6dc5991b2b0531b058e538dbe4e4160c278502",
      "0x2da548a55361d0b1677967f6122e1678d39ee82ead180db6ad570cce14b24945",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof4 = {
  proof: {
    a: [
      "0x01684fc9ca75af91159d9e4e0e4ccfa12b369164487afeba1b67e1444467e34f",
      "0x16c7a48b0e5471244574d139974893cd2b188e8c0cd498b38c2154eb4c822a11",
    ],
    b: [
      [
        "0x2bb134a48ac53e0ee99aca70c466301f3c36e4bf2ea3e630267637f450b96bf2",
        "0x0ec3655541541a3dbbe88faff4e8827ab12d5b770f914660253b9b2f1b15296d",
      ],
      [
        "0x132b9409c27a6558bbfa10bf8c9a831286a215b71b30d94ae13ef8b928ecb5c0",
        "0x14ff168082535598e1bfbe4a15f57197d1094803ad689a44bbb24c99b8fd6e31",
      ],
    ],
    c: [
      "0x1ea4b69112be568b5354246b0210eb2be1d430a5b7d92880da64058c801a71de",
      "0x26cef2f7faa90e43a28e07868f0665d6774863e034c7d920647b3755efe22497",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof5 = {
  proof: {
    a: [
      "0x162032a448f77d09e2b89b8e7e2104bdf665dd38ed5548f049179b110e865306",
      "0x124579d4acb05d8a868e9864bb8a9fddae84654cefe22c6b60c5320b9dec85a3",
    ],
    b: [
      [
        "0x227560ed229bb7ba0da7439cddd9fb7c6f211c893b230a2df5399ca22de0f174",
        "0x212f5e9097f262bfca76b081968badd410668615acc4d69264e43039b7474b0c",
      ],
      [
        "0x03fb41367b5d372587add7034bd26f86fbfea920c47f1175b1e234f9516f22f9",
        "0x21a5299cab0238e4ac4d2da5925dcdb03968ba3c3b130238b3f623e79eec455e",
      ],
    ],
    c: [
      "0x1c3068357bcf53c71580fccc2e1fee6c5bf092526e0498d55e514fe7ed8ed0a2",
      "0x272f9504d445ec0dd1a14c850b416439a9b61cc1d562520a58fc40803ef5eedf",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof6 = {
  proof: {
    a: [
      "0x1653543787a9dc91634e0818838da5e6c48af964c5a4cad53ff80794529b8f77",
      "0x109385a2afb0ee66ded9f7269eb7833303df17860dc13edf9ef26b9cc8f42f15",
    ],
    b: [
      [
        "0x261f5d0fd6f584349c3e83f8fab6a4e50642d84bc6df8ec7dbbea5bf180113fd",
        "0x0523e4d52dcbed20c258225eea5c2864c5b560ed808e6e71d63490483d48c941",
      ],
      [
        "0x03dd1224bf3262d9f4890bff6a442acd71f4146bbbc4ea6519c31eab15c993e8",
        "0x2a91955962384ebcf59316a16296a2aa590091393bd7bad11b753a7a1f74b541",
      ],
    ],
    c: [
      "0x24251f5cb17a1051154b5a5e7ec1053b9ef272bde22eb9d381b9c899a163cfd8",
      "0x296062fe7f6de5f3fa72c5d35bc0999b716c083542fedcbe1c2da60402d478b5",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof7 = {
  proof: {
    a: [
      "0x279540a84a1ceccb74ffe0800290eefba79fa67cfce47b89016daf7f868dda9e",
      "0x26689d606d273e6f250d6aec3fe9f79775f4cd5165b69e3d3ffef15d94c6496b",
    ],
    b: [
      [
        "0x29d799115838986dcbc0c3b053501995bed8c9ea136565a36fab1470f84041a2",
        "0x110a106433b914926b5bb6d990e4107196a0d40dbb48192d3e305fa2a1241a7a",
      ],
      [
        "0x21504ae93c7cdb721a9d308521d0fc573ebd0dd6200c105e5f6a7afbef492ea2",
        "0x114a7f1a4d49927cc32e7151d16937c3d73ca348676c1bf1777a5b5c838274d6",
      ],
    ],
    c: [
      "0x2dd16f47053128ae267418f2a7d42ca549af14db2799f839aa26bcf53e2c07d6",
      "0x0f3fef53033755a4bb9bc4a97641b8dab31707141c80e6e2d8bac0532c3803b0",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof8 = {
  proof: {
    a: [
      "0x12abf5489fcfd832594c618a52ed88b08f7b62ea732701c9956b415ac7f373e3",
      "0x28b0defb6a9641120c4d629b97d44b3ab02ec6ecd7990d5dfb82812bcac6c2ee",
    ],
    b: [
      [
        "0x2771e83ca2ed58a664ac02707a5b95b4f8f8d8df52442e85fd507e67bfed224c",
        "0x08887bc4dcfb265e5ac840330507afbbe6687bcd68d283f8f5ae807bae0b7e16",
      ],
      [
        "0x00ac8865318cade3d05a4a4f73a6818e07a2d2ee59299cffee3fef0678773df0",
        "0x27fd5a12d2b49479ff22e7c7badc5f2d705189eefa57259da66d126504a7477e",
      ],
    ],
    c: [
      "0x16012b540c9dc0ef983da31c1f27e6505ecffa5e021af5f889410a0c841f1dbc",
      "0x1972800faf1fef3df65cd418542e6c6b43b66d8329530035c91ff7cf0b495265",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof9 = {
  proof: {
    a: [
      "0x1a7977f3c14ec2afbcfb9e88af6c26f60e63ebaeca0d2c85c22f5c57dd3eb425",
      "0x0188abf5213f9ea3304176878c913cde4c15d31b5e7f59105cd669533be53c43",
    ],
    b: [
      [
        "0x1bb6b5cd48c57e89bfc0bc397869115c41f39e6442a21bb9fa5040039e4ae00d",
        "0x2256f156b5210fb86c1ef1843b7c6d2996579b3d36ccb245951dbe9448475fbe",
      ],
      [
        "0x24233a25be31e2a2fd80ff0fc48279430a776518db5508e307934ea508b5d4f8",
        "0x0a76cb84c37bddcb304cf33a831d5d1a764fe6b93c03a8e656e25aaa90a9eabb",
      ],
    ],
    c: [
      "0x01657a9403f8d973ac70c1ee4af94d05aa38649f1b2ff6842f68de1cd0f19f7a",
      "0x2e50ba183e833091513e07755281ea2ab05334e4ebbef48a013c6f14c117eff7",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof10 = {
  proof: {
    a: [
      "0x1cc836674aaca09475b93d0c547da4d3027be417b2a0f0e0b99123ca7cb72e7c",
      "0x0adfebdf32730fd40b1016b3fe263e9c0688b5dd5bd086644b09fb391c4ad8c0",
    ],
    b: [
      [
        "0x0510aba79d040dce39827e6ce1df1c20ab5d1bf1e3277e843acdf743e5f4041b",
        "0x256cfc7574b72707d00b35e5cc725476935ee02b3da4a9de7ca295463f764ea4",
      ],
      [
        "0x1447eeb02ecb6dea7246d26d26eb3d53c251bf2dafac6ec517f720509b6d069c",
        "0x00ac619f3773ac379f94e69e0befd9bde31837a33e434df5fb02d5cefc83de54",
      ],
    ],
    c: [
      "0x177d3d12b3c0e77d8ee347c9248c3ec8bcb12bfe4e2287a2b487fe0cb7c4ae2b",
      "0x27c49e9ea571c8e2f937e0403846c0733cf755ae0e48e4e283045d2c85d77b45",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000009",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const proofs = [correctProof1, correctProof2, correctProof3, correctProof4, correctProof5, correctProof6, correctProof7, correctProof8, correctProof9, correctProof10]

const CONTRACT_FILE = require("./build/contracts/SolnSquareVerifier");
const NFT_ABI = CONTRACT_FILE.abi;

async function mintNft() {
  const provider = new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${infuraKey}`);
  const web3Instance = new web3(provider);

  const nftContract = new web3Instance.eth.Contract(
    NFT_ABI,
    NFT_CONTRACT_ADDRESS,
    { gasLimit: "1000000" }
  );

  for (let tokenId = 0; tokenId < proofs.length; tokenId++) {
    const proof = proofs[tokenId].proof;
    const input = proofs[tokenId].inputs;

    await nftContract.methods
    .mint(OWNER_ADDRESS, tokenId, proof.a, proof.b, proof.c, input)
    .send({ from: OWNER_ADDRESS, gas: 4500000 }, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log("ERC721 " + NFT_CONTRACT_ADDRESS + "/" + tokenId + " mint result: " + result);
        }
    });
  }
}

mintNft();
