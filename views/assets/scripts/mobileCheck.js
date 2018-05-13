const mobileCheck = {
  iphone () {
    return (/iphone|iPod/i.test(navigator.userAgent))
  },
  android () {
    return (/Android/i.test(navigator.userAgent))
  },
  mobile () {
    return mobileCheck.iphone() || mobileCheck.android() || (window.innerWidth <= 384 && window.innerHeight <= 640)
  },
  tablet () {
    return (/Tablet|iPad/i.test(navigator.userAgent))
  },
  small () {
    return window.innerWidth <= 768
  },
  any () {
    return !mobileCheck.mobile() && !mobileCheck.tablet() && !mobileCheck.small()
  }
}

export default mobileCheck
