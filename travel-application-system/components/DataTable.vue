<template>
  <div>
    <el-row justify="end">
      <el-button type="primary" @click="drawerOpen = true"
        >New Request</el-button
      >
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Submission Date">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.submissionDate }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="currentUser.role == 'admin'" label="RequestedBy">
        <template #default="scope">
          <el-popover
            effect="light"
            trigger="hover"
            placement="top"
            width="auto"
          >
            <template #default>
              <div>Name: {{ scope.row.name }}</div>
              <div>PKU ID: {{ scope.row.pkuId }}</div>
              <div>Mobile: {{ scope.row.mobile }}</div>
            </template>
            <template #reference>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Destination">
        <template #default="scope">
          <el-popover
            effect="light"
            trigger="hover"
            placement="top"
            width="auto"
          >
            <template #default>
              <div>
                Destination Is Low Risk Area:
                {{ scope.row.destinationIsLowRiskArea }}
              </div>
              <div>Transportation: {{ scope.row.transportationLeaving }}</div>
              <div>
                Transportation Details:
                {{ scope.row.transportationDetailsLeaving }}
              </div>
              <div>Stopover Places: {{ scope.row.stopoverPlacesLeaving }}</div>
            </template>
            <template #reference>
              <span style="margin-left: 10px">{{ scope.row.destination }}</span>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Date of Leaving">
        <template template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.dateOfLeavingBeijing }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Date of Returning">
        <template template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.dateOfReturningToBeijing }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Status">
        <template template #default="scope">
          <div style="display: flex; align-items: center">
            <el-tag
              v-if="scope.row.approvalStatus == 'pending-approval'"
              class="ml-2"
              type="warning"
              >Pending Approval</el-tag
            >
            <el-tag
              v-else-if="scope.row.approvalStatus == 'not-submitted'"
              class="ml-2"
              type="info"
              >Not Submitted</el-tag
            >
            <el-tag
              v-if="scope.row.approvalStatus == 'approved'"
              class="ml-2"
              type="success"
              >Approved</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="currentUser.role == 'user'" label="Approved By">
        <template template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.approvedBy }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="currentUser.role == 'admin'" label="Actions">
        <template #default="scope">
          <el-button size="small" @click="onDetails(scope.$index, scope.row)"
            >Details</el-button
          >
          <el-button
            v-if="scope.row.approvalStatus == 'pending-approval'"
            size="small"
            type="primary"
            @click="onApprove(scope.$index, scope.row)"
            >Approve</el-button
          >
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="currentUser.role=='user'" label="Actions">
        <template #default="scope">
          <el-button size="small" @click="onEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="onSubmit(scope.$index, scope.row)"
            >Submit</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
    <el-dialog v-model="dialogDetails" title="Details" width="50%">
      <el-descriptions title="Application Details" direction="vertical" border>
        <el-descriptions-item label="Name">{{
          applicationDetails.name
        }}</el-descriptions-item>
        <el-descriptions-item label="PKU ID">{{
          applicationDetails.pkuId
        }}</el-descriptions-item>
        <el-descriptions-item label="Mobile">{{
          applicationDetails.mobile
        }}</el-descriptions-item>
        <el-descriptions-item label="Date of Leaving Beijing">{{
          applicationDetails.dateOfLeavingBeijing
        }}</el-descriptions-item>
        <el-descriptions-item label="Destination">{{
          applicationDetails.destination
        }}</el-descriptions-item>
        <el-descriptions-item label="Destination Is Low Risk Area">{{
          applicationDetails.destinationIsLowRiskArea
        }}</el-descriptions-item>
        <el-descriptions-item label="Reason">{{
          applicationDetails.reason
        }}</el-descriptions-item>
        <el-descriptions-item label="Date of Returning to Beijing">{{
          applicationDetails.dateOfReturningToBeijing
        }}</el-descriptions-item>
        <el-descriptions-item label="Date of Returning to PKU">{{
          applicationDetails.dateOfReturningToPKU
        }}</el-descriptions-item>
        <el-descriptions-item label="Transportation Leaving Beijing">{{
          applicationDetails.transportationLeaving
        }}</el-descriptions-item>
        <el-descriptions-item label="Transportation Details">{{
          applicationDetails.destinationIsLowRiskArea
        }}</el-descriptions-item>
        <el-descriptions-item label="Stopover Places">{{
          applicationDetails.stopoverPlacesLeaving
        }}</el-descriptions-item>
        <el-descriptions-item label="Transportation Returning to Beijing">{{
          applicationDetails.transportationReturning
        }}</el-descriptions-item>
        <el-descriptions-item label="Transportation Details">{{
          applicationDetails.transportationDetailsReturning
        }}</el-descriptions-item>
        <el-descriptions-item label="Stopover Places">{{
          applicationDetails.stopoverPlacesReturning
        }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-drawer
      v-model="drawerOpen"
      title="Domestic Travel Application of KIAA"
      direction="rtl"
      size="60%"
    >
      <template #default>
        <el-form
          ref="ApplicationFormRef"
          :model="ApplicationFormData"
          :rules="ApplicationFormRules"
          label-width="180px"
          label-position="right"
          :size="formSize"
          status-icon
        >
          <el-divider content-position="left"> 个人信息 </el-divider>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="工号(PKU ID)" prop="pkuId">
                <el-input v-model="ApplicationFormData.pkuId" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号(Mobile)" prop="mobile" required>
                <el-input v-model="ApplicationFormData.mobile" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="离京事由" prop="reason" required>
            <el-input
              v-model="ApplicationFormData.reason"
              placeholder="Reason for leaving Beijing"
              type="textarea"
            />
          </el-form-item>
          <el-form-item
            label="目的地是否低风险地区"
            prop="destinationIsLowRiskArea"
            required
          >
            <el-col :span="12"
              >Whether the destination is a low-risk area ?</el-col
            >
            <el-col :span="12">
              <el-radio-group
                v-model="ApplicationFormData.destinationIsLowRiskArea"
              >
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
                    v-model="ApplicationFormData.dateOfLeavingBeijing"
                    type="date"
                    placeholder="Date of leaving Beijing"
                    size="large"
                    style="width: 285px"
                  />
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="交通工具"
                prop="transportationLeaving"
                required
              >
                <el-select
                  v-model="ApplicationFormData.transportationLeaving"
                  placeholder="Pick your transportation"
                  style="width: 285px"
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
                <el-input
                  v-model="ApplicationFormData.transportationDetailsLeaving"
                  placeholder="Flight/Train Number"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="目的地" prop="destination" required>
                <el-input
                  v-model="ApplicationFormData.destination"
                  placeholder="Destination"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="经停地点" prop="stopoverPlacesLeaving" required>
            <el-input
              v-model="ApplicationFormData.stopoverPlacesLeaving"
              placeholder="Stopover Places"
              type="textarea"
            />
          </el-form-item>
          <el-divider content-position="left"> 返京信息 </el-divider>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="返京日期" required>
                <el-form-item prop="dateOfReturningToBeijing">
                  <el-date-picker
                    v-model="ApplicationFormData.dateOfReturningToBeijing"
                    type="date"
                    label="Pick a date"
                    placeholder="Date of returning to Beijing"
                    style="width: 285px"
                  />
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="交通工具"
                prop="transportationReturning"
                required
              >
                <el-select
                  v-model="ApplicationFormData.transportationReturning"
                  placeholder="Pick your transportation"
                  style="width: 285px"
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
                <el-input
                  v-model="ApplicationFormData.transportationDetailsReturning"
                  placeholder="Flight/Train Number"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="返校日期" required>
                <el-form-item prop="dateOfReturningToPKU">
                  <el-date-picker
                    v-model="ApplicationFormData.dateOfReturningToPKU"
                    type="date"
                    label="Pick a date"
                    placeholder="Date of returning to PKU"
                    style="width: 285px"
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
            <el-input
              v-model="ApplicationFormData.stopoverPlacesReturning"
              placeholder="Stopover Places "
              type="textarea"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerOpen = false">Cancel</el-button>
          <el-button @click="onSubmit(ApplicationFormRef)" type="primary"
            >Save</el-button
          >
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const props = defineProps(["currentUser"]);
const formSize = ref("large");
const ApplicationFormRef = ref<FormInstance>();

const dialogDetails = ref(false);
const ApplicationFormData = reactive({
  name: props.currentUser.name,
  pkuId: props.currentUser.pkuId,
  approvedBy: "",
  approvalStatus: "not-submitted",
  reason: "",
  mobile: "",
  destinationIsLowRiskArea: "",
  dateOfLeavingBeijing: null,
  transportationLeaving: "",
  transportationDetailsLeaving: "",
  stopoverPlacesLeaving: "",
  destination: "",
  dateOfReturningToBeijing: null,
  transportationReturning: "",
  transportationDetailsReturning: "",
  stopoverPlacesReturning: "",
  dateOfReturningToPKU: null,
  submissionDate: null,
  applicationId: null,
});
const ApplicationFormRules = reactive<FormRules>({
  reason: [
    {
      type: "string",
      required: true,
      message: "Please input Reason",
      trigger: "blur",
    },
  ],
  mobile: [
    {
      type: "string",
      required: true,
      message: "Please input Mobile",
      trigger: "blur",
    },
  ],
  destinationIsLowRiskArea: [
    {
      type: "string",
      required: true,
      message: "Please Select Risk Level",
      trigger: "blur",
    },
  ],
  dateOfLeavingBeijing: [
    {
      type: "date",
      required: true,
      message: "Please pick date of leaving Beijing",
      trigger: "blur",
    },
  ],
  transportationLeaving: [
    {
      type: "string",
      required: true,
      message: "Please input transportation",
      trigger: "blur",
    },
  ],
  transportationDetailsLeaving: [
    {
      type: "string",
      required: true,
      message: "Please input transportation details",
      trigger: "blur",
    },
  ],
  stopoverPlacesLeaving: [
    {
      type: "string",
      required: true,
      message: "Please input stopover places",
      trigger: "blur",
    },
  ],
  destination: [
    {
      type: "string",
      required: true,
      message: "Please input Destination",
      trigger: "blur",
    },
  ],
  dateOfReturningToBeijing: [
    {
      type: "date",
      required: true,
      message: "Please pick date of returning to Beijing",
      trigger: "blur",
    },
  ],
  transportationReturning: [
    {
      type: "string",
      required: true,
      message: "Please input transportation",
      trigger: "blur",
    },
  ],
  transportationDetailsReturning: [
    {
      type: "string",
      required: true,
      message: "Please input transportation details",
      trigger: "blur",
    },
  ],
  stopoverPlacesReturning: [
    {
      type: "string",
      required: true,
      message: "Please input stopover places",
      trigger: "blur",
    },
  ],
  dateOfReturningToPKU: [
    {
      type: "date",
      required: true,
      message: "Please pick date of returning to PKU",
      trigger: "blur",
    },
  ],
});

let url = "";
if (props.currentUser.role == "admin") {
  url = "http://kavli.pku.edu.cn:8888/applications";
} else {
  url = "http://kavli.pku.edu.cn:8888/applications?pkuId=" + props.currentUser.pkuId;
}
const { data: resp, pending, refresh, error } = await useFetch(url);
let tableData: Application[] = reactive(resp.value.applications);
let drawerOpen = ref(false);

interface Application {
  name: string;
  pkuId: string;
  approvedBy: string;
  approvalStatus: string;
  reason: string;
  mobile: string;
  destinationIsLowRiskArea: string;
  dateOfLeavingBeijing: Date;
  transportationLeaving: string;
  transportationDetailsLeaving: string;
  stopoverPlacesLeaving: string;
  destination: string;
  dateOfReturningToBeijing: Date;
  transportationReturning: string;
  transportationDetailsReturning: string;
  stopoverPlacesReturning: string;
  dateOfReturningToPKU: Date;
  submissionDate: string;
  applicationId: number;
}
const applicationDetails = ref({});
const onDetails = (index, row) => {
  console.log(row);
  applicationDetails.value = row;
  dialogDetails.value = true;
};
const onApprove = async (index, row) => {
  console.log(index);
  console.log(row.applicationId);
  const { data: resp } = await useFetch(
    "http://kavli.pku.edu.cn:8888/applications/" + row.applicationId,
    {
      method: "put",
      body: {
        approvedBy: props.currentUser.name,
        approvalStatus: "approved",
      },
    }
  );
  console.log(resp.value);
  row.approvedBy = props.currentUser.name;
  row.approvalStatus = "approved";
};
const onSubmit = async (formEl: FormInstance | undefined) => {
  console.log(ApplicationFormData);
  const now = new Date();
  let formValid = false;
  console.log(formEl);
  ApplicationFormData.approvalStatus = "pending-approval";
  ApplicationFormData.submissionDate = now.toLocaleDateString();
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("valid!");
      formValid = true;
    } else {
      console.log("not valid!", fields);
    }
  });
  if (formValid) {
    ApplicationFormData.dateOfLeavingBeijing =
      ApplicationFormData.dateOfLeavingBeijing.toLocaleDateString();
    ApplicationFormData.dateOfReturningToBeijing =
      ApplicationFormData.dateOfReturningToBeijing.toLocaleDateString();
    ApplicationFormData.dateOfReturningToPKU =
      ApplicationFormData.dateOfReturningToPKU.toLocaleDateString();
    const { data: resp } = await useFetch(
      "http://kavli.pku.edu.cn:8888/applications",
      {
        method: "post",
        body: ApplicationFormData,
      }
    );
    console.log(resp.value);
    drawerOpen.value = false;
    location.reload()
  }
};
</script>