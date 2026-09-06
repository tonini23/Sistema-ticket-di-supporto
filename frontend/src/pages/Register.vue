<script lang="ts">
import { defineComponent } from "vue"

import axios from "axios"

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
      successMessage: ""
    }
  },
  methods: {
    async onSubmit() {
      this.errorMessage = ""
      this.successMessage = ""

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Le password non corrispondono"
        return
      }

      try {
        await axios.post("/api/auth/register", 
        { email: this.email, password: this.password });

        this.successMessage = "Registrazione di " + this.email + " completata con successo!"

        this.email = ""
        this.password = ""
        this.confirmPassword = ""
      } catch (e: any) {
        if (e.response) {
          this.errorMessage = e.response.data?.message ?? "Errore durante la registrazione"
        } else {
          this.errorMessage = "Impossibile contattare il server"
        }
      }
    }
  }
})

</script>
<template>
  <div class="auth-wrapper d-flex flex-column justify-content-center align-items-center min-vh-100">
    
    
    <div class="text-white mb-5 d-flex justify-content-center align-items-center">
       <h2>REGISTRA UN NUOVO OPERATORE</h2>
    </div>

    <form action="" @submit.prevent="onSubmit">
      <div class="auth-form-container w-100" style="max-width: 400px;">
        
        
        <div class="auth-field border rounded mb-3 d-flex align-items-center p-2">
          <div class="icon-box border rounded d-flex justify-content-center align-items-center me-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <input type="email" class="auth-input w-100 fw-bold" placeholder="EMAIL" v-model="email" required>
      </div>

      
      <div class="auth-field border rounded mb-3 d-flex align-items-center p-2">
        <div class="icon-box border rounded d-flex justify-content-center align-items-center me-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <input type="password" class="auth-input w-100 fw-bold" placeholder="PASSWORD" required v-model="password">
      </div>

      
      <div class="auth-field border rounded mb-5 d-flex align-items-center p-2">
        <div class="icon-box border rounded d-flex justify-content-center align-items-center me-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <input type="password" class="auth-input w-100 fw-bold" placeholder="CONFERMA PASSWORD" required v-model="confirmPassword">
      </div>

      <p v-if="errorMessage" class="alert alert-danger py-2">
          {{ errorMessage }}
      </p>
      <p v-if="successMessage" class="alert alert-success py-2">
          {{ successMessage }}
      </p>

      <button class="button-custom w-100 fw-bold py-2 rounded" type="submit">
        REGISTRATI
      </button>

      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">


</style>