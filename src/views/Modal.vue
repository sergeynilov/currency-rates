<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    
                    <div class="modal-header">
                        <slot name="header">
                            default header
                        </slot>
                    </div>
                    
                    <div class="modal-body">
                        <slot name="body">
                            default body
                        </slot>
                    </div>
                    
                    <div class="modal-footer">
                        <slot name="footer">
                            default footer
                            <button class="modal-default-button" @click.prevent="$emit('close')">
                                OK
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<style scoped lang="scss">
    @import '@/assets/scss/_variables.scss';
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        /*opacity : 0.3;*/
        transition: opacity 0.3s ease;
    }
    
    .modal-wrapper {
        /*display: table-cell;*/
        vertical-align: middle;
        display: flex !important;
        justify-self: center !important;
        justify-content: center !important;
        justify-items: center !important;
        /*opacity : 0.5;*/
        /*border: 4px solid green;*/
    }
    
    .modal-container {
        /*display: flex !important;*/
        /*justify-self: center !important;*/
        width: 600px;
        /*overflow-x:scroll;*/
        /*overflow-y:scroll;*/
        margin: 0px auto;
        /*max-height:500px;*/
        margin-top: 70px !important;
        padding: 5px 8px;
        background-color: $background_color;
        /*border: 3px dotted red;*/
        transition: all 0.3s ease;
        font-family: $app_font_family;
        border: $item-border;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    
    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }
    
    .modal-body {
        /*margin: 20px 0;*/
        overflow-x:none;
        overflow-y:scroll;
        margin: 0px auto;
        max-height:500px;
        /*border: 4px dotted yellow;*/
    }
    
    .modal-default-button {
        display: block;
        margin-top: 1rem;
    }
    
    /*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */
    
    .modal-enter {
        opacity: 0;
    }
    
    .modal-leave-active {
        opacity: 0;
    }
    
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

    // DIFFERENT DEVICES BLOCK START

    @media only screen and (min-width: 1280px) { /* Extra large ≥ 1200px  */
        .modal-container {
            max-width: 1080px;
            /*height: auto;*/
            padding: 4px;
            margin: 0;
        }
    } /* Extra large ≥ 1200px */

    @media only screen and (min-width: 992px) and (max-width: 1280px) { /* lg */
        .modal-container {
            max-width: 820px;
            max-height:700px;
            margin-top: 50px !important;
        }
    }  /* lg */

    /* Medium ≥768px  ipad or ipad mini */
    @media only screen and (min-width: 768px) and (max-width: 991px) { /* Ipad Pro md */
        .modal-container {
            max-width: 600px;
            /*height: auto;*/
            padding: 4px;
            margin: 0;
        }
    }  /* Ipad Pro md */

    /* Small ≥ 576px Nexus7  - sm*/
    @media only screen and (min-width: 576px) and (max-width: 767px) {  /* sm */
        .modal-container {
            max-width: 500px;
            /*height: auto;*/
            padding: 4px;
            margin: 0;
        }
    }

    @media only screen and (max-width: 575px) { /* Extra small < 576px iphon5/SE */
        .modal-container {
            max-width: 260px;
            /*height: auto;*/
            padding: 4px;
            margin: 0;
        }
    } /* xs */
    
    // DIFFERENT DEVICES BLOCK END

</style>
