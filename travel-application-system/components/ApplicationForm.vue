<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="formRules"
    label-width="180px"
    label-position="right"
    :size="formSize"
    status-icon
  >
    <el-divider content-position="left"> 个人信息 </el-divider>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="工号(PKU ID)" prop="pkuId">
          <el-input v-model="form.pkuId" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手机号(Mobile)" prop="mobile" required>
          <el-input v-model="form.mobile" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="离京事由" prop="reason" required>
      <el-input
        v-model="form.reason"
        placeholder="Reason for leaving Beijing"
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="目的地是否低风险地区" prop="destinationIsLowRiskArea" required>
      <el-col :span="12">Whether the destination is a low-risk area ?</el-col>
      <el-col :span="12">
        <el-radio-group v-model="form.destinationIsLowRiskArea">
          <el-radio label="是(Yes)" />
          <el-radio label="否(No)" />
        </el-radio-group>
      </el-col>
    </el-form-item>
    <el-divider content-position="left"> 离京信息 </el-divider>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="离京日期" required>
          <el-form-item prop="dateOfLeavingBeijing">
            <el-date-picker
              v-model="form.dateOfLeavingBeijing"
              type="date"
              placeholder="Date of leaving Beijing"
              size="default"
            />
          </el-form-item>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="交通工具" required>
          <el-select
            v-model="form.transportationLeaving"
            placeholder="Pick your transportation"
          >
            <el-option label="飞机(Flight)" value="flight" />
            <el-option label="火车(Train)" value="train" />
            <el-option label="私家车(Private Car)" value="privateCar" />
            <el-option label="其他(Others)" value="others" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="航班号/车次"
          prop="transportationDetailsLeaving"
          required
        >
          <el-input v-model="form.transportationDetailsLeaving" placeholder="Flight/Train Number" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="目的地" prop="destination" required>
          <el-input v-model="form.destination" placeholder="Destination"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item
      label="经停地点"
      prop="stopoverPlacesLeaving"
      required
    >
      <el-input v-model="form.stopoverPlacesLeaving" placeholder="Stopover Places" type="textarea" />
    </el-form-item>
    <el-divider content-position="left"> 返京信息 </el-divider>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="返京日期" required>
          <el-form-item prop="dateOfReturningToBeijing">
            <el-date-picker
              v-model="form.dateOfReturningToBeijing"
              type="date"
              label="Pick a date"
              placeholder="Date of returning to Beijing"
              style="width: 100%"
            />
          </el-form-item>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="交通工具" required>
          <el-select
            v-model="form.transportationReturning"
            placeholder="Pick your transportation"
          >
            <el-option label="飞机(Flight)" value="flight" />
            <el-option label="火车(Train)" value="train" />
            <el-option label="私家车(Private Car)" value="privateCar" />
            <el-option label="其他(Others)" value="others" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="航班号/车次"
          prop="transportationDetailsReturning"
          required
        >
          <el-input v-model="form.transportationDetailsReturning" placeholder="Flight/Train Number" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="返校日期" required>
          <el-form-item prop="dateOfReturningToPKU">
            <el-date-picker
              v-model="form.dateOfReturningToPKU"
              type="date"
              label="Pick a date"
              placeholder="Date of returning to PKU"
              style="width: 100%"
            />
          </el-form-item>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item
      label="经停地点"
      prop="stopoverPlacesReturning"
      required
    >
      <el-input v-model="form.stopoverPlacesReturning" placeholder="Stopover Places " type="textarea" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const props = defineProps(["formDisplay","formData","formRef","formRules"]);

const formSize = ref("large");
const form = reactive(props.formData);
const formRules = props.formRules
const formRef = props.formRef

const Greeting = () => {
    console.log("hello")
}
</script>
