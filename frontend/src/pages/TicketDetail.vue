<template>
  <div class="ticket-detail-container w-100 min-vh-100 d-flex flex-column align-items-center">
    
    <div class="w-100 px-4 pt-4 pb-3" style="max-width: 1000px;">
      <h2 class="text-white fw-bold m-0 fs-4 tracking-wide text-uppercase">Dettaglio Ticket</h2>
    </div>

    <div class="w-100 px-4" style="max-width: 1000px;">
      <div class="ticket-summary-card bg-white rounded-top-3 px-4 py-3 d-flex justify-content-between align-items-center shadow-sm">
        
        <div class="d-flex align-items-center gap-5 w-75">
          
          <div class="d-flex align-items-center gap-4">
             <span class="fs-4 fw-normal">1</span>
             <span class="fs-4 fw-normal">BUG LOGIN</span>
          </div>
          
          <span class="fs-5 text-secondary fw-light text-uppercase">Software</span>
        </div>

        
        <div class="w-25 text-end">
          <span class="badge bg-alta text-white rounded-pill py-2 px-4 fw-normal fs-6 d-inline-block text-start" style="width: 140px;">
            Alta
          </span>
        </div>

      </div>
      
      
      <div class="status-banner bg-white border-top px-4 py-2 text-center border-bottom shadow-sm">
         <span class="fs-5 fw-bold text-uppercase">STATO: CHIUSO</span>
      </div>
    </div>

    
    <div class="w-100 px-4 pb-5 flex-grow-1" style="max-width: 1000px;">
      <div class="thread-section bg-white h-100 rounded-bottom-3 p-4 shadow-sm">
        
        <h4 class="fw-bold fs-5 mb-4">Thread</h4>

        
        <div class="message-block mb-4">
          <div class="d-flex align-items-center gap-2 mb-2">
            
            <div class="avatar-circle bg-secondary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center overflow-hidden">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
               </svg>
            </div>
            <span class="fw-bold fs-6">Amministratore</span>
            <span class="text-secondary fs-7 ms-2">2 min</span>
          </div>
          <div class="message-content ps-5">
            <p class="mb-2 text-dark fs-6">Primo messaggio</p>
            <button class="btn btn-link text-secondary p-0 text-decoration-none fs-7 d-flex align-items-center gap-1">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 9l-6 6 6 6"/>
                  <path d="M20 4v7a4 4 0 0 1-4 4H4"/>
               </svg>
               Rispondi
            </button>
          </div>
        </div>

        
        <div class="message-block ms-5">
          <div class="d-flex align-items-center gap-2 mb-2">
             
            <div class="avatar-circle bg-secondary bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center overflow-hidden">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
               </svg>
            </div>
            <span class="fw-bold fs-6">Andrea Tonini</span>
            <span class="text-secondary fs-7 ms-2">1 min</span>
          </div>
          <div class="message-content ps-5">
            <p class="mb-2 text-dark fs-6">Secondo messaggio</p>
            <button class="btn btn-link text-secondary p-0 text-decoration-none fs-7 d-flex align-items-center gap-1">
              
               Rispondi
            </button>
          </div>
        </div>

      </div>
    </div>

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