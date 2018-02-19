const images = ['1.jpg', '2.jpg', '3.jpg']

let i = 0

setInterval(() => {
  document.body.style.backgroundImage = 'url(' + images[i] + ')'
  i++
  if (i === images.length) {
    i = 0
  }
}, 10000)
