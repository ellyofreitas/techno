<template>
  <div
    @click="SET_ALERT_ACTIVE(false)"
    :class="{ alert: true, active: alertActive }"
  >
    <p class="alert_message">
      {{ alertMessage }}
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Alert',
  computed: {
    ...mapState(['alertActive', 'alertMessage']),
  },
  methods: {
    ...mapMutations(['SET_ALERT_ACTIVE']),
  },
};
</script>

<style>
.alert {
  position: absolute;
  top: 20px;
  left: 0px;
  z-index: 10;
  width: 100%;
  text-align: center;
  display: none;
}

.alert.active {
  display: block;
  animation: fadeInDown 0.3s forwards;
}

.alert_message {
  background: #fff;
  display: inline-block;
  padding: 20px 40px;
  border: 2px solid #000;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
