<script lang="ts">
import { defineComponent } from "vue"

import axios from "axios"
import { Ticket, User } from "../types"

export default defineComponent({
  data() {
    return {
      dataTickets: [] as Ticket[],
      sections: [
        { state: 'aperto', label: 'APERTO', isOpen: true },
        { state: 'in lavorazione', label: 'IN LAVORAZIONE', isOpen: false },
        { state: 'chiuso', label: 'CHIUSO', isOpen: false }
      ],
      isLoading: true,
      user: null as User | null,
      errorMessage: ''
    }
  },
  methods: {
    getTicketsByState(state: string) {
      return this.dataTickets.filter(ticket => ticket.state === state)
    },
    async getAllTicketsByUserId() {
      this.isLoading = true
      this.errorMessage = ''

      try {
        const userResponse = await axios.get<User>("/api/auth/user")
        this.user = userResponse.data;
        const userId = userResponse.data.id
        const ticketsResponse = await axios.get<Ticket[]>(`/api/tickets/${userId}`)
        this.dataTickets = ticketsResponse.data
      } catch (error) {
        this.errorMessage = 'Impossibile caricare i ticket'
        console.error("Errore durante il recupero dei ticket:", error)
      } finally {
        this.isLoading = false
      }
    }
  },
  computed: {
  completionPercentage() {
      if (this.dataTickets.length === 0) return 100;
      const closedTickets = this.dataTickets.filter(t => t.state === 'chiuso').length;
      return Math.round((closedTickets / this.dataTickets.length) * 100);
    }
  },
  mounted() {
    this.getAllTicketsByUserId()
  }
})
</script>

<template>

  <div class="dashboard-container">
    
    
    <div class="p-4 p-md-5 text-white">
      
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h1 class="fw-bold m-0 fs-3">DASHBOARD</h1> <!-- <h1 v-if="user?.is_admin">ADMIN</h1> -->
        <router-link to="/ticket">
          <button class="button-custom text-black rounded-pill px-4 py-2" >
            Nuovo ticket +
          </button>
        </router-link>
        <router-link to="/register" v-if="user && user.admin === 1">
          <button class="button-custom text-black rounded-pill px-4 py-2">
               Registra utente
          </button>
        </router-link>
      </div>
      <div class="completion-card rounded p-4 mx-4 mx-md-5 mb-4 text-black">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fw-bold fs-5">Progresso Risoluzione Ticket</span>
            <span class="fw-bold fs-5 text-black">{{ completionPercentage }}%</span>
          </div>
          <div class="progress" style="height: 20px;">
            <div 
              class="progress-bar progress-bar-striped progress-bar-animated" 
              role="progressbar" 
              :style="{ width: completionPercentage + '%' }" 
              :aria-valuenow="completionPercentage" 
              aria-valuemin="0" 
              aria-valuemax="100">
            </div>
          </div>
          <p class="text-black mt-2 mb-0 fs-6" v-if="completionPercentage === 100">
           Ottimo lavoro! Tutti i ticket sono stati risolti. Prenditi un caffè fino a quando ne arriveranno di nuovi!
          </p>
          <p class="text-black mt-2 mb-0 fs-6" v-else>
           Risolvi gli ultimi ticket per completare il lavoro!
          </p>
        </div>
      </div>

    <p v-if="isLoading" class="text-white px-4 px-md-5">Caricamento ticket...</p>
    <p v-if="errorMessage" class="alert alert-danger mx-4 mx-md-5" role="alert">
      {{ errorMessage }}
    </p>

    <section v-for="(section, index) in sections" :key="section.state" class="mb-4">
      <button
        type="button"
        class="d-flex align-items-center gap-4 border-0 bg-transparent text-white px-4 px-md-5 py-3 w-100 text-start"
        :aria-expanded="section.isOpen"
        :aria-controls="'tickets-' + index"
        @click="section.isOpen = !section.isOpen"
      >
        <svg class="ticket-arrow" :class="{ 'is-open': section.isOpen }" width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 4L20 20L4 36" />
        </svg>
        <span class="fw-bold fs-6 tracking-wide">{{ section.label }}</span>
      </button>

      <div v-show="section.isOpen" :id="'tickets-' + index" class="bg-white text-dark w-100">
        <p v-if="!isLoading && !errorMessage && getTicketsByState(section.state).length === 0" class="px-4 px-md-5 py-4 mb-0">
          Nessun ticket in questo stato.
        </p>

        <router-link :to="'/ticket/' + ticket.id" class="ticket-row d-flex align-items-center border-bottom px-4 px-md-5 py-4 text-dark text-decoration-none" v-for="ticket in getTicketsByState(section.state)" :key="ticket.id">
          <div class="fs-4" style="width: 10%;">{{ ticket.id }}</div>
          <div class="fs-4 fw-normal" style="width: 40%;">{{ ticket.title }}</div>
          <div class="fs-5 text-secondary fw-light" style="width: 30%;">{{ ticket.category }}</div>
          <div style="width: 20%;">
            <span class="badge priority-badge text-start w-100 rounded-pill py-2 px-3 fw-normal" :class="{
              'bg-alta': ticket.priority === 'alta',
              'bg-media': ticket.priority === 'media',
              'bg-bassa': ticket.priority === 'bassa'
            }">
              {{ ticket.priority }}
            </span>
          </div>
        </router-link>
      </div>
    </section>

  </div>
</template>

<style scoped lang="scss">

.tracking-wide {
  letter-spacing: 0.05em;
}

.completion-card {
  width: 50%;
  background-color: #f8f9fa;
}

.ticket-arrow {
  flex-shrink: 0;
}

.ticket-arrow.is-open {
  transform: rotate(90deg);
}

.ticket-row {
  min-height: 100px; 
}

.priority-badge {
  font-size: 1rem;
  display: block; 
  max-width: 200px; 
}


</style>
