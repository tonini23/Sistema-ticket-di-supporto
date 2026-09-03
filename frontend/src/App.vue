<template>
  <header class="d-flex justify-content-between align-items-center py-3 px-4 border-bottom">
    <h1 class="h4 mb-0"></h1>

    <div class="d-flex align-items-center gap-3">
      <div class="d-flex align-items-center gap-2">
        
        <!--<div class="user-avatar d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white">
          AT
        </div>
        <span class="fw-semibold">Andrea Tonini</span> For now i dont store the user name so i will think later bout it -->
      </div>

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
