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
            v-model="search.asset_code"
            name="title"
            type="text"
            placeholder="หมายเลขครุภัณฑ์"
          />
        </div>
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
            v-model="search.asset_detail"
            name="title"
            type="text"
            placeholder="รายละเอียดครุภัณฑ์"
          />
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

        <!-- <div class="col-12 col-lg-4">
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
        </div> -->

        <div class="col-12 col-lg-4">
          <input
            class="form-control"
            v-model="search.asset_detail"
            name="title"
            type="text"
            placeholder="รายละเอียด"
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

        <div class="col-12 col-lg-4">
          <VueDatePicker
            v-model="search.created_at_from"
            :enable-time-picker="false"
            locale="th"
            auto-apply
            placeholder="ช่วงวันที่เพิ่มข้อมูลเริ่มต้น"
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

        <div class="col-12 col-lg-4">
          <VueDatePicker
            v-model="search.created_at_to"
            :enable-time-picker="false"
            locale="th"
            auto-apply
            placeholder="ช่วงวันที่เพิ่มข้อมูลสิ้นสุด"
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
            class="btn btn-warning me-2 mt-2"
            @click="
              () => {
                router.push({ path: '/asset/add' });
              }
            "
          >
            <i class="fa-regular fa-plus"></i>
            ADD
          </button>

          <json-excel :data="json_data" class="d-inline">
            <button type="button" class="btn btn-success me-2 mt-2">
              <i class="fa-regular fa-file"></i> Export Excel
            </button>
          </json-excel>

          <div class="dropdown d-inline">
            <button
              class="btn btn-primary dropdown-toggle me-2 mt-2"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              v-if="
                useCookie('user').value != undefined &&
                (useCookie('user').value.level == 1 ||
                  useCookie('user').value.level == 2)
              "
            >
              <i class="fa-regular fa-file-text"></i> Import
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  class="dropdown-item"
                  @click="
                    () => {
                      modalForm.show();
                    }
                  "
                  style="cursor: pointer"
                  >นำเข้าข้อมูลครุภัณฑ์</a
                >
              </li>
              <li
                v-if="
                  useCookie('user').value != undefined &&
                  useCookie('user').value.level == 1
                "
              >
                <a
                  class="dropdown-item"
                  @click="
                    () => {
                      modalForm2.show();
                    }
                  "
                  style="cursor: pointer"
                  >นำเข้าข้อมูลการโอน/จำหน่าย</a
                >
              </li>
            </ul>
          </div>

          <div class="dropdown d-inline">
            <button
              class="btn btn-info dropdown-toggle me-2 mt-2"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              v-if="
                useCookie('user').value != undefined &&
                (useCookie('user').value.level == 1 ||
                  useCookie('user').value.level == 2)
              "
            >
              <i class="fa-regular fa-qrcode"></i> QR CODE
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  class="dropdown-item"
                  @click="onGenerateQR('ALL', 4)"
                  style="cursor: pointer"
                  >4*4</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  @click="onGenerateQR('ALL', 2)"
                  style="cursor: pointer"
                  >2*2</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3">
          <v-select
            label="name"
            placeholder="เรียงลำดับ"
            :options="selectOptions.order_by"
            v-model="search.orderBy"
            class="form-control v-select-no-border me-2 mt-2"
            :clearable="false"
          ></v-select>
        </div>
        <div class="col-lg-3">
          <v-select
            label="name"
            placeholder="ลำดับ"
            :options="selectOptions.order"
            v-model="search.order"
            class="form-control v-select-no-border me-2 mt-2"
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
                  <th class="text-center">รูป</th>
                  <th class="text-center">หมายเลขครุภัณฑ์</th>
                  <th class="text-center">ชื่อครุภัณฑ์</th>
                  <!-- <th class="text-center">ยี่ห้อ</th>
                  <th class="text-center">รุ่น</th> -->
                  <th class="text-center">รายละเอียด</th>
                  <th class="text-center">ประเภทครุภัณฑ์</th>
                  <th class="text-center">สถานที่ใช้งาน</th>
                  <th class="text-center">หน่วยงานที่รับผิดชอบ</th>
                  <th class="text-center">สถานะครุภัณฑ์</th>
                  <th class="text-center" style="min-width: 130px">จัดการ</th>
                </tr>
              </thead>
              <tbody v-if="items.length != 0">
                <tr v-for="(it, idx) in items" :key="idx">
                  <td>
                    <img
                      v-if="it.cover_photo != null"
                      :src="it.cover_photo"
                      class="img-thumbnail mx-auto"
                      style="width: 100px"
                    />
                    <img
                      v-else
                      src="~/assets/img/icon/no-photo-available.png"
                      class="img-thumbnail mx-auto"
                      style="width: 100px"
                    />
                  </td>
                  <td>{{ it.asset_code }}</td>
                  <td>{{ it.asset_name }}</td>
                  <!-- <td>{{ it.brand }}</td>
                  <td>{{ it.model }}</td> -->
                  <td>{{ it.asset_detail }}</td>
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
                      class="btn btn-warning text-uppercase d-inline"
                    >
                      <i class="fa-regular fa-edit"></i>
                    </NuxtLink>

                    <div class="dropdown d-inline ms-2">
                      <button
                        class="btn btn-info dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        v-if="
                          useCookie('user').value != undefined &&
                          (useCookie('user').value.level == 1 ||
                            useCookie('user').value.level == 2)
                        "
                      >
                        <i class="fa-regular fa-qrcode"></i>
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a
                            class="dropdown-item"
                            @click="onGenerateQR(it, 4)"
                            style="cursor: pointer"
                            >4*4</a
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            @click="onGenerateQR(it, 2)"
                            style="cursor: pointer"
                            >2*2</a
                          >
                        </li>
                      </ul>
                    </div>
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
            แบบฟอร์มนำเข้าข้อมูลครุภัณฑ์
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
                <h5 class="text-danger">รายการนำเข้าไม่สำเร็จ</h5>
                <table class="table table-bordered table-striped table-admin">
                  <thead>
                    <tr>
                      <th class="text-center" style="min-width: 50px">แถว</th>
                      <th class="text-center">หมายเลขครุภัณฑ์</th>
                      <th class="text-center">ข้อผิดพลาด</th>
                    </tr>
                  </thead>
                  <tbody v-if="items.length != 0">
                    <tr v-for="(it, idx) in import_result" :key="idx">
                      <td class="text-center">{{ it.row_id }}</td>
                      <td class="text-center">{{ it.asset_code }}</td>
                      <td class="text-center">
                        <span>{{ it.error_message }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <a class="btn btn-primary" target="_blank" href="http://citqresearch.cit.kmutnb.ac.th/_nuxt/logo_cit.3f048880.png">
            Download Template
          </a>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="onImportSubmit(1)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal 2-->
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="modal-form-2"
    tabindex="-1"
    aria-labelledby="modal-form"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-form-label">
            แบบฟอร์มนำเข้าข้อมูลการโอน/จำหน่าย
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
                    ref="file2"
                    class="form-control"
                    type="file"
                    id="formFile"
                  />
                </div>
              </div>

              <div class="table-responsive mt-4">
                <h5 class="text-danger">รายการนำเข้าไม่สำเร็จ</h5>
                <table class="table table-bordered table-striped table-admin">
                  <thead>
                    <tr>
                      <th class="text-center" style="min-width: 50px">แถว</th>
                      <th class="text-center">หมายเลขครุภัณฑ์</th>
                      <th class="text-center">ข้อผิดพลาด</th>
                    </tr>
                  </thead>
                  <tbody v-if="items.length != 0">
                    <tr v-for="(it, idx) in import_result" :key="idx">
                      <td class="text-center">{{ it.row_id }}</td>
                      <td class="text-center">{{ it.asset_code }}</td>
                      <td class="text-center">
                        <span>{{ it.error_message }}</span>
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
            @click="onImportSubmit(2)"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Qr -->
  <ClientOnly>
    <div
      :class="'printable ' + show44"
      v-for="(it, idx) in qr_items"
      :key="idx"
      style="position: relative"
    >
      <figure class="qrcode" style="margin-bottom: 9px !important">
        <vue-qrcode
          :value="'http://172.16.214.67:4000/asset/' + it.id"
          tag="canvas"
          :options="{
            errorCorrectionLevel: 'Q',
            width: 130,
            margin: 2,
          }"
        ></vue-qrcode>

        <img src="~/assets/img/logo/logo_cit.png" class="qrcode__image" />
      </figure>
      <div
        style="
          width: 130px;
          position: absolute;
          left: 5px;
          top: 15px;
          font-size: 0.7em;
          font-weight: bold;
          color: #000;
          line-height: 1;
        "
      >
        {{
          it.input_year +
          543 +
          "-" +
          it.asset_code +
          "(" +
          it.budget_type.code +
          ")"
        }}
      </div>
    </div>
  </ClientOnly>

  <ClientOnly>
    <div
      :class="'printable ' + show22"
      v-for="(it, idx) in qr_items"
      :key="idx"
      style="position: relative"
    >
      <figure class="qrcode" style="margin-bottom: 9px !important">
        <vue-qrcode
          :value="'http://172.16.214.67:4000/asset/' + it.id"
          tag="canvas"
          :options="{
            errorCorrectionLevel: 'Q',
            width: 75,
            margin: 1,
          }"
        ></vue-qrcode>

        <img
          src="~/assets/img/logo/logo_cit.png"
          class="qrcode__image"
          style="width: 18px"
        />
      </figure>
      <div
        style="
          width: 73px;
          position: absolute;
          left: 5px;
          top: 15px;
          font-size: 0.4em;
          color: #000;
          line-height: 1;
        "
      >
        {{
          it.input_year +
          543 +
          "-" +
          it.asset_code +
          "(" +
          it.budget_type.code +
          ")"
        }}
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
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
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
const show22 = ref("");
const show44 = ref("");
const search = ref({
  created_at_from: null,
  created_at_to: null,
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

const format = (date) => {
  console.log(date);
  const day = dayjs(date).locale("th").format("DD");
  const month = dayjs(date).locale("th").format("MMM");
  const year = dayjs(date).locale("th").format("BBBB");

  return `${day} ${month} ${year}`;
};

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
      name: "สถานที่ใช้งานปัจจุบัน",
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
const file2 = ref(null);
let modalForm;
let modalForm2;
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
    created_at_from:
      search.value.created_at_from == null
        ? undefined
        : dayjs(search.value.created_at_from).format("YYYY-MM-DD"),
    created_at_to:
      search.value.created_at_to == null
        ? undefined
        : dayjs(search.value.created_at_to).format("YYYY-MM-DD"),
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
      หมายเลขซีเรียล: e.serial_number,
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
    created_at_from:
      search.value.created_at_from == null
        ? undefined
        : dayjs(search.value.created_at_from).format("YYYY-MM-DD"),
    created_at_to:
      search.value.created_at_to == null
        ? undefined
        : dayjs(search.value.created_at_to).format("YYYY-MM-DD"),
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
      หมายเลขซีเรียล (S/N): e.serial_number,
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

      let workbook = XLSX.read(data, {
        type: "array",
      });
      let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let result = XLSX.utils.sheet_to_json(first_worksheet, {
        header: 1,
        raw: false,
      });
      const header = result.shift();
      resolve({ result: result, header: header });
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(importFile);
  });
};

const onImportSubmit = async (type) => {
  import_result.value = [];
  let importFile = null;

  if (
    (type == 1 && file.value.files == null) ||
    (type == 2 && file2.value.files == null)
  ) {
    return;
  }

  let result = null;
  if (type == 1) {
    importFile = file.value.files[0];
    result = await readFileAsync(importFile);
  }

  if (type == 2) {
    importFile = file2.value.files[0];
    result = await readFileAsync(importFile);
  }

  let data = [];

  let column_index_import = {
    asset_code: null,
    asset_name: null,
    input_year: null,
    inspection_date: null,
    approved_date: null,
    vendor: null,
    asset_detail: null,
    install_location: null,
    asset_type_id: null,
    brand: null,
    model: null,
    serial_number: null,
    price: null,
    budget_type_id: null,
    is_transfer: null,
    transfer_from: null,
    location: null,
    department_id: null,
    drawer_name: null,
    holder_name: null,
    warranty_type_1: null,
    warranty_day_1: null,
    warranty_type_2: null,
    warranty_day_2: null,
    warranty_type_3: null,
    warranty_day_3: null,
    asset_status: null,
    cancel_type: null,
    cancel_date: null,
    cancel_comment: null,
    transfer_to: null,
    transfer_to_department: null,
    comment: null,
  };

  let cl_import_header = [
    {
      name: "หมายเลขครุภัณฑ์",
      name_en: "asset_code",
    },
    {
      name: "ชื่อครุภัณฑ์ [รหัสชุด:ชื่อชุด]",
      name_en: "asset_name",
    },
    {
      name: "ปีงบประมาณ",
      name_en: "input_year",
    },
    {
      name: "วันที่ตรวจรับ",
      name_en: "inspection_date",
    },
    {
      name: "วันที่รับเข้าคลัง",
      name_en: "approved_date",
    },
    {
      name: "ผู้ขาย",
      name_en: "vendor",
    },
    {
      name: "รายละเอียด",
      name_en: "asset_detail",
    },
    {
      name: "สถานที่ติดตั้ง",
      name_en: "install_location",
    },
    {
      name: "ชื่อหมวดสินทรัพย์",
      name_en: "asset_type_id",
    },
    {
      name: "ยี่ห้อ",
      name_en: "brand",
    },
    {
      name: "รุ่น",
      name_en: "model",
    },
    {
      name: "หมายเลขซีเรียล",
      name_en: "serial_number",
    },
    {
      name: "มูลค่าครุภัณฑ์",
      name_en: "price",
    },
    {
      name: "แหล่งเงิน",
      name_en: "budget_type_id",
    },
    {
      name: "การโอน",
      name_en: "is_transfer",
    },
    {
      name: "โอนจาก",
      name_en: "transfer_from",
    },
    {
      name: "สถานที่ใช้งาน",
      name_en: "location",
    },
    {
      name: "ชื่อภาค/กอง",
      name_en: "department_id",
    },
    {
      name: "ผู้เบิก",
      name_en: "drawer_name",
    },
    {
      name: "ผู้ถือ",
      name_en: "holder_name",
    },
    {
      name: "การรับประกัน 1",
      name_en: "warranty_type_1",
    },
    {
      name: "จำนวนวันรับประกัน 1",
      name_en: "warranty_day_1",
    },
    {
      name: "การรับประกัน 2",
      name_en: "warranty_type_2",
    },
    {
      name: "จำนวนวันรับประกัน 2",
      name_en: "warranty_day_2",
    },
    {
      name: "การรับประกัน 3",
      name_en: "warranty_type_3",
    },
    {
      name: "จำนวนวันรับประกัน 3",
      name_en: "warranty_day_3",
    },
    {
      name: "สถานะครุภัณฑ์",
      name_en: "asset_status",
    },
    {
      name: "ประเภทการยกเลิก",
      name_en: "cancel_type",
    },
    {
      name: "วันที่ยกเลิก",
      name_en: "cancel_date",
    },
    {
      name: "หมายเหตุการยกเลิก",
      name_en: "cancel_comment",
    },
    {
      name: "การโอน",
      name_en: "transfer_to",
    },
    {
      name: "หน่วยงานรับโอน",
      name_en: "transfer_to_department",
    },
    {
      name: "หมายเหตุ",
      name_en: "comment",
    },
  ];

  for (let ci = 0; ci < result.header.length; ci++) {
    let find_header = cl_import_header.find((x) => {
      return x.name == result.header[ci];
    });
    if (find_header) {
      column_index_import[find_header.name_en] = ci;
    }
  }

  const convert_day = (day) => {
    console.log(day);
    let day_arr = day.split("/");
    return (
      day_arr[2].trim() + "-" + day_arr[1].trim() + "-" + day_arr[0].trim()
    );
  };

  for (var i = 0; i < result.result.length; i++) {
    if (result.result[i].length != 0) {
      console.log("inspection_date: " + column_index_import.inspection_date);
      console.log("approve_date: " + column_index_import.approved_date);
      console.log("cancel_date: " + column_index_import.cancel_date);
    }
    //   data.push({
    //     row_id: i + 1,
    //     asset_code:
    //       column_index_import.asset_code != null
    //         ? result.result[i][column_index_import.asset_code].trim()
    //         : null,
    //     asset_name:
    //       column_index_import.asset_name != null
    //         ? result.result[i][column_index_import.asset_name].trim()
    //         : null,
    //     input_year:
    //       column_index_import.input_year != null
    //         ? Number(result.result[i][column_index_import.input_year]) - 543
    //         : null,
    //     inspection_date:
    //       column_index_import.inspection_date != null
    //         ? convert_day(column_index_import.inspection_date)
    //         : null,
    //     approved_date:
    //       column_index_import.approved_date != null
    //         ? convert_day(column_index_import.approved_date)
    //         : null,
    //     vendor:
    //       column_index_import.vendor != null
    //         ? result.result[i][column_index_import.vendor].trim()
    //         : null,
    //     asset_detail:
    //       column_index_import.asset_detail != null
    //         ? result.result[i][column_index_import.asset_detail]
    //         : null,
    //     install_location:
    //       column_index_import.install_location != null
    //         ? result.result[i][column_index_import.install_location].trim()
    //         : null,
    //     asset_type_id:
    //       column_index_import.asset_type_id != null
    //         ? result.result[i][column_index_import.asset_type_id].trim()
    //         : null,
    //     brand:
    //       column_index_import.brand != null
    //         ? result.result[i][column_index_import.brand]
    //         : null,
    //     model:
    //       column_index_import.model != null
    //         ? result.result[i][column_index_import.model]
    //         : null,
    //     serial_number:
    //       column_index_import.serial_number != null
    //         ? result.result[i][column_index_import.serial_number]
    //         : null,
    //     price:
    //       column_index_import.price != null
    //         ? result.result[i][column_index_import.price].trim()
    //         : null,
    //     budget_type_id:
    //       column_index_import.budget_type_id != null
    //         ? result.result[i][column_index_import.budget_type_id]
    //         : null,
    //     is_transfer:
    //       column_index_import.is_transfer != null
    //         ? result.result[i][column_index_import.is_transfer]
    //         : null,
    //     transfer_from:
    //       column_index_import.transfer_from != null
    //         ? result.result[i][column_index_import.transfer_from]
    //         : null,
    //     location:
    //       column_index_import.location != null
    //         ? result.result[i][column_index_import.location].trim()
    //         : null,
    //     department_id:
    //       column_index_import.department_id != null
    //         ? result.result[i][column_index_import.department_id]
    //         : null,
    //     drawer_name:
    //       column_index_import.drawer_name != null
    //         ? result.result[i][column_index_import.drawer_name].trim()
    //         : null,
    //     holder_name:
    //       column_index_import.holder_name != null
    //         ? result.result[i][column_index_import.holder_name].trim()
    //         : null,
    //     warranty_type_1:
    //       column_index_import.warranty_type_1 != null
    //         ? result.result[i][column_index_import.warranty_type_1].trim()
    //         : null,
    //     warranty_day_1:
    //       column_index_import.warranty_day_1 != null
    //         ? result.result[i][column_index_import.warranty_day_1].trim()
    //         : null,
    //     warranty_type_2:
    //       column_index_import.warranty_type_2 != null
    //         ? result.result[i][column_index_import.warranty_type_2].trim()
    //         : null,
    //     warranty_day_2:
    //       column_index_import.warranty_day_2 != null
    //         ? result.result[i][column_index_import.warranty_day_2].trim()
    //         : null,
    //     warranty_type_3:
    //       column_index_import.warranty_type_3 != null
    //         ? result.result[i][column_index_import.warranty_type_3].trim()
    //         : null,
    //     warranty_day_3:
    //       column_index_import.warranty_day_3 != null
    //         ? result.result[i][column_index_import.warranty_day_3].trim()
    //         : null,
    //     asset_status:
    //       column_index_import.asset_status != null
    //         ? result.result[i][column_index_import.asset_status].trim()
    //         : null,
    //     cancel_type:
    //       column_index_import.cancel_type != null
    //         ? result.result[i][column_index_import.cancel_type].trim()
    //         : null,
    //     cancel_date:
    //       column_index_import.cancel_date != null
    //         ? convert_day(column_index_import.cancel_date)
    //         : null,
    //     cancel_comment:
    //       column_index_import.cancel_comment != null
    //         ? result.result[i][column_index_import.cancel_comment].trim()
    //         : null,
    //     transfer_to:
    //       column_index_import.transfer_to != null
    //         ? result.result[i][column_index_import.transfer_to].trim()
    //         : null,
    //     transfer_to_department:
    //       column_index_import.transfer_to_department != null
    //         ? result.result[i][
    //             column_index_import.transfer_to_department
    //           ].trim()
    //         : null,
    //     comment:
    //       column_index_import.comment != null
    //         ? result.result[i][column_index_import.comment].trim()
    //         : null,
    //   });
    // }
  }

  let type_object = {
    text_success: "นำเข้าข้อมูลเสร็จสิ้น",
    method: "post",
    url: runtimeConfig.public.apiBase + "/asset/import-asset",
  };

  await $fetch(type_object.url, {
    method: type_object.method,
    body: {
      data: data,
      is_import: type,
    },
  })
    .then((res) => {
      if (res.msg == "success") {
        useToast(type_object.text_success, "success");

        let data_err = data.map((e) => {
          let check = res.data.find((x) => {
            return x.asset_code == e.asset_code;
          });
          if (check) {
            e["import_success"] = check.import_success;
            e["error_message"] = check.error_message;
          }
          return e;
        });

        import_result.value = data_err.filter((e) => {
          return e.import_success == false;
        });

        console.log(import_result.value);

        fetchItems();
      } else {
        throw new Error("ERROR");
      }
    })
    .catch((error) => error.data);
};

const onGenerateQR = (it, size) => {
  qr_items.value = [];
  console.log(size);
  if (size == 2) {
    show44.value = "show-44-none";
    show22.value = "";
  } else {
    show22.value = "show-22-none";
    show44.value = "";
  }

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
  modalForm2 = new bootstrap.Modal(document.getElementById("modal-form-2"));
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
