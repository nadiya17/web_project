# frontend-code-factory

Система сборки для разработки фронтенда веб-проектов
Основана на таск-раннере Gulp.js

## Основные команды для работы с системой сборки

```
npm install
npm i
```
Установка всех пакетов-компонентов системы сборки, указанных в файле 
package.json.

```
gulp build
```
Первичная сборка проекта.

```
gulp watch
```
Запуск node.js веб-сервера, обслуживающего каталог с собранным проектом.

### Встроенные NPM-скрипты

```
npm run starter
```
Пересборка проекта и немедленный запуск веб-сервера.

```
npm run init
```
Прогон скрипта для генерации чернового кода компонентов проекта

## Структура системы

```
./gulp/
```
Ядро системы сборки.

```
./server/
```
Первичный каталог с собранным проектом. Корень веб-сервера.

```
./src/
```
Исходники проекта.


```
./gulpfile
```
Файл инициализации таск-раннера Gulp.js.

```
./deploy.conf.js
```
Файл с параметрами, используемыми при выполнение задачи `gulp deploy`.

+ `assetsPath` - строка, которая добавляется в URL файлов в коде HTML и CSS. Обрабатываются адреса картинок и шрифтов.

```
./package.json
```
Файл описания проекта, используемый пакетным менеджером npm.

```
./bower_components/
./node_modules/
```
Временные каталоги, используемые для хранения компонентов системы сборки или же
внешних модулей проекта.
