<script lang="ts">
import { defineComponent } from "vue"

import axios from "axios"
import { Ticket } from "../types"

export default defineComponent({
  data() {
    return {
      dataTickets: [] as Ticket[]
    }
  },
  methods: {
    getAllTickets() {
      axios.get("/api/tickets")
        .then(response => this.dataTickets = response.data)
    }
  },
  mounted() {
    this.getAllTickets()
  }
})
</script>

<template>
  <!--<h2>Ultimi Articoli</h2>
   <article v-for="articolo in datiArticoli">
    <img :src="'/img/' + articolo.imgarticolo" alt="" />
    <h3>{{articolo.titoloarticolo}}</h3>
    <p>{{articolo.nome}} - {{articolo.dataarticolo.slice(0, 10)}}</p>
    <p>{{articolo.anteprimaarticolo}}</p>
    <a :href="`/articolo/${articolo.idarticolo}`">Leggi tutto</a>
  </article> -->

  


</template>
