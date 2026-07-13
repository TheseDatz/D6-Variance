<script setup>
import SiteHeader from './components/SiteHeader.vue'
import DiceRoller from './components/DiceRoller.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <SiteHeader v-if="!route.meta.hideSiteHeader" />
  <RouterView />
  <DiceRoller />
</template>
