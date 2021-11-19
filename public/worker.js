self.addEventListener('push', (event) => {
  const promiseChain = self.registration.showNotification(event.data)
  event.waitUntil(promiseChain)
});