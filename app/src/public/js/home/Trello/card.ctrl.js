const dragTracker =
{
	id: undefined,
	list: undefined
};

function buildCardNode() {
	const node = document.createElement('div');
	node.draggable = true
	node.innerHTML =
		'<div class="card-title"></div>';
	return node
}

function Card(list, title) {
	this.id = list.board.getNextId()
	this.list = list
	this.title = title
	this.node = buildCardNode()
	this.titleNode = this.node.getElementsByClassName('card-title')[0]

	this.node.classList.add('card')
	this.node.setAttribute('card-id', this.id)
	this.titleNode.appendChild(document.createTextNode(this.title))

	this.node.ondragstart = (function (id) {
		return function (evt) {
			dragTracker.id = id
			evt.dataTransfer.effectAllowed = 'move'
		}
	}(this.id))

	this.node.ondragover = function (evt) {
		if (dragTracker.id) {
			evt.preventDefault()
		}
	}

	this.node.ondrop = (function (board) {
		return function (evt) {
			const id = dragTracker.id
				, targetId = this.getAttribute('card-id')
				, source = board.cards[id]
				, target = board.cards[targetId]

			if (id === targetId) {
				return
			}

			source.list.cardsNode.removeChild(source.card.node)
			target.list.cardsNode.insertBefore(source.card.node, target.card.node)

			board.reregisterSubsequent(source.list, source.index + 1, -1)
			source.list.cards.splice(source.index, 1)

			board.reregisterSubsequent(target.list, target.index + 1, 1)
			target.list.cards.splice(target.index + 1, 0, source.card)

			source.card.list = target.list
			board.registerCard(source.card, target.index + 1)
			evt.preventDefault()
		}
	}(list.board))

	this.node.ondragend = function () {
		dragTracker.id = undefined
	}

	this.node.onclick = (function (card) {
		return function () {
			cardEdit.card = card
			cardEdit.titleNode.value = card.title;
			cardEdit.show()
		}
	}(this))
}

 function buildCardTitleForm() {
	const node = document.createElement('form');
	node.innerHTML =
		'<div class="newitem-title-wrapper" id="newCard">' +
			'<textarea class="trello-new-card-title-input" type="text"></textarea>' +
			'<input class="trello-new-card-title-submit" type="submit" value="Add">' +
			// '<span id="trello-list-title-exit" onclick="deleteCard()">&#10060;</span>'+
		'</div>'
	node.style.display = 'none'
	return node
}

// function deleteCard() {
// 	const div = document.getElementById('newCard');
// 	if(div.style.display !== 'none')  {
// 		div.style.display = 'none';
// 	}
// }

 function addCardTrello(list) {
	return function deleteCard() {
		const titleTextarea = list.titleFormNode
			.getElementsByClassName('trello-new-card-title-input')[0]
		list.titleFormNode.getElementsByClassName('trello-new-card-title-submit')[0]
			.onclick = titleSubmit

		const div = document.getElementById('newCard')

		if(list.titleFormNode.style.display === 'none' || div.style.display === 'none') {
			div.style.display = 'block';
			list.titleFormNode.style.display = 'block';
		} else {
			list.titleFormNode.style.display = 'none';
			document.getElementsByClassName('trello-new-card-title-input')[0].value = '';
		}

		titleTextarea.focus();

		function titleSubmit(evt) {
			evt.preventDefault()
			const title = titleTextarea.value.trim();
			let card;

			list.titleFormNode.style.display = 'none';
			titleTextarea.value = '';
			if (!title) {
				return
			}

			card = new Card(list, title);
			list.board.registerCard(card, list.cards.length);
			list.cardsNode.insertBefore(card.node, list.cards[list.cards.length - 1].node);
			
		}
	}
}

const cardDeleteTrello = {};
let currentBoard;
 
 cardDeleteTrello.delete = function () {
	const index = currentBoard.cards[cardEdit.card.id].index;
 
     currentBoard.unregisterCard(cardEdit.card)
     currentBoard.reregisterSubsequent(cardEdit.card.list, index + 1, -1)
 
     cardEdit.card.list.cardsNode.removeChild(cardEdit.card.node)
     cardEdit.card.list.cards.splice(index, 1)
 
     cardEdit.close()
     cardEdit.card = undefined
 }
 
 const cardEdit =
{ node: document.getElementById('card-edit')
	, windowOverlay: document.getElementById('container-main')
	, titleNode: document.getElementById('card-edit-title')
	, card: undefined
};

cardEdit.clearInputs = function () {
	cardEdit.titleNode.value = '';
}

cardEdit.close = function() {
	cardEdit.card = undefined
	cardEdit.clearInputs()
	cardEdit.node.style.display = 'none'
	cardEdit.windowOverlay.style.display = 'none'
}

cardEdit.show = function () {
	cardEdit.windowOverlay.style.display = 'block'
	cardEdit.node.style.display = 'block'
}

cardEdit.submit = function (evt) {
	evt.preventDefault()
	const title = cardEdit.titleNode.value.trim();

	if (title) {
		cardEdit.card.title = title
		cardEdit.card.titleNode.replaceChild(document.createTextNode(title),
			cardEdit.card.titleNode.childNodes[0])
	}
	cardEdit.close()
}

