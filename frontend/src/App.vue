<template>
  <header>
    <h1>Blog di Tecnologie Web</h1>
  </header>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/archivio">Archivio</router-link></li>
      <li><router-link to="/contatti">Contatti</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
    </ul>
  </nav>
  <main>
    <router-view />
  </main>
  <aside>
  
  </aside>
  <footer>
    <p>Andrea Tonini - Ingegneria dei sistemi web - A.A. 2025/2026</p>
  </footer>
</template>

<style scoped>
 
</style>
