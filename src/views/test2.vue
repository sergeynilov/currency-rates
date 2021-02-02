<template>
    <div>
        showModal::{{ showModal }}<br>;
        <button id="show-modal" @click.prevent="showModal = true">Show Modal</button>
        <!-- use the modal component, pass in the prop -->
        <modal v-if="showModal" @close="showModal = false">
            <!--
              you can use custom content here to overwrite
              default content
            -->
            <template v-slot:header>
                <h3>custom header</h3>
            </template>
        </modal>
    </div>
</template>

<script>
    import { ref, onMounted, defineComponent } from 'vue'
    import modal from '../views/Modal.vue'
    export default defineComponent({
        name: 'test2Page',
        components: {
            modal
        },
        setup () {
            let showModal = ref(false)

            const test2OnMounted = async () => {
                console.log('test2OnMounted!!!::')
            }

            onMounted(test2OnMounted)

            return {
                showModal
            }
        } // setup() {

    })

</script>
