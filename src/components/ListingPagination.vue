<template>
  <section class="m-0 p-2  pagination row_content">
  
<!--    pages.length::{{ pages.length }}<br>-->
<!--        parentComponentKey::{{ parentComponentKey }}<br>-->
<!--    paginationPages::{{ paginationPages}}<br>-->
    <ul :class="'floating_items' + ' listing_pagination_' + parentComponentKey" >
      
      <li class="floating_items" v-show="hasPrev() && showNextPriorButtons">
        <a href="#" @click.prevent="changePage(prevPage)" class="a_link">Prior</a>
      </li>
      
      <li class="floating_items" v-show="hasFirst()">
        <a href="#" @click.prevent="changePage(1)" class="link_cell a_link">1</a>
      </li>
      
      <li class="floating_items" v-show="hasFirst()">
        ...
      </li>
      
      <li class="floating_items" v-for="page in paginationPages" :key="page">
        <a href="#" @click.prevent="changePage(page)" :class="{ currentPage: currentPage === page }"
           class="link_cell a_link">
          {{ page }}
        </a>
      </li>
      
      <li class="floating_items" v-show="hasLast()">
        ...
      </li>
      
      <li class="floating_items" v-show="hasLast()">
        <a href="#" @click.prevent="changePage(totalPages)" class="link_cell a_link">
          {{ totalPages }}
        </a>
      </li>
  
      <li class="floating_items" v-show="totalPages > 0 && paginationPages.length > 0">
        <span
          v-show="showPageNumberLabel && paginationPages.length">Page&nbsp;{{ currentPage }}&nbsp;of&nbsp;{{ paginationPages.length}}.</span>
        <span v-show="showRowsLabel" class="pl-1">&nbsp;{{ totalRowsCount }} {{ itemTitle }} found</span>
      </li>
    
    </ul>
  
  </section>

</template>

<script>
  import { isEmpty, capitalize } from '@/helpers/commonFuncs'
  import { computed, ref } from 'vue'
  import app from '@/main.js'
  import mitt from 'mitt'
  const emitter = mitt()

  export default {
    props: {
      currentPage: {
        type: Number,
        required: true,
        default: 1
      },
      totalRowsCount: {
        type: Number,
        required: true,
        default: 1
      },
      itemsPerPage: {
        type: Number,
        required: true,
      },
      showNextPriorButtons: {
        type: Boolean,
        required: true,
        default: true
      },
      showPageNumberLabel: {
        type: Boolean,
        required: false,
        default: false
      },
      showRowsLabel: {
        type: Boolean,
        required: false,
        default: false
      },
      itemTitle: {
        type: String,
        required: false,
        default: 'item'
      },
      parentComponentKey: {
        type: String,
        default: () => {
        }
      },

    }, // props: {

    setup (props) {
      // PROPS COMPUTED START
      const currentPage = computed(() => {
        return props.currentPage
      })
      const totalRowsCount = computed(() => {
        return props.totalRowsCount
      })
      const itemsPerPage = computed(() => {
        return props.itemsPerPage
      })
      const showNextPriorButtons = computed(() => {
        return props.showNextPriorButtons
      })
      const showPageNumberLabel = computed(() => {
        return props.showPageNumberLabel
      })
      const showRowsLabel = computed(() => {
        return props.showRowsLabel
      })
      const itemTitle = computed(() => {
        return props.itemTitle
      })
      const pagesRange = computed(() => {
        return props.pagesRange
      })
      const parentComponentKey = computed({
        get: () => props.parentComponentKey
      })

      // PROPS COMPUTED END

      const paginationPages = computed(() => {
        let pages = []
        if (rangeStart.value === 1 && rangeEnd.value === 1) return pages
        for (let i = rangeStart.value; i <= rangeEnd.value; i++) {
          pages.push(i)
        }
        return pages
      })
      // COMPUTED BLOCK START
      const rangeStart = computed(() => {
        let start = currentPage.value - pagesRange.value
        return (start > 0) ? start : 1
      })
      const rangeEnd = computed(() => {
        let end = currentPage.value + pagesRange.value
        return (end < totalPages.value) ? end : totalPages.value
      })
      const totalPages = computed(() => {
        return Math.ceil(totalRowsCount.value / itemsPerPage.value)
      })
      const nextPage = computed(() => {
        return currentPage.value + 1
      })
      const prevPage = computed(() => {
        return currentPage.value - 1
      })
      // COMPUTED BLOCK END

      // FUNCTIONS BLOCK START
      function hasFirst () {
        return rangeStart.value !== 1
      }

      function hasLast () {
        return rangeEnd.value < totalPages.value
      }

      function hasPrev () {
        return currentPage.value > 1
      }

      function hasNext () {
        return currentPage.value < totalPages.value
      }

      function changePage(page) {
        // console.log('changePage page::')
        // console.log(page)
        app.$emitter.emit('paginationPageChangedEvent', { parentComponentKey: parentComponentKey.value, page: page })
      }

      // FUNCTIONS BLOCK END
      return { // setup return
        // Component data
        isEmpty,
        // Page actions
        paginationPages,
        totalPages,
        hasFirst,
        hasLast,
        hasPrev,
        hasNext,
        changePage
      }
    }, // setup(props) {

  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_variables.scss';
  
  .pagination {
    width: 100%;
    display: flex;
    justify-content: flex-start !important;
    margin: 30px auto 30px;
    padding: 0 10px;
    max-width: 1280px;
  }
  
  .pagination__left, .pagination__right {
    width: 20%;
  }
  
  .pagination__left {
    float: left;
  }
  
  .pagination__right {
    float: right;
  }
  
  .pagination__right a {
    float: right;
  }
  
  .pagination a, .pagination span {
    display: block;
    text-align: center;
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 34px;
    height: 36px;
    color: $text-color;
    font-size: $font_size;
  }
  
  .pagination a {
    padding: 0 10px;
    max-width: 160px;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #ccc;
    text-decoration: none;
    margin: 0 6px;
    transition: all .2s ease-in-out;
  }
  
  .pagination a.currentPage {
    border-color: $text-color;
    font-weight: bold;
  }
  
  @media (hover) {
    .pagination a:hover {
      border-color: #939393;
      color: #939393;
    }
  }
  
  .pagination__mid {
    display: flex;
    justify-content: center;
    width: 60%;
  }
  
  .pagination__mid ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .pagination__mid li {
    display: inline-block;
  }
  
  .link_cell_wrapper {
    display: flex;
    flex: 0 0 50px;
    flex-wrap: wrap;
    padding: 6px;
  }
  
  .link_cell {
    display: flex;
    width: 100% !important;
  }
</style>
