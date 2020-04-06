class Column {
    constructor(id = null) {
        // создаём константу чтобы использовать её в классической функции с собственным this
        const instance = this
        // список всех дочерних заметок
        this.notes = []

        const element = this.element = document.createElement('div')
        element.classList.add('column')
        element.setAttribute('draggable', 'true')
        element.setAttribute('data-column-id', id ? id : Column.idCounter++)
        element.innerHTML =
            `<p class="column-header">В плане</p>
<button class="remove-column" data-action-addRemove>X</button>
<div data-notes></div>
<p class="column-footer">
    <span data-action-addNote class="action">+ Добавить карточку</span>
</p>`
        // прослушка кнопки добавления карточки
        const spanAction_addNote = element.querySelector('[data-action-addNote]')

        spanAction_addNote.addEventListener('click', function (event) {
            // создаём элемент заметку
            const note = new Note()
            // добавляем элемент в список и в разметку
            instance.add(note)

            element.querySelector('[data-notes]').append(note.element)
            // при создании карточки сразу идёт её редактирование
            note.element.setAttribute('contenteditable', 'true')
            note.element.focus()
        })


        const spanAction_addRemove = element.querySelector('[data-action-addRemove]')

        spanAction_addRemove.addEventListener('click', function (event) {
            element.remove();
            Application.save();
        })

        // редактирование заголовка столбца
        const headerElement = element.querySelector('.column-header')
        headerElement.addEventListener('dblclick', function (event) {
            element.removeAttribute('draggable')
            headerElement.setAttribute('contenteditable', 'true')
            headerElement.focus()
        })

        headerElement.addEventListener('blur', function (event) {
            headerElement.removeAttribute('contenteditable')
            element.setAttribute('draggable', 'true')
            // изменили заголовок - сохранили
            Application.save()
        })
        // Прослушка перетаскивания колонки
        element.addEventListener('dragstart', this.dragstart.bind(this))
        element.addEventListener('dragend', this.dragend.bind(this))
        // Слушаем над чем тащим
        element.addEventListener('dragover', this.dragover.bind(this))
        // Слушаем куда бросаем
        element.addEventListener('drop', this.drop.bind(this))
    }

    add(...notes) {
        // проходимся по всем заметкам
        for (const note of notes) {
            // если они отсутствуют в списке, то добавим
            if (!this.notes.includes(note)) {
                this.notes.push(note)
                // также добавляем в разметку
                this.element.querySelector('[data-notes]').append(note.element)
            }
        }
    }

    dragstart(event) {
        // запоминаем перетаскиваемый элемент
        event.stopPropagation()

        Column.dragged = this.element
        this.element.classList.add('dragged')

        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.removeAttribute('draggable'))
    }

    dragend(event) {
        // забываем перетаскиваемый элемент
        this.element.classList.remove('dragged')
        Column.dragged = null
        Column.dropped = null

        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.setAttribute('draggable', 'true'))
        // убираем класс у всех когда бросили колонку
        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))
        // перетащили колонку - сохранили
        Application.save()
    }

    dragover(event) {
        // отменяем стандартную обработку при перетаскивании карточки в пустую колонку
        event.preventDefault()
        event.stopPropagation()
        // Если перетаскиваем колонку над собой
        if (Column.dragged === this.element) {
            if (Column.dropped) {
                Column.dropped.classList.remove('under')
            }

            Column.dropped = null
        }

        if (!Column.dragged || this.element === Column.dragged) {
            return
        }

        Column.dropped = this.element

        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))

        this.element.classList.add('under')
    }

    drop(event) {
        event.stopPropagation()
        // если бросаем карточку
        if (Note.dragged) {
            return this.element.querySelector('[data-notes]').append(Note.dragged)
        }
        // если бросаем колонку
        else if (Column.dragged) {
            const columnsElement = document.querySelector('.columns')
            const children = Array.from(columnsElement.children)
            const indexA = children.indexOf(this.element)
            const indexB = children.indexOf(Column.dragged)
            // меняем порядок соседних колонок в зависимости от перетаскивания 
            if (indexA < indexB) {
                columnsElement.insertBefore(Column.dragged, this.element)
            } else {
                columnsElement.insertBefore(Column.dragged, this.element.nextElementSibling)
            }
            // Если тащим над пустым местом - снимаем класс UNDER у всех колонок
            document
                .querySelectorAll('.column')
                .forEach(columnElement => columnElement.classList.remove('under'))
        }
    }
}
// id для следующих клонок
Column.idCounter = 4
// перетаскиваемая колонка
Column.dragged = null
// колонка, над которой бросили
Column.dropped = null