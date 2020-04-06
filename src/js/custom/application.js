const Application = {
    storageKey: 'trelloClone',

    // Сохраняем текущее состоние в локальное хранилище.
    save() {
        const object = {
            columns: {
                idCounter: Column.idCounter,
                items: []
            },
            notes: {
                idCounter: Note.idCounter,
                items: []
            }
        }
// проходимся по всем колонкам и добавляем в массив columns.items
        document
            .querySelectorAll('.column')
            .forEach(columnElement => {
                const column = {
                    id: parseInt(columnElement.getAttribute('data-column-id')),
                    header: columnElement.querySelector('.column-header').textContent,
                    noteIds: []
                }
// запоминаем все id заметок, которые принадлежат колонке
                columnElement
                    .querySelectorAll('.note')
                    .forEach(noteElement => {
                        column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
                    })
// запоминаем колонки
                object.columns.items.push(column)
            })
// Проходим по всем заметкам и добавляем в массив notes.items
        document
            .querySelectorAll('.note')
            .forEach(noteElement => {
                const note = {
                    id: parseInt(noteElement.getAttribute('data-note-id')),
                    content: noteElement.textContent
                }

                object.notes.items.push(note)
            })
// преобразуем object в json
        const json = JSON.stringify(object)
        // записываем json в localStorage
        localStorage.setItem(Application.storageKey, json)
    },

    // Восстанавливаем текущее состоние из локального хранилища.
    load() {
        if (!localStorage.getItem(Application.storageKey)) {
            return
        }

        const object = JSON.parse(localStorage.getItem(Application.storageKey))
        const getNoteById = id => object.notes.items.find(note => note.id === id)
// точка монтирования
        const columnsElement = document.querySelector('.columns')
        columnsElement.innerHTML = ''

        for (const {id, header, noteIds} of object.columns.items) {
            const column = new Column(id)
            column.element.querySelector('.column-header').textContent = header

            columnsElement.append(column.element)

            for (const noteId of noteIds) {
                const {id, content} = getNoteById(noteId)
                const note = new Note(id, content)
                column.add(note)
            }
        }
    }
}


























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