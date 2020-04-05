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