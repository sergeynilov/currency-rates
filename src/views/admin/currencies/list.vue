<template>
    <article class="admin_page_container">
    
<!--        currencyActiveLabels::{{ currencyActiveLabels}}<br>-->
<!--        currencyIsTopLabels::{{ currencyIsTopLabels}}-->
        <!--        currentLoggedUserToken::{{ currentLoggedUserToken}}<br>-->
        <!--        currenciesPerPage::{{ currenciesPerPage}}<br>-->
        <!--    currenciesTotalCount::{{ currenciesTotalCount}}<br>-->
        <!--        currentPage::{{ currentPage}}<br>-->
        <!--    currenciesTotalCount::{{ currenciesTotalCount}}<br>-->
        <!--        currencies::{{ currencies}}<br>-->
            isPageLoading::{{ isPageLoading}}<br>
        <!--    currencies.length::{{ currencies.length}}<br>-->
        
        <ListingHeader :showLoadingImage=isPageLoading
                       :parentComponentKey="'currency'"
                       :currentPage=currentPage
                       :itemsListLength="currencies.length"
                       :rowsCount="currenciesTotalCount"
                       :headerIcon="getHeaderIcon('currency')"
                       :headerTitle="'currencies'"
                       :rightAddButtonLink="'adminCurrencyEditor'"
                       :itemTitle="pluralize(currencies.length, 'currency', 'currencies')"
                       :rightAddButtonLinkTitle="'New'"
                       :rightIcon="'fa fa-refresh'"
        >
        </ListingHeader>
        
        <div class="admin_data_block mb-3">
            <fieldset class="admin-bordered text-muted p-0 m-1">
                <legend class="admin-bordered">Filters</legend>
                
                <dl class="block_2columns_md m-0 p-2">
                    <dt class="horiz_divider_left_13">
                        <label class="col-form-label" for="filterName">
                            By name
                        </label>
                    </dt>
                    <dd class="horiz_divider_right_23">
                        <input
                            id="filterName"
                            class="form-control editable_field"
                            type="text"
                            v-model="filterName"
                            v-on:change="currenciesFilterApplied()">
                    </dd>
                </dl>
                
                <dl class="block_2columns_md m-0 p-2">
                    <dt class="horiz_divider_left_13">
                        <label class="col-form-label" for="filterSelectionIsTop">
                            By is top
                        </label>
                    </dt>
                    <dd class="horiz_divider_right_23">
                        <select
                            id="filterSelectionIsTop"
                            v-model="filterSelectionIsTop"
                            class="form-control editable_field"
                        >
                            <option value="" disabled selected>- Select All -</option>
                            <option v-for="(currencyIsTopLabel) in currencyIsTopLabels" :key="currencyIsTopLabel.code">
                                {{currencyIsTopLabel.label}}
                            </option>
                        </select>
                    </dd>
                </dl>
                
                <dl class="block_2columns_md m-0 p-2">
                    <dt class="horiz_divider_left_13">
                        <label class="col-form-label" for="filterSelectionActive">
                            By is active
                        </label>
                    </dt>
                    <dd class="horiz_divider_right_23">
                        <select
                            id="filterSelectionActive"
                            v-model="filterSelectionActive"
                            class="form-control editable_field"
                        >
                            <option value="" disabled selected>- Select All -</option>
                            <option v-for="(currencyActiveLabel) in currencyActiveLabels" :key="currencyActiveLabel.code">
                                {{currencyActiveLabel.label}}
                            </option>
                        </select>
                    </dd>
                </dl>
                
                <dl class="m-0 p-3" style="display: flex;justify-content: flex-start">
                    <dt class="">
                        <a class="btn btn-sm btn-outline-secondary" @click.prevent="loadCurrencies()">
                            <i :class="'i_link '+getHeaderIcon('filter')"></i>Search
                        </a>
                    </dt>
                </dl>
            </fieldset>
        </div> <!-- <div class="admin_data_block mb-3"> -->
        
        <div class="admin_data_block mb-2">
            <div class="table-responsive table-wrapper-for-data-listing " v-show="currencies.length && !isPageLoading">
                <table class="table table-striped table-data-listing">
                    
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Ordering</th>
                        <th>Is top</th>
                        <th>Active</th>
                        <th>Created At</th>
                        <th></th>
                    </tr>
                    </thead>
                    
                    <tbody>
                    <tr v-for="(nextCurrency,index) in currencies" :key="nextCurrency.id">
                        <td class="text-right">
                            <router-link :to="{name: 'adminCurrencyEditor', params: {id: nextCurrency.id}}"
                                         :class="'p-1 a_edit_item_'+nextCurrency.id">
                                {{ nextCurrency.id }}
                            </router-link>
                        </td>
                        <td class="text-left">
                            {{ nextCurrency.name }}<small> ( has {{ pluralize3(nextCurrency.currency_histories_count,
                            'no histories', 'history', 'histories') }} )</small>
                        </td>
                        
                        <td class="text-right">
                            {{ nextCurrency.ordering }}
                        </td>
                        
                        <td class="text-left">
                            {{ nextCurrency.active }}
                            <!--                        {{ getDictionaryLabel(nextCurrency.Active, currencyActiveLabels) }}-->
                        </td>
                        
                        <td class="text-left">
                            {{ nextCurrency.is_top }}
                            <!--                        {{ getDictionaryLabel(nextCurrency.Active, currencyActiveLabels) }}-->
                        </td>
                        
                        <td class="text-left">
                            {{ momentDatetime(nextCurrency.created_at, settingsJsMomentDatetimeFormat) }}
                        </td>
                        
                        <td>
                            <router-link :to="{name: 'adminCurrencyEditor', params: {id: nextCurrency.id}}"
                                         :class="'p-1 a_edit_item_'+nextCurrency.id">
                                <i :class="'i_link '+getHeaderIcon('edit')" title="Edit currency"></i>
                            </router-link>
                            <a v-on:click="removeCurrency(nextCurrency.id, nextCurrency.name, index)"
                               :class="'p-1 a_delete_item_'+nextCurrency.id">
                                <i :class="'i_link '+getHeaderIcon('remove')" title="Remove currency"></i>
                            </a>
                        </td>
                    
                    </tr>
                    </tbody>
                
                </table>
            </div>
            
            <section class="currency_pagination_container top_split_border" v-show="currencies.length && !isPageLoading">
                <ListingPagination
                    parentComponentKey="currency"
                    :currentPage="currentPage"
                    :totalRowsCount="currenciesTotalCount"
                    :itemsPerPage="currenciesPerPage"
                    :showNextPriorButtons=false
                    :showPageNumberLabel="true"
                    :showRowsLabel="true"
                    :itemTitle="pluralize(currenciesTotalCount, 'currency', 'currencies')"
                >
                </ListingPagination>
            </section>
        </div> <!-- <div class="admin_data_block mb-3"> -->
    
    </article> <!-- page_content_container -->

</template>

<script>
    import axios from 'axios'
    import {
        getClone,
        getHeaderIcon,
        showPopupMessage,
        pluralize,
        pluralize3,
        momentDatetime,
        getDictionaryLabel,
        retrieveAppDictionaries
    } from '@/helpers/commonFuncs'
    import {ref, watch, computed, onMounted} from 'vue'
    import mitt from 'mitt'
    import {
        settingsJsMomentDatetimeFormat,
        settingCredentialsConfig,
        settingsCurrencyIsTopLabels,
        settingsCurrencyActiveLabels
    } from '@/app.settings.js'

    import ListingHeader from '@/components/ListingHeader.vue'
    import ListingPagination from '@/components/ListingPagination.vue'
    import {useStore} from 'vuex'
    import app from '@/main.js'

    export default {
        name: 'admincurrenciesList',
        components: {
            ListingHeader, ListingPagination
        },
        setup() {
            const currencyIsTopLabels = settingsCurrencyIsTopLabels
            const currencyActiveLabels = settingsCurrencyActiveLabels
            const apiUrl = process.env.VUE_APP_API_URL

            const store = useStore()
            const orderBy = ref('created_at')
            const orderDirection = ref('desc')
            const filterName = ref('')
            const filterSelectionIsTop = ref('')
            const filterSelectionActive = ref('')

            let currenciesPerPage = ref(2)
            const currentPage = ref(1)
            let currenciesTotalCount = ref(0)
            // let currencies = reactive({ data: [] })
            let currencies = ref([])

            let isPageLoading = ref(false)
            let credentialsConfig = settingCredentialsConfig

            const currentLoggedUserToken = computed(
                () => {
                    return store.getters.token
                }
            )

            /*
                        watch(() => {
                            if (filterName.value) {
                                // console.log('filterName.value::')
                                // console.log(filterName.value)
                            }
                        })
            */

            const admincurrenciesListOnMounted = async () => {
                app.$emitter.on('listingHeaderRightButtonClickedEvent', params => {
                    if (params.parentComponentKey === 'currency') {
                        loadCurrencies()
                    }
                })
                app.$emitter.on('paginationPageChangedEvent', params => {
                    if (params.parentComponentKey === 'currency') {
                        currenciesPaginationPageClicked(params.page)
                    }
                })
                retrieveAppDictionaries('currency', ['backendItemsPerPage'])
                app.$emitter.on('appDictionariesRetrieved', (data) => {
                    if (data.requestKey === 'currency') {
                        currenciesPerPage.value = data.backendItemsPerPage
                        loadCurrencies()
                    }
                })
            }

            function currenciesFilterApplied() {
                loadCurrencies()
            }

            function loadCurrencies() {
                isPageLoading.value = true
                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                let filterActive = ''
                currencyActiveLabels.map((nextCurrencyActiveLabel) => {
                    if (nextCurrencyActiveLabel.label === filterSelectionActive.value) {
                        filterActive = nextCurrencyActiveLabel.code
                    }
                })
                let filterIsTop = ''
                currencyIsTopLabels.map((nextCurrencyIsTopLabel) => {
                    if (nextCurrencyIsTopLabel.label === filterSelectionIsTop.value) {
                        filterIsTop = nextCurrencyIsTopLabel.code
                    }
                })

                let filters = {
                    page: currentPage.value,
                    orderBy: orderBy.value,
                    orderDirection: orderDirection.value,
                    filterName: filterName.value,
                    filterActive: filterActive,
                    filterIsTop: filterIsTop
                }

                axios.post(apiUrl + '/admin/currencies-filter', filters, credentials)
                    .then(({data}) => {
                        currencies.value = data.data
                        currenciesTotalCount.value = data.total
                        isPageLoading.value = false
                    })
                    .catch(error => {
                        console.error(error)
                        showPopupMessage('currencies Editor', error.response.data.message, 'warn')
                        isPageLoading.value = false
                    })
            } // loadCurrencies() {

            function removeCurrency(id, currencyName /*, index */) {
                if (!confirm('Do you want to delete' + ' \'' + currencyName + '\' currency ?')) {
                    return
                }

                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                axios.delete(apiUrl + '/admin/currencies/' + id, credentials).then(( /* response */) => {
                    currentPage.value = 1
                    loadCurrencies()
                    showPopupMessage('currencies Editor', 'Currency was deleted successfully', 'success')
                }).catch((error) => {
                    console.error(error)
                    showPopupMessage('currencies Editor', error.response.data.error, 'error')
                })
            } // removeCurrency(id, currencyName, index) {

            function currenciesPaginationPageClicked(page) {
                currentPage.value = page
                loadCurrencies()
            }

            onMounted(admincurrenciesListOnMounted)

            return { // setup return
                // Listing Page state
                currentPage,
                orderBy,
                orderDirection,
                currenciesPerPage,
                isPageLoading,
                currencies,
                currenciesTotalCount,
                currentLoggedUserToken,

                // Settings vars
                settingsJsMomentDatetimeFormat,

                currencyIsTopLabels,
                currencyActiveLabels,
                filterName,
                filterSelectionIsTop,
                filterSelectionActive,

                // Page actions
                loadCurrencies,
                removeCurrency,
                currenciesPaginationPageClicked,
                currenciesFilterApplied,

                // Common methods
                getDictionaryLabel,
                pluralize,
                pluralize3,
                momentDatetime,
                getHeaderIcon

            }
        }, // setup() {

    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/_variables.scss';
    
</style>
