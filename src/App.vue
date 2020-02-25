<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Serif:400,700');

body,
h1,
h2,
ul,
li,
p {
  padding: 0px;
  margin: 0px;
}

ul {
  list-style: none;
}

* {
  box-sizing: border-box;
}

body {
  background: linear-gradient(to right, #1a1a1a 30%, #fff 30%);
  font-family: 'Noto Serif', serif;
}

#app {
  padding: 0 80px;
}

@keyframes fadeInDown {
  from {
    transform: translate3D(0, 30px, 0);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translate3D(0, 0, 0);
  }
}

@media screen and (max-width: 900px) {
  #app {
    padding: 0 10px;
  }
}
</style>
