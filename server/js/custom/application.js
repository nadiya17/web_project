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