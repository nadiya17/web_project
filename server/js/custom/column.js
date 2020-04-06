'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Column = function () {
    function Column() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classCallCheck(this, Column);

        // создаём константу чтобы использовать её в классической функции с собственным this
        var instance = this;
        // список всех дочерних заметок
        this.notes = [];

        var element = this.element = document.createElement('div');
        element.classList.add('column');
        element.setAttribute('draggable', 'true');
        element.setAttribute('data-column-id', id ? id : Column.idCounter++);
        element.innerHTML = '<p class="column-header">\u0412 \u043F\u043B\u0430\u043D\u0435</p>\n<div data-notes></div>\n<p class="column-footer">\n    <span data-action-addNote class="action">+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443</span>\n</p>';
        // прослушка кнопки добавления карточки
        var spanAction_addNote = element.querySelector('[data-action-addNote]');

        spanAction_addNote.addEventListener('click', function (event) {
            // создаём элемент заметку
            var note = new Note();
            // добавляем элемент в список и в разметку
            instance.add(note);

            element.querySelector('[data-notes]').append(note.element);
            // при создании карточки сразу идёт её редактирование
            note.element.setAttribute('contenteditable', 'true');
            note.element.focus();
        });
        // редактирование заголовка столбца
        var headerElement = element.querySelector('.column-header');
        headerElement.addEventListener('dblclick', function (event) {
            element.removeAttribute('draggable');
            headerElement.setAttribute('contenteditable', 'true');
            headerElement.focus();
        });

        headerElement.addEventListener('blur', function (event) {
            headerElement.removeAttribute('contenteditable');
            element.setAttribute('draggable', 'true');
            // изменили заголовок - сохранили
            Application.save();
        });
        // Прослушка перетаскивания колонки
        element.addEventListener('dragstart', this.dragstart.bind(this));
        element.addEventListener('dragend', this.dragend.bind(this));
        // Слушаем над чем тащим
        element.addEventListener('dragover', this.dragover.bind(this));
        // Слушаем куда бросаем
        element.addEventListener('drop', this.drop.bind(this));
    }

    _createClass(Column, [{
        key: 'add',
        value: function add() {
            for (var _len = arguments.length, notes = Array(_len), _key = 0; _key < _len; _key++) {
                notes[_key] = arguments[_key];
            }

            // проходимся по всем заметкам
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = notes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var note = _step.value;

                    // если они отсутствуют в списке, то добавим
                    if (!this.notes.includes(note)) {
                        this.notes.push(note);
                        // также добавляем в разметку
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
            // запоминаем перетаскиваемый элемент
            event.stopPropagation();

            Column.dragged = this.element;
            this.element.classList.add('dragged');

            document.querySelectorAll('.note').forEach(function (noteElement) {
                return noteElement.removeAttribute('draggable');
            });
        }
    }, {
        key: 'dragend',
        value: function dragend(event) {
            // забываем перетаскиваемый элемент
            this.element.classList.remove('dragged');
            Column.dragged = null;
            Column.dropped = null;

            document.querySelectorAll('.note').forEach(function (noteElement) {
                return noteElement.setAttribute('draggable', 'true');
            });
            // убираем класс у всех когда бросили колонку
            document.querySelectorAll('.column').forEach(function (columnElement) {
                return columnElement.classList.remove('under');
            });
            // перетащили колонку - сохранили
            Application.save();
        }
    }, {
        key: 'dragover',
        value: function dragover(event) {
            // отменяем стандартную обработку при перетаскивании карточки в пустую колонку
            event.preventDefault();
            event.stopPropagation();
            // Если перетаскиваем колонку над собой
            if (Column.dragged === this.element) {
                if (Column.dropped) {
                    Column.dropped.classList.remove('under');
                }

                Column.dropped = null;
            }

            if (!Column.dragged || this.element === Column.dragged) {
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
        value: function drop(event) {
            event.stopPropagation();
            // если бросаем карточку
            if (Note.dragged) {
                return this.element.querySelector('[data-notes]').append(Note.dragged);
            }
            // если бросаем колонку
            else if (Column.dragged) {
                    var columnsElement = document.querySelector('.columns');
                    var children = Array.from(columnsElement.children);
                    var indexA = children.indexOf(this.element);
                    var indexB = children.indexOf(Column.dragged);
                    // меняем порядок соседних колонок в зависимости от перетаскивания 
                    if (indexA < indexB) {
                        columnsElement.insertBefore(Column.dragged, this.element);
                    } else {
                        columnsElement.insertBefore(Column.dragged, this.element.nextElementSibling);
                    }
                    // Если тащим над пустым местом - снимаем класс UNDER у всех колонок
                    document.querySelectorAll('.column').forEach(function (columnElement) {
                        return columnElement.classList.remove('under');
                    });
                }
        }
    }]);

    return Column;
}();
// id для следующих клонок


Column.idCounter = 4;
// перетаскиваемая колонка
Column.dragged = null;
// колонка, над которой бросили
Column.dropped = null;