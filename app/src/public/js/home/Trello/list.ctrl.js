'use strict'

//
function List(board, title, index, dummyList) {
	this.board = board
	this.dummyList = dummyList
	this.title = title
	this.index = index
	this.node = document.createElement('div')
	this.titleNode = document.createElement('div')
	this.cardsNode = document.createElement('div')
	this.node.classList.add('list')
	this.titleNode.classList.add('list-title')
	this.cardsNode.classList.add('list-cards')
	this.titleNode.setAttribute('list-index', index)
	this.titleNode.appendChild(document.createTextNode(this.title))
	this.node.appendChild(this.titleNode)

	if (!dummyList) {
		const dummyCard = new Card(this, 'Add a card...', 0);

		this.titleNode.draggable = true
		this.cards = [dummyCard]
		board.registerCard(this.cards[0], 0)

		this.titleFormNode = buildCardTitleForm()

		for (let i = 0; i < this.cards.length; ++i) {
			this.cardsNode.appendChild(this.cards[i].node)
		}
		dummyCard.titleNode.onclick = addCardTrello(this)
		this.node.appendChild(this.cardsNode)
		dummyCard.node.appendChild(this.titleFormNode)
		dummyCard.node.draggable = false
		dummyCard.node.onclick = undefined
	}

	this.titleNode.ondragstart = function (evt) {
		const index = parseInt(evt.target.getAttribute('list-index'), 10);
		dragTracker.list = currentBoard.lists[index]
		evt.dataTransfer.effectAllowed = 'move'
	}

	this.titleNode.ondragover = function (evt) {
		if (dragTracker.list) {
			evt.preventDefault()
		}
	}

	this.titleNode.ondrop = function (evt) {
		const sourceIndex = dragTracker.list.index;
		const targetIndex = parseInt(this.getAttribute('list-index'), 10);
		const numLists = board.lists.length;
		let i;

		if (sourceIndex === targetIndex) { return }

		board.listsNode.removeChild(dragTracker.list.node)
		board.listsNode.insertBefore(dragTracker.list.node,
			board.lists[targetIndex].node)

		for (i = sourceIndex; i < numLists-1; ++i) {
			board.lists[i] = board.lists[i+1]
			board.lists[i].titleNode.setAttribute('list-index', i)
			board.lists[i].index = i
		}
		for (i = numLists-1; i > targetIndex; --i) {
			board.lists[i] = board.lists[i-1]
			board.lists[i].titleNode.setAttribute('list-index', i)
			board.lists[i].index = i
		}
		board.lists[targetIndex] = dragTracker.list
		board.lists[targetIndex].titleNode.setAttribute('list-index', targetIndex)
		board.lists[targetIndex].index = targetIndex
		evt.preventDefault()
	}

	this.titleNode.ondragend = function () {
		dragTracker.list = undefined
	}
}

function buildListTitleForm() {
	const node = document.createElement('form');
	node.innerHTML =
		'<div class="newitem-title-wrapper" id="newList">' +
			'<input id="trello-list-title-input" type="text">' +
			'<input id="trello-list-title-submit" type="submit" value="Save">' +
			'<span id="trello-list-title-exit" onclick="deleteList()">&#10060;</span>'+
		'</div>'
	node.style.display = 'none'
	return node
}

function addListTrello(board) {
	return function () {
		const titleInput = document.getElementById('trello-list-title-input');
		const div = document.getElementById('newList');

		document.getElementById('trello-list-title-submit').onclick = titleButtonClick

		if(board.titleFormNode.style.display === 'none' || div.style.display === 'none') {
			div.style.display = 'block';
			board.titleFormNode.style.display = 'block';
		} else {
			board.titleFormNode.style.display = 'none';
			document.getElementById('trello-list-title-input').value = '';
		}
		titleInput.focus()


		function titleButtonClick(evt) {
			evt.preventDefault()
			const title = titleInput.value.trim();
			const index = board.lists.length - 1;
			let list;

			board.titleFormNode.style.display = 'none'
			titleInput.value = ''
			if (!title) {
				return
			}

			list = new List(board, title, index)
			board.lists.splice(index, 0, list)
			board.listsNode.insertBefore(list.node,
				board.lists[index + 1].node)
			board.lists[index + 1].titleNode.setAttribute('list-index', index + 1)
		}
	}
}

function deleteList() {
	const div = document.getElementById('newList');
	if(div.style.display !== 'none')  {
		div.style.display = 'none';
		document.getElementById('trello-list-title-input').value = '';
	}
}
