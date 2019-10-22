<template>
  <div id="app">
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=B612:400,700&display=swap');
#app {
  min-height: 100vh;
}

#app,
input,
button,
textarea {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  font-family: 'B612', sans-serif;
}
.main {
  margin: auto;
  max-width: 800px;
  width: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
