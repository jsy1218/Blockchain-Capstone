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
      "0x24317e374c4f7cb32ff9ee2fd18a01f01653b7af616d3cac093eeb12c81141e0",
      "0x15644bfc545a62053243a40420dc71398a8292e86a94dff405f556981f07d28c",
    ],
    b: [
      [
        "0x109c6581a68dc519851a6135b22ef224d13a1c250820aca3a431a52d6eecc2f2",
        "0x179a1e604908b49f354a4e3471a47f56f7a015d77706fcf495c596f666467bfb",
      ],
      [
        "0x048f248c8bb81291afa9ca63b90d758ae7c3f53a569403c32c2ffc93ebeefd5b",
        "0x151df6e78b66d643aba6a300e68581b19faadad18bf8857f46fdb533431525c3",
      ],
    ],
    c: [
      "0x178e38243a4d47fcc94863e2c16874ae6f213b30330b7d976ea2dc4e0c9b4be0",
      "0x21a855561d9a63dad0066933c053a2f6c29a936641baabc279f0a9b174c4adcc",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000031",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof3 = {
  proof: {
    a: [
      "0x0b529ae43159e5b5cb411bd9409df7819ab1a1f52ccde0942dbf623c8d37c25c",
      "0x2b2f16a727455a50ce021e5d6503e99ea0dfe31ca247eb0179c4420d3480f75b",
    ],
    b: [
      [
        "0x1a0a3f267f977805891889915912e703c83ff8aa48acb8bbd04ded1fa48740d4",
        "0x1b2ebb7168d8fd36a2040b1264c7b39d23f57d414fb612769edd75b3cdca87dc",
      ],
      [
        "0x18f37207251517a919445425dfcd3d8e9b55a4b6edd7632e41dd9c207489cf24",
        "0x1d106fe1d27629f559510ae9ed2d75c276dcc71405880e82e68da66e5f36ac73",
      ],
    ],
    c: [
      "0x2371611b157de8eada40d9dd7aa2ff051d2159cf2f841f0a1a66813074258c72",
      "0x22a72c46859c4579376e7b2694ae75cc36e3c731f55e81d6639ebd5ca643503c",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000040",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof4 = {
  proof: {
    a: [
      "0x096947d616e46673d2a949411096d735a86890ee1fd168af776190bdb7b6b698",
      "0x26210889b63608117a326e39d7dd0a92f3593a7234d69e529cad25e7afc081c1",
    ],
    b: [
      [
        "0x06ce7bce55675288aea899796b80ba7f0e4ab88d6399238545846a4ca3d616c3",
        "0x2ec809c36c53a7ac106d8197fdedf92418728a85ef0968471ab8c20051992a41",
      ],
      [
        "0x2e64fccf5e46276987a1d3a4c1f86d64ce2e89613dcf9896823e65cf6d917249",
        "0x2ee42bbe218740ddc04f0df50dc17b7ba262901122ffab54eacf41c54ea0c8ae",
      ],
    ],
    c: [
      "0x27d6547156d0c8121b245b260ad13f6acba537dfa142886d001df954b087622f",
      "0x1ed314e86b2f5ab97f368cdbbafcde96e659acae5e9f9a1efdc1e4188db7e570",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000051",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof5 = {
  proof: {
    a: [
      "0x11b08edb642a46c8286ad4e7767a8ce4bdc9688993e566961b985447ea385d5a",
      "0x197e2aefcaa882f731ac4a215a628a7ce01744edceeb2ddd2c88896d4a0e8cee",
    ],
    b: [
      [
        "0x2d11c06618c39cc84b363daf249f43f89e6fcaa4c4986b9610f00b08a063078b",
        "0x0d49defefe994e7d5c9cfe42beba2e50a807178de88ff7f2b8b84fb1b090a280",
      ],
      [
        "0x2c2f1f03ce9694a6f87b1aa0c82949995e27035668a3f41928bb17c2eb4ce0f7",
        "0x06164fb35262228a88f929064bd789d37f2b94a05e9c583df41d83dc402e057e",
      ],
    ],
    c: [
      "0x15836fbb02457aa4c468898fb926803813086de5370fae53b2e63361c8785d39",
      "0x1487664a5e3baef26f697a7dcce747fd91ec01c7828bc1e417e7e8e00dc6c812",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000064",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof6 = {
  proof: {
    a: [
      "0x21b6bdbd34e8621b5ebe8bda087ff3a1a7c74209cba7d5cd7e9f3887ebe96bb2",
      "0x2105ef81390dafafaaec09a0c2cfa577ed2069490d4a8fde0bd297e44a3154db",
    ],
    b: [
      [
        "0x10d2fc0fffbdd76be7319d5d340e36807c14560c3f7c4079dc70fbd868ad3335",
        "0x1cc008340c84ff1c50fda9a06f7d6f9b6bb3295e47a7fe760ff760e571ac21c9",
      ],
      [
        "0x2e76b6b5e62a3355ceb3b678e2a424f493e1dcc0d845b4f9ec82bdfb7a13ef6d",
        "0x2e1558066830853b5e689c6c8d0799bd91e333cf7aff6dfc49a4f0663d39969e",
      ],
    ],
    c: [
      "0x29935485f2f24b34dfad431572e542f099e32ff85147be6dc95e08d7feba3980",
      "0x18bc361405aef5c5ff550d080880da3a1c423e49704897b6aa06d2d55ba08cb2",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000079",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof7 = {
  proof: {
    a: [
      "0x2ff385f13599d2e0f4511daadb50eb1e98968f676bda3e9179874f46c898b999",
      "0x0a9f26368d617d4cacbc7cb00eae1bd761b3c263bf7ae9ddf1b6d862e80c0a2e",
    ],
    b: [
      [
        "0x14f98b9771a07d86f35b6a7c9c6a493be6964d4b5cd8aae54a6600bd26cffc8f",
        "0x2b028909f1c3db745cf1bc41bfac57d20c3d96bb70f623ea7c56c61f3c267b7b",
      ],
      [
        "0x12c806b2af49d9f9869731e1bed92aa2ee900d049e4951f6b20cdd5a28c1f3f7",
        "0x0e335185a38b9862e478e66975232267eeeb35e4727f99bd94a5a7218e7ba926",
      ],
    ],
    c: [
      "0x1bf5a7cf370f89b62e4eb7ac3e811780ee2645cf42848cbbb6abbd13564850cf",
      "0x23f2d5c3459ff9ccf493e53fb7ded4c4f321607a9838f5cce645bb09bdf30061",
    ],
  },
  inputs: [
    "0x0000000000000000000000000000000000000000000000000000000000000090",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof8 = {
  proof: {
    a: [
      "0x024fdf678cd954c9146577b8ff2e54747b3b26317b04b32cc424607348d11f36",
      "0x089032b1fe30248ffdc5c062935f1175c2674d5892bfe409f77d9fc6cc96cf0c",
    ],
    b: [
      [
        "0x136f7309274035254102813054a93157a2f3c8c14079c2bdea2b0b21a9d95cc3",
        "0x0724904bf5707ade5845105244462188360fb78a8f67c4dda2a912ceeeb59963",
      ],
      [
        "0x153230ee5028bab97a70884c1e55621c2e9721368eb33ff6e38edd6dc44dcca9",
        "0x2473ce8ca344e557c45481ca86fee8132f5c5a298070db343b35d0fa2b22bf2d",
      ],
    ],
    c: [
      "0x0ea783c1f033f53eccbf68e1a6ff623340304cf16420c00cd443d47e0ef3d666",
      "0x24079260f7b7057b62adca747d63e7fe570125bf52ddcc90c11af33681fd7d92",
    ],
  },
  inputs: [
    "0x00000000000000000000000000000000000000000000000000000000000000a9",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof9 = {
  proof: {
    a: [
      "0x15cbbe4e69da1b38f0f269fe3d0c613d7371df9c8a2c1808589b78f5464e4ec9",
      "0x1f03d4667e9e762b6694bb5183606a304692d2ad99d21cbb698edf68077721e3",
    ],
    b: [
      [
        "0x10e0d071b91eaaddd1d68a5ddc747fbe5fe9be4779dd5b1bdbf8246fb56dbf94",
        "0x0f32b79fc6cb1f2702be697876de37692e15ebaa7f398bfb1f25a8b00db43f30",
      ],
      [
        "0x156be0773bd7cd0093e43ffef509732f0a293dc1c769adf1b0ed47960de0997a",
        "0x18315dc16f6ad2287dc9d63b3be370ba38cdcd2ba4317470a9a78748a9c8c2f4",
      ],
    ],
    c: [
      "0x118094c257638e80e7d317f59a26a3afb31a255cda7337dfd7fe086c72ede5ee",
      "0x28996853480ad5406fcff62883b6b649883b6f5e60cb7836541bb9de9708ad7e",
    ],
  },
  inputs: [
    "0x00000000000000000000000000000000000000000000000000000000000000c4",
    "0x0000000000000000000000000000000000000000000000000000000000000001",
  ],
};

const correctProof10 = {
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

    let tokenId = 0;
    const proof = proofs[tokenId].proof;
    const input = proofs[tokenId].inputs;

    await nftContract.methods
    .mint(NFT_CONTRACT_ADDRESS, tokenId, proof.a, proof.b, proof.c, input)
    .send({ from: OWNER_ADDRESS, gas: 4500000 }, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          console.log("ERC721 " + NFT_CONTRACT_ADDRESS + "/" + tokenId + " mint result: " + result);
        }
    });
}

mintNft();
