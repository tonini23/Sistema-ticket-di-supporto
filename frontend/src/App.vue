<script lang="ts">
import { PropType, defineComponent } from "vue"
import { User } from "./types"
import TopBar from "./component/TopBar.vue"

import axios from "axios"

export default defineComponent({
  components: { TopBar },
  data() {
    return {
      user: null as User | null,
    }
  },
  methods: {
    async getUser() {
      const res = await axios.get("/api/auth/user")
      this.user = res.data
    },
  },
  mounted() {
    this.getUser()
  },
})

</script>
<template>
  <TopBar v-if="user" :user="user" />
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
