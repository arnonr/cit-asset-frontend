<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="breadcrumb__content p-relative z-index-1">
            <div class="breadcrumb__list">
              <span> ผู้ดูแลระบบ </span>
              <span class="dvdr"><i class="fa-solid fa-circle-small"></i></span>
              <span> รายการคำขอย้ายสถานที่ใช้งานปัจจุบัน </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="portfolio__area pt-40 d-print-none">
    <div class="container">
      <div class="mt-10 mb-30 pl-10 pt-15 pb-10 bg-grey">
        <h4>
          <i class="fa-solid fa-search"></i>
          <span class="ml-10">ค้นหา</span>
        </h4>
      </div>

      <div class="row">
        <div class="col-12 col-lg-4">
          <input
            class="form-control"
            v-model="search.asset_name"
            name="title"
            type="text"
            placeholder="ชื่อครุภัณฑ์"
          />
        </div>
        <div
          class="col-12 col-lg-4"
          v-if="selectOptions.asset_types.length != 0"
        >
          <v-select
            label="title"
            placeholder="ประเภทครุภัณฑ์"
            :options="selectOptions.asset_types"
            v-model="search.asset_type_id"
            class="form-control v-select-no-border"
            :clearable="true"
          ></v-select>
        </div>
        <div
          class="col-12 col-lg-4"
          v-if="selectOptions.budget_types.length != 0"
        >
          <v-select
            label="title"
            placeholder="แหล่งเงิน"
            :options="selectOptions.budget_types"
            v-model="search.budget_type_id"
            class="form-control v-select-no-border"
            :clearable="true"
          ></v-select>
        </div>

        <div class="col-12 col-lg-4">
          <v-select
            label="name"
            placeholder="ปีที่เข้าคลัง"
            :options="selectOptions.input_years"
            v-model="search.input_year"
            class="form-control v-select-no-border"
            :clearable="true"
          ></v-select>
        </div>

        <div class="col-12 col-lg-4">
          <input
            class="form-control"
            v-model="search.brand"
            name="title"
            type="text"
            placeholder="ยี่ห้อ"
          />
        </div>

        <div class="col-12 col-lg-4">
          <input
            class="form-control"
            v-model="search.model"
            name="title"
            type="text"
            placeholder="รุ่น"
          />
        </div>

        <div class="col-12 col-lg-4">
          <input
            class="form-control"
            v-model="search.location"
            name="title"
            type="text"
            placeholder="สถานที่ตั้ง"
          />
        </div>

        <div
          class="col-12 col-lg-4"
          v-if="selectOptions.departments.length != 0"
        >
          <v-select
            label="title"
            placeholder="หน่วยงานที่รับผิดชอบ"
            :options="selectOptions.departments"
            v-model="search.department_id"
            class="form-control v-select-no-border"
            :clearable="true"
          ></v-select>
        </div>

        <div class="col-12 col-lg-4">
          <input
            class="form-control"
            v-model="search.drawer_name"
            name="drawer_name"
            type="text"
            placeholder="ชื่อผู้เบิก"
          />
        </div>

        <div class="col-12 col-lg-4">
          <input
            class="form-control"
            v-model="search.holder_name"
            name="holder_name"
            type="text"
            placeholder="ชื่อผู้ใช้งาน"
          />
        </div>

        <div class="col-12 col-lg-4">
          <v-select
            label="name"
            placeholder="สถานะคำขอย้าย"
            :options="selectOptions.location_statuses"
            v-model="search.status"
            class="form-control v-select-no-border"
            :clearable="true"
          ></v-select>
        </div>

        <!-- Date -->
        <div class="col-12 col-lg-4">
          <!-- <v-select
            label="name"
            placeholder="อายุการใช้งาน"
            :options="selectOptions.warranty_day"
            v-model="search.asset_status"
            class="form-control v-select-no-border"
            :clearable="true"
          ></v-select> -->
        </div>

        <div class="col-12 col-lg-4">
          <!-- น้อยกว่า 1 ปี, น้อยกว่า 2 ปี, น้อยกว่า 6 เดือน, น้อยกว่า 3 เดือน -->
          <!-- <v-select
            label="name"
            placeholder="การรับประกันที่เหลือ"
            :options="selectOptions.warranty_days"
            v-model="search.warranty_day"
            class="form-control v-select-no-border"
            :clearable="true"
          ></v-select> -->
        </div>
      </div>
    </div>
  </section>

  <section class="portfolio__area pt-40 pb-40">
    <div class="container">
      <div class="mt-10 mb-30 pl-10 pt-15 pb-10 bg-grey">
        <h4>
          <i class="fa-regular fa-list"></i>
          <span class="ml-10">รายการคำขอย้ายสถานที่ใช้งานปัจจุบัน</span>
        </h4>
      </div>

      <div class="mb-30">
        <!-- before-generate -->
        <!-- fetch -->
        <!-- :data="json_data" -->
        <json-excel
          :fetch="fetchItemsExport"
          :fields="json_fields"
          :name="'location'"
          :header="[
            'รายการประวัติการเปลี่ยนแปลงสถานที่ใช้งาน',
            'ระหว่างวันที่ .............. ถึง ..............',
          ]"
          class="d-inline ms-2"
        >
          <button type="button" class="btn btn-success">
            <i class="fa-regular fa-file"></i> Export Excel
          </button>
        </json-excel>
      </div>

      <div class="row gx-2 grid">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-bordered table-striped table-admin">
              <thead>
                <tr>
                  <th class="text-center">หมายเลขครุภัณฑ์</th>
                  <th class="text-center">ชื่อครุภัณฑ์</th>
                  <th class="text-center">สถานที่ใช้งานปัจจุบัน</th>
                  <th class="text-center">สถานะคำขอย้าย</th>
                  <th class="text-center">วันที่ขอย้าย</th>
                  <th class="text-center">วันที่พิจารณา</th>
                  <th class="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody v-if="items.length != 0">
                <tr v-for="(it, idx) in items" :key="idx">
                  <td>{{ it.asset.asset_code }}</td>
                  <td>{{ it.asset.asset_name }}</td>
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
                    <button
                      class="btn btn-info"
                      v-if="
                        (useCookie('user').value != undefined &&
                          useCookie('user').value.level) == 1
                      "
                    >
                      <i
                        class="fa fa-edit"
                        @click="
                          () => {
                            item = { ...it };
                            item.status = selectOptions.location_statuses.find(
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

                    <button
                      class="btn btn-info"
                      v-if="
                        useCookie('user').value != undefined &&
                        useCookie('user').value.level == 3 &&
                        it.is_notice == 1
                      "
                      @click="onChangeNotice(it.id)"
                    >
                      <i class="fa fa-edit"></i>
                      รับทราบผล
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-xxl-12">
        <div class="tp-pagination mt-30">
          <blog-pagination
            :totalPage="totalPage"
            :currentPage="currentPage"
            @update:currentPage="currentPage = $event"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="modal-form"
    tabindex="-1"
    aria-labelledby="modal-form"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-form-label">
            แบบฟอร์มคำขอย้ายสถานที่ใช้งานปัจจุบัน
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
                  ><span class="text-danger">*</span>สถานที่ตั้ง(ใหม่) :</label
                >
                <input
                  type="text"
                  class="form-control form-control-plaintext"
                  id="txt-location"
                  v-model="item.location"
                  placeholder="สถานที่ตั้ง"
                />
              </div>
              <div
                class="col-12 mt-4"
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
                  placeholder="สถานะการอนุมัติ"
                  :options="selectOptions.location_statuses"
                  id="slt-status"
                  v-model="item.status"
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

<script setup>
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
// Import
// import tableItem from "~/components/list/TableItem.vue";
import BlogPagination from "~/components/common/pagination/BlogPagination.vue";
import asset_data from "~~/mixins/assetData";
import JsonExcel from "vue-json-excel3";
import XLSX from "xlsx";
// Variable

dayjs.extend(buddhistEra);
// const route = useRoute();
// const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const items = ref([]);
const item = ref({});
const perPage = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);
const totalItems = ref(0);
const search = ref({});
const json_data = ref([]);
const type_submit = ref("");
const update_location = ref(false);
let modalForm;

const selectOptions = ref({
  perPage: [
    { title: "20", value: 20 },
    { title: "40", value: 40 },
    { title: "60", value: 60 },
  ],
  location_statuses: asset_data.data().location_statuses,
  input_years: asset_data.data().input_years(),
  asset_types: [],
  asset_types_array: [],
  budget_types: [],
  departments: [],
});

const json_fields = {
  หมายเลขครุภัณฑ์: "หมายเลขครุภัณฑ์",
  ชื่อครุภัณฑ์: "ชื่อครุภัณฑ์",
  รายละเอียด: "รายละเอียด",
  ประเภทครุภัณฑ์: "ประเภทครุภัณฑ์",
  สถานที่ติดตั้ง: "สถานที่ติดตั้ง",
  สถานที่ใช้งานเดิม: "สถานที่ใช้งานเดิม",
  สถานที่ใช้งานใหม่: "สถานที่ใช้งานใหม่",
  วันที่ขอย้าย: "วันที่ขอย้าย",
  ผู้แจ้ง: "ผู้แจ้ง",
  สถานะ: "สถานะ",
  //   วันที่อนุมัติ: "วันที่อนุมัติ",
  //   City: "city",
  //   Telephone: "phone.mobile",
  //   "Telephone 2": {
  //     field: "phone.landline",
  //     callback: (value) => {
  //       return `Landline Phone - ${value}`;
  //     },
  //   },
};

// Function Fetch
const fetchAssetTypes = async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/asset-type`, {
    params: {
      is_active: 1,
    },
  }).catch((error) => error.data);

  selectOptions.value.asset_types_array = selectOptions.value.asset_types =
    data.data.map((e) => {
      selectOptions.value.asset_types_array[e.id] = e.name;
      return { title: e.name, value: e.id };
    });
};
const fetchBudgetTypes = async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/budget-type`, {
    params: {
      is_active: 1,
    },
  }).catch((error) => error.data);

  selectOptions.value.budget_types = data.data.map((e) => {
    let category = "";
    if (e.category != null) {
      category = " (" + e.category + ")";
    }
    return { title: e.name + category, value: e.id };
  });
};

const fetchDepartments = async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/department`, {
    params: {
      is_active: 1,
      department_id:
        useCookie("user").value.level == 3
          ? useCookie("user").value.department_id
          : undefined,
    },
  }).catch((error) => error.data);

  selectOptions.value.departments = data.data.map((e) => {
    return { title: e.name, value: e.id };
  });
};

const fetchItems = async () => {
  let params = {
    ...search.value,
    asset_type_id:
      search.value.asset_type_id != null
        ? search.value.asset_type_id
        : undefined,
    budget_type_id:
      search.value.budget_type_id != null
        ? search.value.budget_type_id
        : undefined,
    department_id:
      search.value.departmentid != null
        ? search.value.department_id
        : undefined,
    input_year:
      search.value.input_year == null ? undefined : search.value.input_year.id,
    status: search.value.status != null ? search.value.status.id : undefined,
    perPage: perPage.value,
    currentPage: currentPage.value,
    orderBy: "created_at",
    order: "desc",
  };

  if (useCookie("user").value.level == 3) {
    params["department_id"] = useCookie("user").value.department_id;
  }

  let data = await $fetch(
    `${runtimeConfig.public.apiBase}/asset-location-history`,
    {
      params: params,
    }
  ).catch((error) => error.data);

  json_data.value = [];
  items.value = data.data.map((e) => {
    return e;
  });

  totalPage.value = data.totalPage;
  totalItems.value = data.totalData;
};

const fetchItemsExport = async () => {
  let params = {
    ...search.value,
    asset_type_id:
      search.value.asset_type_id != null
        ? search.value.asset_type_id
        : undefined,
    budget_type_id:
      search.value.budget_type_id != null
        ? search.value.budget_type_id
        : undefined,
    department_id:
      search.value.departmentid != null
        ? search.value.department_id
        : undefined,
    input_year:
      search.value.input_year == null ? undefined : search.value.input_year.id,
    status: search.value.status != null ? search.value.status.id : undefined,
    perPage: 100000,
    currentPage: currentPage.value,
    lang: "th",
    orderBy: "created_at",
    order: "desc",
  };

  if (useCookie("user").value.level == 3) {
    params["department_id"] = useCookie("user").value.department_id;
  }

  let data = await $fetch(
    `${runtimeConfig.public.apiBase}/asset-location-history`,
    {
      params: params,
    }
  ).catch((error) => error.data);

  //   json_data.value = [];
  //   json_data.value = data.data.map((e) => {
  //     return {
  //       หมายเลขครุภัณฑ์: e.asset.asset_code,
  //       ชื่อครุภัณฑ์: e.asset.asset_name,
  //       รายละเอียด: e.asset.asset_detail,
  //       ประเภทครุภัณฑ์: e.asset.asset_type?.name,
  //       สถานที่ติดตั้ง: e.install_location,
  //       สถานที่ใช้งานเดิม: e.location,
  //       สถานที่ใช้งานใหม่: e.location,
  //       วันที่ขอย้าย:
  //         e.created_at != null
  //           ? dayjs(e.created_at).locale("th").format("DD MMM BBBB")
  //           : "-",
  //       ผู้แจ้ง: 1,
  //       สถานะ: e.status,
  //     };
  //   });


  return data.data.map((e) => {
    return {
      หมายเลขครุภัณฑ์: e.asset.asset_code,
      ชื่อครุภัณฑ์: e.asset.asset_name,
      รายละเอียด: e.asset.asset_detail,
    //   ประเภทครุภัณฑ์: e.asset.asset_type_id ? selectOptions.value.asset_types_arra : ,
      สถานที่ติดตั้ง: e.location,
      สถานที่ใช้งานเดิม: e.location,
      สถานที่ใช้งานใหม่: e.location,
      วันที่ขอย้าย:
        e.created_at != null
          ? dayjs(e.created_at).locale("th").format("DD MMM BBBB")
          : "-",
      ผู้แจ้ง: e.created_by,
      สถานะ: e.status,
    };
  });
};

// Watch
watch(
  [currentPage, search],
  () => {
    fetchItems();
  },
  { deep: true }
);

watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

// Event
onMounted(() => {
  fetchAssetTypes();
  fetchBudgetTypes();
  fetchDepartments();
  fetchItems();
  modalForm = new bootstrap.Modal(document.getElementById("modal-form"));
});

const onConfirmDelete = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Cancel it!",
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete(id);
    }
  });
};

const onDelete = async (id) => {
  await $fetch(`${runtimeConfig.public.apiBase}/budget-type/${id}`, {
    method: "delete",
  })
    .then((res) => {
      if (res.msg == "success") {
        useToast("ลบรายการเสร็จสิ้น", "success");
        fetchItems();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error("ERROR");
      }
    })
    .catch((error) => error.data);
};

const onSubmit = async () => {
  if (item.value.location == null || item.value.location == "") {
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
  if (type_submit.value == "edit") {
    type_object = {
      text_success: "แก้ไขรายการเสร็จสิ้น",
      method: "put",
      url: type_object.url + "/" + item.value.id,
    };

    let find_item = items.value.find((x) => {
      return x.id == item.value.id;
    });

    if (item.value.status.id != find_item.status) {
      if (item.value.status != 0) {
        approved_date = dayjs().format("YYYY-MM-DD");
        approved_by = useCookie("user").value.firstname;
        update_location.value = true;
      } else {
        approved_date = null;
      }
    }
  } else {
    created_by = useCookie("user").value.firstname;

    if (item.value.status != null) {
      if (item.value.status.id != 0) {
        approved_date = dayjs().format("YYYY-MM-DD");
        approved_by = useCookie("user").value.firstname;
        update_location.value = true;
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
      ...item.value,
      asset_id: item.value.asset_id,
      previous_location: item.value.asset.location,
      status: item.value.status != null ? item.value.status.id : "",
      approved_at: approved_date,
      approved_by: approved_by,
    },
  })
    .then(async (res) => {
      if (res.msg == "success") {
        useToast(type_object.text_success, "success");
        if (update_location.value == true) {
          await $fetch(
            runtimeConfig.public.apiBase + "/asset/" + item.value.asset_id,
            {
              method: "post",
              headers: {
                Authorization: useCookie("token").value
                  ? `Bearer ${useCookie("token").value}`
                  : "",
              },
              body: {
                location: item.value.location,
              },
            }
          );
        }

        // refreshNoti
        let data1 = await $fetch(
          `${runtimeConfig.public.apiBase}/asset-location-history`
        ).catch((error) => error.data);

        let item1 = data1.data.filter((e) => {
          return e.status == 0;
        });

        useNotification().value = {
          location: item1.length,
          holder: useNotification().value.holder,
          fix: useNotification().value.fix,
        };
        // EndRefresh

        modalForm.hide();
        fetchItems();

        item.value = {};
        update_location.value = false;
      } else {
        throw new Error("ERROR");
      }
    })
    .catch((error) => error.data);
};

const onChangeNotice = async (id) => {
  let type_object = {
    text_success: "รับทราบผลเสร็จสิ้น",
    method: "put",
    url: runtimeConfig.public.apiBase + "/asset-location-history/" + id,
  };

  await $fetch(type_object.url, {
    method: type_object.method,
    headers: {
      Authorization: useCookie("token").value
        ? `Bearer ${useCookie("token").value}`
        : "",
    },
    body: {
      is_notice: 0,
    },
  })
    .then(async (res) => {
      if (res.msg == "success") {
        // refreshNoti
        let params = {};
        params["deparment_id"] = useCookie("user").value.department_id;
        params["is_notice"] = 1;

        let data1 = await $fetch(
          `${runtimeConfig.public.apiBase}/asset-location-history`,
          {
            params: params,
          }
        ).catch((error) => error.data);

        let item1 = data1.data.filter((e) => {
          return e;
        });

        useNotification().value = {
          location: item1.length,
          holder: useNotification().value.holder,
          fix: useNotification().value.fix,
        };
        // EndRefresh
        useToast(type_object.text_success, "success");
        fetchItems();
      } else {
        throw new Error("ERROR");
      }
    })
    .catch((error) => error.data);
};

useHead({
  title: "รายการคำขอย้ายสถานที่ใช้งานปัจจุบัน",
});

// definePageMeta({
//   middleware: "auth",
// });
</script>

<style scoped></style>
