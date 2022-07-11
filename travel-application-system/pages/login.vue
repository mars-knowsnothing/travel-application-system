<template>
  <div>
    <el-row style="height: 20vh"> </el-row>
    <el-row>
      <el-col :span="6" :offset="16">
        <el-card class="box-card">
          <img src="/img/login-icon.png" class="image" />
          <div class="title">
            <h3>KIAA Travel Application System</h3>
          </div>
          <el-form
            label-position="top"
            label-width="100px"
            :model="formLogin"
            style="max-width: 460px"
          >
            <el-form-item>
              <el-input v-model="formLogin.pkuId" placeholder="PKU ID" />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="formLogin.password"
                placeholder="Password"
                type="password"
              />
            </el-form-item>
            <div class="login-button">
              <el-form-item>
                <el-button size="large" @click="onLogin" style="width: 360px"
                  >Login</el-button
                >
              </el-form-item>
            </div>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
useMeta({
  bodyAttrs: {
    class: "login",
  },
});
const formLogin = reactive({
  pkuId: "",
  password: "",
});
const onLogin = async () => {
  console.log(formLogin);
  const { data: resp } = await useFetch("http://localhost:8888/login", {
    method: "post",
    body: formLogin,
  });
  console.log(resp.value);
  if (resp.value.result == true) {
    const userInfo = useCookie("userInfo");
    userInfo.value = resp.value.userInfo;
    if(userInfo.value.role=='admin'){
        window.location.href = "/admin";
    } else{
        window.location.href = "/user";
    }
    
  }
};
</script>

<style>
.login {
  background-image: url("/img/background-1.jpeg");
  background-size: 100% auto;
}
.box-card {
  border-radius: 25px;
  width: 400px;
}
.login-button {
  display: flex;
  justify-content: center;
}
.image {
  width: 100%;
  display: block;
}
</style>