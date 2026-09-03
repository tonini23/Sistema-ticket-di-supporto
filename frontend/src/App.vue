<template>
  <header class="d-flex align-items-center py-3 px-4 border-bottom">
    
    <div class="d-flex ms-0">
        <img src="./img/logo2.svg" alt="Logo sito" style="width: 50px; height: 50px;">
    </div>
    <h3 class="h3 mb-0">STS</h3>
    
    <div class="user-avatar d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white ms-5">
        AT
    </div>
    <span class="fw-semibold">Andrea Tonini</span>
    <div class="d-flex align-items-center gap-3 ms-auto">

      <button type="button" class="btn btn-outline-danger btn-sm">
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
