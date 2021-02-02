<template>
    <article class="admin_page_container">
        <Form @submit="onSubmit" :validation-schema="formEditValidationRules" class="currencyEdit">
            
            <div class="card col-sm-12 col-md-10 p-2 m-0 mx-auto">
                
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
                        
                        <section class="card-footer block_vert">
                            <div class="block_vert">
                                <div class="block_vert_half_top row_content_right_aligned">
                                    <button type="button"
                                            class="btn btn-danger btn-sm form_action_btn mr-4 nowrap_block"
                                            @click.prevent="currencyEditorCancel">
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
        retrieveAppDictionaries,
        getFileSizeAsString
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

            let formSelectionActive = ref('- Select Active -') // Select inputs defined
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

            function loadCurrency() { // edito item is loaded
                isPageLoading.value = true
                let credentials = getClone(credentialsConfig)
                credentials.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                // credentialsConfig.headers.Authorization = 'Bearer ' + currentLoggedUserToken.value
                axios.get(apiUrl + '/admin/currencies/' + currencyId.value, credentials)
                    .then(({data}) => {

                        formName.value = data.name
                        formNumCode.value = data.num_code
                        formCharCode.value = data.char_code

                        formSelectionActive.value = '' // I fill select input with text by code id from db
                        currencyActiveLabels.map((nextCurrencyActiveLabel /*, index */) => {
                            if (nextCurrencyActiveLabel.code === data.active) {
                                formSelectionActive.value = nextCurrencyActiveLabel.label
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
                    ...
                } // editing existing currency
            }

            function currencyEditorCancel() {
                router.push('/admin/currencies')
            }

            onMounted(currencyEditOnMounted)
            onUnmounted(currencyEditOnUnmounted)

            return { // setup return
                isPageUpdating,
                ...
            }
        } // setup() {

    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/_variables.scss';

</style>
