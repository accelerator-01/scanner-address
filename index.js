import axios from "axios";

function addressScanner() {
  const networks = {
    ethereum: {
      key: "233161YMHEVQ4D6X1G5GMKP22Z1JPKXY68",

      url: "https://api.etherscan.io/api",
    },

    tron: {
      key: "d7533657-e7f8-4fde-bdc7-c4441b90db79",

      url: "https://api.trongrid.io",
    },

    polygon: {
      key: "VEMF2T8BN6D8RS2JH4CT5RNUP7PC349Z3M",

      url: "https://api.polygonscan.com/api",
    },

    bsc: {
      key: "B18GJMDTEUTJBVISFWCWM2CGJ92X86EU9U",

      url: "https://api.bscscan.com/api",
    },

    optimism: {
      key: "QPYGXVVT7VV3A81WXB6JGNIK4883PJEA7A",

      url: "https://api-optimistic.etherscan.io/api",
    },

    arbitrum: {
      key: "5RHJP7RFI38GPZXZTK7GNR6KK3UNSSG78A",

      url: "https://api-arbitrum.etherscan.io/api",
    },
  };

  /*  const getBalance = async (network, address) => {
    const url = `${networks[network].url}?module=account&action=balance&address=${address}&apikey=${networks[network].key}`;
    const { data } = await axios.get(url);
    return data.result;
  };

  return {
    getBalance,
  }; */

  const getAddressBalances = async (network, addresses) => {
    const balances = [];
    let totalBalance = 0;
    for (const address of addresses) {
      const balance = await getBalance(network, address);
      balances.push({ address, balance });
      totalBalance += parseInt(balance, 10);
    }

    const result = `Total balance of ${addresses.length} addresses is ${totalBalance}`;

    fs.writeFile("result.txt", result, (err) => {
      if (err) {
        console.log("Error writing to file", err);
      }
      console.log("Successfully wrote to file");
    });

    return balances;
  };

  const getBalance = async (network, address) => {
    const url = `${networks[network].url}?module=account&action=balance&address=${address}&apikey=${networks[network].key}`;
    const { data } = await axios.get(url);
    return data.result;
  };

  return {
    getAddressBalances,
  };
}

export default addressScanner();
