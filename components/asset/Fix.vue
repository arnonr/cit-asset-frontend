<template>
  <div class="postbox__details-content-wrapper mt-40">
    <div class="row">
      <div class="col-12 col-lg-12">
        <div class="mb-30">
          <h4 v-if="type == 'view'">ประวัติคำขอแจ้งซ่อม</h4>
          <button
            type="button"
            class="btn btn-warning"
            @click="
              () => {
                fix_item = {};
                type_submit = 'add';
                modalForm.show();
              }
            "
            v-if="
              ((useCookie('user').value != undefined &&
                useCookie('user').value.level == 1) ||
                (useCookie('user').value != undefined &&
                  useCookie('user').value.level == 3)) &&
              type == 'edit'
            "
          >
            <i class="fa-regular fa-plus"></i>
            คำขอแจ้งซ่อมครุภัณฑ์
          </button>
        </div>

        <div class="row gx-2 grid">
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-bordered table-striped table-admin">
                <thead>
                  <tr>
                    <th class="text-center">รายละเอียด</th>
                    <th class="text-center">ราคา</th>
                    <th class="text-center">วันที่แจ้งซ่อม</th>
                    <!-- <th class="text-center">วันที่แจ้งซ่อม</th> -->
                    <th class="text-center">วันที่ตรวจสอบ</th>
                    <th class="text-center">สถานะ</th>
                    <th class="text-center">หมายเหตุ</th>
                    <th
                      class="text-center"
                      v-if="
                        useCookie('user').value != undefined &&
                        useCookie('user').value.level == 1 &&
                        type == 'edit'
                      "
                    >
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody v-if="items.length != 0">
                  <tr v-for="(it, idx) in items" :key="idx">
                    <td>{{ it.description }}</td>
                    <td class="text-center">
                      {{
                        it.price != null
                          ? Number(it.price)
                              .toFixed(2)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : ""
                      }}
                    </td>
                    <td class="text-center">
                      {{
                        it.repair_date != null
                          ? dayjs(it.repair_date)
                              .locale("th")
                              .format("DD MMM BBBB")
                          : "-"
                      }}
                    </td>
                    <!-- <td class="text-center">
                      {{
                        it.created_at != null
                          ? dayjs(it.created_at)
                              .locale("th")
                              .format("DD MMM BBBB")
                          : "-"
                      }}
                    </td> -->
                    <td class="text-center">
                      {{
                        it.approved_at != null
                          ? dayjs(it.approved_at)
                              .locale("th")
                              .format("DD MMM BBBB")
                          : "-"
                      }}
                    </td>

                    <td class="text-center">
                      <span
                        v-if="it.status != null"
                        :class="
                          'badge rounded-pill bg-' +
                          selectOptions.fix_statuses[it.status].color
                        "
                        >{{ selectOptions.fix_statuses[it.status].name }}</span
                      >
                    </td>

                    <td>{{ it.reject_comment }}</td>
                    <td
                      class="text-center"
                      v-if="
                        useCookie('user').value != undefined &&
                        useCookie('user').value.level == 1 &&
                        type == 'edit'
                      "
                    >
                      <button class="btn btn-info">
                        <i
                          class="fa fa-edit"
                          @click="
                            () => {
                              fix_item = { ...it };
                              fix_item.status = selectOptions.fix_statuses.find(
                                (x) => {
                                  return x.id == it.status;
                                }
                              );
                              type_submit = 'edit';
                              modalForm.show();
                            }
                          "
                        ></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="modal-form-2"
    tabindex="-1"
    aria-labelledby="modal-form-2"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-form-label">
            แบบฟอร์มคำขอแจ้งซ่อมครุภัณฑ์
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="row">
              <div class="col-12">
                <label for="fix-description" class="col-form-label"
                  ><span class="text-danger">*</span>รายละเอียด :</label
                >
                <textarea
                  class="form-control"
                  rows="5"
                  style="min-height: 100px"
                  id="txt-fix-description"
                  v-model="fix_item.description"
                  placeholder="รายละเอียด"
                >
                </textarea>
              </div>
              <div class="col-12">
                <label for="fix-price" class="col-form-label">ราคา :</label>
                <input
                  type="number"
                  class="form-control form-control-plaintext"
                  id="txt-fix-price"
                  v-model="fix_item.price"
                  placeholder="ราคา"
                />
              </div>

              <div class="col-12">
                <label for="fix-price" class="col-form-label">วันที่ :</label>
                <VueDatePicker
                  v-model="fix_item.repair_date"
                  :enable-time-picker="false"
                  locale="th"
                  auto-apply
                  :format="format"
                >
                  <template #year-overlay-value="{ text }">
                    {{ parseInt(text) + 543 }}
                  </template>
                  <template #year="{ value }">
                    {{ value + 543 }}
                  </template>
                </VueDatePicker>
              </div>
              <div
                class="col-12 mt-2"
                v-if="
                  useCookie('user').value != undefined &&
                  useCookie('user').value.level == 1
                "
              >
                <label for="recipient-name" class="col-form-label"
                  ><span class="text-danger">*</span>สถานะ :</label
                >
                <v-select
                  v-if="
                    useCookie('user').value != undefined &&
                    useCookie('user').value.level == 1
                  "
                  label="name"
                  placeholder="สถานะการตรวจสอบ"
                  :options="selectOptions.fix_statuses"
                  id="slt-status"
                  v-model="fix_item.status"
                  class="form-control v-select-no-border"
                  :clearable="true"
                ></v-select>
              </div>
              <div
                class="col-12"
                v-if="
                  useCookie('user').value != undefined &&
                  useCookie('user').value.level == 1
                "
              >
                <label for="fix-reject_comment" class="col-form-label"
                  >หมายเหตุ :</label
                >
                <textarea
                  class="form-control"
                  rows="5"
                  style="min-height: 100px"
                  id="txt-fix-reject_comment"
                  v-model="fix_item.reject_comment"
                  placeholder="หมายเหตุ"
                >
                </textarea>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-warning" @click="onSubmit()">
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import asset_data from "~~/mixins/assetData";
import vSelect from "vue-select";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const route = useRoute();

// export default {
//   props: {
//     item: {},
//     masonry: {
//       type: Boolean,
//       default: false,
//     },
//     type: {
//       type: String,
//       default: "edit",
//     },
//   },
//   //   watch: {
//   //     props: function (val) {
//   //       this.fullName = val + " " + this.lastName;
//   //     },
//   //   },
// };
</script>

<script setup>
import asset_data from "~~/mixins/assetData";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// Variable
const runtimeConfig = useRuntimeConfig();
const type_submit = ref("add");
const items = ref([]);
const fix_item = ref({});
const totalPage = ref(1);
const totalItems = ref(0);
const update_fix = ref(false);
let modalForm;
const props = defineProps({
  item: Object,
  type: String,
});

const selectOptions = ref({
  perPage: [
    { title: "20", value: 20 },
    { title: "40", value: 40 },
    { title: "60", value: 60 },
  ],
  fix_statuses: asset_data.data().fix_statuses,
});

const format = (date) => {
  const day = dayjs(date).locale("th").format("DD");
  const month = dayjs(date).locale("th").format("MMM");
  const year = date.getFullYear() + 543;

  return `${day} ${month} ${year}`;
};

// Function Fetch
const fetchItems = async () => {
  let params = {
    asset_id: props.type == "view" ? props.item.asset_id : route.params.id,
    orderBy: "created_at",
    order: "desc",
  };

  let data = await $fetch(`${runtimeConfig.public.apiBase}/repair-history`, {
    params: params,
  }).catch((error) => error.data);

  items.value = data.data.map((e) => {
    return e;
  });

  console.log(items.value)
  totalPage.value = data.totalPage;
  totalItems.value = data.totalData;
};

// Event
const onSubmit = async () => {
  if (fix_item.value.description == null || fix_item.value.description == "") {
    useToast("โปรดระบุข้อมูลให้ครบถ้วน", "error");
    return;
  }

  let type_object = {
    text_success: "เพิ่มคำขอเสร็จสิ้น",
    method: "post",
    url: runtimeConfig.public.apiBase + "/repair-history",
  };

  let approved_date = undefined;
  let approved_by = undefined;
  let created_by = undefined;
  let repair_date = undefined;

  if (type_submit.value == "edit") {
    type_object = {
      text_success: "แก้ไขรายการเสร็จสิ้น",
      method: "put",
      url: type_object.url + "/" + fix_item.value.id,
    };

    let find_item = items.value.find((x) => {
      return x.id == fix_item.value.id;
    });

    if (fix_item.value.status.id != find_item.status) {
      if (fix_item.value.status != 0) {
        approved_date = dayjs().format("YYYY-MM-DD");
        approved_by = useCookie("user").value.firstname;
        update_fix.value = true;
      } else {
        approved_date = null;
      }
    }
  } else {
    created_by = useCookie("user").value.firstname;

    if (fix_item.value.status != null) {
      if (fix_item.value.status.id != 0) {
        approved_date = dayjs().format("YYYY-MM-DD");
        approved_by = useCookie("user").value.firstname;
        update_fix.value = true;
      }
    }
  }

  await $fetch(type_object.url, {
    method: type_object.method,
    headers: {
      Authorization: useCookie("token").value
        ? `Bearer ${useCookie("token").value}`
        : "",
    },
    body: {
      ...fix_item.value,
      created_by: created_by,
      asset_id: Number(route.params.id),
      status: fix_item.value.status != null ? fix_item.value.status.id : "",
      approved_at: approved_date,
      repair_date: dayjs(fix_item.value.repair_date).format("YYYY-MM-DD"),
      approved_by: approved_by,
    },
  })
    .then(async (res) => {
      if (res.msg == "success") {
        useToast(type_object.text_success, "success");

        // if (update_fix.value == true) {
        // }
        modalForm.hide();
        fetchItems();
        fix_item.value = {};
        update_fix.value = false;
      } else {
        throw new Error("ERROR");
      }
    })
    .catch((error) => error.data);
};

watch(props, async (newValue, oldValue) => {
  fetchItems();
//   this.fullName = val + " " + this.lastName;
});

onMounted(() => {
  fetchItems();
  modalForm = new bootstrap.Modal(document.getElementById("modal-form-2"));
});
</script>
