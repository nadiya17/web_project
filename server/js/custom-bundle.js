'use strict';

var Application = {
    storageKey: 'trelloClone',

    // Сохраняем текущее состоние в локальное хранилище.
    save: function save() {
        var object = {
            columns: {
                idCounter: Column.idCounter,
                items: []
            },
            notes: {
                idCounter: Note.idCounter,
                items: []
            }
            // проходимся по всем колонкам и добавляем в массив columns.items
        };document.querySelectorAll('.column').forEach(function (columnElement) {
            var column = {
                id: parseInt(columnElement.getAttribute('data-column-id')),
                header: columnElement.querySelector('.column-header').textContent,
                noteIds: []
                // запоминаем все id заметок, которые принадлежат колонке
            };columnElement.querySelectorAll('.note').forEach(function (noteElement) {
                column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')));
            });
            // запоминаем колонки
            object.columns.items.push(column);
        });
        // Проходим по всем заметкам и добавляем в массив notes.items
        document.querySelectorAll('.note').forEach(function (noteElement) {
            var note = {
                id: parseInt(noteElement.getAttribute('data-note-id')),
                content: noteElement.textContent
            };

            object.notes.items.push(note);
        });
        // преобразуем object в json
        var json = JSON.stringify(object);
        // записываем json в localStorage
        localStorage.setItem(Application.storageKey, json);
    },


    // Восстанавливаем текущее состоние из локального хранилища.
    load: function load() {
        if (!localStorage.getItem(Application.storageKey)) {
            return;
        }

        var object = JSON.parse(localStorage.getItem(Application.storageKey));
        var getNoteById = function getNoteById(id) {
            return object.notes.items.find(function (note) {
                return note.id === id;
            });
        };
        // точка монтирования
        var columnsElement = document.querySelector('.columns');
        columnsElement.innerHTML = '';

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = object.columns.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref = _step.value;
                var id = _ref.id;
                var header = _ref.header;
                var noteIds = _ref.noteIds;

                var column = new Column(id);
                column.element.querySelector('.column-header').textContent = header;

                columnsElement.append(column.element);

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = noteIds[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var noteId = _step2.value;

                        var _getNoteById = getNoteById(noteId),
                            _id = _getNoteById.id,
                            content = _getNoteById.content;

                        var note = new Note(_id, content);
                        column.add(note);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
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
};

// const Application = {
// 	// сохраняем состояние приложения
// 	save () {
// 		const object = {
// 			columns: {
// 				idCounter: Column.idCounter,
// 				items: []
// 			},
// 			notes: {
// 				idCounter: Note.idCounter,
// 				items: []
// 			}
// 		}

// 		// проходимся по всем колонкам и добавляем в массив columns.items
// 		document
// 			.querySelectorAll('.column')
// 			.forEach(columnElement => {
// 				const column = {
// 					title: columnElement.querySelector('.column-header').textContent,
// 					id: parseInt(columnElement.getAttribute('data-column-id')),
// 					noteIds: []
// 				}

// 				// запоминаем все id заметок, которые принадлежат колонке
// 				columnElement
// 					.querySelectorAll('.note')
// 					.forEach(noteElement => {
// 						column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
// 					})

// 				// запоминаем колонки
// 				object.columns.items.push(column)
// 			})

// 		// Проходим по всем заметкам и добавляем в массив notes.items
// 		document
// 			.querySelectorAll('.note')
// 			.forEach(noteElement => {
// 				const note = {
// 					id: parseInt(noteElement.getAttribute('data-note-id')),
// 					content: noteElement.textContent
// 				}

// 				object.notes.items.push(note)
// 			})

// 		// преобразуем object в json
// 		const json = JSON.stringify(object)

// 		// записываем json в localStorage
// 		localStorage.setItem('trello', json)

// 		return object
// 	},

// 	// Загружаем состояние приложения
// 	load () {

// 		if (!localStorage.getItem('trello')) {
// 			return
// 		}

// 		// точка монтирования
// 		const mountePoint = document.querySelector('.columns')
// 		mountePoint.innerHTML = ''

// 		const object = JSON.parse(localStorage.getItem('trello'))

// 		// забираем из памяти id заметок и колонок
// 		Column.idCounter = object.columns.idCounter
// 		Note.idCounter = object.notes.idCounter

// 		// пробегаемся по заметкам, и если id совпадает с искомым, заметка будет возвращена
// 		const getNoteById = id => object.notes.items.find(note => note.id === id)

// 		// пробегаемся по распарсенному объекту
// 		for (const { id, noteIds, title } of object.columns.items) {
// 			const column = new Column(id)

// 			mountePoint.append(column.element)
// 			// вставляем заголовок
// 			column.element.querySelector('.column-header').textContent = title

// 			// пробегаемся по записям
// 			for (const noteId of noteIds) {

// 				const {id, content} = getNoteById(noteId)

// 				const note = new Note(id, content)
// 				// Вставляем записи в колонки
// 				column.add(note)
// 			}
// 		}

// 	}

// 	// Удаление
// 	// delete () {

// 	// }
// }
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
'use strict';

$(document).ready(function () {
  /* Scroller */
  $(document).on('click', 'a[href^="#anchor"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
  });
});

// choose only one choice in checkbox

$('#group input:checkbox').click(function () {
  if ($(this).is(':checked')) {
    $('#group input:checkbox').not(this).prop('checked', false);
  }
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Note = function () {
    function Note() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        _classCallCheck(this, Note);

        var instance = this;

        var element = this.element = document.createElement('div');

        element.classList.add('note');
        element.setAttribute('draggable', 'true');
        element.setAttribute('data-note-id', id ? id : Note.idCounter++);
        element.textContent = content;
        // прослушка на заметке dblclick для редактирования и blur для прекращения
        element.addEventListener('dblclick', function (event) {
            element.removeAttribute('draggable');
            // ищем колонку по родительским элементам использую геттер как поле экземпляра класса
            instance.column.removeAttribute('draggable');
            element.setAttribute('contenteditable', 'true');
            element.focus();
        });

        element.addEventListener('blur', function (event) {
            element.removeAttribute('contenteditable');
            element.setAttribute('draggable', 'true');
            instance.column.setAttribute('draggable', 'true');
            // если при потере фокуса у карточки нет контента, то она удаляется
            if (!element.textContent.trim().length) {
                element.remove();
            }
            // создали заметку - сохранили
            Application.save();
        });
        // привязываем this через bind чтобы this ссылался на экземпляр класса, а не на DOM элемент
        element.addEventListener('dragstart', this.dragstart.bind(this));
        element.addEventListener('dragend', this.dragend.bind(this));
        element.addEventListener('dragenter', this.dragenter.bind(this));
        element.addEventListener('dragover', this.dragover.bind(this));
        element.addEventListener('dragleave', this.dragleave.bind(this));
        element.addEventListener('drop', this.drop.bind(this));
    }
    // геттер можно использовать как поле объекта при вызове


    _createClass(Note, [{
        key: 'dragstart',

        // начало перетаскивания элемента
        value: function dragstart(event) {
            event.stopPropagation();

            Note.dragged = this.element;
            this.element.classList.add('dragged');
        }
        // конец перетаскивания элемента

    }, {
        key: 'dragend',
        value: function dragend(event) {
            event.stopPropagation();

            Note.dragged = null;
            this.element.classList.remove('dragged');

            document.querySelectorAll('.note').forEach(function (x) {
                return x.classList.remove('under');
            });
            // перетащили карточку - сохранили
            Application.save();
        }
        // заносим перетаскиваемый элемент над другим элементом

    }, {
        key: 'dragenter',
        value: function dragenter(event) {
            // Если перетаскиваем не карточку, 
            // либо если карточку перетаскиваем над той же самой карточкой
            event.stopPropagation();

            if (!Note.dragged || this.element === Note.dragged) {
                return;
            }

            this.element.classList.add('under');
        }
    }, {
        key: 'dragover',
        value: function dragover(event) {
            event.preventDefault();

            if (!Note.dragged || this.element === Note.dragged) {
                return;
            }
        }
        // выносим перетаскиваемый элемент из другого элемента

    }, {
        key: 'dragleave',
        value: function dragleave(event) {
            event.stopPropagation();

            if (!Note.dragged || this.element === Note.dragged) {
                return;
            }

            this.element.classList.remove('under');
        }
        // отпускаем мышку над этим элементом

    }, {
        key: 'drop',
        value: function drop(event) {
            if (!Note.dragged || this.element === Note.dragged) {
                return;
            }
            // если переносим в этот же столбец - меняем порядок карточек
            if (this.element.parentElement === Note.dragged.parentElement) {
                // находим все элементы в столбце и превращаем в массив
                var notes = Array.from(this.element.parentElement.querySelectorAll('.note'));
                var indexA = notes.indexOf(this.element);
                var indexB = notes.indexOf(Note.dragged);
                // меняем порядок соседних карточек в зависимости от перетаскивания 
                if (indexA < indexB) {
                    this.element.parentElement.insertBefore(Note.dragged, this.element);
                } else {
                    this.element.parentElement.insertBefore(Note.dragged, this.element.nextElementSibling);
                }
            }
            // если другой столбец, то вставляем перед той карточкой, над которой дропнули
            else {
                    this.element.parentElement.insertBefore(Note.dragged, this.element);
                }
        }
    }, {
        key: 'column',
        get: function get() {
            return this.element.closest('.column');
        }
    }]);

    return Note;
}();
// записываем статические поля
// id для следующих заметок


Note.idCounter = 8;
// элемент, который перетаскиваем
Note.dragged = null;
'use strict';

Application.load();

document.querySelector('[data-action-addColumn]').addEventListener('click', function (event) {
    document.querySelector('.columns').append(new Column().element);
    Application.save();
});
// const Trash = {
// 	process () {
// 		const trashElement = document.querySelector('[data-action-delete]')

// 		trashElement.addEventListener('dragover', Trash.dragover)
// 		trashElement.addEventListener('drop', Trash.drop)
// 	},

// 	dragover (event) {
// 		//обязательно прописать данную строчку чтобы работал drop()
// 		event.preventDefault()
// 	},

// 	drop () {
// 		// удаляем либо заметку, либо колонку
// 		Trash.delete(Note.dragged || Column.dragged)
// 		Application.save()
// 	},

// 	delete (elem) {
// 		// удаляем элемент разметки
// 		elem.parentNode.removeChild(elem)
// 	}
// }
"use strict";