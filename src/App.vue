<template>
    <div id="app_wrapper">
        <header class="mb-3">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">
                    <i class="test-device p-0" v-if="appVersion == 'D'">
            <span class="ml-5 hidden_info">
             {{ appVersion }}
            </span>
                    </i>
                    Navbar
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
<!--                        <li class="nav-item active">-->
<!--                            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>-->
<!--                        </li>-->
                        <li class="nav-item">
                            <router-link to="/" class="nav-link a_link_top_menu_home">
                                <img :src="logoImg" :title="siteName + ' : Home'" :alt="siteName + ' : Home'" class="mr-2 logo_image">
                            </router-link>
                        </li>

                        <li class="nav-item" v-show="isLoggedIn">
                            <router-link :to="{ name: 'adminImportLoggingPageListing' }" class="nav-link a_link_top_menu_forums">Import logs
                            </router-link>
                        </li>

                        <li class="nav-item" v-show="isLoggedIn">
                            <router-link :to="{ name: 'adminSettingsEditor'  }" class="nav-link a_link_top_menu_forums">Settings
                            </router-link>
                        </li>
                        <!--                        <li class="nav-item">-->
                        <!--                            <router-link to="/test" class="nav-link a_link_top_menu_test">test</router-link>-->
                        <!--                        </li>-->
                        <li class="nav-item" v-show="isLoggedIn">
                            <router-link :to="{ name: 'adminCurrenciesListing'  }" class="dropdown-item nav-link a_link">
                                Currencies
                            </router-link>
                        </li>
                        <li class="nav-item" v-show="isLoggedIn">
                            <span><a class="nav-link a_link_top_menu_logout" @click.prevent="logout">Logout</a> </span>
                        </li>
                        <li class="nav-item" v-show="!isLoggedIn">
                            <router-link to="/login" class="nav-link a_link_top_menu_login">Login</router-link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </header>

        <h1 class="reversed_text_color">{{ siteName }}</h1>
        <h2 class="reversed_text_color">{{ siteHeading }}</h2>
        <router-view>
        </router-view>
        <footer class="flexbox-item footer  ml-3 mr-3">
            <p class="m-2">{{copyrightText}}</p>
        </footer>
    
    </div>

</template>

<script>
    import app from '@/main.js'
    import axios from 'axios'
    import {ref, computed, onMounted, onUnmounted} from 'vue'
    import {retrieveAppDictionaries, isEmpty, showPopupMessage, getSplitted, getHeaderIcon} from '@/helpers/commonFuncs'

    import {useRouter} from 'vue-router'

    import {
        settingsLogoImg,
        settingCredentialsConfig,
        settingsJsMomentDatetimeFormat
    } from './app.settings.js'

    import mitt from 'mitt'
    import moment from 'moment-timezone'

    const emitter = mitt()
    moment.tz.setDefault(process.env.VUE_APP_TIME_ZONE)

    export default {
        name: 'App',
        components: {},

        setup() {
            // App Common vars
            let copyrightText = ref('')
            let siteHeading = ref('')
            let siteName = ref('')
            const appVersion = process.env.VUE_APP_VERSION
            const logoImg = settingsLogoImg

            const isLoggedIn = computed(() => {
                return app.$store.getters.isLoggedIn
            })
            const loggedUser = computed({
                get: () => {
                    return app.$store.getters.user
                }
            })
            const currentLoggedUserToken = computed({
                get: () => {
                    return app.$store.getters.token
                }
            })
            const getLoggedUserName = computed({
                get: () => {
                    if (isEmpty(app.$store.getters.user)) {
                        // alert( 'app.$store.getters.user UNDEFINED::' )
                        return
                    }
                    if (app.$store.getters.user.first_name && app.$store.getters.user.last_name) {
                        return app.$store.getters.user.first_name + ' ' + app.$store.getters.user.last_name
                    } else {
                        return app.$store.getters.user.name
                    }
                }
            })

            const router = useRouter()
            const appOnMounted = async () => {
                retrieveAppDictionaries('app', ['copyrightText', 'siteHeading', 'siteName', 'baseCurrencyInfo'])
                
                app.$emitter.on('appDictionariesRetrieved', (data) => {
                    if (data.requestKey === 'app') {
                        copyrightText.value = data.copyright_text
                        if ( data.base_currency_name && data.base_currency_char_code ) {
                            siteHeading.value = 'Main currency : ' + data.base_currency_name + ' (' + data.base_currency_char_code + ')'
                        } else {
                            siteHeading.value = 'Main currency is not set.  Check Settings page !'
                        }
                        siteName.value = data.site_name
                    }
                })

                axios.interceptors.response.use(undefined, function (error) {
                    return new Promise(function ( /* resolve, reject */) {
                        if (typeof error.response.status !== 'undefined' && error.response.status === 401) {
                            showPopupMessage('Access', 'Not authorized !', 'warn')
                            let splitted0 = getSplitted(error.response.config.url, '/login', 0)
                            if (splitted0 !== '') { // not move from login page
                                console.log('INSIDE::')
                                router.push({path: '/login'}) // UNCOMMENR
                            }
                        }

                        if (typeof error.response.status !== 'undefined' && error.response.status === 503) {
                            router.push('/MaintenanceMessage')
                        }
                        throw error
                    })
                })
            } // const appOnMounted = async () => {

            const appOnUnmounted = async () => {
                // alert('-appOnUnmounted::')
                console.log('appOnUnmounted')
                /*     // bus.$on('appDictionariesRetrieved', (data) => {
              // this.refreshTime()
           */
            } // const appOnUnmounted = async () => {

            function getVueVersion() {
                console.log('getVueVersionapp::')
                console.log(app)
                return app.version
                // return 'TEXT'
            }

            function logout() {
                app.$store.dispatch('logout')
                    .then(() => {
                        app.$router.push('/login')
                    })
            }

            // function refreshTime() {
            //   this.date_time_label = moment(new Date()).format('DD MMMM, YYYY HH:mm:ss')
            // }

            onMounted(appOnMounted)
            onUnmounted(appOnUnmounted)
            return {
                // App Common vars
                logoImg,
                appVersion,
                copyrightText,
                siteHeading,
                siteName,
                isEmpty,
                isLoggedIn,
                logout,
                getLoggedUserName,
                loggedUser,
                currentLoggedUserToken,

                // Common methods
                getHeaderIcon

            }
        }, // setup() {

    }
</script>

<style lang="scss">
    @import '../node_modules/bootstrap/dist/css/bootstrap.css';
    @import './assets/scss/main.scss';
</style>
