'use strict';

import DOMHelpers from '../helpers/DOMHelpers.js';
import Template from '../Template.js';
import Modal from '../modal.js';

const { createElement, on } = DOMHelpers();
const { open } = Modal();
const template = Template();

const Board = () => {

    const board = (obj) => {
        const $board = createElement('div', '.board');
        $board.style.background = obj.bg;
        $board.insertAdjacentHTML('afterbegin', `
            <div class="board-title">${obj.title}</div>
            <div>${obj.date}</div>
            <div>${obj.time}</div>
        `);
        return $board;
    };

    const section = () => {
        const $section = createElement('div', '.boards-section');
        const $title = createElement('div', '.boards-section-header');
        $title.insertAdjacentHTML('afterbegin', template.board.section.header);

        $section.append($title, boards());

        return $section;
    }

    const add = () => {
        const $add = createElement('div', '.create-new-board');
        $add.insertAdjacentHTML('afterbegin', template.board.add);

        on($add, 'click', function () {
            open();
        }, false);

        return $add;
    };

    function boards() {
        const $boards = createElement('div', '.boards');

        $boards.appendChild(add());

        return $boards;
    };

    return {
        section,
        board
    };
};

export default Board;