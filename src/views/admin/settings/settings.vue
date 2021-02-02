<template>
    <article class="admin_page_container">
        <Form @submit="onSubmit" :validation-schema="formEditValidationRules" class="settingsEdit">
            
            <div class="card col-sm-12 col-md-10 p-2 m-0 mx-auto">
                <editor-header :show_loading_image="isPageUpdating || isPageLoading"
                               :header_icon="getHeaderIcon('settings')"
                               :header_title="getHeaderTitle()" :header_class="'card-header'">
                </editor-header>
                
                <div class="admin_data_block" v-show="!isPageLoading">
                    <div class="card-body card-block" v-show="!isPageLoading">
    
<!--
                        <dl class="block_2columns_md m-3"> &lt;!&ndash; items_per_page FIELD DEFINITION &ndash;&gt;
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="items_per_page">
                                    Items per page<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="items_per_page"
                                    name="items_per_page"
                                    type="input"
                                    v-model="formItemsPerPage"
                                    class="form-control text-right editable_field"
                                    placeholder="Integer value"
                                    autocomplete=off
                                />
                                <ErrorMessage name="items_per_page" as="p" class="validation_error"/>
                            </dd>
                        </dl> &lt;!&ndash; <dt class="block_2columns_md m-0"> items_per_page FIELD DEFINITION &ndash;&gt;
-->
    
                        <dl class="block_2columns_md m-3"> <!-- backend_items_per_page FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="backend_items_per_page">
                                    Backend items <br>per page<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="backend_items_per_page"
                                    name="backend_items_per_page"
                                    type="input"
                                    v-model="formBackendItemsPerPage"
                                    class="form-control text-right editable_field"
                                    placeholder="Integer value"
                                    autocomplete=off
                                />
                                <ErrorMessage name="backend_items_per_page" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> backend_items_per_page FIELD DEFINITION -->
    
                        <dl class="block_2columns_md m-3"> <!-- rate_decimal_numbers FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="rate_decimal_numbers">
                                    Rate decimal <br>numbers<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="rate_decimal_numbers"
                                    name="rate_decimal_numbers"
                                    type="input"
                                    v-model="formRateDecimalNumbers"
                                    class="form-control text-right editable_field"
                                    placeholder="Integer value"
                                    autocomplete=off
                                />
                                <ErrorMessage name="rate_decimal_numbers" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> rate_decimal_numbers FIELD DEFINITION -->
    
                        <dl class="block_2columns_md m-3"> <!-- base_currency FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="base_currency">
                                    Base currency<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    name="base_currency"
                                    as="select"
                                    class="form-control editable_field"
                                    v-model="formSelectionBaseCurrency">
                                    <option value="" disabled selected>- Select base currency -</option>
                                    <option v-for="(baseCurrencyLabel) in baseCurrencyList" :key="baseCurrencyLabel.code">
                                        {{baseCurrencyLabel.label}}
                                    </option>
                                </Field>
                                <ErrorMessage name="base_currency" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> base_currency FIELD DEFINITION -->
                        
                        <div class="m-3">
                            <ul class="ul_horiz_lis block_2columns_md">
                                <li class="ul_horiz_lis_left_aligned_half">
                                    <p class="alert alert-info m-1 p-1 text-left" role="alert"
                                       v-show="formSelectionBaseCurrency && !isPageLoading">
                                        If you change base currency, you need <br>to clear Rates History to avoid <br>confusing with different base currency.
                                    </p>
                                </li>
                                <li class="ul_horiz_lis_right_aligned_half">
                                    <button type="button" class="btn btn-outline-primary btn-lg"
                                            @click.prevent="clearRatesHistory()">
                                        <i :class="'i_link pt-1 '+getHeaderIcon('check')"></i>Clear rates history
                                    </button>
                                </li>
                            </ul>
                        </div>
                        
                        <div class="m-3">
                            <ul class="ul_horiz_lis block_2columns_md">
                                <li class="ul_horiz_lis_left_aligned_half">
                                    <p class="alert alert-info m-1 p-1 text-left" role="alert">
                                        You can run currency<br> rates import manually
                                    </p>
                                </li>
                                <li class="ul_horiz_lis_right_aligned_half">
                                    <button type="button" class="btn btn-outline-primary btn-lg" @click.prevent="runCurrencyRatesImportManually()">
                                        <i :class="'i_link pt-1 '+getHeaderIcon('run')"></i>Run
                                    </button>
                                </li>
                            </ul>
                        </div>
                        
                        <section class="card-footer block_vert">
                            <div class="block_vert">
                                <div class="block_vert_half_top row_content_right_aligned">
                                    <button type="button"
                                            class="btn btn-danger btn-sm form_action_btn mr-4 nowrap_block"
                                            @click.prevent="settingsEditorCancel">
                                        <i :class="'i_link pt-1 '+getHeaderIcon('cancel')"></i>Cancel
                                    </button>
                                    <button type="submit"
                                            class="btn btn-success btn-sm form_action_btn ml-4 mr-4 a_link nowrap_block">
                                        <i :class="'i_link pt-1 '+getHeaderIcon('save')"></i>{{submitButtonLabel}}
                                    </button>
                                </div>
                            </div>
                        </section>
                    
                    </div>
                </div>
            </div> <!-- <div class="card"> -->
        
        </Form>
    </article> <!-- page_content_container -->

</template>

<script>
    import axios from 'axios'
    import app from '@/main.js'
    import {ref, computed, onMounted, onUnmounted} from 'vue'
    import {Field, Form, ErrorMessage} from 'vee-validate'
    import * as Yup from 'yup'
    import {useStore} from 'vuex'
    import {
        getClone,
        showPopupMessage,
        getHeaderIcon,
        momentDatetime,
        isEmpty,
        retrieveAppDictionaries,
        getFileSizeAsString
    } from '@/helpers/commonFuncs'

    import {
        settingsJsMomentDatetimeFormat,
        settingCredentialsConfig
    } from '@/app.settings.js'

    import EditorHeader from '@/components/EditorHeader.vue'

    import {useRouter} from 'vue-router'
    import mitt from 'mitt'

    const emitter = mitt()

    export default {
        name: 'settingsEditPage',
        components: {
            EditorHeader,
            Field,
            Form,
            ErrorMessage
        },

        setup() {
            let isPageUpdating = ref(false)
            let isPageLoading = ref(false)

            let formItemsPerPage = ref('') // Vars for any Field of the form
            let formBackendItemsPerPage = ref('')
            let formRateDecimalNumbers = ref('')
            const baseCurrencyList = ref([])

            let formSelectionBaseCurrency = ref('- Select base currency -')
            const credentialsConfig = settingCredentialsConfig
            const apiUrl = process.env.VUE_APP_API_URL

            const store = useStore()
            const router = useRouter()
            const formEditValidationRules = Yup.object().shape({
                // items_per_page: Yup.number().required().positive().integer().label('Items per page'),
                backend_items_per_page: Yup.number().required().positive().integer().label('Backend Items per page'),
                rate_decimal_numbers: Yup.number().required().positive().integer().max(12).label('rate decimal numbers'),
                base_currency: Yup.string().required(), //   age: yup.number().required().positive().integer(),
            })
            const currentLoggedUserToken = computed(
                () => {
                    return store.getters.token
                }
            )
            const submitButtonLabel = computed(
                () => {
                    return 'Update'
                }
            )

            const settingsEditOnMounted = async () => {
                retrieveAppDictionaries('settingsEditor', ['baseCurrencyList'])
                app.$emitter.on('appDictionariesRetrieved', (data) => {
                    console.log('appDictionariesRetrieved data::')
                    console.log(data)
                    if (data.requestKey === 'settingsEditor') {
                        baseCurrencyList.value = data.baseCurrencyList
                        loadSettings()
                    }
                })
            }

            function loadSettings() {
                isPageLoading.value = true
                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                // credentialsConfig.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                axios.get(apiUrl + '/admin/get-settings', credentials)
                    .then(({data}) => {
                        console.log('loadSettings data::')
                        console.log(data)

                        // formItemsPerPage.value = data.items_per_page
                        formBackendItemsPerPage.value = data.backend_items_per_page
                        formRateDecimalNumbers.value = data.rate_decimal_numbers
                        formSelectionBaseCurrency.value = ''
                        baseCurrencyList.value.map((nextBaseCurrencyLabel /*, index */) => {
                            if (nextBaseCurrencyLabel.code === data.base_currency) {
                                formSelectionBaseCurrency.value = nextBaseCurrencyLabel.label
                            }
                        })

                        isPageLoading.value = false
                    })
                    .catch(error => {
                        console.error(error)
                        showPopupMessage('Settings Editor', error.response.data.message, 'warn')
                        isPageLoading.value = false
                    })
            } // loadSettings() {

            function clearRatesHistory() {
                if (!confirm('Do you want to clear all Currency Rates History ?')) return;
                isPageUpdating.value = true
                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                axios.get(apiUrl + '/admin/clear_rates_history', credentials)
                    .then(({data}) => {
                        console.log('clearRatesHistory() data::')
                        console.log(data)

                        isPageUpdating.value = false
                        showPopupMessage('Rates history', 'Rates history was cleared successfully !', 'success')
                    })
                    .catch(error => {
                        console.error(error)
                        showPopupMessage('Rates history', error.response.data.message, 'warn')
                        isPageUpdating.value = false
                    })
            } // clearRatesHistory() {

            function runCurrencyRatesImportManually() {
                if (!confirm('Do you want to run currency rates import ?')) return;
                isPageUpdating.value = true
                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                axios.get(apiUrl + '/admin/run_currency_rates_import_manually', credentials)
                    .then(({data}) => {
                        isPageUpdating.value = false
                        showPopupMessage('Currency Rates Import', 'Currency rates import was run successfully !', 'success')
                    })
                    .catch(error => {
                        console.error(error)
                        showPopupMessage('Currency Rates Import', error.response.data.message, 'warn')
                        isPageUpdating.value = false
                    })
            } // runCurrencyRatesImportManually() {

            const settingsEditOnUnmounted = async () => {
            } // const settingsEditOnUnmounted = async () => {

            function onSubmit() {
                isPageUpdating.value = true
                let baseCurrency = ''
                baseCurrencyList.value.map((nextBaseCurrencyLabel) => {
                    if (nextBaseCurrencyLabel.label === formSelectionBaseCurrency.value) {
                        baseCurrency = nextBaseCurrencyLabel.code
                    }
                })

                let settingsData = {
                    // items_per_page: formItemsPerPage.value,
                    backend_items_per_page: formBackendItemsPerPage.value,
                    rate_decimal_numbers: formRateDecimalNumbers.value,
                    base_currency: baseCurrency,
                }
                console.log('/admin/update-settingssettingsData::')
                console.log(settingsData)

                let requestUrl = apiUrl + '/admin/update-settings'
                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                    axios.put(requestUrl, settingsData, credentials).then(({data}) => {
                        isPageUpdating.value = false
                        showPopupMessage('Settings Editor', 'Settings updated successfully !', 'success')
                        // router.push({path: '/admin/settings'})
                    }).catch((error) => {
                        console.error(error)
                        isPageUpdating.value = false
                        showPopupMessage('Settings Editor', 'Error updating settings !', 'warn')
                    })
            }

            function settingsEditorCancel() {
                router.push('/')
            }

            function getHeaderTitle() {
                return 'Edit Settings'
            }

            onMounted(settingsEditOnMounted)
            onUnmounted(settingsEditOnUnmounted)

            return { // setup return
                // Settings Form state
                isPageUpdating,
                isPageLoading,

                // settings Form fields
                formItemsPerPage,
                formBackendItemsPerPage,
                formSelectionBaseCurrency,
                formEditValidationRules,
                formRateDecimalNumbers,

                // Page actions
                loadSettings,
                onSubmit,
                clearRatesHistory,
                runCurrencyRatesImportManually,

                // arrays to fill selection options
                baseCurrencyList,

                // Settings vars
                settingsJsMomentDatetimeFormat,

                // Form elements rendering
                submitButtonLabel,
                settingsEditorCancel,
                getHeaderTitle,

                // Common methods
                getFileSizeAsString,
                getHeaderIcon

            }
        } // setup() {

    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/_variables.scss';

</style>
