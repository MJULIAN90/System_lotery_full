import { ethers, utils } from "ethers";
import { useState, useEffect } from "react";
import Loteria from "../artifacts/contracts/Loteria.sol/Loteria.json";
import { formatEther, formatEtherAdmin } from "../Utils";

const useLoteryMethods = () => {
  const [balanceEtherContract, setBalanceEtherContract] = useState(1);
  const [balanceEther, setBalanceEther] = useState(1);
  const [balanceTokenContract, setBalanceTokenContract] = useState(1);
  const [balanceToken, setBalanceToken] = useState(1);
  const [amountBalanceReward, setAmountBalanceReward] = useState(1);
  const [totalTickets, setTotalTickets] = useState(1);
  const [isOwner, setIsOwner] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [winner, setWinner] = useState(undefined);
  const [bringWinnerState, setBringWinnerState] = useState(1);
  const [addressAccount, setAddressAccount] = useState("");
  const [totalReward, setTotalReward] = useState(0)

  const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(addressContract, Loteria.abi, signer);

  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    })
  }, [])

  //para users
  useEffect(() => {
    getBalanceTokens();
  }, [totalTickets]);

  useEffect(() => {
    seeTickets();
  }, []);

  //NavBar
  useEffect(() => {
    getBalanceEthers();
  }, [balanceToken]);

  useEffect(() => {
    getAddressAccount();
  }, []);

  //Home
  useEffect(() => {
    getOwner();
  }, []);

  //Information
  useEffect(() => {
    bringWinner();
  }, [winner]);

  //Admin
  useEffect(() => {
    getBalanceEthersContract();
  }, [balanceToken]);

  useEffect(() => {
    getBalanceTokensContract();
  }, [balanceToken]);

  const getBalanceTokens = async () => {
    let balance = (await contract.balanceOf(signer.getAddress())).toString();
    setBalanceToken(balance);
    let balanceRewar = (await contract.balanceOf(contract.owner())).toString();
    setTotalReward(balanceRewar);
  };

  const getBalanceTokensContract = async () => {
    let balanceTokensContract = (
      await contract.balanceOf(addressContract)
    ).toString();
    let owner = await contract.owner();
    let balanceReward = await contract.balanceOf(owner);

    setBalanceTokenContract(balanceTokensContract);
    setAmountBalanceReward(balanceReward.toString());
  };

  const getBalanceEthersContract = async () => {
    let balance = (await contract.etherBalanceContract()).toString();

    setBalanceEtherContract(formatEtherAdmin(balance));
  };

  const getBalanceEthers = async () => {
    let balance = (await signer.getBalance()).toString();
    let balaceEther = ethers.utils.formatEther(balance);

    setBalanceEther(formatEther(balaceEther));
  };

  const buyTokens = async (amount) => {
    try {
      let result = await contract
        .connect(signer)
        .buyTokens(amount, { value: utils.parseEther(`${amount}`) });
      let resultTransaction = await result.wait();
      let dataTransaction = resultTransaction.logs[1].data;
      let decodingObject = new utils.AbiCoder();
      let resultEvent = await decodingObject.decode(
        ["string", "uint", "string"],
        dataTransaction
      );

      getBalanceTokens();
      getBalanceEthers();

      return {
        message: `${resultEvent[0]} ${resultEvent[1].toString()} ${
          resultEvent[1].toString() === "1" ? "token" : resultEvent[2]
        }`,
        type: "success",
      };
    } catch (err) {
      return {
        message: err.data.message.split("'")[1],
        type: "error",
      };
    }
  };

  const seeTickets = async () => {
    let userTickets = await contract.seeUserTickets(signer.getAddress());

    setTotalTickets(userTickets.reduce((acc) => acc + 1, 0));
  };

  const listTickets = async () => {
    let userTickets = await contract.seeUserTickets(signer.getAddress());

    setTickets(userTickets.map((ticket) => ticket.toString()));
    if (userTickets.length === 0) {
      return {
        message: 'No tickets available',
        type: "info",
      };
    }
  };

  const buyTickets = async (amount) => {
    try {
      let result = await contract.connect(signer).buyTicket(amount);
      let resultTransaction = await result.wait();
      let dataTransaction = resultTransaction.logs[0].data;
      let decodingObject = new utils.AbiCoder();
      let resultEvent = await decodingObject.decode(
        ["string", "uint", "string"],
        dataTransaction
      );

      seeTickets();

      return {
        message: `${resultEvent[0]} ${resultEvent[1].toString()} ${
          resultEvent[1].toString() === "1" ? "ticket" : resultEvent[2]
        }`,
        type: "success",
      };
    } catch (err) {
      return {
        message: err.data.message.split("'")[1],
        type: "error",
      };
    }
  };

  const getWinner = async () => {
    try {
      let ticketWinner = await contract.winnerLottery();
      let resultTransaction = await ticketWinner.wait();

      let dataTransaction = resultTransaction.logs[0].data;
      let decodingObject = new utils.AbiCoder();
      let resultEvent = await decodingObject.decode(
        ["string", "uint"],
        dataTransaction
      );

      setWinner(resultEvent[1].toString());

      return {
        message: `${resultEvent[0]} ${resultEvent[1].toString()}`,
        type: "success",
      };
    } catch (err) {
      return {
        message: err.data.message.split("'")[1],
        type: "error",
      };
    }
  };

  const withdrawEthers = async (amount) => {
    try {
      let result = await contract.connect(signer).withdrawMoney(amount);
      let resultTransaction = await result.wait();
      let dataTransaction = resultTransaction.logs[0].data;
      let decodingObject = new utils.AbiCoder();
      let resultEvent = await decodingObject.decode(
        ["string", "uint", "string"],
        dataTransaction
      );
      getBalanceTokens();
      return {
        message: `${resultEvent[0]} ${resultEvent[1].toString()} ${
          resultEvent[1].toString() === "1" ? "token" : resultEvent[2]
        }`,
        type: "success",
      };
    } catch (err) {
      return {
        message: err.data.message.split("'")[1],
        type: "error",
      };
    }
  };

  const getOwner = async () => {
    let addressowner = await contract.owner();

    addressowner === (await signer.getAddress())
      ? setIsOwner(true)
      : setIsOwner(false);
  };

  const bringWinner = async () => {
    let winnerTicket = (await contract.ticketWinner()).toString();

    setBringWinnerState(parseInt(winnerTicket));
  };

  const getAddressAccount = async () => {
    let address = await signer.getAddress();

    setAddressAccount(address);
  };

  return {
    balanceEtherContract,
    balanceEther,
    balanceTokenContract,
    balanceToken,
    amountBalanceReward,
    totalTickets,
    isOwner,
    tickets,
    winner,
    bringWinnerState,
    addressAccount,
    totalReward,
    getBalanceTokens,
    getBalanceTokensContract,
    getBalanceEthersContract,
    getBalanceEthers,
    getOwner,
    buyTokens,
    seeTickets,
    buyTickets,
    getWinner,
    withdrawEthers,
    listTickets,
    bringWinner,
    getAddressAccount,
  };
};

export default useLoteryMethods;
