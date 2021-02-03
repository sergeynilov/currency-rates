<template>
    <article class="page_content_container top_currencies_block_parent">
        <div class="top_currencies_block_header">
            <ListingHeader :showLoadingImage=isPageLoading
                           parentComponentKey="top_currencies"
                           :currentPage="1"
                           :itemsListLength="topCurrencies.length"
                           :rowsCount="currenciesTotalCount"
                           :headerIcon="getHeaderIcon('top_currencies')"
                           :customTitle="topCurrenciesTitle()"
                           :rightAddButtonLink="''"
                           :rightAddButtonLinkTitle="''"
                           :rightIcon="'fa fa-refresh'"
            >
            </ListingHeader>
            
            <p class="alert alert-info m-1 p-1 text-center row_content_centered" role="alert"
               v-if="currenciesTotalCount === 0 && !isPageLoading">
                There are no any top currencies yet.
            </p>
        </div>
        
        <div class="frontend_data_block mb-3">
            <div class="top_currencies_content_container">
                <div class="top_currencies_block_content ">
                    
                    <ul class="ul_horiz_lis" v-show="topCurrencies.length && !isPageLoading">
                        <li class="ul_horiz_lis_left_aligned_icon m-0 p-2">
                            <input type="checkbox" v-model="showOnlyTopCurrencies" id="cbx_show_only_top_currencies">
                        </li>
                        <li class="ul_horiz_lis_right_aligned_content">
                            <label for="cbx_show_only_top_currencies" class="wrapping_text">Show Only Top Currencies
                                <span class="small_size text-left " style="margin-top: 2px;">
                                ( You can see all currencies in the system )
                            </span>
                            </label>
                        </li>
                    </ul>
                    
                    <div class="table-responsive table-wrapper-for-data-listing" v-show="topCurrencies.length && !isPageLoading">
                        <table class="table table-striped table-data-listing">
                            
                            <thead>
                            <tr>
                                <th>Name(Char code)</th>
                                <th>Rate</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                            <tr v-for="(nextTopCurrency) in topCurrencies" :key="nextTopCurrency.id">
                                
                                <td class="text-left">
                                    {{ nextTopCurrency.name }} ({{ nextTopCurrency.char_code }})
                                </td>
                                
                                <td class="text-right">
                                    {{ formatLatestCurrencyHistoryValue(nextTopCurrency, rateDecimalNumbers) }}
                                    <span v-show="nextTopCurrency.currency_histories_count">
                                    <i :class="'i_link pt-1 ml-2 '+getHeaderIcon('currency_history')"
                                       :title="'Has ' + nextTopCurrency.currency_histories_count + ' history rate(s)'"
                                       @click.prevent="openCurrencyHistory(nextTopCurrency)"></i>
                                </span>
                                </td>
                            
                            </tr>
                            </tbody>
                        
                        </table>
                    </div> <!-- table-responsive -->
                </div> <!-- class="top_currencies_block_content " -->
            
            </div> <!-- top_currencies_content_container-->
        </div> <!-- <div class="frontend_data_block mb-3"> -->

        <modal v-if="showCurrencyHistoryModal" @close="showCurrencyHistoryModal = false">
            <template v-slot:header>
                <h4 class="listing_header">
                    <i :class="'i_link pt-1 '+getHeaderIcon('currency_history')"></i>
                    <span v-if="selectedCurrency">
                      Currency History for {{ selectedCurrency.name }} ( {{ selectedCurrency.char_code }} )
                    </span>
                </h4>
            </template>
            
            <template v-slot:body>
                <div class="top_currency_history_block_content frontend_data_block">
                    
                    <div class="table-responsive table-wrapper-for-data-listing " v-show="currencyHistories">
                        <table class="table table-striped table-data-listing">
                            <thead>
                            <tr>
                                <th>Day</th>
                                <th>Rate</th>
                            </tr>
                            </thead>
                            
                            <tbody>
                            <tr v-for="(nextCurrencyHistory) in currencyHistories" :key="nextCurrencyHistory.id">
                                <td class="text-left">
                                    {{ momentDatetime(nextCurrencyHistory.day, jsMomentDateFormat) }}
                                </td>
                                <td class="text-right">
                                    {{ formatValue(nextCurrencyHistory.value, rateDecimalNumbers) }}
                                </td>
                            </tr>
                            </tbody>
                        
                        </table>
                    </div> <!-- table-responsive -->
                </div> <!-- class="top_currency_history_block_content " -->
            </template>
            
            <template v-slot:footer>
                <div class="row_content_right_aligned p-1 m-1 mt-3">
                    <button type="button" class="btn btn-info btn-sm nowrap_block" @click.prevent="cancelCurrencyHistory()">
                        <i :class="'i_link pt-1 '+getHeaderIcon('check')"></i>Ok
                    </button>
                </div>
            </template>
        
        </modal>
    
    </article>

</template>

<script>
    import axios from 'axios'
    import {
        getClone,
        getHeaderIcon,
        showPopupMessage,
        pluralize,
        momentDatetime,
        formatLatestCurrencyHistoryValue,
        formatValue,
        retrieveAppDictionaries
    } from '@/helpers/commonFuncs'
    import {ref, watchEffect, computed, reactive, toRefs, onMounted} from 'vue'
    import modal from '../views/Modal.vue'

    import mitt from 'mitt'
    import app from '@/main.js'
    import {settingsJsMomentDateFormat, settingCredentialsConfig} from '@/app.settings.js'

    import ListingHeader from '@/components/ListingHeader.vue'

    import {useStore} from 'vuex'

    const emitter = mitt()
    export default {

        name: 'TopCurrenciesPage',

        components: {
            ListingHeader,
            modal
        },

        setup() {
            let showOnlyTopCurrencies = ref(true)

            let currenciesTotalCount = ref(0)
            let topCurrencies = ref([])
            let selectedCurrency = ref({})
            let currencyHistories = ref([])
            let activeCurrenciesList = ref([])
            let rateDecimalNumbers = ref(2)
            let isPageLoading = ref(false)
            let credentialsConfig = settingCredentialsConfig
            let jsMomentDateFormat = settingsJsMomentDateFormat
            let showCurrencyHistoryModal = ref(false)

            watchEffect(() =>
                loadTopCurrencies()
            )
            
            const topCurrenciesByCategoryPageInit = async () => {
                retrieveAppDictionaries('top_currencies', ['activeCurrenciesList', 'rateDecimalNumbers'])
                app.$emitter.on('appDictionariesRetrieved', (data) => {
                    if (data.requestKey === 'top_currencies') {
                        activeCurrenciesList.value = data.activeCurrenciesList
                        rateDecimalNumbers.value = data.rateDecimalNumbers
                    }
                })

                app.$emitter.on('listingHeaderRightButtonClickedEvent', params => {
                    if (params.parentComponentKey === 'top_currencies') {
                        loadTopCurrencies()
                    }
                })
                loadTopCurrencies()
            }

            function openCurrencyHistory(currency) {
                let credentials = getClone(credentialsConfig)
                const apiUrl = process.env.VUE_APP_API_URL
                isPageLoading.value = true
                
                axios.get(apiUrl + '/get_currency_history/' + currency.id, {}, credentials)
                    .then(({data}) => {
                        selectedCurrency.value = currency
                        currencyHistories.value = data.currencyHistories
                        showCurrencyHistoryModal.value = true
                        isPageLoading.value = false
                    })
                    .catch(error => {
                        console.error(error)
                        showPopupMessage('Currency History', error.response.data.message, 'warn')
                        isPageLoading.value = false
                    })
            }

            function cancelCurrencyHistory() {
                currencyHistories.value = []
                showCurrencyHistoryModal.value = false
            }

            function topCurrenciesTitle() {
                if (isPageLoading.value) return ''
                return ' Shown ' + topCurrencies.value.length + ' ' + pluralize(topCurrencies.value.length, 'currency', 'currencies' + ' from ' + currenciesTotalCount.value + ' ' + pluralize(currenciesTotalCount.value, 'currency', 'currencies'))
            }

            function loadTopCurrencies() {
                isPageLoading.value = true
                let credentials = getClone(credentialsConfig)
                const apiUrl = process.env.VUE_APP_API_URL

                axios.post(apiUrl + '/top_currencies', {show_only_top_currencies: showOnlyTopCurrencies.value}, credentials)
                    .then(({data}) => {
                        topCurrencies.value = data.currencies
                        currenciesTotalCount.value = data.currenciesCount
                        isPageLoading.value = false
                    })
                    .catch(error => {
                        console.error(error)
                        showPopupMessage('Top currencies', error.response.data.message, 'warn')
                        isPageLoading.value = false
                    })
            } // loadTopCurrencies() {

            onMounted(topCurrenciesByCategoryPageInit)

            return {
                // Top currencies state
                isPageLoading,
                currenciesTotalCount,
                topCurrencies,
                selectedCurrency,
                currencyHistories,
                activeCurrenciesList,
                showOnlyTopCurrencies,
                rateDecimalNumbers,

                // Settings vars
                jsMomentDateFormat,

                loadTopCurrencies,
                topCurrenciesTitle,
                openCurrencyHistory,
                showCurrencyHistoryModal,
                cancelCurrencyHistory,

                // Common methods
                pluralize,
                momentDatetime,
                formatLatestCurrencyHistoryValue,
                formatValue,
                getHeaderIcon
            }
        } // setup() {

    }
</script>

<style lang="scss" scoped>

</style>
