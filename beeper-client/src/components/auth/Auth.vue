<template>
  <div id="auth">
    <div class="container">
      <div class="row">
        <div class="col-md-4 authForm">
          <h2 class="text-center">Beeper</h2>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "auth"
};
</script>

<style scope>
#auth {
  height: 100%;
  display: flex;
  align-items: center;
}
.authForm {
  background: #fff;
  padding-bottom: 15px;
  padding-top: 10px;
  border-radius: 10px;
}
.row {
  display: flex;
  justify-content: center;
}
</style>
