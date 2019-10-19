<template>
  <div>
    <div>
      <h1>10.50</h1>
    </div>

    Is this information accurate?
    <div class="button-container">
      <router-link to="/suggest">
        <div class="button-no">No</div>
      </router-link>
      <div class="button-yes">Yes</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
%button {
  height: 40px;
  line-height: 40px;
  border-radius: 11px;
}

.button-yes {
  @extend %button;
  color: blue;
  background: #d0e3ff;
}

.button-no {
  @extend %button;
  color: red;
  background: #ffdddd;
}

.button-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
}
</style>
