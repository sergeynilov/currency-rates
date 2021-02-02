<template>
  <div>
    
    selectedTab:{{ selectedTab}}<br>
    <h3>Basic Example</h3>
    <tabs
      v-model="selectedTab"
    >
      <tab
        class="tab"
        :key="'tab_details'"
        :val="1"
        :label="'Details'"
        :indicator="true"
      />
      <tab
        class="tab"
        :key="'tab_about'"
        :val="2"
        :label="'About'"
        :indicator="true"
      />
    </tabs>
    <tab-panels
      v-model="selectedTab"
      :animate="true"
    >
      
      <tab-panel
        :key="'tp_details'"
        :val="1"
      >
        <h3>Details</h3>
        <div>
          <input type="text" value="test text">
        </div>
        <div>
        <p>Lorem <strong>ipsum dolor sit</strong> amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis <strong>nostrud exercitation</strong> ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.
        </p>
        <p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. <i>Excepteur sint  occaecat</i> cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.
        </p>
        <ul>
          <li>Lorem 1st point </li>
          <li>Lorem 2nd point </li>
          <li>Lorem 3rd point </li>
        </ul>
        <p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. <i>Excepteur sint  occaecat</i> cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.
        </p>
        </div>
      </tab-panel>
      
      <tab-panel
        :key="'tp_about'"
        :val="2"
      >
        <h3>About</h3>
        <p>Lorem <strong>ipsum dolor sit</strong> amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis <strong>nostrud exercitation</strong> ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.
        </p>
        <p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. <i>Excepteur sint  occaecat</i> cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.
        </p>
        <ul>
          <li>Lorem 1st point </li>
          <li>Lorem 2nd point </li>
          <li>Lorem 3rd point </li>
        </ul>
        <p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. <i>Excepteur sint  occaecat</i> cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.
        </p>
      </tab-panel>
    
    </tab-panels>
  </div>
</template>

<script>
  import { ref, onMounted, defineComponent } from 'vue'

  import { Tabs, Tab, TabPanels, TabPanel } from 'vue3-tabs'
  export default defineComponent({
    name: 'testTrePage',
    components: {
      Tabs,
      Tab,
      TabPanels,
      TabPanel
    },
    setup () {
      const selectedTab = ref(1)

      const testOnMounted = async () => {
        console.log('testOnMounted!!!::')
      }

      onMounted(testOnMounted)

      return {
        selectedTab
      }
    } // setup() {

  })

</script>

<style scoped>
  .tab {
    padding: 10px 0px;
    margin: 10px 20px;
    background-color: yellow;
  }
  .active-tab {
    /*border-width: 0px;*/
    /*border-top-width: 2px;*/
    /*border-style: solid;*/
    border: 2px dotted red;
  }
  /* disable select highlight */
  .tab-panels {
    border: 2px dotted blue;
  }
  .tab-panel {
    padding: 20px;
    /*box-sizing: border-box;*/
    border: 2px dotted green;
  }
</style>
