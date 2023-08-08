<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts"></script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Victor+Mono&display=swap");

::selection {
  color: white !important;
  background: var(--theme-color-black);
}

::-webkit-scrollbar {
  background: none;
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--theme-color-black);
}

body {
  --theme-color-black: #2c3e50;
  --theme-color-black-opaque: rgba(44, 62, 80, 0.3);
  --theme-color-gray: #7a8794;
  --theme-color-light-gray: #a5b0bb;
  --theme-color-background: #e1e8ee;
  --theme-color-background-opaque: rgba(225, 232, 238, 0.6);
  --theme-color-highlight: #f5f6f8;

  background-color: var(--theme-color-background);
}

h1 {
  text-transform: uppercase;
  font-size: 60px;
  letter-spacing: 2px;

  margin-bottom: 0;
  margin-inline: 20px;
}

h2 {
  color: var(--theme-color-gray);
  font-weight: normal;
  margin-bottom: 40px;
  margin-inline: 20px;
}

#app {
  font-family: "Victor Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--theme-color-black);
  margin-top: 60px;
  height: 100%;
}
</style>
