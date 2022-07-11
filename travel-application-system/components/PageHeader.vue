<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">KIAA - Domestic Travel Application</el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="1">
      <template #title
        >{{ props.currentUser.name }} - {{ props.currentUser.pkuId }}</template
      >
      <el-menu-item index="logout">Logout</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps(["currentUser"]);
const activeIndex = ref("1");
const handleSelect = async (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
  if (key == "logout") {
    const { data: resp } = await useFetch("http://localhost:8888/logout", {
      method: "post",
      body: props.currentUser,
    });
    console.log(resp.value);
    if (resp.value.result == true) {
      const userInfo = useCookie("userInfo");
      userInfo.value = undefined;
      window.location.href = "/login";
    }
  }
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
