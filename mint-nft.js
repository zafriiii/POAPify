const { ethers } = require("ethers");

// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0xfeab6d20f72b933eaaa1f3b83673153fdefeeb88"; 

// Replace with your contract's ABI
const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "mintNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Your wallet details
const PRIVATE_KEY = "f1f66c0be3e83fb146f9d25e93c6cbf8538fd4ce2a4e880e3c5ee18b7397d6ce"; 
const WALLET_ADDRESS = "0xd4eb1049B589782785F03A74545b2FA1faEF5227";

// Metadata URL
const METADATA_URL = "https://gateway.pinata.cloud/ipfs/bafkreibn3ifb7iyvtcc7nfbiqbvoeo3ewaafi3fj2xjtf55irj65c5acea";

// Alchemy or Infura endpoint for Sepolia
const PROVIDER_URL = "https://eth-sepolia.g.alchemy.com/v2/ZN0Zp51HD2M-eICnEwDcd9g9O7ShirGp";

// Set up provider and wallet
const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Contract instance
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

async function mintNFT() {
    try {
        console.log("Minting NFT...");

        // Call the mintNFT function
        const tx = await contract.mintNFT(WALLET_ADDRESS, METADATA_URL);
        console.log("Transaction sent. Waiting for confirmation...");
        await tx.wait();

        console.log(`NFT minted successfully! Transaction hash: ${tx.hash}`);
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
}

mintNFT();
