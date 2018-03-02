const images = ['1.jpg', '2.jpg', '3.jpg']

setInterval(() => {
  const image = images.shift()
  document.body.style.backgroundImage = `url(${image})`
  images.push(image)
}, 10000)
