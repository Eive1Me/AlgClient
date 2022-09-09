# Клиентская часть курсовой работы по теме "Подбор алгоритмов в области Искусственного Интеллекта"
## _React JS_

![Java](https://img.shields.io/badge/Library-React_JS-informational?style=flat-square&logo=react&logoColor=white&color=blue) ![PostrgeSQL](https://img.shields.io/badge/DataBase-PostgreSQL-informational?style=flat-square&logo=postgresql&logoColor=white&color=blue) ![IntellijIDEA](https://img.shields.io/badge/Editor-WebStorm-informational?style=flat-square&logo=webstorm&logoColor=white&color=blue) 

## Организация данных

Для удобства в управлении клиентская часть приложения разделена на модули:
- Components  
Содержит отдельные компоненты интерфейса приложения, файлы .js описывающие взаимодействия со страницей. 
- Data  
Содержит дополнительные данные для приложения, например фон background.png. 
- Styles 
Модуль содержит CSS стили страниц, предназначен для изменения внешнего вида интерфейса.  

## Описание интерфейса
- Вверху каждой страницы будет расположена панель навигации по сайту, логотип с ссылкой на главную страницу и переход профиль пользователя/авторизация. 
- В профиле пользователя будет представлен логин, возможность смены пароля и выход из системы. 
- На главной странице будет представлен каталог алгоритмов с возможностью поиска по ключевым словам, слева будет панель с алгоритмами, добавленными пользователем в избранное. 
- У пользователя, авторизовавшегося в роли администратора в верхней части главной страницы будет кнопка для добавления новых алгоритмов, переводящая на страницу редактирования алгоритма. 
- Страница редактирования/добавления алгоритма будет содержать все изменяемые атрибуты алгоритма, кнопки сохранения и удаления.

Каталог алгоритмов представлен в виде карточек с названием и аннотацией, нажатие на которые переводит пользователя на страницу алгоритма с более подробной информацией. Для обычного пользователя на этой странице будет представлена вся информация об алгоритме и кнопка «Добавить в избранное». У администратора будет возможность редактирования и удаления алгоритма. 

Далее на рисунках представлены примеры описанного интерфейса. 

![image](https://user-images.githubusercontent.com/83867541/189419117-0e92b085-b714-4eaf-a028-e9e46fdc81a9.png)
![image](https://user-images.githubusercontent.com/83867541/189419129-fe515744-2110-44c9-880b-670561f6f80e.png)

# Стандартный скрипт апуска React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
