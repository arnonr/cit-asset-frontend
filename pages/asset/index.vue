<template>
  <section
    class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4 d-print-none"
  >
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="breadcrumb__content p-relative z-index-1">
            <div class="breadcrumb__list">
              <span> รายการครุภัณฑ์ </span>
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

        <div class="col-12 col-lg-4">
          <input
            class="form-control"
            v-model="search.input_year"
            name="title"
            type="text"
            placeholder="ปีงบประมาณ"
          />
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
            placeholder="หน่วยงาน"
            :options="selectOptions.departments"
            v-model="search.department_id"
            class="form-control v-select-no-border"
            :clearable="true"
          ></v-select>
        </div>

        <div class="col-12 col-lg-4">
          <v-select
            label="name"
            placeholder="สถานะ"
            :options="selectOptions.asset_statuses"
            v-model="search.asset_status"
            class="form-control v-select-no-border"
            :clearable="true"
          ></v-select>
        </div>
      </div>
    </div>
  </section>

  <section class="portfolio__area pt-40 pb-40 d-print-none">
    <div class="container">
      <div class="mt-10 mb-30 pl-10 pt-15 pb-10 bg-grey">
        <h4>
          <i class="fa-regular fa-news"></i>
          <span class="ml-10">รายการครุภัณฑ์</span>
        </h4>
      </div>
      <div class="mb-30">
        <button
          type="button"
          class="btn btn-warning"
          @click="
            () => {
              this.$router.push({ path: '/asset/add' });
            }
          "
        >
          <i class="fa-regular fa-plus"></i>
          ADD
        </button>

        <json-excel :data="json_data" class="d-inline ms-2">
          <button type="button" class="btn btn-success">
            <i class="fa-regular fa-file"></i> Export Excel
          </button>
        </json-excel>

        <button
          type="button"
          class="btn btn-info ms-2"
          @click="onGenerateQR('ALL')"
        >
          <i class="fa-regular fa-qrcode"></i>
          QR CODE
        </button>
      </div>

      <div class="row gx-2 grid">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-bordered table-striped table-admin">
              <thead>
                <tr>
                  <th class="text-center"></th>
                  <th class="text-center">รหัส</th>
                  <th class="text-center">ชื่อ</th>
                  <th class="text-center">ยี่ห้อ</th>
                  <th class="text-center">รุ่น</th>
                  <th class="text-center">ประเภทครุภัณฑ์</th>
                  <th class="text-center">สถานที่ตั้ง</th>
                  <th class="text-center">หน่วยงาน</th>
                  <th class="text-center">สถานะ</th>
                  <th class="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody v-if="items.length != 0">
                <tr v-for="(it, idx) in items" :key="idx">
                  <td>
                    <img
                      :src="it.cover_photo"
                      alt=""
                      class="img-thumbnail"
                      style="width: 100px"
                    />
                  </td>
                  <td>{{ it.asset_code }}</td>
                  <td>{{ it.asset_name }}</td>
                  <td>{{ it.brand }}</td>
                  <td>{{ it.model }}</td>
                  <td>
                    {{ it.asset_type.name }}
                  </td>
                  <td>{{ it.location }}</td>
                  <td>
                    {{ it.department != null ? it.department.name : null }}
                  </td>
                  <td class="text-center">
                    <span
                      v-if="it.asset_status != null"
                      :class="
                        'badge rounded-pill bg-' +
                        selectOptions.asset_statuses[it.asset_status - 1].color
                      "
                      >{{
                        selectOptions.asset_statuses[it.asset_status - 1].name
                      }}</span
                    >
                  </td>
                  <td class="text-center">
                    <NuxtLink
                      :to="{
                        name: 'asset-id',
                        params: { id: it.id },
                      }"
                      class="btn btn-warning text-uppercase"
                    >
                      <i class="fa-regular fa-edit"></i>
                    </NuxtLink>
                    <button class="btn btn-info ms-2" @click="onGenerateQR(it)">
                      <i class="fa fa-qrcode"></i>
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

  <ClientOnly>
    <div class="printable" v-for="(it, idx) in qr_items" :key="idx">
      <figure class="qrcode">
        <vue-qrcode
          :value="'http://localhost:3009/asset/' + it.id"
          tag="img"
          :options="{
            errorCorrectionLevel: 'Q',
            width: 200,
            margin: 1,
          }"
        ></vue-qrcode>
        <img src="~/assets/img/logo/logo_cit.png" class="qrcode__image" />
      </figure>
      <div class="text-center" style="width: 200px; top: -20px !important">
        {{ it.asset_code }}
        <hr />
      </div>
    </div>
  </ClientOnly>
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
import QrcodeVue from "qrcode.vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";
// import  VueQr31 from ("vue3-qr-code-styling");

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
const perPage = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);
const totalItems = ref(0);
const search = ref({});
const json_data = ref([]);

const selectOptions = ref({
  perPage: [
    { title: "20", value: 20 },
    { title: "40", value: 40 },
    { title: "60", value: 60 },
  ],
  asset_statuses: asset_data.data().asset_statuses,
  asset_types: [],
  departments: [],
});

const qr_items = ref([]);

// Function Fetch
const fetchAssetTypes = async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/asset-type`, {
    params: {
      is_active: 1,
    },
  }).catch((error) => error.data);

  selectOptions.value.asset_types = data.data.map((e) => {
    return { title: e.name, value: e.id };
  });
};

const fetchDepartments = async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/department`, {
    params: {
      is_active: 1,
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
      search.value.asset_type_id == null
        ? undefined
        : search.value.asset_type_id.value,
    asset_status:
      search.value.asset_status == null
        ? undefined
        : search.value.asset_status.value,
    department_id:
      search.value.department_id == null
        ? undefined
        : search.value.department_id.value,
    perPage: perPage.value,
    currentPage: currentPage.value,
    lang: "th",
    orderBy: "created_at",
    order: "desc",
  };

  let data = await $fetch(`${runtimeConfig.public.apiBase}/asset`, {
    params: params,
  }).catch((error) => error.data);

  json_data.value = [];
  items.value = data.data.map((e) => {
    json_data.value.push({
      รหัส: e.asset_code,
    });

    return e;
  });
  totalPage.value = data.totalPage;
  totalItems.value = data.totalData;

  fetchItemsExport();
};

const fetchItemsExport = async () => {
  let params = {
    ...search.value,
    asset_type_id:
      search.value.asset_type_id == null
        ? undefined
        : search.value.asset_type_id.value,
    asset_status:
      search.value.asset_status == null
        ? undefined
        : search.value.asset_status.value,
    department_id:
      search.value.department_id == null
        ? undefined
        : search.value.department_id.value,
    perPage: 100000,
    currentPage: currentPage.value,
    lang: "th",
    orderBy: "created_at",
    order: "desc",
  };

  let data = await $fetch(`${runtimeConfig.public.apiBase}/asset`, {
    params: params,
  }).catch((error) => error.data);

  json_data.value = [];
  json_data.value = data.data.map((e) => {
    // json_data.value.push({
    //   รหัส: e.asset_code,
    // });

    return {
      รหัส: e.asset_code,
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
const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      let data = reader.result;
      data = new Uint8Array(data);

      let workbook = XLSX.read(data, { type: "array" });
      let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let result = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
      resolve(result);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
};

const onImportSubmit = () => {
  //   validate
  //   refImportSupervision.value?.validate().then(async ({ valid }) => {
  //     if (valid) {
  //       let importFile = null;
  //       if (importData.value.supervisor_file.length !== 0) {
  //         importFile = importData.value.supervisor_file[0];
  //         let result = await readFileAsync(importFile);
  //         result.shift();
  //         let data = [];
  //         result.forEach((el) => {
  //           // let s_name_prefix = "";
  //           if (el.length != 0) {
  //             let s_firstname = "";
  //             let s_surname = "";
  //             if (el[12] != "" && el[12] != null) {
  //               let arr_prefix = el[12].split(".");
  //               // for (let i = 0; i < arr_prefix.length - 1; i++) {
  //               //   s_name_prefix = s_name_prefix + arr_prefix[i] + ".";
  //               // }
  //               let fullname = arr_prefix[arr_prefix.length - 1];
  //               let arr_name = fullname.split(" ");
  //               s_firstname = arr_name[0];
  //               for (let i = 0; i < arr_name.length; i++) {
  //                 if (i != 0) {
  //                   s_surname = s_surname + arr_name[i] + " ";
  //                 }
  //               }
  //               s_surname = s_surname.trim();
  //             }
  //             data.push({
  //               level: el[0],
  //               student_code: el[1].replace("'", ""),
  //               student_fullname: el[2],
  //               supervision_fullname: el[12],
  //               firstname: s_firstname,
  //               surname: s_surname,
  //             });
  //           }
  //         });
  //         studentListStore
  //           .importSupervision({
  //             semester_id: importData.value.semester_id,
  //             data: data,
  //           })
  //           .then((response) => {
  //             if (response.status === 200) {
  //               data = data.map((e) => {
  //                 let check = response.data.data.find((x) => {
  //                   return x.student_code == e.student_code;
  //                 });
  //                 if (check) {
  //                   e["status"] = check.status;
  //                   e["message"] = check.message;
  //                 }
  //                 return e;
  //               });
  //               console.log(data);
  //               importResult.value = [...data];
  //               // response.data.data.map((x) => {
  //               //   return {
  //               //     student_code: x.student_code,
  //               //     // student_name: x.student_name,
  //               //     // teacher_name:
  //               //     status: x.status,
  //               //     message: x.message,
  //               //   };
  //               // });
  //               fetchItems();
  //               // isDialogVisible.value = false;
  //               // isOverlay.value = false;
  //               // snackbarText.value = "สำเร็จ";
  //               // snackbarColor.value = "success";
  //               // isSnackbarVisible.value = true;
  //             } else {
  //               console.log("error");
  //             }
  //           })
  //           .catch((error) => {
  //             console.error(error);
  //             isOverlay.value = false;
  //           });
  //       }
  //     }
  //     isOverlay.value = false;
  //   });
  //
};

const onGenerateQR = (it) => {
  qr_items.value = [];

  if (it == "ALL") {
    qr_items.value = [...items.value]
  } else {
    qr_items.value.push(it);
  }

  setTimeout(() => {
    window.print();
  }, 1000);
};

onMounted(() => {
  fetchAssetTypes();
  fetchDepartments();
  fetchItems();
  onImportSubmit();
});

useHead({
  title: "รายการครุภัณฑ์",
});

// definePageMeta({
//   middleware: "auth",
// });
</script>

<style scoped>
.qrcode {
  display: inline-block;
  font-size: 0;
  margin-bottom: 0;
  position: relative;
}

.qrcode__image {
  background-color: #fff;
  border: 0.25rem solid #fff;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 20%;
  width: 20%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
