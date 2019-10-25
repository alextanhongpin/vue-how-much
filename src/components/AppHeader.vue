<template>
  <header class="header">
    <div class="user" @click="$emit('click', $event)">
      <div class="username">John Doe</div>
      <div class="profile"></div>
    </div>
  </header>
</template>
<style lang="scss">
$dim: 40px;
.header {
  display: flex;
  justify-content: flex-end;
}

.user {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-column-gap: 10px;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.user:hover {
  background: #f7f7f7;
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
