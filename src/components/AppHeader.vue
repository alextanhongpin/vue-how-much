<template>
  <header class="header">
    <router-link to="/" class="brand">Pricez</router-link>

    <div class="header-right">
      <div class="user" @click="$emit('click', $event)">
        <div class="username">John Doe</div>
        <div class="profile"></div>
      </div>
      <div @click='$emit("settings", $event)'>
        <i class="material-icons settings-icon">settings</i>
      </div>
    </div>
  </header>
</template>
<style lang="scss">
$dim: 40px;
.brand {
  font-weight: bold;
  text-decoration: none;
  color: inherit;
  font-size: 24px;
}

.header-right {
  display: grid;
  grid-template-columns: max-content max-content;
  grid-column-gap: 10px;
  align-items: center;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.settings-icon {
  height: 40px;
  width: 40px;
  line-height: 40px;
  color: #999;
  border: 1px solid #eee;
  cursor: pointer;
  text-align: center;
}
.settings-icon:hover {
  color: #333;
}
</style>
