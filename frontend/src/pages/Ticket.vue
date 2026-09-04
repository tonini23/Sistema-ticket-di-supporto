<template>
  <div class="ticket-page-container w-100 min-vh-100 d-flex flex-column align-items-center pt-5">
    
    <div class="form-wrapper w-100 px-4" style="max-width: 900px;">
      
      <h2 class="text-white fw-bold mb-5 fs-4" style="letter-spacing: 1px;">CREAZIONE TICKET</h2>

      <form class="w-100 d-flex flex-column gap-4">
        
        <div class="form-group text-start">
          <label class="text-white mb-2 fs-6 fw-light">Titolo</label>
          <input type="text" class="form-control form-control-lg rounded-2 border-0 shadow-sm " placeholder="Titolo">
        </div>

        
        <div class="form-group text-start">
          <label class="text-white mb-2 fs-6 fw-light">Descrizione</label>
          <textarea class="form-control rounded-2 border-0 shadow-sm" rows="4"></textarea>
        </div>

        
        <div class="form-group text-start position-relative">
          <label class="text-white mb-2 fs-6 fw-light">Categoria</label>
          <select class="form-select form-select-lg rounded-2 border-0 shadow-sm ">
            <option selected>Hardware</option>
            <option>Software</option>
            <option>Rete</option>
          </select>
          
          <div class="position-absolute d-flex align-items-center justify-content-center ">
             
          </div>
        </div>

        
        <div class="form-group text-start position-relative mb-4">
          <label class="text-white mb-2 fs-6 fw-light">Priorità</label>
          <select class="form-select form-select-lg rounded-2 border-0 shadow-sm  ">
            <option selected>Alta</option>
            <option>Media</option>
            <option>Bassa</option>
          </select>
           <div class="position-absolute d-flex align-items-center justify-content-center">
             
          </div>
        </div>

        
        <div class="d-flex justify-content-center mt-3">
          <button type="button" class="button-custom fw-bold rounded-2 px-5 py-2 text-dark fs-6">
            CREA TICKET
          </button>
        </div>

      </form>
    </div>

  </div>
</template>

<style scoped lang="scss">



</style>