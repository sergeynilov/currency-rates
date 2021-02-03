<template>
    <article class="admin_page_container">
        <Form @submit="onSubmit" :validation-schema="formEditValidationRules" class="currencyEdit">
            <!--                              currencyOrderingLabels::{{ currencyOrderingLabels}}-->
            
            <div class="card col-sm-12 col-md-10 p-2 m-0 mx-auto">
                <!--        formTitle::{{ formTitle}}<br>-->
                <!--                currencyActiveLabels::{{ currencyActiveLabels}}<br>-->
                <!--                currencyIsTopLabels::{{ currencyIsTopLabels}}<br>-->
                <!--                formSelectionOrdering::{{ formSelectionOrdering}}<br>-->
                <!--                formSelectionActive::{{ formSelectionActive}}<br>-->
                <!--                formSelectionIsTop::{{ formSelectionIsTop}}<br>-->
                <!--        formCreatedAt::{{ formCreatedAt}}<br>-->
                <!--        formUpdatedAt::{{ formUpdatedAt}}<br>-->
                <!--        formatFormUpdatedAt::{{ formatFormUpdatedAt}}<br>-->
                <!--        -->
                <!--        currencyId::{{ currencyId}}<br>-->
                <!--                isInsert::{{ isInsert}}<br>-->
                <!--                        isPageLoading::{{ isPageLoading}}<br>-->
                <!--                isPageUpdating::{{ isPageUpdating}}<br>-->
                <editor-header :show_loading_image="isPageUpdating || isPageLoading"
                               :header_icon="getHeaderIcon('currency')"
                               :header_title="getHeaderTitle()" :header_class="'card-header'">
                </editor-header>
                
                <div class="admin_data_block" v-show="!isPageLoading">
                    <div class="card-body card-block" v-show="!isPageLoading">
                        <dl class="block_2columns_md m-3" v-if="!isInsert"> <!-- id FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="id">id</label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="id"
                                    name="id"
                                    type="input"
                                    v-model="currencyId"
                                    class="form-control editable_field"
                                    readonly=readonly
                                />
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> id FIELD DEFINITION -->
                        
                        <dl class="block_2columns_md m-3"> <!-- name FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="name">
                                    Name<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="name"
                                    name="name"
                                    type="input"
                                    v-model="formName"
                                    class="form-control editable_field"
                                    placeholder="Unique string text"
                                    autocomplete=off
                                />
                                <ErrorMessage name="name" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> name FIELD DEFINITION -->
                        
                        <dl class="block_2columns_md m-3"> <!-- num_code FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="num_code">
                                    Num code<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="num_code"
                                    name="num_code"
                                    type="input"
                                    v-model="formNumCode"
                                    class="form-control editable_field"
                                    placeholder="Unique string text"
                                    autocomplete=off
                                />
                                <ErrorMessage name="num_code" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> num_code FIELD DEFINITION -->
                        
                        <dl class="block_2columns_md m-3"> <!-- char_code FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="char_code">
                                    Char code<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="char_code"
                                    name="char_code"
                                    type="input"
                                    v-model="formCharCode"
                                    class="form-control editable_field"
                                    placeholder="Unique string text"
                                    autocomplete=off
                                />
                                <ErrorMessage name="char_code" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> char_code FIELD DEFINITION -->
                        
                        <dl class="block_2columns_md m-3"> <!-- active FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="active">
                                    Active<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    name="active"
                                    as="select"
                                    class="form-control editable_field"
                                    v-model="formSelectionActive">
                                    <option value="" disabled selected>- Select Active -</option>
                                    <option v-for="(currencyActiveLabel) in currencyActiveLabels"
                                            :key="currencyActiveLabel.code">
                                        {{currencyActiveLabel.label}}
                                    </option>
                                </Field>
                                <ErrorMessage name="active" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> active FIELD DEFINITION -->
                        
                        <dl class="block_2columns_md m-3"> <!-- is_top FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="is_top">
                                    Is Top<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    name="is_top"
                                    as="select"
                                    class="form-control editable_field"
                                    v-model="formSelectionIsTop">
                                    <option value="" disabled selected>- Select is top -</option>
                                    <option v-for="(currencyIsTopLabel) in currencyIsTopLabels"
                                            :key="currencyIsTopLabel.code">
                                        {{currencyIsTopLabel.label}}
                                    </option>
                                </Field>
                                <ErrorMessage name="is_top" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> is_top FIELD DEFINITION -->
                        
                        <dl class="block_2columns_md m-3"> <!-- ordering FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="ordering">Ordering<span class="required"
                                                                                           aria-required="true"> * </span></label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    name="ordering"
                                    as="select"
                                    class="form-control editable_field"
                                    v-model="formSelectionOrdering">
                                    <option value="" disabled selected>- Select Ordering -</option>
                                    <option v-for="(currencyOrderingLabel) in currencyOrderingLabels"
                                            :key="currencyOrderingLabel.code">
                                        {{currencyOrderingLabel.label}}
                                    </option>
                                </Field>
                                <ErrorMessage name="ordering" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> ordering FIELD DEFINITION -->
                        
                        <dl class="block_2columns_md m-3" v-if="!isInsert"> <!-- created_at FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="created_at">Created at</label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="created_at"
                                    name="created_at"
                                    type="input"
                                    v-model="formatFormCreatedAt"
                                    class="form-control editable_field"
                                    readonly=readonly
                                />
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> created_at FIELD DEFINITION -->
                        
                        <dl class="block_2columns_md m-3" v-if="!isInsert && formatFormUpdatedAt">
                            <!-- updated_at FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="updated_at">Updated at</label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="updated_at"
                                    name="updated_at"
                                    type="input"
                                    v-model="formatFormUpdatedAt"
                                    class="form-control editable_field"
                                    readonly=readonly
                                />
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> updated_at FIELD DEFINITION -->
                        
                        <section
                            class="card-footer row_content_right_aligned reversed_background_color top_split_border p-0 pt-2">
                            <button type="button"
                                    class="btn btn-danger btn-sm form_action_btn mr-4 nowrap_block"
                                    @click.prevent="currencyEditorCancel">
                                <i :class="'i_link pt-1 '+getHeaderIcon('cancel')"></i>Cancel
                            </button>
                            <button type="submit"
                                    class="btn btn-success btn-sm form_action_btn ml-4 mr-4 a_link nowrap_block">
                                <i :class="'i_link pt-1 '+getHeaderIcon('save')"></i>{{submitButtonLabel}}
                            </button>
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
    } from '@/helpers/commonFuncs'

    import {
        settingsJsMomentDatetimeFormat,
        settingsCurrencyActiveLabels,
        settingsCurrencyIsTopLabels,
        settingCredentialsConfig
    } from '@/app.settings.js'

    import EditorHeader from '@/components/EditorHeader.vue'

    import {useRouter} from 'vue-router'
    import mitt from 'mitt'

    const emitter = mitt()

    export default {
        name: 'currencyEditPage',
        components: {
            EditorHeader,
            Field,
            Form,
            ErrorMessage
        },

        setup() {
            let isPageUpdating = ref(false)
            let isPageLoading = ref(false)
            let isInsert = ref(false)

            let currencyId = ref(null) // Vars for any Field of the form
            let formName = ref('')
            let formNumCode = ref('')
            let formCharCode = ref('')
            const currencyOrderingLabels = ref([])

            let formSelectionActive = ref('- Select Active -')
            let formSelectionIsTop = ref('- Select Is top -')
            let formSelectionOrdering = ref('- Select Ordering -')
            let formCreatedAt = ref('')
            let formUpdatedAt = ref('')
            const currencyIsTopLabels = settingsCurrencyIsTopLabels
            const currencyActiveLabels = settingsCurrencyActiveLabels
            const credentialsConfig = settingCredentialsConfig
            const apiUrl = process.env.VUE_APP_API_URL

            const store = useStore()
            const router = useRouter()
            const formEditValidationRules = Yup.object().shape({
                name: Yup.string().max(100).required().label('Currency name'),
                num_code: Yup.string().max(3).required().label('Currency num code'),
                char_code: Yup.string().max(3).required().label('Currency char code'),
                active: Yup.string().max(100).required().notOneOf(['- Select Active -'], 'Active is a required field'),
                is_top: Yup.string().max(100).required().notOneOf(['- Select is top -'], 'Is top is a required field'),
                ordering: Yup.string().required(),
            })
            const currentLoggedUserToken = computed(
                () => {
                    return store.getters.token
                }
            )
            const formatFormCreatedAt = computed(
                () => {
                    if (!formCreatedAt.value) return ''
                    return momentDatetime(formCreatedAt.value, settingsJsMomentDatetimeFormat)
                }
            )
            const formatFormUpdatedAt = computed(
                () => {
                    if (!formUpdatedAt.value) return ''
                    return momentDatetime(formUpdatedAt.value, settingsJsMomentDatetimeFormat)
                }
            )

            const submitButtonLabel = computed(
                () => {
                    return (!isInsert.value ? 'Update' : 'Insert')
                }
            )

            const currencyEditOnMounted = async () => {
                console.log('currencyEditOnMounted::')

                retrieveAppDictionaries('currencyEditor', ['currencyOrderingLabels'])
                app.$emitter.on('appDictionariesRetrieved', (data) => {
                    // console.log('appDictionariesRetrieved data::')
                    // console.log(data)
                    if (data.requestKey === 'currencyEditor') {
                        currencyOrderingLabels.value = data.currencyOrderingLabels
                        if (router.currentRoute.value.params.id === 'new') {
                            currencyId.value = 'new'
                            isPageLoading.value = false
                            isInsert.value = true
                        } else {
                            currencyId.value = router.currentRoute.value.params.id
                            loadCurrency()
                        }
                    }
                })
            }

            function loadCurrency() {
                isPageLoading.value = true
                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                // credentialsConfig.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                axios.get(apiUrl + '/admin/currencies/' + currencyId.value, credentials)
                    .then(({data}) => {
                        // console.log('loadCurrency data::')
                        // console.log(data)

                        formName.value = data.name
                        formNumCode.value = data.num_code
                        formCharCode.value = data.char_code
                        formSelectionIsTop.value = ''
                        // debugger
                        currencyIsTopLabels.map((nextCurrencyIsTopLabel) => {
                            if (nextCurrencyIsTopLabel.code === data.is_top) {
                                formSelectionIsTop.value = nextCurrencyIsTopLabel.label
                            }
                        })

                        formSelectionActive.value = ''
                        currencyActiveLabels.map((nextCurrencyActiveLabel /*, index */) => {
                            if (nextCurrencyActiveLabel.code === data.active) {
                                formSelectionActive.value = nextCurrencyActiveLabel.label
                            }
                        })

                        formSelectionOrdering.value = ''
                        currencyOrderingLabels.value.map((nextCurrencyOrderingLabel) => {
                            if (parseInt(nextCurrencyOrderingLabel.code) === parseInt(data.ordering)) {
                                formSelectionOrdering.value = nextCurrencyOrderingLabel.label
                            }
                        })

                        formCreatedAt.value = data.created_at
                        formUpdatedAt.value = data.updated_at
                        isPageLoading.value = false
                    })
                    .catch(error => {
                        console.error(error)
                        showPopupMessage('Currencies Editor', error.response.data.message, 'warn')
                        isPageLoading.value = false
                    })
            } // loadCurrency() {

            const currencyEditOnUnmounted = async () => {
                console.log('currencyEditOnUnmounted::')
            } // const currencyEditOnUnmounted = async () => {

            function onSubmit() {
                console.log('++onSubmit::')

                isPageUpdating.value = true
                let formIsTop = ''
                currencyIsTopLabels.map((nextCurrencyIsTopLabel) => {
                    if (nextCurrencyIsTopLabel.label === formSelectionIsTop.value) {
                        formIsTop = nextCurrencyIsTopLabel.code
                    }
                })
                let formActive = ''
                currencyActiveLabels.map((nextCurrencyActiveLabel) => {
                    if (nextCurrencyActiveLabel.label === formSelectionActive.value) {
                        formActive = nextCurrencyActiveLabel.code
                    }
                })

                let formOrdering = ''
                currencyOrderingLabels.value.map((nextCurrencyOrderingLabel) => {
                    if (nextCurrencyOrderingLabel.label === formSelectionOrdering.value) {
                        formOrdering = nextCurrencyOrderingLabel.code
                    }
                })

                let currencyData = {
                    id: currencyId.value,
                    name: formName.value,
                    num_code: formNumCode.value,
                    char_code: formCharCode.value,
                    is_top: formIsTop,
                    active: formActive,
                    ordering: formOrdering,
                }
                console.log('++currencyData::')
                console.log(currencyData)

                let requestUrl = apiUrl + '/admin/currencies' + (isInsert.value ? '' : '/' + currencyId.value)
                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                if (isInsert.value) {
                    axios.post(requestUrl, currencyData, credentials).then(({data}) => {
                        // console.log('data::')
                        // console.log(data)

                        formSelectionOrdering.value = data.ordering
                        isPageUpdating.value = false
                        showPopupMessage('Currency Editor', 'Currency added successfully !', 'success')
                        isInsert.value = false
                        currencyId.value = data.id
                        formCreatedAt.value = data.created_at
                        router.push({path: '/admin/currencies/edit/' + currencyId.value})
                    }).catch((error) => {
                        console.error(error)
                        if (error.response.status === 422) { // validation errors
                            if (typeof error.response.data.errors === 'object') {
                                let errorFieldsTextArray = []
                                let errorsTextArray = []

                                let errorsKeysArr = Object.keys(error.response.data.errors)
                                let errStr = ''
                                errorsKeysArr.map((key) => {
                                    errorFieldsTextArray.push(key)
                                    const errorText = error.response.data.errors[key]
                                    let errors1 = Object.values(errorText)
                                    if (errors1) {
                                        errorsTextArray.push(errors1[0])
                                        errStr += key + ' : ' + errors1[0]
                                    }
                                })
                                showPopupMessage('Currency Editor', errStr, 'warn')
                            }
                            return
                        } // if (error.response.status === 422 ) { // validation errors

                        showPopupMessage('Currency Editor', 'Error adding currency !', 'warn')
                    })
                } // inserting new

                if (!isInsert.value) {
                    axios.put(requestUrl, currencyData, credentials).then(({data}) => {
                        isPageUpdating.value = false
                        showPopupMessage('Currency Editor', 'Currency updated successfully !', 'success')
                        router.push({path: '/admin/currencies'})
                    }).catch((error) => {
                        if (error.response.status === 422) { // validation errors
                            if (typeof error.response.data.errors === 'object') {
                                let errorFieldsTextArray = []
                                let errorsTextArray = []

                                let errorsKeysArr = Object.keys(error.response.data.errors)
                                let errStr = ''
                                errorsKeysArr.map((key) => {
                                    // console.log('key::')
                                    // console.log(key)
                                    errorFieldsTextArray.push(key)
                                    const errorText = error.response.data.errors[key]
                                    // console.log('__errorText::')
                                    // console.log(typeof errorText)
                                    // console.log(errorText)
                                    let errors1 = Object.values(errorText)
                                    if (errors1) {
                                        errorsTextArray.push(errors1[0])
                                        errStr += key + ' : ' + errors1[0]
                                    }
                                })
                                showPopupMessage('Currency Editor', errStr, 'warn')
                            }
                            return
                        } // if (error.response.status === 422 ) { // validation errors

                        console.log('error.errorCode:::')
                        console.log(error.errorCode)

                        isPageUpdating.value = false
                        showPopupMessage('Currency Editor', 'Error updating currency !', 'warn')
                    })
                } // editing existing currency
            }

            function currencyEditorCancel() {
                router.push('/admin/currencies')
            }

            function getHeaderTitle() {
                if (!isInsert.value) return 'Edit Currency'
                return 'Add Currency'
            }

            onMounted(currencyEditOnMounted)
            onUnmounted(currencyEditOnUnmounted)

            return { // setup return
                // Currency Form state
                isPageUpdating,
                isPageLoading,
                isInsert,
                currencyId,

                // Currency Form fields
                formName,
                formNumCode,
                formCharCode,
                formSelectionIsTop,
                formSelectionActive,
                formSelectionOrdering,
                formCreatedAt,
                formUpdatedAt,
                formEditValidationRules,
                formatFormCreatedAt,
                formatFormUpdatedAt,

                // Page actions
                loadCurrency,
                onSubmit,

                // arrays to fill selection options
                currencyActiveLabels,
                currencyIsTopLabels,

                currencyOrderingLabels,

                // Settings vars
                settingsJsMomentDatetimeFormat,

                // Form elements rendering
                submitButtonLabel,
                currencyEditorCancel,
                getHeaderTitle,

                // Common methods
                getHeaderIcon

            }
        } // setup() {

    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/_variables.scss';

</style>
