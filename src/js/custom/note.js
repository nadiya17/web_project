class Note {
    constructor(id = null, content = '') {
        const instance = this

        const element = this.element = document.createElement('div')

        element.classList.add('note')
        element.setAttribute('draggable', 'true')
        element.setAttribute('data-note-id', id ? id : Note.idCounter++)
        element.textContent = content
        // прослушка на заметке dblclick для редактирования и blur для прекращения
        element.addEventListener('dblclick', function (event) {
            element.removeAttribute('draggable')
            // ищем колонку по родительским элементам использую геттер как поле экземпляра класса
            instance.column.removeAttribute('draggable')
            element.setAttribute('contenteditable', 'true')
            element.focus()
        })

        element.addEventListener('blur', function (event) {
            element.removeAttribute('contenteditable')
            element.setAttribute('draggable', 'true')
            instance.column.setAttribute('draggable', 'true')
            // если при потере фокуса у карточки нет контента, то она удаляется
            if (!element.textContent.trim().length) {
                element.remove()
            }
            // создали заметку - сохранили
            Application.save()
        })
// привязываем this через bind чтобы this ссылался на экземпляр класса, а не на DOM элемент
        element.addEventListener('dragstart', this.dragstart.bind(this))
        element.addEventListener('dragend', this.dragend.bind(this))
        element.addEventListener('dragenter', this.dragenter.bind(this))
        element.addEventListener('dragover', this.dragover.bind(this))
        element.addEventListener('dragleave', this.dragleave.bind(this))
        element.addEventListener('drop', this.drop.bind(this))
    }
// геттер можно использовать как поле объекта при вызове
    get column() {
        return this.element.closest('.column')
    }
// начало перетаскивания элемента
    dragstart(event) {
        event.stopPropagation()

        Note.dragged = this.element
        this.element.classList.add('dragged')
    }
// конец перетаскивания элемента
    dragend(event) {
        event.stopPropagation()

        Note.dragged = null
        this.element.classList.remove('dragged')

        document
            .querySelectorAll('.note')
            .forEach(x => x.classList.remove('under'))
        // перетащили карточку - сохранили
        Application.save()
    }
// заносим перетаскиваемый элемент над другим элементом
    dragenter(event) {
        // Если перетаскиваем не карточку, 
 		// либо если карточку перетаскиваем над той же самой карточкой
        event.stopPropagation()

        if (!Note.dragged || this.element === Note.dragged) {
            return
        }

        this.element.classList.add('under')
    }

    dragover(event) {
        event.preventDefault()

        if (!Note.dragged || this.element === Note.dragged) {
            return
        }
    }
// выносим перетаскиваемый элемент из другого элемента
    dragleave(event) {
        event.stopPropagation()

        if (!Note.dragged || this.element === Note.dragged) {
            return
        }

        this.element.classList.remove('under')
    }
// отпускаем мышку над этим элементом
    drop(event) {
        if (!Note.dragged || this.element === Note.dragged) {
            return
        }
        // если переносим в этот же столбец - меняем порядок карточек
        if (this.element.parentElement === Note.dragged.parentElement) {
            // находим все элементы в столбце и превращаем в массив
            const notes = Array.from(this.element.parentElement.querySelectorAll('.note'))
            const indexA = notes.indexOf(this.element)
            const indexB = notes.indexOf(Note.dragged)
            // меняем порядок соседних карточек в зависимости от перетаскивания 
            if (indexA < indexB) {
                this.element.parentElement.insertBefore(Note.dragged, this.element)
            } else {
                this.element.parentElement.insertBefore(Note.dragged, this.element.nextElementSibling)
            }
        } 
        // если другой столбец, то вставляем перед той карточкой, над которой дропнули
        else {
            this.element.parentElement.insertBefore(Note.dragged, this.element)
        }
    }
}
// записываем статические поля
// id для следующих заметок
Note.idCounter = 8
// элемент, который перетаскиваем
Note.dragged = null
