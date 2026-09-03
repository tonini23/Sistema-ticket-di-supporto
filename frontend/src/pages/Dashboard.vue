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

  <div class="dashboard-container">
    
    
    <div class="p-4 p-md-5 text-white">
      
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h1 class="fw-bold m-0 fs-3">DASHBOARD ADMIN</h1>
        <button class="btn btn-new-ticket text-white rounded-pill px-4 py-2">
          Nuovo ticket +
        </button>
      </div>

      
      <div class="d-flex flex-column gap-4 mb-4">
        <div class="d-flex align-items-center gap-4" style="cursor: pointer;">
          <svg width="20" height="34" viewBox="0 0 24 40" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4L20 20L4 36" />
          </svg>
          <span class="fw-bold fs-6 tracking-wide">APERTO</span>
        </div>

        
        <div class="d-flex align-items-center gap-4" style="cursor: pointer;">
          <svg width="20" height="34" viewBox="0 0 24 40" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4L20 20L4 36" />
          </svg>
          <span class="fw-bold fs-6 tracking-wide">IN LAVORAZIONE</span>
        </div>

        
        <div class="d-flex align-items-center gap-4" style="cursor: pointer;">
          <svg width="34" height="20" viewBox="0 0 40 24" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4L20 20L36 4" />
          </svg>
          <span class="fw-bold fs-6 tracking-wide">CHIUSO</span>
        </div>
      </div>
    </div>
    
    <div class="bg-white text-dark w-100">
      
      <div class="ticket-row d-flex align-items-center border-bottom px-4 px-md-5 py-4">
        <div class="fs-4" style="width: 10%;">1</div>
        <div class="fs-4 fw-normal" style="width: 40%;">BUG LOGIN</div>
        <div class="fs-5 text-secondary fw-light" style="width: 30%;">SOFTWARE</div>
        <div style="width: 20%;">
          <span class="badge priority-badge bg-alta text-start w-100 rounded-pill py-2 px-3 fw-normal">
            Alta
          </span>
        </div>
      </div>

      

    </div>

  </div>
</template>

<style scoped lang="scss">

.btn-new-ticket {
  background-color: #4F46E5; 
  border: none;
  font-weight: 500;
}

.tracking-wide {
  letter-spacing: 0.05em;
}

.ticket-row {
  min-height: 100px; 
}

.priority-badge {
  font-size: 1rem;
  display: block; 
  max-width: 200px; 
}

.bg-alta {
  background-color: #FF5252 !important; 
}

.bg-media {
  background-color: #FFC107 !important; 
}
</style>
