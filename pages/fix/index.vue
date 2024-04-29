<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="breadcrumb__content p-relative z-index-1">
            <div class="breadcrumb__list">
              <span> ผู้ดูแลระบบ </span>
              <span class="dvdr"><i class="fa-solid fa-circle-small"></i></span>
              <span> รายการคำขอแจ้งซ่อม </span>
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
          <VueDatePicker
            v-model="search.created_at_from"
            :enable-time-picker="false"
            locale="th"
            class="mt-5"
            auto-apply
            placeholder="ช่วงวันที่ขอแจ้งซ่อม (จากวันที่)"
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
            class="mt-5"
            placeholder="ช่วงวันที่ขอแจ้งซ่อม (ถึงวันที่)"
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
          <v-select
            label="name"
            placeholder="สถานะคำขอแจ้งซ่อม"
            :options="selectOptions.fix_statuses"
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
          <span class="ml-10">รายการคำขอแจ้งซ่อม</span>
        </h4>
      </div>

      <div class="mb-30">
        <button
          type="button"
          class="btn btn-success mt-2 me-2"
          @click="onExport()"
        >
          <i class="fa-regular fa-file"></i> Export
        </button>
      </div>

      <div class="row gx-2 grid">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-bordered table-striped table-admin">
              <thead>
                <tr>
                  <th class="text-center">หมายเลขครุภัณฑ์</th>
                  <th class="text-center">ชื่อครุภัณฑ์</th>
                  <th class="text-center">ประเภทครุภัณฑ์</th>
                  <th class="text-center">วันที่ตรวจรับ</th>
                  <th class="text-center">มูลค่าครุภัณฑ์</th>
                  <th class="text-center">วันที่แจ้งซ่อม</th>
                  <th class="text-center">รายละเอียดการแจ้ง</th>
                  <th class="text-center">ราคา</th>
                  <th class="text-center">ผู้แจ้ง</th>
                  <th class="text-center">วันที่อนุมัติ</th>
                  <th class="text-center">สถานะคำขอแจ้งซ่อม</th>
                  <th class="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody v-if="items.length != 0">
                <tr v-for="(it, idx) in items" :key="idx">
                  <td class="text-center">{{ it.asset.asset_code }}</td>
                  <td>{{ it.asset.asset_name }}</td>
                  <td>
                    {{
                      selectOptions.asset_types_array[it.asset.asset_type_id]
                    }}
                  </td>
                  <td>
                    {{
                      it.asset.inspection_date != null
                        ? dayjs(it.asset.inspection_date)
                            .locale("th")
                            .format("DD MMM BBBB")
                        : "-"
                    }}
                  </td>
                  <td>
                    {{
                      it.asset.price != null
                        ? Number(it.asset.price)
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
                  <td>{{ it.description }}</td>
                  <td>
                    {{
                      it.price != null
                        ? Number(it.price)
                            .toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : ""
                    }}
                  </td>
                  <td>{{ it.created_user?.name }}</td>
                  <td>
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
                  <!-- <td class="text-center">
                    {{ it.reject_comment }}
                  </td> -->

                  <td class="text-center">
                    <button
                      class="btn btn-info"
                      v-if="
                        useCookie('user').value != undefined &&
                        useCookie('user').value.level == 1
                      "
                    >
                      <i
                        class="fa fa-edit"
                        @click="
                          () => {
                            item = { ...it };

                            item.status = selectOptions.fix_statuses.find(
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
                      @click="onChangeNotice(it.id)"
                      v-if="
                        useCookie('user').value != undefined &&
                        useCookie('user').value.level == 3 &&
                        it.is_notice == 1
                      "
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
        <div class="tp-pagination mt-30 d-inline-block">
          <blog-pagination
            :totalPage="totalPage"
            :currentPage="currentPage"
            @update:currentPage="currentPage = $event"
          />
        </div>
        <div class="d-inline-block float-end fw-bold">
          รวมทั้งหมด {{ totalItems }} รายการ จำนวนหน้าทั้งหมด
          {{ totalPage }} หน้า
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
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-form-label">
            แบบฟอร์มคำขอแจ้งซ่อม
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
              <div class="col-md-12">
                <AssetWarranty
                  :item="item.asset"
                  v-if="item && item.asset"
                ></AssetWarranty>
                <hr />
              </div>

              <div class="col-md-12" v-if="item && item.asset">
                <h4>รายละเอียดคำขอแจ้งซ่อม</h4>
                <div>
                  <span>หมายเลขครุภัณฑ์ : </span>
                  <span class="fst-italic">{{ item.asset.asset_code }}</span>
                </div>
                <div>
                  <span>ชื่อครุภัณฑ์ : </span>
                  <span class="fst-italic">{{ item.asset.asset_name }}</span>
                </div>
                <div>
                  <span>รายละเอียดครุภัณฑ์ : </span>
                  <span class="fst-italic">{{ item.asset.asset_detail }}</span>
                </div>
                <div>
                  <span>ประเภทครุภัณฑ์ : </span>
                  <span class="fst-italic">{{
                    selectOptions.asset_types_array[item.asset.asset_type_id]
                  }}</span>
                </div>
                <div>
                  <span>วันที่ตรวจรับ : </span>
                  <span class="fst-italic">{{
                    item.asset.inspection_date != null
                      ? dayjs(item.asset.inspection_date)
                          .locale("th")
                          .format("DD MMM BBBB")
                      : ""
                  }}</span>
                </div>
                <div>
                  <span>มูลค่าครุภัณฑ์ : </span>
                  <span class="fst-italic">{{
                    item.asset.price != null
                      ? Number(item.asset.price)
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : ""
                  }}</span>
                </div>
                <div>
                  <span>วันที่แจ้งซ่อม : </span>
                  <span class="fst-italic">{{
                    item.repair_date != null
                      ? dayjs(item.repair_date)
                          .locale("th")
                          .format("DD MMM BBBB")
                      : ""
                  }}</span>
                </div>
                <div>
                  <span>รายละเอียดการแจ้ง : </span>
                  <span class="fst-italic">{{ item.description }}</span>
                </div>
                <div>
                  <span>ราคา : </span>
                  <span class="fst-italic">{{
                    item.price != null
                      ? Number(item.price)
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : ""
                  }}</span>
                </div>
                <div>
                  <span>ผู้แจ้ง : </span>
                  <span class="fst-italic">{{ item.created_by }}</span>
                </div>
                <div>
                  <span>สถานะการอนุมัติ : </span>
                  <span class="fst-italic">{{ item.status.name }}</span>
                </div>
                <hr />
              </div>
              <div class="col-md-12">
                <AssetFix :item="item" type="view" v-if="item"></AssetFix>
                <hr />
              </div>
              <div class="col-12">
                <label for="fix-description" class="col-form-label"
                  ><span class="text-danger">*</span>รายละเอียด :</label
                >
                <textarea
                  class="form-control"
                  rows="5"
                  style="min-height: 100px"
                  id="txt-fix-description"
                  v-model="item.description"
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
                  v-model="item.price"
                  placeholder="ราคา"
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
                  :options="selectOptions.fix_statuses"
                  id="slt-status"
                  v-model="item.status"
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
                  v-model="item.reject_comment"
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

  <!-- 4/4 -->
  <ClientOnly>
    <div
      :class="'printable ' + show44"
      style="display: block; padding-left: 30px; padding-top: 41px"
    >
      <div
        v-for="(it, idx) in qr_items"
        :key="idx"
        :style="'width: 170px;height: 170px;padding-left: 3px;' + display_qr"
      >
        <figure class="qrcode">
          <vue-qrcode
            :value="'http://citqr.cit.kmutnb.ac.th/asset/' + it.id"
            :id="'qrcode-asset-' + it.id"
            tag="img"
            style="display: inline-block !important; vertical-align: top"
            :options="{
              errorCorrectionLevel: 'Q',
              width: 150,
              margin: 0,
            }"
          ></vue-qrcode>
        </figure>
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
import VueQrcode from "@chenfengyuan/vue-qrcode";
// Import
// import tableItem from "~/components/list/TableItem.vue";
import BlogPagination from "~/components/common/pagination/BlogPagination.vue";
import asset_data from "~~/mixins/assetData";
// import JsonExcel from "vue-json-excel3";
// import XLSX from "xlsx";
import ExcelJS from "exceljs";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

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
const show22 = ref("");
const show44 = ref("");
const display_qr = ref("display: inline-block;");
const search = ref({});
const json_data = ref([]);
const type_submit = ref("");
const update_location = ref(false);
const qr_items = ref([]);
let modalForm;

const format = (date) => {
  const day = dayjs(date).locale("th").format("DD");
  const month = dayjs(date).locale("th").format("MMM");
  const year = dayjs(date).locale("th").format("BBBB");

  return `${day} ${month} ${year}`;
};

const selectOptions = ref({
  perPage: [
    { title: "20", value: 20 },
    { title: "40", value: 40 },
    { title: "60", value: 60 },
  ],
  fix_statuses: asset_data.data().fix_statuses,
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
  วันที่ตรวจรับ: "วันที่ตรวจรับ",
  มูลค่าครุภัณฑ์: "มูลค่าครุภัณฑ์",
  วันที่สิ้นสุดรับประกัน: "วันที่สิ้นสุดรับประกัน",
  วันที่แจ้งซ่อม: "วันที่แจ้งซ่อม",
  รายละเอียดการแจ้ง: "รายละเอียดการแจ้ง",
  ราคา: "ราคา",
  ผู้แจ้ง: "ผู้แจ้ง",
  สถานะ: "สถานะ",
};

// Function Fetch
const fetchAssetTypes = async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/asset-type`, {
    params: {
      is_active: 1,
    },
  }).catch((error) => error.data);

  selectOptions.value.asset_types = data.data.map((e) => {
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
        ? search.value.asset_type_id.value
        : undefined,
    budget_type_id:
      search.value.budget_type_id != null
        ? search.value.budget_type_id.value
        : undefined,
    department_id:
      search.value.departmentid != null
        ? search.value.department_id.value
        : undefined,
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
    status: search.value.status != null ? search.value.status.id : undefined,
    perPage: perPage.value,
    currentPage: 1,
    orderBy: "created_at",
    order: "desc",
  };

  if (useCookie("user").value.level == 3) {
    params["department_id"] = useCookie("user").value.department_id;
  }

  let data = await $fetch(`${runtimeConfig.public.apiBase}/repair-history`, {
    params: params,
  }).catch((error) => error.data);

  json_data.value = [];
  items.value = data.data.map((e) => {
    return e;
  });
  json_data.value = await fetchItemsExport();

  totalPage.value = data.totalPage;
  totalItems.value = data.totalData;
};

const fetchItemsExport = async () => {
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
    department_id:
      search.value.department_id == null
        ? undefined
        : search.value.department_id.value,
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

  let data = await $fetch(`${runtimeConfig.public.apiBase}/repair-history`, {
    params: params,
  }).catch((error) => error.data);

  return data.data.map((e) => {
    let expire_date_all =
      e.asset.warranty_type_1 != null && e.asset.warranty_type_1 != ""
        ? e.asset.warranty_type_1 +
          " " +
          dayjs(e.asset.expiry_date_1).locale("th").format("DD/MM/BBBB")
        : "";
    expire_date_all +=
      e.asset.warranty_type_2 != null && e.asset.warranty_type_2 != ""
        ? ", " +
          e.asset.warranty_type_2 +
          " " +
          dayjs(e.asset.expiry_date_2).locale("th").format("DD MMM BBBB")
        : "";
    expire_date_all +=
      e.asset.warranty_type_3 != null && e.asset.warranty_type_3 != ""
        ? ", " +
          e.asset.warranty_type_3 +
          " " +
          dayjs(e.asset.expiry_date_3).locale("th").format("DD MMM BBBB")
        : "";
    return {
      หมายเลขครุภัณฑ์: e.asset.asset_code,
      ชื่อครุภัณฑ์: e.asset.asset_name,
      รายละเอียด: e.asset.asset_detail,
      ประเภทครุภัณฑ์: e.asset.asset_type_id
        ? selectOptions.value.asset_types_array[e.asset.asset_type_id]
        : "",
      วันที่ตรวจรับ:
        e.asset.inspection_date != null
          ? dayjs(e.asset.inspection_date).locale("th").format("DD MMM BBBB")
          : "",
      มูลค่าครุภัณฑ์:
        e.asset.price != null
          ? Number(e.asset.price)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "",
      วันที่สิ้นสุดรับประกัน: expire_date_all,
      วันที่แจ้งซ่อม:
        e.created_at != null
          ? dayjs(e.created_at).locale("th").format("DD MMM BBBB")
          : "",
      รายละเอียดการแจ้ง: e.description,
      ราคา:
        e.price != null
          ? Number(e.price)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "",
      ผู้แจ้ง: e.created_user?.name,
      สถานะ: selectOptions.value.fix_statuses[e.status].name,
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

const onGenerateQR1 = (it, size) => {
  qr_items.value = [];
  display_qr.value = "display:inline-block;";
  if (size == 2) {
    show44.value = "show-44-none";
    show22.value = "";
  } else {
    show22.value = "show-22-none";
    show44.value = "";
  }

  if (it == "ALL") {
    qr_items.value = [...json_data.value];
  } else {
    qr_items.value.push(it);
  }
  console.log(qr_items.value);  
};

const onExport = async () => {
  onGenerateQR1("ALL", 1);
  setTimeout(async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("รายการทะเบียนแจ้งซ่อมครุภัณฑ์", {
      pageSetup: { orientation: "landscape" },
      headerFooter: {
        firstHeader: "Hello Exceljs",
        firstFooter: "Hello World",
      },
    });

    worksheet.columns = [
      { header: "QR Code", width: 10, outlineLevel: 1 },
      {
        header: "หมายเลขครุภัณฑ์",
        key: "หมายเลขครุภัณฑ์",
        width: 25,
        outlineLevel: 1,
      },
      {
        header: "ชื่อครุภัณฑ์",
        key: "ชื่อครุภัณฑ์",
        width: 25,
        outlineLevel: 1,
      },
      { header: "รายละเอียด", key: "รายละเอียด", width: 30, outlineLevel: 1 },
      {
        header: "ประเภทครุภัณฑ์",
        key: "ประเภทครุภัณฑ์",
        width: 20,
        outlineLevel: 1,
      },
      {
        header: "วันที่ตรวจรับ",
        key: "วันที่ตรวจรับ",
        width: 15,
        outlineLevel: 1,
      },
      {
        header: "มูลค่าครุภัณฑ์",
        key: "มูลค่าครุภัณฑ์",
        width: 15,
        outlineLevel: 1,
      },
      {
        header: "วันที่สิ้นสุดรับประกัน",
        key: "วันที่สิ้นสุดรับประกัน",
        width: 20,
        outlineLevel: 1,
      },

      {
        header: "วันที่แจ้งซ่อม",
        key: "วันที่แจ้งซ่อม",
        width: 20,
        outlineLevel: 1,
      },

      {
        header: "รายละเอียดการแจ้ง",
        key: "รายละเอียดการแจ้ง",
        width: 20,
        outlineLevel: 1,
      },

      {
        header: "ราคา",
        key: "ราคา",
        width: 20,
        outlineLevel: 1,
      },

      {
        header: "ผู้แจ้ง",
        key: "ผู้แจ้ง",
        width: 20,
        outlineLevel: 1,
      },

      {
        header: "สถานะ",
        key: "สถานะ",
        width: 20,
        outlineLevel: 1,
      },
    ];

    worksheet.properties.defaultRowHeight = 45;

    worksheet.addRows(json_data.value);

    worksheet.eachRow((row) => {
      row.height = 45;
      row.eachCell(function (cell) {
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
      });
    });

    const row = worksheet.getRow(1);
    row.height = 20;

    worksheet.insertRow(1, "รายการทะเบียนแจ้งซ่อมครุภัณฑ์");
    worksheet.mergeCells("A1:K1");
    worksheet.getCell("A1").value = "รายการทะเบียนแจ้งซ่อมครุภัณฑ์";
    worksheet.getCell("A1").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    const font = { name: "Arial", size: 18, bold: true };
    worksheet.getCell("A1").font = font;

    let start_date =
      search.created_at_from != null
        ? dayjs(search.created_at_from).locale("th").format("DD MMM BBBB")
        : "-";

    let end_date =
      search.created_at_to != null
        ? dayjs(search.created_at_to).locale("th").format("DD MMM BBBB")
        : "-";

    worksheet.insertRow(2);
    worksheet.mergeCells("A2:K2");
    worksheet.getCell("A2").value =
      "ระหว่างวันที่ " + start_date + " ถึง " + end_date;
    worksheet.getCell("A2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    const font1 = { name: "Arial", size: 18, bold: true };
    worksheet.getCell("A1").font = font1;

    // Images
    let myBase64Image = "";
    json_data.value.forEach((it, idx) => {
      let canvas = document.getElementById("qrcode-asset-" + it.id);
      myBase64Image = canvas.src;

      console.log(canvas.src);

        let image = workbook.addImage({
          base64: myBase64Image,
          extension: "png",
        });

        const image1 = worksheet.addImage(image, {
          tl: { col: 0.5, row: idx + 3.1 },
          // br: { col: 1, row: idx + 4 },
          ext: { width: 70, height: 70 },
          editAs: "oneCell",
          hyperlinks: {
            hyperlink: "http://citqr.cit.kmutnb.ac.th/asset/" + it.id,
            tooltip: "http://citqr.cit.kmutnb.ac.th/asset/" + it.id,
          },
        });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "รายการทะเบียนแจ้งซ่อมครุภัณฑ์.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    //   End Image

    qr_items.value = [];
  }, 3000);
};

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
  if (item.value.description == null || item.value.description == "") {
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
      status: item.value.status != null ? item.value.status.id : "",
      approved_at: approved_date,
      approved_by: approved_by,
    },
  })
    .then(async (res) => {
      if (res.msg == "success") {
        useToast(type_object.text_success, "success");

        // refreshNoti
        let data3 = await $fetch(
          `${runtimeConfig.public.apiBase}/repair-history`
        ).catch((error) => error.data);

        let item3 = data3.data.filter((e) => {
          return e.status == 0;
        });

        useNotification().value = {
          location: useNotification().value.location,
          holder: useNotification().value.holder,
          fix: item3.length,
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
    url: runtimeConfig.public.apiBase + "/repair-history/" + id,
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
        params["department_id"] = useCookie("user").value.department_id;
        params["is_notice"] = 1;

        let data3 = await $fetch(
          `${runtimeConfig.public.apiBase}/repair-history`,
          {
            params: params,
          }
        ).catch((error) => error.data);

        let item3 = data3.data.filter((e) => {
          return e;
        });

        useNotification().value = {
          location: useNotification().value.location,
          holder: useNotification().value.holder,
          fix: item3.length,
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
  title: "รายการคำขอแจ้งซ่อม",
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
  height: 29%;
  width: 20%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 40%;
  transform: translate(-50%, -50%);
}

/* Spinner */
/* .wrapper1 {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  text-align: center;
  transform: translateX(-50%);
} */

.spanner {
  position: fixed;
  top: 0%;
  left: 0;
  background: #2a2a2a55;
  width: 100%;
  display: block;
  text-align: center;
  height: 150%;
  color: #fff;
  z-index: 20000;
  visibility: hidden;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #2a2a2a55;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #ffffff;
  font-size: 10px;
  top: 30%;
  left: 50%;
  position: absolute;
  text-indent: -9999em;
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

.text-loader {
  position: absolute;
  top: 35%;
  left: 47.5%;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}

.show {
  visibility: visible;
}

.spanner,
.overlay {
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.spanner.show,
.overlay.show {
  opacity: 1;
}
</style>
