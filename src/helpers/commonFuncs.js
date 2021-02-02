import axios from 'axios'
import app from '@/main.js'
import { settingsAwesomeFontLabels } from '../app.settings'
import moment from 'moment-timezone'
const apiUrl = process.env.VUE_APP_API_URL

export function getFileSizeAsString (fileSize) {
    if (parseInt(fileSize) < 1024) {
        return fileSize + 'b'
    }
    if (parseInt(fileSize) < 1024 * 1024) {
        return Math.floor(fileSize / 1024) + 'kb'
    }
    return Math.floor(fileSize / (1024 * 1024)) + 'mb'
}

export function checkUrlPrefix(url) {
  if (!/^(f|ht)tps?:\/\//i.test(url)) {
    url = 'http://' + url
  }
  return url
}

export function spaceStringValue(str, maxLength) {
  if (isEmpty(str)) return ''
  let l = str.length
  if (l <= maxLength) return str

  let i = 0
  i = i + maxLength
  while (i < l) {
    str = str.substring(0, i - 1) + ' ' + str.substring(i)
    i = i + maxLength
  }
  return str
}

export function formatLatestCurrencyHistoryValue(currency, rateDecimalNumbers) {
  let noLatestCurrencyHistoryLabel = 'Has no currency history yet'
  if (isEmpty( currency ) ) return noLatestCurrencyHistoryLabel
  if (isEmpty( currency.latest_currency_history ) ) return noLatestCurrencyHistoryLabel
  if (isEmpty( currency.latest_currency_history.value ) ) return noLatestCurrencyHistoryLabel
  let val = currency.latest_currency_history.value
  if ( typeof val === 'string' ) {
    val = parseFloat(val)
  }
  return val.toFixed(rateDecimalNumbers)
}

export function formatValue(value, rateDecimalNumbers) {
  let noLatestCurrencyHistoryLabel = 'Has no currency history yet'
  if (isEmpty( value ) ) return noLatestCurrencyHistoryLabel
  if ( typeof value === 'string' ) {
      value = parseFloat(value)
    }
  return value.toFixed(rateDecimalNumbers)
}

export function moneyFormat (price) {
  if (typeof price === 'undefined' || typeof price === 'object') {
    price = 0
  }
  if (typeof price === 'string') {
    price = parseFloat(price)
  }
  return '$' + price.toFixed(2)
}

export function momentDatetime(datetime, datetimeFormat, defaultVal) {
  if (typeof datetime === 'undefined' || datetime === null) {
    if (typeof defaultVal !== 'undefined' && defaultVal !== null) {
      return defaultVal
    }
    return ''
  }
  if (typeof datetime === 'object') {
    return moment(datetime).format(datetimeFormat)
  }
  if (typeof datetime === 'string') {
    if (datetimeFormat === '') return ''
    let dt = moment(String(datetime))
    return dt.format(datetimeFormat)
  } // if (typeof datetime === "string") {
  return ''
} // momentDatetime(datetime, datetimeFormat, defaultVal) {

export function getDictionaryLabel (value, selectionsList, defaultValue) {
  if (typeof defaultValue === 'undefined') defaultValue = ''
  if (typeof selectionsList === 'undefined') return defaultValue
  var ret = defaultValue
  selectionsList.map((nextSelection/* , index */) => {
    if (nextSelection.code === value) {
      ret = nextSelection.label
    }
  })
  return ret
} // getDictionaryLabel( value, selectionsList, defaultValue ) {

export function upperCase(string) {
  if (typeof string !== 'string') return ''
  return string.toUpperCase()
}

export function lowerase(string) {
  if (typeof string !== 'string') return ''
  return string.toLowerCase(0)
}

export function concatStr(str, maxStrLengthInListing) {
  if (typeof str === 'undefined') str = ''
  if (str.length > maxStrLengthInListing) {
    return str.slice(0, maxStrLengthInListing) + '...'
  }
  return str
}

export function capitalize(string) {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function clearErrorMessage(s) {
  if (typeof s === 'undefined') return ''
  return capitalize(s.replace(/_/g, ' '))
}

export function timeInAgoFormat(value) {
  if (value === null || typeof value === 'undefined') return
  return capitalize(moment(value).fromNow())
}

export function pluralize3(itemsLength, zeroLabel, singleLabel, pluralLabel) {
  if (itemsLength <= 0) return zeroLabel
  return itemsLength + ' ' + ( itemsLength > 1 ? pluralLabel : singleLabel )
}

export function pluralize(itemsLength, singleLabel, pluralLabel) {
  return itemsLength > 1 ? pluralLabel : singleLabel
}

export function clearTags (str) {
  if (typeof str !== 'string') return ''
  return str.replace(/<\/?[^>]+(>|$)/g, '')
}

export function getHeaderIcon (icon) {
  let retIcon = ''
  settingsAwesomeFontLabels.map((nextSettingsAwesomeFontLabel) => {
    if (nextSettingsAwesomeFontLabel.code === icon) {
      retIcon = nextSettingsAwesomeFontLabel.font
      return retIcon
    }
  })
  return retIcon
}

export function isEmpty(value) {
  if (typeof value === 'object') {
    if (value === null) return true
    if (value.length === 0) return true
  }
  if (value === undefined) return true
  if (value === null) return true
  if (value === '') return true
}

export function getSplitted (str, splitter, index) {
  if (typeof str === 'undefined') return ''
  var valuesArray = str.split(splitter)
  if (typeof valuesArray[index] !== 'undefined') {
    return valuesArray[index]
  }
  return ''
}

export function getClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function showPopupDialog (title, message, type) { // https://github.com/euvl/vue-notification
  // this.$notify({
  //   group: 'vtasks_popup_dialog',
  //   title: title,
  //   text: message,
  //   type: type, // success  / warn / danger
  //   duration: -1, // 5000
  //   position: 'top center',
  //   speed: 1000
  // })
} // showPopupDialog: function (message, type) {

export function showPopupMessage(title, message, type) {
  let color = '#000'
  let backgroundColor = '#4d4d4d'
  // console.log('type::')
  // console.log(type)

  let leftIcon = 'fa fa-info'
  if ( type === 'warn' ) { // success  / warn / danger
    let color = '#319cf9'
    let backgroundColor = '#dbebf9'
    leftIcon = 'fa fa-info-circle'
  }
  if ( type === 'error' ) {
    let color = '#b11111'
    let backgroundColor = '#f9cece'
    leftIcon = 'fa fa-exclamation-triangle'
  }

  app.$toast(message, {
    duration: 5000,
    // Position not yet supported
    styles: {
      borderRadius: '25px',
      styles: {
        color: color,
        backgroundColor: backgroundColor
      }

    },
    // Any valid HTML, intended for icons
    slotLeft: '<i class="' + leftIcon + '"></i>', // Add icon to left
    // slotLeft: '<i class="fa fa-user"></i>', // Add icon to left
    slotRight: '' // '<i class="fa fa-thumbs-up"></i>' // Add icon to right
  })

  // this.$notify({
  //   group: 'vtasks_notification',
  //   title: title,
  //   text: message,
  //   type: type, // success  / warn / danger
  //   duration: 1000, // 5000
  //   position: 'top left',
  //   speed: 1000
  // })
} // showPopupMessage: function (message, type) {

export function checkAuthorization (store, router) {
  router.beforeEach((to, from, next) => {
    console.log('checkAuthorization  to::')
    console.log(to)
    console.log('checkAuthorization  from::')
    console.log(from)

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const currentLoggedUser = store.state.currentLoggedUser

    console.log('requiresAuth::')
    console.log(requiresAuth)

    console.log('checkAuthorization  currentLoggedUser::')
    console.log(currentLoggedUser)

    if (requiresAuth && !currentLoggedUser) {
      next('/login')
    } else if (to.path === '/login' && currentLoggedUser) {
      // console.log("0 checkAuthorization redirect to /::")
      next('/')
    } else {
      // console.log("-1 checkAuthorization redirect to next::")
      next()
    }

    if (!to.matched.length) {
      // alert( "::/not-found/" )
      next('/not-found/' + encodeURIComponent(to.path))
    } else {
      // console.log("-2 checkAuthorization redirect to next::")
      next()
    }
  })

  if (store.getters.currentLoggedUser) {
    setAuthorizationToken(store.getters.currentLoggedUser.token)
  }
}

export function setAuthorizationToken (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
export function retrieveAppDictionaries( requestKey, paramsArray) {
  let retArray = []
  let apiUrl = process.env.VUE_APP_API_URL

  paramsArray[paramsArray.length] = 'requestKey_' + requestKey

  axios.post(apiUrl + '/app_settings', paramsArray)
    .then((response) => {
      // debugger
      if (typeof response.data.requestKey === 'string') {
        retArray['requestKey'] = response.data.requestKey
      }

      if (typeof response.data.base_currency_char_code === 'string') {
        retArray['base_currency_char_code'] = response.data.base_currency_char_code
      }
      if (typeof response.data.base_currency_name === 'string') {
        retArray['base_currency_name'] = response.data.base_currency_name
      }
      if (typeof response.data.site_name === 'string') {
        retArray['site_name'] = response.data.site_name
      }

      if (typeof response.data.site_description === 'string') {
        retArray['site_description'] = response.data.site_description
      }

      if (typeof response.data.copyright_text === 'string') {
        retArray['copyright_text'] = response.data.copyright_text
      }

      if (typeof response.data.site_heading === 'string') {
        retArray['site_heading'] = response.data.site_heading
      }

      if (typeof response.data.backendItemsPerPage === 'number') {
        retArray['backendItemsPerPage'] = response.data.backendItemsPerPage
      }

      if (typeof response.data.rateDecimalNumbers === 'number') {
        retArray['rateDecimalNumbers'] = response.data.rateDecimalNumbers
      }

      if (typeof response.data.baseCurrencyList === 'object') {
        retArray['baseCurrencyList'] = response.data.baseCurrencyList
      }

      if (typeof response.data.activeCurrenciesList === 'object') {
        retArray['activeCurrenciesList'] = response.data.activeCurrenciesList
      }
      if (typeof response.data.currencyOrderingLabels === 'object') {
        retArray.currencyOrderingLabels = response.data.currencyOrderingLabels
      }

      if (typeof response.data.categoryOrderingLabels === 'object') {
        retArray['categoryOrderingLabels'] = response.data.categoryOrderingLabels
      }

      // console.log('BEFORE appDictionariesRetrieved retArray::')
      // console.log(retArray)

      app.$emitter.emit('appDictionariesRetrieved', retArray)
    })
    .catch((error) => {
      console.error(error)
    })
} // export function retrieveAppDictionaries(requestKey, paramsArray, bus) {
