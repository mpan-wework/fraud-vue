<template>
  <div class="logo">
    <span class="title-en">Bai</span>
    <span class="title-with-icon">
      <span>du</span>
      <i class="fas fa-paw" />
    </span>
    <span class="title-cn">百度</span>
  </div>
</template>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.title-en {
  font-size: 50px;
  line-height: 50px;
  font-weight: 700;
  color: red;
  user-select: none;
}

.title-cn {
  font-size: 40px;
  font-weight: 900;
  color: red;
  user-select: none;
}

.title-with-icon {
  display: grid;
}

.title-with-icon i {
  grid-row: 1/1;
  grid-column: 1/1;
  color: blue;
  font-size: 80px;
  z-index: -1;
  user-select: none;
}
.title-with-icon span {
  grid-row: 1/1;
  grid-column: 1/1;
  color: white;
  font-size: 40px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  user-select: none;
}
</style>
