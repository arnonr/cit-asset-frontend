<template>
    <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
        <div class="container">
            <div class="row">
                <div class="col-xxl-12">
                    <div class="breadcrumb__content p-relative z-index-1">
                        <div class="breadcrumb__list">
                            <span> ผู้ดูแลระบบ </span>
                            <span class="dvdr"
                                ><i class="fa-solid fa-circle-small"></i
                            ></span>
                            <span>
                                <NuxtLink href="/asset">
                                    รายการครุภัณฑ์
                                </NuxtLink>
                            </span>
                            <span class="dvdr"
                                ><i class="fa-solid fa-circle-small"></i
                            ></span>
                            <span> แบบฟอร์มครุภัณฑ์ </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="portfolio__area pt-40 pb-40">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h4>แบบฟอร์มแก้ไขข้อมูลครุภัณฑ์</h4>
                </div>

                <div class="col-12 mt-20">
                    <ul class="nav nav-tabs" id="nav-tab" role="tablist">
                        <li>
                            <a
                                class="nav-link active"
                                id="nav-general-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-general"
                                type="button"
                                role="tab"
                                aria-controls="nav-general"
                                aria-selected="true"
                                >ข้อมูลครุภัณฑ์</a
                            >
                        </li>
                        <li
                            class="nav-item"
                            v-if="useCookie('user').value.level == 1"
                        >
                            <a
                                class="nav-link"
                                id="nav-warranty-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-warranty"
                                type="button"
                                role="tab"
                                aria-controls="nav-warranty"
                                aria-selected="false"
                                >การรับประกัน</a
                            >
                        </li>
                        <li
                            class="nav-item"
                            v-if="useCookie('user').value.level == 1"
                        >
                            <a
                                class="nav-link"
                                id="nav-cancel-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#nav-cancel"
                                type="button"
                                role="tab"
                                aria-controls="nav-cancel"
                                aria-selected="false"
                                >การโอน/จำหน่าย</a
                            >
                        </li>
                    </ul>
                </div>

                <div class="col-12 mt-20">
                    <div class="tab-content" id="nav-tabContent">
                        <div
                            class="tab-pane fade show active"
                            id="nav-general"
                            role="tabpanel"
                            aria-labelledby="nav-general-tab"
                        >
                            <div class="card" style="border: none">
                                <div class="card-body">
                                    <div
                                        v-if="
                                            useCookie('user').value.level ==
                                                1 ||
                                            useCookie('user').value.level == 2
                                        "
                                    >
                                        <div
                                            class="form-group row mt-10"
                                            v-for="(at, idx) in attributes"
                                            :key="idx"
                                        >
                                            <label
                                                :for="at.name"
                                                class="col-sm-3 col-form-label"
                                                ><span
                                                    class="text-danger"
                                                    v-if="at.required == true"
                                                    >*</span
                                                >{{ at.show_name }} :
                                            </label>
                                            <div class="col-sm-9">
                                                <input
                                                    v-if="
                                                        at.input_type == 'text'
                                                    "
                                                    type="text"
                                                    class="form-control form-control-plaintext"
                                                    :id="'txt-' + at.name"
                                                    v-model="item[at.name]"
                                                    :disabled="
                                                        at.disabled == true
                                                            ? true
                                                            : false
                                                    "
                                                />

                                                <input
                                                    v-if="
                                                        at.input_type ==
                                                        'number'
                                                    "
                                                    type="number"
                                                    class="form-control form-control-plaintext"
                                                    :id="'txt-' + at.name"
                                                    v-model="item[at.name]"
                                                />

                                                <textarea
                                                    v-if="
                                                        at.input_type ==
                                                        'textarea'
                                                    "
                                                    :id="'txt-' + at.name"
                                                    v-model="item[at.name]"
                                                    :disabled="
                                                        at.disabled == true
                                                            ? true
                                                            : false
                                                    "
                                                    style="height: 150px"
                                                />

                                                <v-select
                                                    v-if="
                                                        at.input_type ==
                                                        'select'
                                                    "
                                                    :label="at.label"
                                                    :placeholder="at.show_name"
                                                    :options="
                                                        selectOptions[
                                                            at.options
                                                        ]
                                                    "
                                                    :id="'slt-' + at.name"
                                                    v-model="item[at.name]"
                                                    class="form-control v-select-no-border"
                                                    :clearable="true"
                                                ></v-select>

                                                <VueDatePicker
                                                    v-if="
                                                        at.input_type ==
                                                        'datepicker'
                                                    "
                                                    v-model="item[at['name']]"
                                                    :enable-time-picker="false"
                                                    locale="th"
                                                    auto-apply
                                                    :format="format"
                                                >
                                                    <template
                                                        #year-overlay-value="{
                                                            text,
                                                        }"
                                                    >
                                                        {{
                                                            parseInt(text) + 543
                                                        }}
                                                    </template>
                                                    <template #year="{ value }">
                                                        {{ value + 543 }}
                                                    </template>
                                                </VueDatePicker>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group row mt-10">
                                        <label
                                            for="cover_photo"
                                            class="col-sm-3 col-form-label"
                                            ><span class="text-danger">*</span
                                            >รูปภาพปก :
                                        </label>

                                        <div class="col-sm-7">
                                            <input
                                                ref="file"
                                                class="form-control"
                                                type="file"
                                                id="formFile"
                                            />
                                        </div>
                                        <div class="col-sm-2">
                                            <a
                                                :href="item.cover_photo_old"
                                                target="_blank"
                                                class="btn btn-primary"
                                                style="width: 100%"
                                            >
                                                View Old File
                                            </a>
                                        </div>
                                    </div>

                                    <div class="form-group row mt-10">
                                        <label
                                            for="gallery"
                                            class="col-sm-3 col-form-label"
                                            >รูปภาพเพิ่มเติม :
                                        </label>

                                        <div class="col-sm-9">
                                            <client-only>
                                                <dashboard
                                                    :uppy="uppy"
                                                    ref="dash"
                                                    style="width: 100%"
                                                    :props="{
                                                        doneButtonHandler: null,
                                                        hideCancelButton: true,
                                                        showRemoveButtonAfterComplete: true,
                                                    }"
                                                />
                                            </client-only>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="tab-pane fade show"
                            id="nav-warranty"
                            role="tabpanel"
                            aria-labelledby="nav-warranty-tab"
                        >
                            <div class="card" style="border: none">
                                <div class="card-body">
                                    <div
                                        class="form-group row mt-10"
                                        v-for="(at, idx) in attributes_warranty"
                                        :key="idx"
                                    >
                                        <label
                                            :for="at.name"
                                            class="col-sm-3 col-form-label"
                                            ><span
                                                class="text-danger"
                                                v-if="at.required == true"
                                                >*</span
                                            >{{ at.show_name }} :
                                        </label>
                                        <div class="col-sm-9">
                                            <input
                                                v-if="at.input_type == 'text'"
                                                type="text"
                                                class="form-control form-control-plaintext"
                                                :id="'txt-' + at.name"
                                                v-model="item[at.name]"
                                                :disabled="
                                                    at.disabled == true
                                                        ? true
                                                        : false
                                                "
                                            />

                                            <input
                                                v-if="at.input_type == 'number'"
                                                type="number"
                                                class="form-control form-control-plaintext"
                                                :id="'txt-' + at.name"
                                                v-model="item[at.name]"
                                            />

                                            <v-select
                                                v-if="at.input_type == 'select'"
                                                :label="at.label"
                                                :placeholder="at.show_name"
                                                :options="
                                                    selectOptions[at.options]
                                                "
                                                :id="'slt-' + at.name"
                                                v-model="item[at.name]"
                                                class="form-control v-select-no-border"
                                                :clearable="true"
                                            ></v-select>

                                            <VueDatePicker
                                                v-if="
                                                    at.input_type ==
                                                    'datepicker'
                                                "
                                                v-model="item[at['name']]"
                                                :enable-time-picker="false"
                                                locale="th"
                                                auto-apply
                                                :format="format"
                                            >
                                                <template
                                                    #year-overlay-value="{
                                                        text,
                                                    }"
                                                >
                                                    {{ parseInt(text) + 543 }}
                                                </template>
                                                <template #year="{ value }">
                                                    {{ value + 543 }}
                                                </template>
                                            </VueDatePicker>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="tab-pane fade show"
                            id="nav-cancel"
                            role="tabpanel"
                            aria-labelledby="nav-cancel-tab"
                        >
                            <div class="card" style="border: none">
                                <div class="card-body">
                                    <div
                                        class="form-group row mt-10"
                                        v-for="(at, idx) in attributes_cancel"
                                        :key="idx"
                                    >
                                        <label
                                            :for="at.name"
                                            class="col-sm-3 col-form-label"
                                            ><span
                                                class="text-danger"
                                                v-if="at.required == true"
                                                >*</span
                                            >{{ at.show_name }} :
                                        </label>
                                        <div class="col-sm-9">
                                            <input
                                                v-if="at.input_type == 'text'"
                                                type="text"
                                                class="form-control form-control-plaintext"
                                                :id="'txt-' + at.name"
                                                v-model="item[at.name]"
                                                :disabled="
                                                    at.disabled == true
                                                        ? true
                                                        : false
                                                "
                                            />

                                            <input
                                                v-if="at.input_type == 'number'"
                                                type="number"
                                                class="form-control form-control-plaintext"
                                                :id="'txt-' + at.name"
                                                v-model="item[at.name]"
                                            />

                                            <v-select
                                                v-if="at.input_type == 'select'"
                                                :label="at.label"
                                                :placeholder="at.show_name"
                                                :options="
                                                    selectOptions[at.options]
                                                "
                                                :id="'slt-' + at.name"
                                                v-model="item[at.name]"
                                                class="form-control v-select-no-border"
                                                :clearable="true"
                                            ></v-select>

                                            <VueDatePicker
                                                v-if="
                                                    at.input_type ==
                                                    'datepicker'
                                                "
                                                v-model="item[at['name']]"
                                                :enable-time-picker="false"
                                                locale="th"
                                                auto-apply
                                                :format="format"
                                            >
                                                <template
                                                    #year-overlay-value="{
                                                        text,
                                                    }"
                                                >
                                                    {{ parseInt(text) + 543 }}
                                                </template>
                                                <template #year="{ value }">
                                                    {{ value + 543 }}
                                                </template>
                                            </VueDatePicker>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 mt-20">
                    <div class="contact__btn-2 text-center">
                        <button class="btn btn-warning" @click="onSubmit">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import dayjs from "dayjs";
import "dayjs/locale/th";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import asset_data from "~~/mixins/assetData";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/vue";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import XHRUpload from "@uppy/xhr-upload";

import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

// Variable
const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

const attributes = [
    {
        name: "asset_type_id",
        show_name: "ประเภทครุภัณฑ์",
        input_type: "select",
        label: "title",
        options: "asset_types",
        required: true,
    },
    {
        name: "asset_code",
        show_name: "หมายเลขครุภัณฑ์",
        input_type: "text",
        required: true,
    },
    {
        name: "asset_name",
        show_name: "ชื่อครุภัณฑ์",
        input_type: "text",
        required: true,
    },
    {
        name: "input_year",
        show_name: "ปีที่รับเข้าคลัง (พ.ศ.)",
        input_type: "text",
        required: true,
    },
    {
        name: "inspection_date",
        show_name: "วันที่ตรวจรับ",
        input_type: "datepicker",
    },
    {
        name: "approved_date",
        show_name: "วันที่คณะกรรมการเห็นถูกต้องครบถ้วน",
        input_type: "datepicker",
    },
    {
        name: "vendor",
        show_name: "ผู้จัดจำหน่าย",
        input_type: "text",
    },
    {
        name: "asset_detail",
        show_name: "รายละเอียด",
        input_type: "textarea",
    },
    {
        name: "brand",
        show_name: "ยี่ห้อ",
        input_type: "text",
    },
    {
        name: "model",
        show_name: "รุ่น",
        input_type: "text",
    },
    {
        name: "serial_number",
        show_name: "หมายเลขซีเรียล",
        input_type: "text",
    },
    {
        name: "price",
        show_name: "มูลค่าการได้มา",
        input_type: "number",
    },
    {
        name: "budget_type_id",
        show_name: "แหล่งเงิน",
        input_type: "select",
        label: "title",
        options: "budget_types",
        required: true,
    },
    {
        name: "asset_status",
        show_name: "สถานะ",
        input_type: "select",
        label: "name",
        options: "asset_statuses",
        required: true,
    },
    {
        name: "install_location",
        show_name: "สถานที่ติดตั้ง",
        input_type: "text",
        disabled: true,
    },
    {
        name: "location",
        show_name: "สถานที่ใช้งานปัจจุบัน",
        input_type: "text",
        disabled: true,
    },
    {
        name: "department_id",
        show_name: "หน่วยงานที่รับผิดชอบ",
        input_type: "select",
        label: "title",
        options: "departments",
        required: true,
    },
    {
        name: "drawer_name",
        show_name: "ผู้เบิก",
        input_type: "text",
    },
    {
        name: "holder_name",
        show_name: "ผู้ใช้งาน",
        input_type: "text",
        disabled: true,
    },
    {
        name: "is_transfer",
        show_name: "ได้รับโอนมา",
        input_type: "select",
        label: "title",
        options: "is_transfers",
        required: false,
    },
    {
        name: "transfer_from",
        show_name: "ได้รับโอนจาก",
        input_type: "text",
        disabled: false,
    },
    {
        name: "unit",
        show_name: "หน่วยนับ",
        input_type: "text",
        disabled: false,
    },
    {
        name: "comment",
        show_name: "หมายเหตุ",
        input_type: "text",
    },
];

const attributes_warranty = [
    {
        name: "warranty_type_1",
        show_name: "การรับประกันรายการที่ 1",
        input_type: "text",
        required: false,
    },
    {
        name: "warranty_day_1",
        show_name: "จำนวนวันรับประกันรายการที่ 1",
        input_type: "number",
        required: false,
    },
    {
        name: "warranty_type_2",
        show_name: "การรับประกันรายการที่ 2",
        input_type: "text",
        required: false,
    },
    {
        name: "warranty_day_2",
        show_name: "จำนวนวันรับประกันรายการที่ 2",
        input_type: "number",
        required: false,
    },

    {
        name: "warranty_type_3",
        show_name: "การรับประกันรายการที่ 3",
        input_type: "text",
        required: false,
    },
    {
        name: "warranty_day_3",
        show_name: "จำนวนวันรับประกันรายการที่ 3",
        input_type: "number",
        required: false,
    },
];

const attributes_cancel = ref([
    {
        name: "cancel_type",
        show_name: "ประเภทการยกเลิก",
        input_type: "select",
        label: "title",
        options: "cancel_types",
        required: false,
    },
    {
        name: "cancel_date",
        show_name: "วันที่",
        input_type: "datepicker",
    },
    {
        name: "cancel_comment",
        show_name: "หมายเหตุ",
        input_type: "text",
    },
    {
        name: "transfer_to",
        show_name: "ผู้รับโอน",
        input_type: "text",
        disabled: true,
    },
    {
        name: "transfer_to_department",
        show_name: "หน่วยงานผู้รับโอน",
        input_type: "text",
        disabled: true,
    },
]);

const item = ref({
    asset_name: null,
    asset_type_id: null,
    asset_status: {
        id: 1,
        value: 1,
        name: "ใช้งาน",
        color: "success",
    },
    is_transfer: { title: "ใช่", value: null },
    inspection_date: null,
});
const file = ref(null);
const gallery = ref([]);

const selectOptions = ref({
    asset_statuses: asset_data.data().asset_statuses,
    asset_types: [],
    budget_types: [],
    departments: [],
    is_transfers: [
        { title: "ใช่", value: 1 },
        { title: "ไม่ใช่", value: null },
    ],
    cancel_types: [
        { title: "โอน", value: 1 },
        { title: "จำหน่าย", value: 2 },
    ],
});

const format = (date) => {
    const day = dayjs(date).locale("th").format("DD");
    const month = dayjs(date).locale("th").format("MMM");
    const year = date.getFullYear() + 543;

    return `${day} ${month} ${year}`;
};

const r = (Math.random() + 1).toString(36).substring(7);

const uppy = new Uppy({
    meta: {
        asset_id: route.params.id,
        secret_key: r,
        asset_gallery_id: null,
        table_name: "asset",
    },
    debug: true,
    restrictions: {
        allowedFileTypes: null // อนุญาตทุกประเภทไฟล์
    },
}).use(XHRUpload, {
    headers: {
        Authorization: `Bearer ${useCookie("token").value}`,
    },
    endpoint: `${runtimeConfig.public.apiBase}/froala/uppy`,
    fieldName: "file",
});

uppy.on("upload-success", (file, response) => {
    uppy.setFileMeta(file.id, {
        url: response.body.link,
        asset_id: response.body.asset_id,
        asset_gallery_id: response.body.asset_gallery_id,
    });
});

uppy.on("file-removed", (file, reason) => {
    if (file.meta.asset_gallery_id != null) {
        $fetch(
            `${runtimeConfig.public.apiBase}/asset-photo/${file.meta.asset_gallery_id}`,
            {
                method: "DELETE",
            }
        )
            .then((res) => {
                if (res.msg == "success") {
                    console.log("success");
                } else {
                    console.log("error");
                }
            })
            .catch((error) => error.data);
    }
});

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
        return { title: `(${e.code}) ${e.name}`, value: e.id };
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

const fetchGallery = async () => {
    let data = await $fetch(`${runtimeConfig.public.apiBase}/asset-photo`, {
        params: {
            is_publish: 1,
            asset_id: route.params.id,
        },
    }).catch((error) => error.data);

    let gallery = data.data;

    for (let i = 0; i < gallery.length; i++) {
        await fetch(gallery[i].asset_photo_file)
            .then((response) => response.blob())
            .then((blob) => {
                uppy.addFile({
                    name: null,
                    type: blob.type,
                    data: blob,
                    meta: {
                        relativePath: gallery[i].asset_photo_file,
                        asset_id: gallery[i].asset_id,
                        asset_gallery_id: gallery[i].id,
                        secret_key: gallery[i].secret_key,
                        isRemote: true,
                    },
                    source: 'Local',
                    isRemote: false,
                });
            });
    }
    //

    //
    uppy.getFiles().forEach((file) => {
        uppy.setFileState(file.id, {
            progress: { uploadComplete: true, uploadStarted: true },
        });
    });
};

const fetchItem = async () => {
    let data = await $fetch(
        `${runtimeConfig.public.apiBase}/asset/${route.params.id}`,
        {
            params: {
                lang: "th",
            },
        }
    ).catch((error) => error.data);
    item.value = data.data;

    item.value.input_year = item.value.input_year + 543;
    item.value.asset_type_id = selectOptions.value.asset_types.find((x) => {
        return x.value == item.value.asset_type_id;
    });

    item.value.budget_type_id = selectOptions.value.budget_types.find((x) => {
        return x.value == item.value.budget_type_id;
    });
    console.log(selectOptions.value.budget_types);
    console.log(item.value.budget_type_id);

    item.value.asset_status = selectOptions.value.asset_statuses.find((x) => {
        return x.value == item.value.asset_status;
    });

    item.value.department_id = selectOptions.value.departments.find((x) => {
        return x.value == item.value.department_id;
    });

    item.value.is_transfer = selectOptions.value.is_transfers.find((x) => {
        return x.value == item.value.is_transfer;
    });

    item.value.cancel_type = selectOptions.value.cancel_types.find((x) => {
        return x.value == item.value.cancel_type;
    });

    item.value.cover_photo_old = data.data.cover_photo;
    item.value.cover_photo = null;

    console.log(item.value);
};

// Event
const onSubmit = async () => {
    console.log(item.value);
    if (
        item.value.asset_status == null ||
        item.value.asset_status.id == null ||
        item.value.asset_type_id == null ||
        item.value.asset_type_id.value == null ||
        item.value.asset_name == "" ||
        item.value.asset_name == null ||
        item.value.budget_type_id == null ||
        item.value.department_id == null
    ) {
        useToast("โปรดระบุข้อมูลให้ครบถ้วน", "error");
        return;
    }

    let type_object = {
        text_success: "แก้ไขรายการเสร็จสิ้น",
        method: "post",
        url: runtimeConfig.public.apiBase + "/asset/" + item.value.id,
    };

    let data = {
        ...item.value,
        secret_key: r,
        cover_photo: file.value.files != null ? file.value.files[0] : null,
        input_year:
            item.value.input_year != ""
                ? Number(item.value.input_year) - 543
                : undefined,
        asset_type_id:
            item.value.asset_type_id == null
                ? undefined
                : item.value.asset_type_id.value,
        budget_type_id:
            item.value.budget_type_id == null
                ? undefined
                : item.value.budget_type_id.value,
        department_id:
            item.value.department_id == null
                ? undefined
                : item.value.department_id.value,
        is_transfer:
            item.value.is_transfer == null
                ? undefined
                : item.value.is_transfer.value,
        cancel_type:
            item.value.cancel_type == null
                ? undefined
                : item.value.cancel_type.value,
        inspection_date:
            item.value.inspection_date != null
                ? dayjs(item.value.inspection_date).format("YYYY-MM-DD")
                : undefined,
        approved_date:
            item.value.approved_date != null
                ? dayjs(item.value.approved_date).format("YYYY-MM-DD")
                : undefined,
        cancel_date:
            item.value.cancel_date != null
                ? dayjs(item.value.cancel_date).format("YYYY-MM-DD")
                : undefined,
        asset_status: item.value.asset_status.id,
    };

    var form_data = new FormData();
    for (var key in data) {
        if (data[key] != undefined) {
            form_data.append(key, data[key]);
        }
    }

    await $fetch(type_object.url, {
        method: type_object.method,
        body: form_data,
        headers: {
            Authorization: useCookie("token").value
                ? `Bearer ${useCookie("token").value}`
                : "",
        },
    })
        .then((res) => {
            if (res.msg == "success") {
                useToast(type_object.text_success, "success");
                router.push({ path: "/asset/" + res.id });
            } else {
                throw new Error("ERROR");
            }
        })
        .catch((error) => error.data);
};

onMounted(() => {
    fetchAssetTypes();
    fetchBudgetTypes();
    fetchDepartments();
    fetchItem();
    fetchGallery();
});

watch(
    () => item.value.cancel_type,
    (val) => {
        if (val) {
            let disabled = true;
            if (val.value == 1) {
                disabled = false;
            }

            let new_att = attributes_cancel.value.map((x) => {
                if (
                    x.name == "transfer_to" ||
                    x.name == "transfer_to_department"
                ) {
                    x.disabled = disabled;
                }
                return x;
            });

            attributes_cancel.value = [...new_att];
        }
    }
);

watch(
    () => item.value.is_transfer,
    (val) => {
        let disabled = false;
        if (val.value == 1) {
            disabled = false;
        } else {
            disabled = true;
        }

        let new_att = attributes.map((x) => {
            if (x.name == "transfer_from") {
                x.disabled = disabled;
            }
            return x;
        });

        attributes.value = [...new_att];
    }
);

definePageMeta({
    middleware: "auth",
});
</script>
