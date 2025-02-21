import { convEth, createClient } from "./helpers/explorer.js";
const transactionDetailsDisplay = document.querySelector("#transactionDetails");

let client = undefined;

const initApp = () => {
  const hash = location.search.split("=")[1];
  client = createClient();

  displayTransactionDetails(hash);
};

const displayTransactionDetails = async (hash) => {
  const block = await client.getBlock({ blockHash: hash });

  if (block.transactions.length === 0) {
    generateDisplay(block);
    return;
  }
  for (let transaction of block.transactions) {
    const trx = await client.getTransaction({ hash: transaction });
    generateDisplay(block, trx);
  }
};

const generateDisplay = (block, transaction) => {
  let html = "";
  transactionDetailsDisplay.innerHTML = html;
  if (!transaction) {
    document.querySelector(".page-title").innerText = "NO TRANSACTIONS";
    return;
  }

  html = `
    <h2 id="blockNumber">BLOCK NUMBER ${block.number}</h2>
    <article class="trx-details">
      <section>
        <span>Gas used: </span>
        <small>${block.gasUsed}</small>
      </section>
      <section>
        <span>Gas limit: </span>
        <small>${block.gasLimit}</small>
      </section>
<section>
        <span>Mined date:</span>
        <small>${new Date(parseInt(block.timestamp * 1000n)).toLocaleString(
          "sv-SE"
        )}</small>
      </section>
<section>
        <span>Block Hash: </span>
        <small>${block.hash}</small>
      </section>
    </article>

    <h2 id="trxHash">TRX Hash ${transaction.hash}</h2>
    <article class="trx-details">
<section>
        <span>To: </span>
        <small>${transaction.to}</small>
      </section>
      <section>
        <span>From: </span>
        <small>${transaction.from}</small>
      </section>
<section>
        <span>Gas Used: </span>
        <small>${transaction.gas}</small>
      </section>
<section>
        <span>Value: </span>
        <small>${convEth(transaction.value)} ETH</small>
      </section>





    </article>
  `;

  transactionDetailsDisplay.innerHTML = html;
};

document.addEventListener("DOMContentLoaded", initApp);
