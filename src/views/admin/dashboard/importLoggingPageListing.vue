<template>
    <article class="page_content_container">
    
        <ListingHeader :showLoadingImage=isPageLoading
                       :parentComponentKey="'laravelLoggerActivity'"
                       :currentPage=currentPage
                       :itemsListLength="laravelLoggerActivities.length"
                       :rowsCount="laravelLoggerActivitiesTotalCount"
                       :headerIcon="getHeaderIcon('log')"
                       :headerTitle="'Import logs'"
                       :rightAddButtonLink="''"
                       :itemTitle="pluralize(laravelLoggerActivities.length, 'Import log', 'Import logs')"
                       :rightAddButtonLinkTitle="''"
                       :rightIcon="'fa fa-refresh'"
        >
        </ListingHeader>
        
        <div class="admin_data_block mb-2">
            <div class="table-responsive table-wrapper-for-data-listing "
                 v-show="laravelLoggerActivities.length || isPageLoading">
                <table class="table table-striped table-data-listing">
                    
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Details</th>
                        <th></th>
                    </tr>
                    </thead>
                    
                    <tbody>
                    <tr v-for="(nextLaravelLoggerActivity) in laravelLoggerActivities"
                        :key="nextLaravelLoggerActivity.id">
                        <td class="text-left">
                            {{ nextLaravelLoggerActivity.description }}
                        </td>
                        <td class="text-left">
                            {{ nextLaravelLoggerActivity.details }}
                        </td>
                        <td class="text-left">
                            <a v-on:click="removeLaravelLoggerActivity(nextLaravelLoggerActivity.id)"
                               :class="'p-1 a_delete_item_'+nextLaravelLoggerActivity.id">
                                <i :class="'i_link '+getHeaderIcon('remove')" title="Remove Import log row"></i>
                            </a>
                        </td>
                    
                    </tr>
                    </tbody>
                
                </table>
            </div>
            
            <section class="laravelLoggerActivity_pagination_container top_split_border"  v-show="laravelLoggerActivities.length && !isPageLoading">
                <ListingPagination
                    parentComponentKey="laravelLoggerActivity"
                    :currentPage="currentPage"
                    :totalRowsCount="laravelLoggerActivitiesTotalCount"
                    :itemsPerPage="laravelLoggerActivitiesPerPage"
                    :showNextPriorButtons=false
                    :showPageNumberLabel="true"
                    :showRowsLabel="true"
                    :itemTitle="pluralize(laravelLoggerActivitiesTotalCount, 'Import log', 'Import logs')"
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
        settingCredentialsConfig
    } from '@/app.settings.js'

    import ListingHeader from '@/components/ListingHeader.vue'
    import ListingPagination from '@/components/ListingPagination.vue'
    import {useStore} from 'vuex'
    import app from '@/main.js'

    export default {
        name: 'adminLaravelLoggerActivitiesList',
        components: {
            ListingHeader, ListingPagination
        },
        setup() {
            const apiUrl = process.env.VUE_APP_API_URL

            const store = useStore()
            const orderBy = ref('created_at')
            const orderDirection = ref('desc')

            let laravelLoggerActivitiesPerPage = ref(2)
            const currentPage = ref(1)
            let laravelLoggerActivitiesTotalCount = ref(0)
            // let laravelLoggerActivities = reactive({ data: [] })
            let laravelLoggerActivities = ref([])

            let isPageLoading = ref(false)
            let credentialsConfig = settingCredentialsConfig

            const currentLoggedUserToken = computed(
                () => {
                    return store.getters.token
                }
            )

            const adminLaravelLoggerActivitiesListOnMounted = async () => {
                app.$emitter.on('listingHeaderRightButtonClickedEvent', params => {
                    if (params.parentComponentKey === 'laravelLoggerActivity') {
                        loadLaravelLoggerActivities()
                    }
                })
                app.$emitter.on('paginationPageChangedEvent', params => {
                    if (params.parentComponentKey === 'laravelLoggerActivity') {
                        laravelLoggerActivitiesPaginationPageClicked(params.page)
                    }
                })
                retrieveAppDictionaries('laravelLoggerActivity', ['backendItemsPerPage'])
                app.$emitter.on('appDictionariesRetrieved', (data) => {
                    if (data.requestKey === 'laravelLoggerActivity') {
                        laravelLoggerActivitiesPerPage.value = 2 // data.backendItemsPerPage
                        loadLaravelLoggerActivities()
                    }
                })
            }

            function loadLaravelLoggerActivities() {
                isPageLoading.value = true
                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value

                let filters = {
                    page: currentPage.value,
                    orderBy: orderBy.value,
                    orderDirection: orderDirection.value,
                }
                
                axios.post(apiUrl + '/admin/laravel-logger-activities-filter', filters, credentials)
                    .then(({data}) => {
                        laravelLoggerActivities.value = data.data
                        laravelLoggerActivitiesTotalCount.value = data.total
                        isPageLoading.value = false
                    })
                    .catch(error => {
                        console.error(error)
                        showPopupMessage('Import logs', error.response.data.message, 'warn')
                        isPageLoading.value = false
                    })
            } // loadLaravelLoggerActivities() {

            function removeLaravelLoggerActivity(id) {
                if (!confirm('Do you want to delete log row ?')) {
                    return
                }

                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                axios.delete(apiUrl + '/admin/laravel-logger-activities/' + id, credentials).then(( /* response */) => {
                    currentPage.value = 1
                    loadLaravelLoggerActivities()
                    showPopupMessage('Import logs', 'Import log was deleted successfully', 'success')
                }).catch((error) => {
                    console.error(error)
                    showPopupMessage('Import logs', error.response.data.error, 'error')
                })
            } // removeLaravelLoggerActivity(id) {

            function laravelLoggerActivitiesPaginationPageClicked(page) {
                currentPage.value = page
                loadLaravelLoggerActivities()
            }

            onMounted(adminLaravelLoggerActivitiesListOnMounted)

            return { // setup return
                // Listing Page state
                currentPage,
                orderBy,
                orderDirection,
                laravelLoggerActivitiesPerPage,
                isPageLoading,
                laravelLoggerActivities,
                laravelLoggerActivitiesTotalCount,
                currentLoggedUserToken,

                // Settings vars
                settingsJsMomentDatetimeFormat,

                // Page actions

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
