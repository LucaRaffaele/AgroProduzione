<template>
  <div>
    <b-modal
      id="banche-search"
      ref="bancheSearch"
      :title="title"
      header-text-variant="white"
      title-class="text-white"
      header-bg-variant="primary"
      body-bg-variant="soft-primary"
      hide-footer
      size="lg"
    >
      <banche-grid
        :search="true"
        :size="size"
        :records="records"
        @refreshRecords="onRecordsRefresh"
      ></banche-grid>
    </b-modal>
  </div>
</template>

<script>
import BancheGrid from './BancheGrid'
import axios from 'axios'
import { authHeader } from '@/helpers/authservice/auth-header'
import { userService } from '@/helpers/authservice/user.service'
import { layoutMethods, notificationMethods } from '@/state/helpers'
import { dimensionConsts } from '@/helpers/constants.js'
import { rsaUtility } from '@/helpers/utility.js'

export default {
  name: 'BancheSearch',

  components: {
    BancheGrid
  },

  props: {
    size: {
      type: Number,
      default: dimensionConsts.SEARCHGRID
    },
    preload: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      records: [],
      title: 'Cerca Banche'
    }
  },

  created() {
    if (!this.preload) {
      rsaUtility.consoleLog('BancheSearch - Created')
      return
    }
    var url = userService.getApipath() + 'banche/get'
    rsaUtility.consoleLog('BancheSearch - Created -> PRELOAD URL: ', url)
    this.loaderOn()
    this.clear()
    axios
      .get(url, { headers: authHeader() })
      .then((res) => {
        this.loaderOff()
        this.records = res.data.Data
      })
      .catch((error) => {
        this.loaderOff()
        this.handlerError(error)
      })
  },

  methods: {
    ...layoutMethods,
    ...notificationMethods,

    onRecordsRefresh(records) {
      this.records = records
    }
  }
}
</script>
