const CACHE_NAME = 'kcal-tracker-v1';
const ASSETS = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Cài đặt Service Worker và lưu trữ tài nguyên vào cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Xử lý các yêu cầu mạng
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Trả về từ cache nếu có, nếu không thì fetch từ mạng
      return response || fetch(event.request);
    })
  );
});
