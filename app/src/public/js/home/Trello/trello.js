'use strict'
(function () {

	function Board(title) {
		let nextId = 0;

		this.title = title
		this.lists = []
		this.cards = {}

		this.node = document.createElement('div')
		this.titleNode = document.createElement('div')
		this.listsNode = document.createElement('div')

		this.node.id = 'board'
		this.titleNode.id = 'trello-title-board'
		this.listsNode.id = 'trello-canvas-board'

		this.titleFormNode = buildListTitleForm()
		this.titleNode.appendChild(document.createTextNode(this.title))

		this.getNextId = function () {
			return '_' + (nextId++).toString()
		}
	}

	Board.prototype.render = function () {
		this.lists.push(new List(this, 'Add a list...', 0, true))
		for (let i = 0; i < this.lists.length; ++i) {
			this.listsNode.appendChild(this.lists[i].node)
		}
		this.lists[this.lists.length - 1].node.appendChild(this.titleFormNode)
		this.lists[this.lists.length - 1].titleNode.onclick = addListTrello(this)
		this.node.appendChild(this.titleNode)
		this.node.appendChild(this.listsNode)
	}

	Board.prototype.registerCard = function (card, index) {
		this.cards[card.id] =
		{
			card: card
			, list: card.list
			, index: index
		}
	}

	Board.prototype.reregisterSubsequent = function (list, index, shift) {
		for (let i = index; i < list.cards.length; ++i) {
			this.registerCard(list.cards[i], i + shift)
		}
	}

	Board.prototype.unregisterCard = function (card) {
		delete this.cards[card.id]
	}


	document.getElementById('card-edit-close').onclick = cardEdit.close

	document.getElementById('card-edit-submit').onclick = cardEdit.submit

	document.getElementById('card-edit-delete').onclick = cardDeleteTrello.delete

	cardEdit.windowOverlay.onclick = cardEdit.close

	window.onkeydown = function (evt) {
		if (evt.keyCode === 27) {
			cardEdit.close()
		}
	}

	document.body.onload = function () {
		const title = 'Add New Board'
			, board = new Board(title);

		board.render()
		document.getElementById('container').appendChild(board.node)
		currentBoard = board
	}
}())
