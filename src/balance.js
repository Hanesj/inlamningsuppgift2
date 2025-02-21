import { createElement, createTextElement } from './dom.js';
import { createClient, convEth } from './helpers/explorer.js';
const form = document.querySelector('#balance-form');
const balanceInput = document.querySelector('#balance');
const balanceList = document.querySelector('#balance-list');

let client = undefined;
const initApp = () => {
	client = createClient();
};

const getBalance = async (e) => {
	e.preventDefault();
	const balance = await client.getBalance({
		address: balanceInput.value,
	});
	console.log(convEth(balance));
	displayBalance(balanceInput.value, convEth(balance));
};

const displayBalance = (wallet, value) => {
	const div = createElement('div');
	div.classList.add('section');

	div.appendChild(createTextElement('div', wallet));
	div.appendChild(createTextElement('div', `${value} ETH`));

	balanceList.prepend(div);
};

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', getBalance);
