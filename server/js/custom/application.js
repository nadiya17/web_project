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