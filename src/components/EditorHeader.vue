<template>
  <div class="column_content_centered p-1 m-0">
    
    <div class="row_content_centered editor_header">
      <div v-show="show_loading_image" class="loading"></div>
      <div style="display:flex; flex : 1 0 310px; align-self: center;" class="p-0"
           v-show="!show_loading_image">
        <h3 style="display: flex; flex-wrap: nowrap;" :class="header_class+' row_content_left_aligned'">
          <i v-show="header_icon" :class="header_icon+' m-0 mr-1 ml-2 p-0'" style="margin-top: 2px !important;"></i>
          <span v-html="header_title"></span>
        </h3>
      </div>
      
      <div v-if="right_icon!= ''" style="display:flex; align-self: flex-end;" class="mb-2">
        <i :class="'i_link '+right_icon_class" title="Refresh" @click.prevent="triggerEditorHeaderRightButtonClickedEvent"></i>
      </div>
    
    </div>
    
    <div v-if="message" class="text-danger m-2">
      <strong>{{ message }}</strong>
    </div>
  
  </div>

</template>

<script>

  export default {

    props: {
      message: {
        required: false,
        default: ''
      },
      header_class: {
        type: String,
        required: false,
        default: ''
      },
      header_title: {
        type: String,
        required: true,
        default: ''
      },
      header_icon: {
        type: String,
        required: false,
        default: ''
      },
      show_loading_image: {
        type: Boolean,
        required: true,
        default: true
      },

      right_icon: {
        type: String,
        required: false,
        default: ''
      },
      parent_component_key: {
        type: String,
        required: false,
        default: ''
      }

    },

    methods: {
      triggerEditorHeaderRightButtonClickedEvent () {
        // bus.$emit('editorHeaderRightButtonClickedEvent', this.parent_component_key)
      }
    },
    computed: {

      right_icon_class () {
        return this.right_icon + ' a_link p-1 m-0'
      }

    } // computed: {

  }
</script>
