<script lang="ts">
import { PropType, defineComponent } from "vue"
import { User } from "./types"

import axios from "axios"

export default defineComponent({
  props: {
    user: Object as PropType<User>,
  },
  methods: {
    async logout() {
      await axios.post("/api/auth/logout")
      location.reload()
    },
  },
})

</script>
<template>
  <header class="d-flex align-items-center py-3 px-4 border-bottom">
    <router-link to="/" class="d-flex align-items-center text-decoration-none">
    
      <div class="d-flex ms-0">
          <img src="./img/logo2.svg" alt="Logo sito" style="width: 50px; height: 50px;">
      </div>
    </router-link>
    <h3 class="h3 mb-0">STS</h3>
    
    <span class="fw-semibold">{{ user?.email }}</span>
    <div class="d-flex align-items-center gap-3 ms-auto">

      <button type="button" class="btn btn-danger btn-sm text-bold " @click="logout">
        Logout
      </button>
    </div>
  </header>
  <main>
    <router-view />
  </main>
  <aside>
  
  </aside>
  <footer class="d-flex justify-content-center align-items-center py-3 border-top">
    <p>Andrea Tonini - Ingegneria dei sistemi web - A.A. 2025/2026</p>
  </footer>
</template>

<style lang="scss" scoped>
 .user-avatar {
    width: 36px;
    height: 36px;
    font-size: 0.85rem;
  }

  header, footer {
    background-color: #FFFFFF; 
  }
</style>
