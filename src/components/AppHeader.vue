<template>
  <header class="header">
    <div class="username">John Doe</div>
    <div class="profile"></div>
  </header>
</template>
<style lang="scss">
$dim: 40px;
.header {
  display: grid;
  grid-template-columns: 1fr $dim;
  grid-column-gap: 10px;
  justify-content: flex-end;
  align-items: center;
}

.username {
  text-align: right;
}

.profile {
  height: $dim;
  width: $dim;
  background: #eee;
  border-radius: 50%;
}
</style>
