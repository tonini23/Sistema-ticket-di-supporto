<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { Ticket, User, Comment } from "../types" 

export default defineComponent({
  data() {
    return {
      user: null as User | null,
      ticket: null as Ticket | null,
      comments: [] as Comment[], 
      newCommentText: "",
      errorMessage: "",
      isLoading: true
    }
  },
  methods: {
     async getUser() {
      const res = await axios.get("/api/auth/user")
      this.user = res.data
    },
    async getTicket() {
      
      const ticketId = this.$route.params.id;
      try {
        const res = await axios.get(`/api/tickets/detail/${ticketId}`);
        
        this.ticket = Array.isArray(res.data) ? res.data[0] : res.data;

      } catch (e) {
        this.errorMessage = "Impossibile caricare il ticket.";
        console.error(e);
      }
    },
    async getComments() {
      const ticketId = this.$route.params.id;
      try {
        const res = await axios.get(`/api/comments/${ticketId}`);
        this.comments = res.data;
      } catch (e) {
        console.error("Errore durante il caricamento dei commenti", e);
      }
    },
    async submitComment() {
      if (!this.newCommentText.trim() || !this.user || !this.ticket) return;

      try {
        await axios.post("/api/comments", {
          ticket_id: this.ticket.id,
          user_id: this.user.id,
          text: this.newCommentText
        });
        
        this.newCommentText = "";
        await this.getComments(); 
      } catch (e) {
        this.errorMessage = "Errore durante l'invio del commento";
        console.error(e);
      }
    },
    async updateTicketState(newState: string) {
      if (!this.ticket) return;
      try {
        await axios.put(`/api/tickets/state/${this.ticket.id}`, { state: newState });

        await this.getTicket(); 
      } catch (e) {
        console.error("Errore durante l'aggiornamento dello stato", e);
        this.errorMessage = "Impossibile aggiornare lo stato del ticket.";
      }
    },
  },
  async mounted() {
    this.isLoading = true;
    await this.getUser();
    await this.getTicket();
    await this.getComments();
    this.isLoading = false;
  }
})
</script>

<template>
  <div class="ticket-detail-container w-100 min-vh-100 d-flex flex-column align-items-center">
    
    <div class="w-100 px-4 pt-4 pb-3" style="max-width: 1000px;">
      <h2 class="text-white fw-bold m-0 fs-4 tracking-wide text-uppercase">Dettaglio Ticket</h2>
    </div>

    <div v-if="isLoading" class="text-white mt-5">Caricamento in corso...</div>
    
    <div v-else-if="errorMessage" class="text-white mt-5">{{ errorMessage }}</div>

    <template v-else-if="ticket">
      <div class="w-100 px-4" style="max-width: 1000px;">
        <div class="ticket-summary-card bg-white rounded-top-3 px-4 py-3 d-flex justify-content-between align-items-center shadow-sm">
          
          <div class="d-flex align-items-center gap-5 w-75">
            <div class="d-flex align-items-center gap-4">
               <span class="fs-4 fw-normal">{{ ticket.id }}</span>
               <span class="fs-4 fw-normal text-uppercase">{{ ticket.title }}</span>
            </div>
            <span class="fs-5 text-secondary fw-light text-uppercase">{{ ticket.category }}</span>
          </div>

          <div class="w-25 text-end d-flex align-items-center justify-content-end gap-3">
            <span class="badge text-black rounded-pill py-2 px-4 fw-bold fs-6 d-inline-block text-center" 
                  style="width: 120px;"
                  :class="{
                    'bg-alta': ticket.priority?.toLowerCase() === 'alta',
                    'bg-media': ticket.priority?.toLowerCase() === 'media',
                    'bg-bassa': ticket.priority?.toLowerCase() === 'bassa'
                  }">
              {{ ticket.priority }}
            </span>
          </div>

        </div>
        
        <div class="status-banner bg-white border-top px-4 py-3 d-flex justify-content-between align-items-center border-bottom shadow-sm">
           <span class="fs-5 fw-bold text-uppercase">STATO: {{ ticket.state || 'APERTO' }}</span>
           
           <div class="d-flex gap-2" v-if="(ticket.state || 'aperto').toLowerCase() !== 'chiuso'">
             
             <button 
                v-if="(ticket.state || 'aperto').toLowerCase() === 'aperto'"
                @click="updateTicketState('in lavorazione')" 
                class="button-custom rounded-pill px-3 fw-bold">
               Prendi in lavorazione
             </button>
             
             
             <button 
                v-if="user && user.admin === 1" 
                @click="updateTicketState('chiuso')" 
                class="btn btn-success rounded-pill px-3 fw-bold">
               Chiudi Ticket
             </button>
           </div>
        </div>
        
        <div class="bg-white px-4 py-3 border-bottom shadow-sm">
          <h5 class="fw-bold mb-2 fs-6 text-secondary">Descrizione del problema:</h5>
          <p class="mb-0 fs-5">{{ ticket.description }}</p>
        </div>
      </div>

      <div class="w-100 px-4 pb-5 flex-grow-1" style="max-width: 1000px;">
        <div class="thread-section bg-white h-100 rounded-bottom-3 p-4 shadow-sm">
          
          <h4 class="fw-bold fs-5 mb-4">Thread</h4>

          <div v-if="comments.length === 0" class="text-secondary mb-4">
            Nessun messaggio in questo thread.
          </div>

          <div v-for="(comment, index) in comments" :key="comment.id" class="message-block mb-4" :class="{ 'ms-5': index > 0 }">
            <div class="d-flex align-items-center gap-2 mb-2">
              <div class="avatar-circle bg-secondary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center overflow-hidden">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                 </svg>
              </div>
              <span class="fw-bold fs-6">{{ comment.author_name || 'Utente' }}</span>
              <span class="text-secondary fs-7 ms-2">{{ comment.created_at }}</span>
            </div>
            <div class="message-content ps-5">
              <p class="mb-2 text-dark fs-6">{{ comment.text }}</p>
            </div>
          </div>

          <div class="mt-5 border-top pt-4" v-if="(ticket.state || '').toLowerCase() !== 'chiuso'">
            <form @submit.prevent="submitComment" class="d-flex gap-3">
              <input type="text" class="form-control rounded-pill bg-light border-0 px-4" placeholder="Scrivi una risposta..." v-model="newCommentText" required>
              <button type="submit" class="btn btn-primary rounded-pill px-4 fw-bold">Invia</button>
            </form>
          </div>
          <div v-else class="mt-4 text-center text-secondary fst-italic">
            Il ticket è chiuso, non è possibile inserire ulteriori risposte.
          </div>

        </div>
      </div>
    </template>

  </div>
</template>

<style scoped lang="scss">
.tracking-wide {
  letter-spacing: 0.05em;
}



.avatar-circle {
  width: 38px;
  height: 38px;
  min-width: 38px;
}


.fs-7 {
  font-size: 0.85rem;
}


.ticket-summary-card {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.status-banner {
  border-color: #f8f9fa !important; 
}

.thread-section {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.btn-link:hover {
  color: #000 !important;
}
</style>