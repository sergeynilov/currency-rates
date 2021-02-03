<template>
    <article class="page_content_container">
        <Form @submit="onSubmit" :validation-schema="loginValidationRules" class="login">
            <div class="card col-sm-12 col-md-6 p-2 m-0 mx-auto">
                <!--        isPageUpdating::{{ isPageUpdating}}<br>-->
                <editor-header :show_loading_image="isPageUpdating" :header_icon="getHeaderIcon('login')"
                               :header_title="getHeaderTitle()" :header_class="'card-header'">
                </editor-header>
                
                <div class="frontend_data_block mb-3">
                    <div class="card-body card-block">
                        
                        <p class="alert alert-info m-0 p-1 text-center row_content_centered wrapping_text" role="alert"
                           v-if="demoVersion">
                            For demo version use predefined credentials to login and review all pages
                        </p>
                        
                        <dl class="block_2columns_md m-2"> <!-- email FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="email">
                                    Email<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    v-model="email"
                                    class="form-control editable_field"
                                    placeholder="Your email address"
                                    autocomplete=off
                                />
                                <ErrorMessage name="email" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> email FIELD DEFINITION -->
                        
                        <dl class="block_2columns_md m-2"> <!-- password FIELD DEFINITION -->
                            <dt class="horiz_divider_left_13">
                                <label class="col-form-label" for="password">
                                    Password<span class="required" aria-required="true"> * </span>
                                </label>
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    v-model="password"
                                    class="form-control editable_field"
                                    placeholder="Your password"
                                    autocomplete=off
                                />
                                <ErrorMessage name="password" as="p" class="validation_error"/>
                            </dd>
                        </dl> <!-- <dt class="block_2columns_md m-0"> password FIELD DEFINITION -->
                        
                        <dl class="block_2columns_md m-2">
                            <dt class="horiz_divider_left_13">
                            </dt>
                            <dd class="horiz_divider_right_23">
                                <ul class="ul_horiz_lis">
                                    <li class="ul_horiz_lis_left_aligned_icon pt-2">
                                        <input type="checkbox" v-model="rememberMe" id="remember_me">
                                    </li>
                                    <li class="ul_horiz_lis_right_aligned_content">
                                        <label for="remember_me">Remember Me
                                        </label>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                        
                        <section class="card-footer row_content_right_aligned reversed_background_color top_split_border p-0 pt-2">
                            <button type="reset"
                                    class="btn btn-danger btn-sm form_action_btn nowrap_block">
                                <i :class="'i_link pt-1 '+getHeaderIcon('cancel')"></i>Reset
                            </button>
                            <button type="submit"
                                    class="btn btn-success btn-sm form_action_btn ml-4 mr-1 a_link nowrap_block">
                                <i :class="'i_link pt-1 '+getHeaderIcon('save')"></i>Login
                            </button>
                        </section>
                    
                    </div>
                </div> <!-- <div class="frontend_data_block mb-3"> -->
            </div> <!-- <div class="card"> -->
            
        </Form>
    </article> <!-- page_content_container -->

</template>

<script>
    import app from '@/main.js'
    import {ref, onMounted, onUnmounted} from 'vue'
    import {Field, Form, ErrorMessage} from 'vee-validate'
    import * as Yup from 'yup'
    import {useStore} from 'vuex'
    import {useRouter} from 'vue-router'
    import {showPopupMessage, getHeaderIcon} from '@/helpers/commonFuncs'

    import EditorHeader from '@/components/EditorHeader.vue'

    import mitt from 'mitt'

    const emitter = mitt()
    const demoVersion = process.env.VUE_APP_DEMO_VERSION === 'true'

    export default {
        name: 'loginPage',
        components: {
            EditorHeader,
            Field,
            Form,
            ErrorMessage
        },

        setup() {
            let isPageUpdating = ref(false)
            let email = ref('')
            let password = ref('')

            if (demoVersion) {
                password = ref('pa3s&w2rd1')
                email = ref('adminer@currency.site.com')
            }

            let rememberMe = ref(false)

            const store = useStore()
            const router = useRouter()
            const loginValidationRules = Yup.object().shape({
                email: Yup.string().email().required().label('Email Address'),
                password: Yup.string().min(5).required().label('Your Password')
            })

            const loginOnMounted = async () => {
                app.$emitter.on('authLoggedError', () => {
                    showPopupMessage('Login', 'Login error!', 'warn')
                })
            }
            const loginOnUnmounted = async () => {
                console.log('loginOnUnmounted')
            }

            function onSubmit(credentials) {
                isPageUpdating.value = true

                app.$store.dispatch('login', credentials)
                    .then(({data}) => {
                        router.push('/') // DEBUGGING
                        // router.push('/admin/currencies/edit/32') // DEBUGGING
                        isPageUpdating.value = false
                    })
                    .catch(error => {
                        console.error(error)
                        // showPopupMessage('Login', 'Failed to login', 'warn')
                        isPageUpdating.value = false
                    })
            }

            function getHeaderTitle() {
                return 'Login'
            }

            onMounted(loginOnMounted)
            onUnmounted(loginOnUnmounted)

            return { // setup return
                // Settings Form state
                isPageUpdating,
                email,
                password,
                rememberMe,
                loginValidationRules,
                demoVersion,

                // Page actions
                onSubmit,

                getHeaderTitle,

                // Common methods
                getHeaderIcon
            }
        } // setup() {

    }
</script>
