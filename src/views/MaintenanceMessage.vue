<template>
    <section class="page_content_container">
        
        <h3 class="card-title p-2">
            <i :class="'info_link '+getHeaderIcon('maintenance')"></i>
            Site is under Maintenance now.
        </h3>
        
        <div class="frontend_data_block mb-3">
            <h4 class="card-body p-2">
                Please, return later...
            </h4>
            
            <h5 class="card-footer p-2 page_content_footer">
                <router-link :to="{ name: 'home' }">Home</router-link>
            </h5>
        </div> <!-- <div class="frontend_data_block mb-3"> -->
    
    </section>

</template>

<script>
    import {ref, onMounted, defineComponent} from 'vue'
    import {getHeaderIcon} from '@/helpers/commonFuncs'

    export default defineComponent({
        name: 'maintenancePage',
        components: {},
        setup() {
            const maintenanceMounted = async () => {
            }

            onMounted(maintenanceMounted)

            return {
                getHeaderIcon
            }
        } // setup() {

    })

</script>
