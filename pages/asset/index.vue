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
            placeholder="สถานะครุภัณฑ์"
            :options="selectOptions.asset_statuses"
            v-model="search.asset_status"
            class="form-control v-select-no-border"
            :clearable="true"
          ></v-select>
        </div>

        <div class="col-12 col-lg-4">
          <v-select
            label="name"
            placeholder="ระยะเวลารับประกันที่เหลือ"
            :options="selectOptions.expire_days"
            v-model="search.expire_day"
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
      <div class="row mb-30">
        <div class="col-lg-6">
          <button
            type="button"
            v-if="useCookie('user').value.level == 1"
            class="btn btn-warning"
            @click="
              () => {
                router.push({ path: '/asset/add' });
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
            v-if="useCookie('user').value.level == 1"
            class="btn btn-primary ms-2"
            @click="
              () => {
                modalForm.show();
              }
            "
          >
            <i class="fa-regular fa-file-text"></i>
            Import Asset
          </button>

          <button
            type="button"
            v-if="
              useCookie('user').value.level == 1 ||
              useCookie('user').value.level == 2
            "
            class="btn btn-info ms-2"
            @click="onGenerateQR('ALL')"
          >
            <i class="fa-regular fa-qrcode"></i>
            QR CODE
          </button>
        </div>
        <div class="col-lg-3">
          <v-select
            label="name"
            placeholder="เรียงลำดับ"
            :options="selectOptions.order_by"
            v-model="search.orderBy"
            class="form-control v-select-no-border"
            :clearable="false"
          ></v-select>
        </div>
        <div class="col-lg-3">
          <v-select
            label="name"
            placeholder="ลำดับ"
            :options="selectOptions.order"
            v-model="search.order"
            class="form-control v-select-no-border"
            :clearable="false"
          ></v-select>
        </div>
      </div>

      <div class="row gx-2 grid">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-bordered table-striped table-admin">
              <thead>
                <tr>
                  <th class="text-center"></th>
                  <th class="text-center">หมายเลขครุภัณฑ์</th>
                  <th class="text-center">ชื่อครุภัณฑ์</th>
                  <th class="text-center">ยี่ห้อ</th>
                  <th class="text-center">รุ่น</th>
                  <th class="text-center">ประเภทครุภัณฑ์</th>
                  <th class="text-center">สถานที่ติดตั้ง</th>
                  <th class="text-center">หน่วยงานที่รับผิดชอบ</th>
                  <th class="text-center">สถานะครุภัณฑ์</th>
                  <th class="text-center" style="min-width: 110px">จัดการ</th>
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
                    <button
                      class="btn btn-info ms-2"
                      @click="onGenerateQR(it)"
                      v-if="
                        useCookie('user').value.level == 1 ||
                        useCookie('user').value.level == 2
                      "
                    >
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

  <!-- Modal -->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="modal-form"
    tabindex="-1"
    aria-labelledby="modal-form"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-form-label">
            แบบฟอร์มนำเข้าข้อมูล
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
              <div class="form-group row mt-10">
                <label for="gallery" class="col-sm-12 col-form-label"
                  >อัพโหลดไฟล์ Excel (.xls, .xlsx) :
                </label>

                <div class="col-sm-12">
                  <input
                    ref="file"
                    class="form-control"
                    type="file"
                    id="formFile"
                  />
                </div>
              </div>

              <div class="table-responsive mt-4">
                <h5>ผลลัพธ์การนำเข้าข้อมูล</h5>
                <table class="table table-bordered table-striped table-admin">
                  <thead>
                    <tr>
                      <th class="text-center">หมายเลขครุภัณฑ์</th>
                      <th class="text-center">ผล</th>
                      <th class="text-center">หมายเหตุ</th>
                      <th class="text-center">สถานะ</th>
                      <th class="text-center" style="min-width: 150px">
                        จัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody v-if="items.length != 0">
                    <tr v-for="(it, idx) in import_result" :key="idx">
                      <td>{{ it.asset_code }}</td>
                      <td
                        :class="
                          it.message == 'success' ? 'text-green' : 'text-red'
                        "
                      >
                        {{ it.status }}
                      </td>
                      <td>
                        <span
                          :class="
                            it.message == 'success' ? 'text-green' : 'text-red'
                          "
                          >{{ it.message }}</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
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
          <button
            type="button"
            class="btn btn-warning"
            @click="onImportSubmit()"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Qr -->
  <ClientOnly>
    <div class="printable pagebreak" v-for="(it, idx) in qr_items" :key="idx">
      <figure class="qrcode">
        <vue-qrcode
          :value="'http://172.16.214.67:4000/asset/' + it.id"
          tag="img"
          :options="{
            errorCorrectionLevel: 'Q',
            width: 200,
            margin: 1,
          }"
        ></vue-qrcode>
        <img src="~/assets/img/logo/logo_cit.png" class="qrcode__image" />
      </figure>
      <div
        class="text-center pagebreak"
        style="width: 200px; top: -20px !important"
      >
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
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const items = ref([]);
const perPage = ref(20);
const currentPage = ref(1);
const totalPage = ref(1);
const totalItems = ref(0);
const search = ref({
  orderBy: {
    id: 1,
    value: "created_at",
    name: "วันที่เพิ่มข้อมูลล่าสุด",
  },
  order: {
    id: 1,
    value: "desc",
    name: "มาก > น้อย",
  },
});
const json_data = ref([]);
const selectOptions = ref({
  perPage: [
    { title: "20", value: 20 },
    { title: "40", value: 40 },
    { title: "60", value: 60 },
  ],
  asset_statuses: asset_data.data().asset_statuses,
  asset_types: [],
  budget_types: [],
  departments: [],
  expire_days: asset_data.data().expire_days,
  input_years: asset_data.data().input_years(),
  order: [
    {
      id: 1,
      value: "desc",
      name: "มาก > น้อย",
    },
    {
      id: 2,
      value: "asc",
      name: "น้อย > มาก",
    },
  ],
  order_by: [
    {
      id: 1,
      value: "created_at",
      name: "วันที่เพิ่มข้อมูลล่าสุด",
    },
    {
      id: 2,
      value: "asset_code",
      name: "หมายเลขครุภัณฑ์",
    },
    {
      id: 3,
      value: "asset_name",
      name: "ชื่อครุภัณฑ์",
    },
    {
      id: 4,
      value: "location",
      name: "สถานที่ติดตั้ง",
    },
    {
      id: 5,
      value: "department_id",
      name: "หน่วยงานที่รับผิดชอบ",
    },
  ],
});
const qr_items = ref([]);
const import_result = ref([]);
const file = ref(null);
let modalForm;

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
const fetchBudgetTypes = async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/budget-type`, {
    params: {
      is_active: 1,
    },
  }).catch((error) => error.data);

  selectOptions.value.budget_types = data.data.map((e) => {
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
    budget_type_id:
      search.value.budget_type_id == null
        ? undefined
        : search.value.budget_type_id.value,
    asset_status:
      search.value.asset_status == null
        ? undefined
        : search.value.asset_status.value,
    department_id:
      search.value.department_id == null
        ? undefined
        : search.value.department_id.value,
    expire_day:
      search.value.expire_day == null ? undefined : search.value.expire_day.id,
    input_year:
      search.value.input_year == null ? undefined : search.value.input_year.id,
    perPage: perPage.value,
    currentPage: currentPage.value,
    lang: "th",
    orderBy: search.value.orderBy.value,
    order: search.value.order.value,
  };

  if (useCookie("user").value.level == 3) {
    params["department_id"] = useCookie("user").value.department_id;
  }

  let data = await $fetch(`${runtimeConfig.public.apiBase}/asset`, {
    params: params,
  }).catch((error) => error.data);

  json_data.value = [];
  items.value = data.data.map((e) => {
    json_data.value.push({
      หมายเลขครุภัณฑ์: e.asset_code,
      ชื่อครุภัณฑ์: e.asset_name,
      หมายเลขประจำเครื่อง: e.serial_number,
      ผู้เบิก: e.drawer_name,
      ผู้ใช้งาน: e.holder_name,
      มูลค่าการได้มา: e.price,
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
    budget_type_id:
      search.value.budget_type_id == null
        ? undefined
        : search.value.budget_type_id.value,
    department_id:
      search.value.department_id == null
        ? undefined
        : search.value.department_id.value,
    expire_day:
      search.value.expire_day == null ? undefined : search.value.expire_day.id,
    input_year:
      search.value.input_year == null ? undefined : search.value.input_year.id,
    perPage: 100000,
    currentPage: currentPage.value,
    lang: "th",
    orderBy: search.value.orderBy ? search.value.orderBy.value : "created_at",
    order: search.value.order ? search.value.order.value : "desc",
  };

  if (useCookie("user").value.level == 3) {
    params["department_id"] = useCookie("user").value.department_id;
  }

  let data = await $fetch(`${runtimeConfig.public.apiBase}/asset`, {
    params: params,
  }).catch((error) => error.data);

  json_data.value = [];
  json_data.value = data.data.map((e) => {
    return {
      หมายเลขครุภัณฑ์: e.asset_code,
      ชื่อครุภัณฑ์: e.asset_name,
      หมายเลขประจำเครื่อง: e.serial_number,
      ผู้เบิก: e.drawer_name,
      ผู้ใช้งาน: e.holder_name,
      มูลค่าการได้มา: e.price,
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
const readFileAsync = (importFile) => {
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

    reader.readAsArrayBuffer(importFile);
  });
};

const onImportSubmit = async () => {
  import_result.value = [];
  let importFile = null;
  if (file.value.files != null) {
    importFile = file.value.files[0];
    let result = await readFileAsync(importFile);
    result.shift();
    let data = [];
    result.forEach((el) => {
      if (el.length != 0) {
        data.push({
          asset_code: el[1],
          input_year: el[2],
          asset_name: el[3],
          serial_number: el[4],
          drawer_name: el[8],
          price: el[9],
        });
      }
    });

    console.log(data);

    let type_object = {
      text_success: "นำเข้าข้อมูลเสร็จสิ้น",
      method: "post",
      url: runtimeConfig.public.apiBase + "/asset/import-asset",
    };

    await $fetch(type_object.url, {
      method: type_object.method,
      body: data,
    })
      .then((res) => {
        if (res.msg == "success") {
          useToast(type_object.text_success, "success");
          data = data.map((e) => {
            let check = response.data.data.find((x) => {
              return x.asset_code == e.asset_code;
            });
            if (check) {
              e["status"] = check.status;
              e["message"] = check.message;
            }
            return e;
          });
          console.log(data);
          import_result.value = [...data];
          fetchItems();
        } else {
          throw new Error("ERROR");
        }
      })
      .catch((error) => error.data);
  }
};

const onGenerateQR = (it) => {
  qr_items.value = [];

  if (it == "ALL") {
    qr_items.value = [...items.value];
  } else {
    qr_items.value.push(it);
  }

  setTimeout(() => {
    window.print();
  }, 1000);
};

onMounted(() => {
  fetchAssetTypes();
  fetchBudgetTypes();
  fetchDepartments();
  fetchItems();
  modalForm = new bootstrap.Modal(document.getElementById("modal-form"));
});

useHead({
  title: "รายการครุภัณฑ์",
});

definePageMeta({
  middleware: "auth",
});
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
