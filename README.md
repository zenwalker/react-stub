# Болванака проекта на React

## Локальный сервер

Команда `node server` запустит локальный веб-сервер по адресу [http://localhost:3000](http://localhost:3000). Работает горячая замена кода: не нужно перезагружать страницу при изменении файлов.

### Прокси для серверного API

В файле `server.js` есть секция с настройками прокси. По умолчанию запросы к `/api` проксируются на `localhost:8000` (локальный сервер Django), но можно указать и внешний сервер.

```
var proxy = {
  staging: {
    '/api/*': {
      target: 'http://tele2.most.ru',
      headers: {
        'HOST': 'tele2.most.ru'
      }
    }
  }
};

new WebpackDevServer(webpack(config), {
  ...
  proxy: proxy.staging
  ...
};
```

## Развертывание

Развёртывание происходит командой `rsync:dev` или `rsync:prod`. Конфиг находится в `gulpfile.js`.

```
var config = {
  ...,
  
  rsync: {
    files: [
      './build/*',
      './index.html'
    ],
    dev: {
      hostname: 'yourhost.com',
      username: 'project-user',
      destination: 'www/client'
    }
  }
};
```
