'use strict';

var Application = {
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
        };

        document.querySelectorAll('.column').forEach(function (columnElement) {
            var column = {
                id: parseInt(columnElement.getAttribute('data-column-id')),
                noteIds: []
            };
            columnElement.querySelectorAll('.note').forEach(function (noteElement) {
                column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')));
            });

            object.columns.items.push(column);
        });

        document.querySelectorAll('.note').forEach(function (noteElement) {
            var note = {
                id: parseInt(noteElement.getAttribute('data-note-id')),
                content: noteElement.textContent
            };

            object.notes.items.push(note);
        });

        var json = JSON.stringify(object);

        localStorage.setItem('trello', json);
    },
    load: function load() {
        if (!localStorage.getItem('trello')) {
            return;
        }

        var mountePoint = document.querySelector('.columns');
        mountePoint.innerHTML = '';

        var object = JSON.parse(localStorage.getItem('trello'));
        var getNoteById = function getNoteById(id) {
            return object.notes.items.find(function (note) {
                return note.id === id;
            });
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = object.columns.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref = _step.value;
                var id = _ref.id;
                var noteIds = _ref.noteIds;

                var column = new Column(id);

                mountePoint.append(column.element);

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

//реализуем добавление заметок в колонки

var Note = function () {
    function Note() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        _classCallCheck(this, Note);

        var instance = this;
        var element = this.element = document.createElement('div');

        element.classList.add('note');
        element.setAttribute('draggable', 'true');
        element.textContent = content;

        if (id) {
            element.setAttribute('data-note-id', id);
        } else {
            element.setAttribute('data-note-id', Note.idCounter);
            Note.idCounter++;
        }

        element.addEventListener('dblclick', function (event) {

            element.setAttribute('contenteditable', 'true');
            element.removeAttribute('draggable');
            instance.column.removeAttribute('draggable');
            element.focus();
        });
        //это событие возникает когда элемент теряет фокус и когда он теряет фокус я просто буду убирать в нем  атрибут 'contenteditable'
        element.addEventListener('blur', function (event) {
            element.removeAttribute('contenteditable');
            element.setAttribute('draggable', 'true');
            instance.column.setAttribute('draggable', 'true');

            if (!element.textContent.trim().length) {
                element.remove();
            }

            Application.save();
        });

        element.addEventListener('dragstart', this.dragstart.bind(this));
        element.addEventListener('dragend', this.dragend.bind(this));
        element.addEventListener('dragenter', this.dragenter.bind(this));
        element.addEventListener('dragover', this.dragover.bind(this));
        element.addEventListener('dragleave', this.dragleave.bind(this));
        element.addEventListener('drop', this.drop.bind(this));
    }

    _createClass(Note, [{
        key: 'dragstart',
        value: function dragstart(event) {
            Note.dragged = this.element;
            this.element.classList.add('dragged');
            event.stopPropagation();
        }
    }, {
        key: 'dragend',
        value: function dragend(event) {
            event.stopPropagation();
            Note.dragged = null;
            this.element.classList.remove('dragged');

            document.querySelectorAll('.note').forEach(function (x) {
                return x.classList.remove('under');
            });

            Application.save();
        }
    }, {
        key: 'dragenter',
        value: function dragenter(event) {
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
            //для того чтобы событие не всплывало
        }
    }, {
        key: 'dragleave',
        value: function dragleave(event) {
            event.stopPropagation();
            if (!Note.dragged || this.element === Note.dragged) {
                return;
            }
            this.element.classList.remove('under');
        }
    }, {
        key: 'drop',
        value: function drop(event) {
            event.stopPropagation();
            if (!Note.dragged || this.element === Note.dragged) {
                return;
            }

            if (this.element.parentElement === Note.dragged.parentElement) {
                var note = Array.from(this.element.parentElement.querySelectorAll('.note'));
                var indexA = note.indexOf(this.element);
                var indexB = note.indexOf(Note.dragged);

                if (indexA < indexB) {
                    this.element.parentElement.insertBefore(Note.dragged, this.element);
                } else {
                    this.element.parentElement.insertBefore(Note.dragged, this.element.nextElementSibling);
                }
            } else {
                this.element.parentElement.insertBefore(Note.dragged, this.element);
            }
        }
    }, {
        key: 'column',
        get: function get() {
            this.element.closest('.column');
        }
    }]);

    return Note;
}();

Note.idCounter = 8;
Note.dragged = null;
'use strict';

Application.load();

//реализуем добавление заметок в колонки
//находим все колонки

//создание колонки
//находим кнопку для добавления колонки
document.querySelector('[data-action-addColumn]')
//вешаем событие
.addEventListener('click', function (event) {
    //создаем колонку
    var column = new Column();
    document.querySelector('.columns').append(column.element);

    Application.save();
});