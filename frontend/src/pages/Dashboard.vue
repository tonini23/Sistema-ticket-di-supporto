<script lang="ts">
import { defineComponent } from "vue"

import axios from "axios"
import { Ticket } from "../types"

export default defineComponent({
  data() {
    return {
      dataTickets: [] as Ticket[]
    }
  },
  methods: {
    getAllTickets() {
      axios.get("/api/tickets")
        .then(response => this.dataTickets = response.data)
    }
  },
  mounted() {
    this.getAllTickets()
  }
})
</script>

<template>
  <div class="dashboard-user">
  
  
  <div class="d-flex justify-content-between align-items-center px-4 py-3">
    <h2 class="h5 mb-0">I miei ticket</h2>
    <button type="button" class="btn btn-primary">
      <i class="bi bi-plus-lg me-1"></i>
      Nuovo ticket
    </button>
  </div>

  <div class="board px-4 pb-4">
    <div class="row g-3">

          <div class="card-body d-flex flex-column gap-2">
            <div class="ticket-card card shadow-sm" role="button">
              <div class="card-body py-2 px-3">
                
              </div>
            </div>
          </div>
        

    </div>
  </div>
</div>

</template>

<style lang="scss" scoped>

</style>



