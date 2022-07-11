<template>
  <div class="common-layout">
    <el-container>
      <el-header><PageHeader :currentUser="currentUser" /></el-header>
      <el-container>
        <!-- <el-aside width="200px"
          ><SideBar :currentUser="currentUser"
        /></el-aside> -->
        <el-main>
          <p>离京申请 (Travel Application)</p>
          <el-divider />
          <DataTable :currentUser="currentUser" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";

const userInfo = useCookie("userInfo");
const currentUser = userInfo;
</script>
