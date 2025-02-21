import { createElement, createTextElement } from './dom.js';

import { createClient } from './helpers/explorer.js';

const blockList = document.querySelector('#list');
const subTitle = document.querySelector('h4');

let client = undefined;

const initApp = async () => {
	client = createClient();
	listAllBlocks();
};

const listAllBlocks = async () => {
	const blocks = await client.getBlockNumber();
	for (let i = blocks; i >= 0; i--) {
		const block = await client.getBlock({ blockNumber: i });

		const div = createElement('div');
		div.classList.add('section');

		div.appendChild(createTextElement('div', block.number));
		div.appendChild(
			createTextElement(
				'div',
				new Date(parseInt(block.timestamp * 1000n)).toLocaleString(
					'sv-SE'
				)
			)
		);
		div.appendChild(createTextElement('div', block.hash));

		//Knapp till transaktion
		const btn = createElement('a');
		btn.textContent = 'Show';
		btn.classList.add('btn');
		btn.classList.add('btn-rounded');
		btn.style.width = '100px';
		btn.href = `./transaction.html?hash=${block.hash}`;

		div.appendChild(btn);

		blockList.appendChild(div);
	}
};

document.addEventListener('DOMContentLoaded', initApp);
