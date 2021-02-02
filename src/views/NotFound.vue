<template>
    <article class="page_content_container card">
        
        <h3 class="card-header p-2">
            <i class="fa fa-bug">Path Error.</i>
        </h3>
    
        <div class="frontend_data_block mb-3">
            <h4 class="card-body p-2">
                The requested "{{ invalidUrl }}" page not found.
            </h4>
            
            <h5 class="card-footer p-2">
                <router-link :to="{ name: 'home' }" class="a_link">Home</router-link>
            </h5>
        </div> <!-- <div class="frontend_data_block mb-3"> -->
    
    </article>

</template>

<script>
    import { ref, onMounted, defineComponent } from 'vue'
    import {useRouter} from 'vue-router'
    import {getHeaderIcon} from '@/helpers/commonFuncs'

    export default defineComponent({
        name: 'notFoundPage',
        components: {
        },
        setup () {
            const invalidUrl = ref('')

            const notFoundMounted = async () => {
                const router = useRouter()
                invalidUrl.value = router.currentRoute.value.fullPath
            }

            onMounted(notFoundMounted)

            return {
                invalidUrl,
                getHeaderIcon
            }
        } // setup() {

    })

</script>
