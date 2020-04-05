'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Column = function () {
    function Column() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, Column);

        var instance = this;
        this.notes = [];
        var element = this.element = document.createElement('div');
        element.classList.add('column');
        element.setAttribute('draggable', 'true');

        if (id) {
            element.setAttribute('data-column-id', id);
        } else {
            element.setAttribute('data-column-id', Column.idCounter);
            Column.idCounter++;
        }

        element.innerHTML = '\n        <p class="column-header">\u0412 \u043F\u043B\u0430\u043D\u0435</p>\n                        <div data-notes>\n                        \n                        </div>\n                        <p class="column-footer">\n                            <span data-action-addNote class="action">+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443</span>\n                        </p>\n        ';
        //находим кнопку добавления заметок
        var spanAction_addNote = element.querySelector('[data-action-addNote]');

        spanAction_addNote.addEventListener('click', function (event) {
            //при сробатывании события создаем новую заметку
            var note = new Note();
            instance.add(note);
            //позволяет сразу вводить данные в новую заметку
            note.element.setAttribute('contenteditable', 'true');
            note.element.focus();
        });
        // при двойном клике редактирует титул колонки
        var headerElement = element.querySelector('.column-header');
        headerElement.addEventListener('dblclick', function (event) {
            headerElement.setAttribute('contenteditable', true);
            headerElement.focus();
        });

        headerElement.addEventListener('blur', function (event) {
            headerElement.removeAttribute('contenteditable', true);
        });

        element.addEventListener('dragstart', this.dragstart.bind(this));
        element.addEventListener('dragend', this.dragend.bind(this));

        element.addEventListener('dragover', this.dragover.bind(this));

        element.addEventListener('drop', this.drop.bind(this));
    }

    _createClass(Column, [{
        key: 'add',
        value: function add() {
            for (var _len = arguments.length, notes = Array(_len), _key = 0; _key < _len; _key++) {
                notes[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = notes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var note = _step.value;

                    if (!this.notes.includes(note)) {
                        this.notes.push(note);

                        this.element.querySelector('[data-notes]').append(note.element);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'dragstart',
        value: function dragstart(event) {
            Column.dragged = this.element;
            Column.dragged.classList.add('dragged');

            event.stopPropagation();

            document.querySelectorAll('.note').forEach(function (noteElement) {
                return noteElement.removeAttribute('draggable');
            });
        }
    }, {
        key: 'dragend',
        value: function dragend(event) {
            Column.dragged.classList.remove('dragged');
            Column.dragged = null;
            Column.dropped = null;

            document.querySelectorAll('.note').forEach(function (noteElement) {
                return noteElement.setAttribute('draggable', true);
            });

            document.querySelectorAll('.column').forEach(function (columnElement) {
                return columnElement.classList.remove('under');
            });
            Application.save();
        }
    }, {
        key: 'dragover',
        value: function dragover(event) {
            event.preventDefault();
            event.stopPropagation();

            if (Column.dragged === this.element) {
                if (Column.dropped) {
                    Column.dropped.classList.remove('under');
                }
                Column.dropped = null;
            }

            if (!Column.dragged || Column.dragged === this.element) {
                return;
            }

            Column.dropped = this.element;
            document.querySelectorAll('.column').forEach(function (columnElement) {
                return columnElement.classList.remove('under');
            });
            this.element.classList.add('under');
        }
    }, {
        key: 'drop',
        value: function drop() {
            if (Note.dragged) {
                return this.element.querySelector('[data-notes]').append(Note.dragged);
            } else if (Column.dragged) {
                var children = Array.from(document.querySelector('.columns').children);
                var indexA = children.indexOf(this.element);
                var indexB = children.indexOf(Column.dragged);

                if (indexA < indexB) {
                    document.querySelector('.columns').insertBefore(Column.dragged, this.element);
                } else {
                    document.querySelector('.columns').insertBefore(Column.dragged, this.element.nextElementSibling);
                }

                document.querySelectorAll('.column').forEach(function (columnElement) {
                    return columnElement.classList.remove('under');
                });
            }
        }
    }]);

    return Column;
}();

//счетчик для айди колонок


Column.idCounter = 4;
Column.dragged = null;
Column.dropped = null;