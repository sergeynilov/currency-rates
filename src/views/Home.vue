<template>
    <article class="page_content_container">
        <TopCurrenciesListing>
        </TopCurrenciesListing>
    </article> <!-- page_content_container -->
</template>

<script>
    import { getHeaderIcon, pluralize, pluralize3, momentDatetime, getDictionaryLabel } from '@/helpers/commonFuncs'
    import { ref, watch, computed, onMounted } from 'vue'
    import {
        settingsJsMomentDatetimeFormat,
        settingCredentialsConfig,
    } from '@/app.settings.js'

    import TopCurrenciesListing from '@/views/TopCurrenciesListing.vue'
    import { useStore } from 'vuex'
    import app from '@/main.js'

    export default {
        name: 'adminCategoriesList',
        components: {
            TopCurrenciesListing
        },
        setup () {
            const jsMomentDatetimeFormat = settingsJsMomentDatetimeFormat

            const store = useStore()
            const orderBy = ref('created_at')
            const orderDirection = ref('desc')
            const filterName = ref('')
            const filterSelectionPublished = ref('')

            let categoriesPerPage = ref(2)
            const currentPage = ref(1)
            let categoriesTotalCount = ref(0)
            let categories = ref([])

            let credentialsConfig = settingCredentialsConfig

            const currentLoggedUserToken = computed(
                () => {
                    return store.getters.token
                }
            )

            const adminCategoriesListOnMounted = async () => {
            }

            watch(() => {
                if (filterName.value) {
                    // console.log('filterName.value::')
                    // console.log(filterName.value)
                }
            })

            onMounted(adminCategoriesListOnMounted)

            return { // setup return
                // Listing Page state
                currentPage,
                orderBy,
                orderDirection,
                categoriesPerPage,
                categories,
                categoriesTotalCount,
                currentLoggedUserToken,

                // Settings vars
                jsMomentDatetimeFormat,

                filterName,
                filterSelectionPublished,

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
