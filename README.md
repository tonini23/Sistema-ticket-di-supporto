# Sistema-ticket-di-supporto
Progetto esame per Ingegneria dei sistemi web

Applicazione per gestire richieste di assistenza: 
gli utenti aprono ticket con categoria/priorità, gli admin rispondono e chiudono

### Requisiti

- Creazione ticket con stato (aperto/in lavorazione/chiuso)
- Commenti e thread conversazione
- Dashboard utente (i miei ticket)
- Dashboard admin (tutti i ticket)

Istruzioni per installazione

Da terminale nella root del progetto (Dove si trova questo file) 
usa il comando
#  npm i 
per installare le dipendenze
esegui il file build_backend.bat
poi esegui i 2 file .bat per startare il frontend e il backend.

Prima di eseguire l’applicazione assicurati di creare un file “.env” con contenuto

### JWT_SECRET=quello-che-vuoi

per non avere errori con l'autenticazione.
