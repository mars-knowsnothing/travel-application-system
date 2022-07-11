<template>
  <el-menu style="height: 100vh" mode="vertical" default-active="1">
    <el-menu-item index="1">
      <span>My Request</span>
    </el-menu-item>
    <el-menu-item v-if="props.currentUser.role=='admin'" index="2">
      <span>My Approval</span>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";

const props = defineProps(["currentUser"]);

</script>
