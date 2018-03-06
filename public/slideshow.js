const images = ['/pictures/1.jpg', '/pictures/2.jpg', '/pictures/3.jpg']

setInterval(() => {
  const image = images.shift()
  document.body.style.backgroundImage = `url(${image})`
  images.push(image)
}, 10000)
