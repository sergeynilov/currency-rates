<template>
  
  <section :class="'column_content_centered listing_header listing_header_' + parentComponentKey" class="m-2 p-2">
<!--    rightAddButtonLink::{{ rightAddButtonLink }}<br>-->
<!--    rightAddButtonLinkTitle::{{ rightAddButtonLinkTitle }}<br>-->
<!--    rightIconTitle::{{ rightIconTitle }}<br>-->
<!--    rightIcon::{{ rightIcon }}<br>-->
<!--    noDataFoundLabel::{{ noDataFoundLabel }}<br>-->
<!--    parentComponentKey::{{ parentComponentKey }}<br>-->
<!--    headerTitle::{{ headerTitle}}&nbsp;&nbsp;rowsCount::{{ rowsCount}}<br>customTitle::{{ customTitle}}-->
    <div class="row_content">
      
      <div v-if="showLoadingImage" class="loading"></div>
      <div class="row_content">
        <h3 class="flex-nowrap row_content_left_aligned" style="display: flex; flex: 1;">
          <i :class="headerIcon+' m-0 p-0 '" :title="headerTitle" v-if="headerIcon"></i>&nbsp;
          <span v-html="( !isEmpty(rowsCount) ? rowsCount +' ' : '' ) + itemTitle" v-if="!customTitle && itemTitle && !showLoadingImage"></span>
          <span v-html="customTitle" v-if="customTitle"></span>
        </h3>
        
        <div v-if="!showLoadingImage && (rightAddButtonLinkTitle || rightIcon) "
             class="row_content_right_aligned" style="display: flex; flex: 0 1 100px;">
          <router-link :to="{ name: rightAddButtonLink, params: { id: 'new' } }"
                       :class="'btn btn-sm btn-success  m-0 p-1 pl-3 pr-3 listing_add_button_' +parentComponentKey"
                       v-show="rightAddButtonLink">
            {{ rightAddButtonLinkTitle }}
          </router-link>
          <div v-if="rightIcon">
            <i :class="'ml-4 mb-2 mr-2 p-1 a_link_reversed ' + rightIcon" :title="rightIconTitle"
               @click.prevent="triggerListingHeaderRightButtonClickedEvent"></i>
          </div>
        
        </div>
      
      </div>
      
      <div v-if="rightAddButtonLink2">&nbsp;&nbsp;
      <router-link :to="{ name: rightAddButtonLink2, params: { id: 'new' } }" class="btn p-1 m-1 btn-success">
          {{ rightAddButtonLink2 }}
        </router-link>
      </div>
    
    </div>
    
    <div v-if="message" class="text-danger m-2">
      <strong>{{ message }}</strong>
    </div>
    
    <div v-if="( !showLoadingImage && !itemsListLength && noDataFoundLabel && showNoDataFoundLabel ) && !message"
      class="no_data_found">
      <i :class="'pt-1 '+getHeaderIcon('info')"></i>
       {{ capitalize(noDataFoundLabel) }}
    </div>
  
  </section>

</template>

<script>
  import { isEmpty, capitalize, getHeaderIcon } from '@/helpers/commonFuncs'
  import { computed, ref } from 'vue'
  import app from '@/main.js'

  export default {
    props: {
      parentComponentKey: {
        type: String,
        default: () => {
        }
      },
      message: {
        type: String,
        default: () => {
        }
      },
      headerTitle: {
        type: String,
        default: () => {
        }
      },
      headerIcon: {
        type: String,
        default: () => {
        }
      },
      rowsCount: {
        type: Number,
        default: () => {
        }
      },
      currentPage: {
        type: Number,
        default: () => {
        }
      },
      rightIcon: {
        type: String,
        default: () => {
        }
      },
      customTitle: {
        type: String,
        default: () => {
        }
      },
      itemTitle: {
        type: String,
        default: () => {
        }
      },
      noDataFoundLabel: {
        type: String,
        default: 'no data found. Try change filter options.'
      },
      showNoDataFoundLabel: {
        type: Boolean,
        default: true,
      },
      showLoadingImage: {
        type: Boolean,
        default: false,
        required: true
      },
      itemsListLength: {
        type: Number,
        default: 0
      },
      rightAddButtonLink: {
        type: String,
      },
      rightAddButtonLinkTitle: {
        type: String,
        default: 'Add'
      },
      rightIconTitle: {
        type: String,
        default: 'Refresh'
      },
      rightAddButtonLink2: {
        type: String,
      },
      rightAddButtonLink2Title: {
        type: String,
      }
    }, // props: {

    setup (props) {
      const parentComponentKey = computed({
        get: () => props.parentComponentKey
      })
      const message = computed({
        get: () => props.message
      })
      const headerTitle = computed({
        get: () => props.headerTitle
      })
      const headerIcon = computed({
        get: () => props.headerIcon
      })
      const rowsCount = computed({
        get: () => props.rowsCount
      })
      const currentPage = computed({
        get: () => props.currentPage
      })
      const rightIcon = computed({
        get: () => props.rightIcon
      })
      const customTitle = computed({
        get: () => props.customTitle
      })
      const itemTitle = computed({
        get: () => props.itemTitle
      })
      const noDataFoundLabel = computed({
        get: () => props.noDataFoundLabel
      })
      const showLoadingImage = computed({
        get: () => props.showLoadingImage
      })
      const rightAddButtonLink = computed({
        get: () => props.rightAddButtonLink
      })
      const rightAddButtonLinkTitle = computed({
        get: () => props.rightAddButtonLinkTitle
      })
      const rightIconTitle = computed({
        get: () => props.rightIconTitle
      })
      const rightAddButtonLink2 = computed({
        get: () => props.rightAddButtonLink2
      })
      const rightAddButtonLink2Title = computed({
        get: () => props.rightAddButtonLink2Title
      })

      function triggerListingHeaderRightButtonClickedEvent () {
        // console.log('SOURCE triggerListingHeaderRightButtonClickedEvent parentComponentKey::')
        // console.log(parentComponentKey)
        app.$emitter.emit('listingHeaderRightButtonClickedEvent', { parentComponentKey: parentComponentKey.value })
      }

      return {
        isEmpty,
        capitalize,
        getHeaderIcon,
        triggerListingHeaderRightButtonClickedEvent
      }
    }, // setup(props) {

  }
</script>
