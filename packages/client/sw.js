// Имя кэша
const CACHE_NAME = 'my-site-cache-v1'

// Массив urls для статики
const URLS = [
  '/',
  '/src/assets',
  '/login',
  '/registration',
  '/profile',
  '/game',
  '/leaderboard',
  '/forum',
  '/forum/topic/1',
  '/forum/topic/create',
]

// Поведение SW на стадии жизненного цикла 'install'
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(URLS)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  )
})

// Поведение SW на стадии жизненного цикла 'activate'
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => {
            /* Нужно вернуть true, если хотите удалить этот файл из кеша совсем */
          })
          .map(name => caches.delete(name))
      )
    })
  )
})

// Событие 'fetch' для запросов на сервер
self.addEventListener('fetch', event => {
  //   // Check if this is a navigation request
  //   if (event.request.mode === 'navigate') {
  //     // Open the cache
  //     event.respondWith(
  //       caches.open(CACHE_NAME).then(cache => {
  //         // Go to the network first
  //         return fetch(event.request.url)
  //           .then(fetchedResponse => {
  //             cache.put(event.request, fetchedResponse.clone()).then()
  //
  //             return fetchedResponse
  //           })
  //           .catch(() => {
  //             // If the network is unavailable, get
  //             return cache.match(event.request.url)
  //           })
  //       })
  //     )
  //   }
  // })

  event.respondWith(
    // Пытаемся найти ответ на такой запрос в кеше
    caches.match(event.request).then(response => {
      // Если ответ найден, выдаём его
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      // В противном случае делаем запрос на сервер
      return (
        fetch(fetchRequest)
          // Можно задавать дополнительные параметры запроса, если ответ вернулся некорректный.
          .then(response => {
            // Если что-то пошло не так, выдаём в основной поток результат, но не кладём его в кеш
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic'
            ) {
              return response
            }

            const responseToCache = response.clone()
            // Получаем доступ к кешу по CACHE_NAME
            caches.open(CACHE_NAME).then(cache => {
              // Записываем в кеш ответ, используя в качестве ключа запрос
              cache.put(event.request, responseToCache).then()
            })
            // Отдаём в основной поток ответ
            return response
          })
      )
    })
  )
})
