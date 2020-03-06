## Ссылки приложения

PROD - https://cats.bobrovartem.ru

QA - https://cats-qa.bobrovartem.ru (только UI приложение, апи и бд берется с прода)

Версия приложения:

PROD [/version](https://cats.bobrovartem.ru/version)

QA [/version](https://cats-qa.bobrovartem.ru/version) (версия - это название ветки, что бы понимать какая фича развернута на проверочном стенде)


## Запуск приложения

При первом запуске, установить библиотеки

```npm install```

Запуск приложения (автоматически откроется [localhost:3000](http://localhost:3000))

```npm start```

## Процесс CI/CD

- Пушить в мастер нельзя
- Задача разрабатывается в ветке с кодом задачи (пр. `ACT-123`)
- По её готовности, создается Merge Request в `master`
- Автоматически собирается билд приложения и деплоится на QA контур
- После проверки задачи, она мержится в `master`
- Для того что бы задеплоить приложение на PROD - необходимо создать `tag` с новой версией приложения, в формате `v1.2.3`

Дополнительно:
- Если не нужно запускать деплой на QA стенд при создании MR - необходимо добавить лейбл `without-ci` 
