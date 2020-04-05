Application.load()

//реализуем добавление заметок в колонки
//находим все колонки

//создание колонки
//находим кнопку для добавления колонки
document
.querySelector('[data-action-addColumn]')
//вешаем событие
.addEventListener('click', function(event) {
    //создаем колонку
    const column = new Column
    document.querySelector('.columns').append(column.element)

    Application.save()
})






 


