<script lang="ts">
import { defineComponent } from "vue"
import axios from "axios"
import { User } from "../types" 

export default defineComponent({
  data() {
    return {
      title: "",
      description: "",
      category: "Software", 
      priority: "Alta",     
      errorMessage: "",
      successMessage: "",
      userId: null as number | null 
    }
  },
  methods: {
    async getUser() {
      try {
        const res = await axios.get("/api/auth/user")
        this.userId = res.data.id
      } catch (e) {
        this.errorMessage = "Errore: impossibile recuperare l'identità dell'utente."
      }
    },
    async onSubmit() {
      this.errorMessage = ""
      this.successMessage = ""

      if (!this.userId) {
        this.errorMessage = "Attendere il caricamento dell'utente o effettuare il login."
        return
      }

      try {

        await axios.post("/api/tickets", { 
          user_id: this.userId,
          title: this.title, 
          description: this.description,
          category: this.category,
          priority: this.priority
        });

        this.successMessage = `Ticket "${this.title}" creato con successo!`

        this.title = ""
        this.description = ""
        this.category = "Software"
        this.priority = "Alta"
        
      } catch (e: any) {

        if (e.response) {
          this.errorMessage = e.response.data?.message ?? "Errore durante la creazione del ticket"
        } else {
          this.errorMessage = "Impossibile contattare il server"
        }
      }
    }
  },
  mounted() {
    this.getUser()
  }
})
</script>
<template>
  <div class="ticket-page-container w-100 min-vh-100 d-flex flex-column align-items-center pt-5">
    
    <div class="form-wrapper w-100 px-4" style="max-width: 900px;">
      
      <h2 class="text-white fw-bold mb-5 fs-4" style="letter-spacing: 1px;">CREAZIONE TICKET</h2>

      <form class="w-100 d-flex flex-column gap-4" @submit.prevent="onSubmit">
        
        <div class="form-group text-start">
          <label class="text-white mb-2 fs-6 fw-light">Titolo</label>
          <input type="text" class="form-control form-control-lg rounded-2 border-0 shadow-sm" placeholder="Titolo" v-model="title" required>
        </div>

        <div class="form-group text-start">
          <label class="text-white mb-2 fs-6 fw-light">Descrizione</label>
          <textarea class="form-control rounded-2 border-0 shadow-sm" rows="4" v-model="description" required></textarea>
        </div>

        <div class="form-group text-start position-relative">
          <label class="text-white mb-2 fs-6 fw-light">Categoria</label>
          <select class="form-select form-select-lg rounded-2 border-0 shadow-sm" v-model="category" required>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Altro">Altro</option>
          </select>
          <div class="position-absolute d-flex align-items-center justify-content-center"></div>
        </div>

        <div class="form-group text-start position-relative mb-4">
          <label class="text-white mb-2 fs-6 fw-light">Priorità</label>
          <select class="form-select form-select-lg rounded-2 border-0 shadow-sm" v-model="priority" required>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Bassa">Bassa</option>
          </select>
          <div class="position-absolute d-flex align-items-center justify-content-center"></div>
        </div>

        <p v-if="errorMessage" class="alert alert-danger py-2">
            {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="alert alert-success py-2">
            {{ successMessage }}
        </p>

        <div class="d-flex justify-content-center mt-3 mb-5">
          <button type="submit" class="button-custom fw-bold rounded-2 px-5 py-2 text-dark fs-6" :disabled="!userId">
            CREA TICKET
          </button>
        </div>

      </form>
    </div>

  </div>
</template>

<style scoped lang="scss">



</style>