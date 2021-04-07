const bgWebP = () => {
  const items = document.querySelectorAll('[data-bg]')

  items.forEach(el => {

    const url = el.getAttribute('data-bg')

    if (document.body.classList.contains('webp')) {
      const webpUrl = url.replace(/(\.jpg|\.png)/gm, '.webp')
      el.style.backgroundImage = `url(${webpUrl})`
      el.setAttribute('data-bg', webpUrl)
    } else {
      el.style.backgroundImage = `url(${url})`
      el.setAttribute('data-bg', url)
    }
  })

}

export default bgWebP
