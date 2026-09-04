<script lang="ts">
import { defineComponent } from "vue"

import axios from "axios"

export default defineComponent({
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async onSubmit() {
      try {
        await axios.post("/api/auth/login", 
        { email: this.email, password: this.password });
        location.href = "/";
      } catch (e: any) {
        if (e.response) {
          console.log(`${e.response.status} - ${e.response.statusText}\n${e.response.data}`)
        } else {
          console.error("Errore durante il login:", e.message)
        }
      }
    }
  }
})

</script>

<template>
  <div class="auth-wrapper d-flex flex-column justify-content-center align-items-center min-vh-100">
    
    <div class="mb-5 d-flex justify-content-center align-items-center">
      <img src="../img/logo2.svg" alt="Logo sito" style="width: 150px; height: auto;">
      <h2 class="h2 text-white">STS</h2>
    </div>
    
    <form @submit.prevent="onSubmit" class="auth-form d-flex flex-column gap-4 p-4 p-md-5 rounded">
      <div class="auth-form-container w-100" >
        
        
        <div class="auth-field border rounded mb-3 d-flex align-items-center p-2">
          <div class="icon-box border rounded d-flex justify-content-center align-items-center me-3">
            
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
            <input type="email" class="auth-input w-100 fw-bold" placeholder="EMAIL" v-model="email">
        </div>

        
        <div class="auth-field border rounded mb-5 d-flex align-items-center p-2">
          <div class="icon-box border rounded d-flex justify-content-center align-items-center me-3">
            
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <input type="password" class="auth-input w-100 fw-bold" placeholder="PASSWORD" v-model="password">
        </div>

        
        <button class="btn btn-light w-100 fw-bold py-2 rounded" type="submit">
          ACCEDI
        </button>

      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">

</style>