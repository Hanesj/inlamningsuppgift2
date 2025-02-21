import { ethers, formatEther, parseEther } from "ethers";

// Kommunikation med lokal server OBS denna address genom WSL. Annars localhost/127.0.0.1
const provider = new ethers.JsonRpcProvider("http://localhost:8545");

let balance = await provider.getBalance(
  "0x1f4342600F2949d791EBF494FC89D9024D08129A"
);

console.log(formatEther(balance), "ETH");

let transactionList = await provider.getTransactionCount(
  "0x1f4342600F2949d791EBF494FC89D9024D08129A"
);

const signer = await provider.getSigner(
  "0x1f4342600F2949d791EBF494FC89D9024D08129A"
);
console.log(signer);

const trx = await signer.sendTransaction({
  to: "0x9A925B275C1dA95EF700FEA491E57437A1b282AC",
  value: parseEther("0.5"),
});

const receipt = await trx.wait();

console.log(receipt);

balance = await provider.getBalance(
  "0x1f4342600F2949d791EBF494FC89D9024D08129A"
);

console.log("Avsandarens balans:", formatEther(balance));

balance = await provider.getBalance(
  "0x9A925B275C1dA95EF700FEA491E57437A1b282AC"
);
console.log("mottagarens balans:", formatEther(balance));

transactionList = await provider.getTransactionCount(
  "0x1f4342600F2949d791EBF494FC89D9024D08129A"
);

console.log("antal transaktioner fran avsandare:", transactionList);

const blockNo = await provider.getBlockNumber();
console.log("blocknr:", blockNo);

let block = await provider.getBlock(
  "0x6c5a257210464a6ef4114d5e1114fc1f249554752e5c2e394906ba89460b7f9e"
);

console.log(block);
console.log("Transaktioner i detta block:", block.transactions);

const transaction = await block.getTransaction(
  "0x4c9d2a68f5ed5b2e6ff068f35a239373eca03ababe2d89f804f08ba0f9f6e627"
);

console.log(transaction);

let allBlocks = await provider.getBlockNumber();

for (let i = 0; i <= allBlocks; i++) {
  let b = await provider.getBlock(i);
  let transactions = b.transactions;
  console.log(
    `Block:${i} - Mined on ${new Date(b.timestamp * 1000).toLocaleDateString(
      "sv-SE"
    )} - Gas: ${b.gasUsed}`
  );

  for (let t of transactions) {
    const trx = await b.getTransaction(t);
    console.log(
      `From: ${trx.from} To: ${trx.to} Value: ${formatEther(trx.value)} ETH`
    );
  }
}
