import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BrowserProvider, Contract } from "ethers";
import axios from "axios";

const PINATA_API_KEY = "ec3d7e1835d2715f8529";
const PINATA_SECRET_KEY = "8a27d2f4d9948f5c244b25ac0d58698bb80ab5e4f6e4f01c15b76ec2e5ba77c4";

const contractAddress = "0xC61D329f6Df8e4c7486BED0455Ae7d106720ee4c"; // Replace with your deployed contract address
const abi = [
  "function mintNFT(address recipient, string memory tokenURI) public"
];

const Mint = () => {
  const { eventId } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const BACKEND_URL = "http://localhost:5000";

  // Fetch event details from Firebase
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        console.log(`Fetching event from: ${BACKEND_URL}/api/events/${eventId}`);
        const response = await fetch(`${BACKEND_URL}/api/events/${eventId}`);
  
        if (!response.ok) {
          throw new Error(`Event not found! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setEvent(data);
        console.log("Event Data Loaded:", data);
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Event data could not be loaded. Please check if the backend is running.");
      }
    };
  
    fetchEventDetails();
  }, [eventId]);

  // Connect to Metamask
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Metamask not detected!");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletConnected(true);
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  // Upload event metadata to Pinata
  async function uploadMetadataToPinata(eventData) {
    if (!eventData) {
      throw new Error("Event data is missing! Cannot upload metadata.");
    }
  
    const metadata = {
      pinataMetadata: { name: `${eventData.eventName || "Unknown Event"}-metadata` },
      pinataContent: {
        name: eventData.eventName || "Unknown Event",
        description: `Proof of Attendance for ${eventData.eventName || "Unknown Event"}`,
        image: eventData.imageURL || "ipfs://fallbackImageCID", // Ensure this is a valid IPFS image
        attributes: [
          { trait_type: "Organizer", value: eventData.organizer || "Unknown" },
          { trait_type: "Date", value: eventData.date || "Unknown" },
        ],
      },
    };
  
    try {
      const response = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      });
  
      return `ipfs://${response.data.IpfsHash}`;
    } catch (error) {
      console.error("Error uploading metadata to Pinata:", error);
      throw new Error("Failed to upload metadata to IPFS");
    }
  }

  // Mint NFT function
  const mintNFT = async () => {
    if (!window.ethereum) {
      alert("Metamask not detected!");
      return;
    }
  
    try {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, abi, signer);
  
      const userAddress = await signer.getAddress();
  
      // Upload metadata to Pinata
      const metadataURI = await uploadMetadataToPinata(event);
  
      // Call the mint function on blockchain
      const tx = await contract.mintNFT(userAddress, metadataURI);
      await tx.wait();
  
      alert(`NFT Minted! Transaction Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Minting error:", error);
      alert("Error minting NFT!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Mint NFT for {event?.eventName}</h1>
      <p>Organizer: {event?.organizer}</p>
      <p>Date: {event?.date}</p>
      {!walletConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <button onClick={mintNFT} disabled={loading}>
          {loading ? "Minting..." : "Mint NFT"}
        </button>
      )}
    </div>
  );
};

export default Mint;
