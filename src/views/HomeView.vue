<!--
 * @Author: 七条
 * @LastEditors: 七条
 * @LastEditTime: 2024-08-19 16:56:07
 * @Description: 
 * 
-->
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <main>
    <button class="subtract" @click="count--">-</button>
    <div class="count">{{ count }}</div>
    <button class="add" @click="count++">+</button>
  </main>
</template>
