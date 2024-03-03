import fs from "fs";
import addressScanner from "./index";

// #!/usr/bin/env node

const run = (addressesString) => {
  const addresses = addressesString.split(",");
  const network = process.argv[2];
  const scanner = addressScanner();

  scanner.getAddressBalances(network, addresses).then((balances) => {
    const resultFilePath = "result.txt";
    fs.writeFileSync(resultFilePath, JSON.stringify(balances, null, 2));
    console.log(`Results written to ${resultFilePath}`);
  });
};

if (process.argv.length === 3) {
  run(process.argv[3]);
} else {
  console.log("Usage: node index.js <network> <addresses>");
}

run();
