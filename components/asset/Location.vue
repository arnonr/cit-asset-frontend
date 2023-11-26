<template>
  <div class="postbox__details-content-wrapper mt-40">
    <div class="row">
      <div class="col-12 col-lg-12">
        <div class="mb-30">
          <button
            type="button"
            class="btn btn-warning"
            @click="
              () => {
                location_item = {}
                type_submit = 'add';
                modalForm.show();
              }
            "
          >
            <i class="fa-regular fa-plus"></i>
            คำขอย้ายสถานที่ติดตั้ง
          </button>
        </div>

        <div class="row gx-2 grid">
          <div class="col-12">
            <div class="table-responsive">
              <table class="table table-bordered table-striped table-admin">
                <thead>
                  <tr>
                    <th class="text-center">สถานที่ตั้ง</th>
                    <th class="text-center">สถานะ</th>
                    <th class="text-center">วันที่ขอย้าย</th>
                    <th class="text-center">วันที่อนุมัติ</th>
                    <th class="text-center">จัดการ</th>
                  </tr>
                </thead>
                <tbody v-if="items.length != 0">
                  <tr v-for="(it, idx) in items" :key="idx">
                    <td>{{ it.location }}</td>
                    <td class="text-center">
                      <span
                        v-if="it.status != null"
                        :class="
                          'badge rounded-pill bg-' +
                          selectOptions.location_statuses[it.status].color
                        "
                        >{{
                          selectOptions.location_statuses[it.status].name
                        }}</span
                      >
                    </td>
                    <td class="text-center">
                      {{
                        it.created_at != null
                          ? dayjs(it.created_at)
                              .locale("th")
                              .format("DD MMM BBBB")
                          : "-"
                      }}
                    </td>
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
                      <button class="btn btn-info">
                        <i
                          class="fa fa-edit"
                          @click="
                            () => {
                              location_item = { ...it };
                              location_item.status =
                                selectOptions.location_statuses.find((x) => {
                                  return x.id == it.status;
                                });
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
    id="modal-form"
    tabindex="-1"
    aria-labelledby="modal-form"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-form-label">
            แบบฟอร์มคำขอย้ายสถานที่ติดตั้ง
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
                <label for="recipient-name" class="col-form-label"
                  ><span class="text-danger">*</span>สถานที่ตั้ง :</label
                >
                <input
                  type="text"
                  class="form-control form-control-plaintext"
                  id="txt-location"
                  v-model="location_item.location"
                  placeholder="สถานที่ตั้ง"
                />
              </div>
              <div class="col-12 mt-4">
                <label for="recipient-name" class="col-form-label"
                  ><span class="text-danger">*</span>สถานะ :</label
                >
                <v-select
                  v-if="useCookie('user').value.level == 1"
                  label="name"
                  placeholder="สถานะการอนุมัติ"
                  :options="selectOptions.location_statuses"
                  id="slt-status"
                  v-model="location_item.status"
                  class="form-control v-select-no-border"
                  :clearable="true"
                ></v-select>
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
import dayjs from "dayjs";
import vSelect from "vue-select";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const route = useRoute();

export default {
  props: {
    item: {},
    masonry: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<script setup>
import asset_data from "~~/mixins/assetData";

// Variable
const runtimeConfig = useRuntimeConfig();
const type_submit = ref("add");
const items = ref([]);
const location_item = ref({});
const totalPage = ref(1);
const totalItems = ref(0);
let modalForm;
const selectOptions = ref({
  perPage: [
    { title: "20", value: 20 },
    { title: "40", value: 40 },
    { title: "60", value: 60 },
  ],
  location_statuses: asset_data.data().location_statuses,
});

// Function Fetch
const fetchItems = async () => {
  let params = {
    asset_id: route.params.id,
    orderBy: "created_at",
    order: "desc",
  };

  let data = await $fetch(
    `${runtimeConfig.public.apiBase}/asset-location-history`,
    {
      params: params,
    }
  ).catch((error) => error.data);

  items.value = data.data.map((e) => {
    return e;
  });

  totalPage.value = data.totalPage;
  totalItems.value = data.totalData;
};

// Event
const onSubmit = async () => {
  if (
    location_item.value.location == null ||
    location_item.value.location == ""
  ) {
    useToast("โปรดระบุข้อมูลให้ครบถ้วน", "error");
    return;
  }

  let type_object = {
    text_success: "เพิ่มคำขอเสร็จสิ้น",
    method: "post",
    url: runtimeConfig.public.apiBase + "/asset-location-history",
  };

  let approved_date = undefined;
  let approved_by = undefined;
  let created_by = undefined;
  if (type_submit.value == "edit") {
    type_object = {
      text_success: "แก้ไขรายการเสร็จสิ้น",
      method: "put",
      url: type_object.url + "/" + location_item.value.id,
    };

    let find_item = items.value.find((x) => {
      return x.id == location_item.value.id;
    });

    if (location_item.value.status.id != find_item.status) {
      if (location_item.value.status != 0) {
        approved_date = dayjs().format("YYYY-MM-DD");
        approved_by = useCookie("user").value.firstname;
      } else {
        approved_date = null;
      }
    }
  } else {
    created_by = useCookie("user").value.firstname;

    if (location_item.value.status != null) {
      if (location_item.value.status.id != 0) {
        approved_date = dayjs().format("YYYY-MM-DD");
        approved_by = useCookie("user").value.firstname;
      }
    }
  }

  await $fetch(type_object.url, {
    method: type_object.method,
    body: {
      ...location_item.value,
      created_by: created_by,
      asset_id: Number(route.params.id),
      status:
        location_item.value.status != null ? location_item.value.status.id : "",
      approved_at: approved_date,
      approved_by: approved_by,
    },
  })
    .then((res) => {
      if (res.msg == "success") {
        useToast(type_object.text_success, "success");
        modalForm.hide();
        fetchItems();
        location_item.value = {};
      } else {
        throw new Error("ERROR");
      }
    })
    .catch((error) => error.data);
};

onMounted(() => {
  fetchItems();
  modalForm = new bootstrap.Modal(document.getElementById("modal-form"));
});
</script>
