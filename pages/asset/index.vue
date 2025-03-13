<template>
    <section
        class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4 d-print-none wrapper"
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

    <section class="portfolio__area pt-40 d-print-none wrapper1">
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

                <div class="col-12 col-lg-4 mt-1">
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

                <div class="col-12 col-lg-4 mt-1">
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
            <div class="mt-20">
                <button class="btn btn-success" @click="onSearch">
                    <i class="fa fa-search"></i> ค้นหา
                </button>
            </div>
        </div>
    </section>

    <section class="portfolio__area pt-40 pb-40 d-print-none wrapper1">
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
                        v-if="
                            useCookie('user').value.level == 1 ||
                            useCookie('user').value.level == 2
                        "
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

                    <json-excel
                        :fetch="fetchItemsExport"
                        :fields="json_fields"
                        :name="'asset'"
                        :header="[
                            'รายการทะเบียนครุภัณฑ์',
                            'ระหว่างวันที่ ' +
                                dayjs(search.created_at_from)
                                    .locale('th')
                                    .format('DD MMM BBBB') +
                                ' ถึง ' +
                                dayjs(search.created_at_to)
                                    .locale('th')
                                    .format('DD MMM BBBB'),
                        ]"
                        class="d-inline me-2"
                    >
                        <button type="button" class="btn btn-success mt-2">
                            <i class="fa-regular fa-file"></i> Export Excel
                        </button>
                    </json-excel>

                    <button
                        type="button"
                        class="btn btn-success mt-2 me-2"
                        @click="onExport()"
                    >
                        <i class="fa-regular fa-file"></i> Export with qr code
                    </button>
                    <br />
                    <!-- <div class="dropdown d-inline">
            <button
              class="btn btn-primary dropdown-toggle me-2 mt-2"
              type="button"
              id="dropdownMenuButton2"
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
          </div> -->

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
                        <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                        >
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
                        <ul
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                        >
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

                    <button
                        type="button"
                        class="btn btn-danger mt-2 me-2"
                        @click="onAddImages()"
                        v-if="
                            useCookie('user').value.level == 1 ||
                            useCookie('user').value.level == 2
                        "
                    >
                        <i class="fa-regular fa-image"></i> ADD Group Images
                    </button>
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
                    <div
                        class="d-flex fw-bold float-end mb-2 align-items-center"
                    >
                        <input
                            type="text"
                            class="form-control me-2"
                            style="width: 50px"
                            v-model="perPage"
                        />
                        <span class="text-muted">รายการ/หน้า</span>
                    </div>
                </div>
                <div class="col-12">
                    <div class="table-responsive">
                        <table
                            class="table table-bordered table-striped table-admin"
                        >
                            <thead>
                                <tr>
                                    <th class="text-center">
                                        <!-- verticle align center with bootstrap 5.3 -->
                                        <div class="text-center">
                                            <input
                                                class="form-check-input form-checkox-control"
                                                type="checkbox"
                                                v-model="selectAll"
                                                @change="toggleSelectAll"
                                            />
                                        </div>
                                        <span>ทั้งหมด</span>
                                    </th>
                                    <th class="text-center">รูป</th>
                                    <th class="text-center">หมายเลขครุภัณฑ์</th>
                                    <th class="text-center">ชื่อครุภัณฑ์</th>
                                    <!-- <th class="text-center">ยี่ห้อ</th>
                  <th class="text-center">รุ่น</th> -->
                                    <th class="text-center">รายละเอียด</th>
                                    <th class="text-center">ประเภทครุภัณฑ์</th>
                                    <th class="text-center">
                                        สถานที่ใช้งานปัจจุบัน
                                    </th>
                                    <th class="text-center">
                                        หน่วยงานที่รับผิดชอบ
                                    </th>
                                    <th class="text-center">สถานะครุภัณฑ์</th>
                                    <th
                                        class="text-center"
                                        style="min-width: 130px"
                                    >
                                        จัดการ
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-if="items.length != 0">
                                <tr v-for="(it, idx) in items" :key="idx">
                                    <td class="text-center">
                                        <div class="text-center">
                                            <input
                                                class="form-check-input form-checkox-control align-self-center"
                                                type="checkbox"
                                                :value="it.id"
                                                v-model="selectedItems"
                                                @change="handlerSelectItem(it)"
                                            />
                                        </div>
                                    </td>
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
                                        {{
                                            it.department != null
                                                ? it.department.name
                                                : null
                                        }}
                                    </td>
                                    <td class="text-center">
                                        <span
                                            v-if="it.asset_status != null"
                                            :class="
                                                'badge rounded-pill bg-' +
                                                selectOptions.asset_statuses[
                                                    it.asset_status - 1
                                                ].color
                                            "
                                            >{{
                                                selectOptions.asset_statuses[
                                                    it.asset_status - 1
                                                ].name
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
                                                    useCookie('user').value !=
                                                        undefined &&
                                                    (useCookie('user').value
                                                        .level == 1 ||
                                                        useCookie('user').value
                                                            .level == 2)
                                                "
                                            >
                                                <i
                                                    class="fa-regular fa-qrcode"
                                                ></i>
                                            </button>
                                            <ul
                                                class="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton1"
                                            >
                                                <li>
                                                    <a
                                                        class="dropdown-item"
                                                        @click="
                                                            onGenerateQR(it, 4)
                                                        "
                                                        style="cursor: pointer"
                                                        >4*4</a
                                                    >
                                                </li>
                                                <li>
                                                    <a
                                                        class="dropdown-item"
                                                        @click="
                                                            onGenerateQR(it, 2)
                                                        "
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
                                <label
                                    for="gallery"
                                    class="col-sm-12 col-form-label"
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
                                <h5>
                                    <span class="text-success"
                                        >รายการนำเข้าสำเร็จ
                                        {{ count_success_import }} รายการ</span
                                    >
                                    <span>, </span>
                                    <span class="text-danger"
                                        >รายการนำเข้าไม่สำเร็จ
                                        {{ count_error_import }} รายการ</span
                                    >
                                </h5>
                                <table
                                    class="table table-bordered table-striped table-admin"
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                class="text-center"
                                                style="min-width: 50px"
                                            >
                                                แถว
                                            </th>
                                            <th class="text-center">
                                                หมายเลขครุภัณฑ์
                                            </th>
                                            <th class="text-center">
                                                ข้อผิดพลาด
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="items.length != 0">
                                        <tr
                                            v-for="(it, idx) in import_result"
                                            :key="idx"
                                        >
                                            <td class="text-center">
                                                {{ it.row_id }}
                                            </td>
                                            <td class="text-center">
                                                {{ it.asset_code }}
                                            </td>
                                            <td class="text-center">
                                                <span>{{
                                                    it.error_message
                                                }}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <a
                        class="btn btn-primary"
                        target="_blank"
                        href="/template/template_import_asset.xlsx"
                    >
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
                                <label
                                    for="gallery"
                                    class="col-sm-12 col-form-label"
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
                                <h5>
                                    <span class="text-success"
                                        >รายการนำเข้าสำเร็จ
                                        {{ count_success_import }} รายการ</span
                                    >
                                    <span>, </span>
                                    <span class="text-danger"
                                        >รายการนำเข้าไม่สำเร็จ
                                        {{ count_error_import }} รายการ</span
                                    >
                                </h5>
                                <table
                                    class="table table-bordered table-striped table-admin"
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                class="text-center"
                                                style="min-width: 50px"
                                            >
                                                แถว
                                            </th>
                                            <th class="text-center">
                                                หมายเลขครุภัณฑ์
                                            </th>
                                            <th class="text-center">
                                                ข้อผิดพลาด
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="items.length != 0">
                                        <tr
                                            v-for="(it, idx) in import_result"
                                            :key="idx"
                                        >
                                            <td class="text-center">
                                                {{ it.row_id }}
                                            </td>
                                            <td class="text-center">
                                                {{ it.asset_code }}
                                            </td>
                                            <td class="text-center">
                                                <span>{{
                                                    it.error_message
                                                }}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <a
                        class="btn btn-primary"
                        target="_blank"
                        href="/template/template_import_cancel_asset.xlsx"
                    >
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
                        class="btn btn-warning"
                        @click="onImportSubmit(2)"
                    >
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
                :style="
                    'width: 170px;height: 170px;padding-left: 3px;' + display_qr
                "
            >
                <figure class="qrcode">
                    <vue-qrcode
                        :value="'https://citqr.cit.kmutnb.ac.th/asset/' + it.id"
                        :id="'qrcode-asset-' + it.id"
                        tag="img"
                        style="
                            display: inline-block !important;
                            vertical-align: top;
                        "
                        :options="{
                            errorCorrectionLevel: 'Q',
                            width: 150,
                            margin: 0,
                        }"
                    ></vue-qrcode>

                    <img
                        src="~/assets/img/logo/logo_cit.png"
                        class="qrcode__image"
                        style="width: 43px"
                    />
                </figure>
                <div
                    style="
                        font-size: 0.55em;
                        width: 150px;
                        min-height: 150px;
                        word-wrap: break-word;
                        margin-left: 2px;
                        margin-top: 5px;
                        vertical-align: top;
                        color: #000;
                        line-height: 1;
                    "
                >
                    {{
                        it.input_year +
                        543 +
                        "-" +
                        it.asset_code +
                        " (" +
                        it.budget_type.category +
                        ")"
                    }}
                </div>
            </div>
        </div>
    </ClientOnly>
    <!-- 2/2 -->
    <ClientOnly>
        <div
            :class="'printable ' + show22"
            style="display: block; padding-left: 40px; padding-top: 41px"
        >
            <div
                v-for="(it, idx) in qr_items"
                :key="idx"
                style="
                    width: 143px;
                    height: 75px;
                    display: inline-block;
                    padding-left: 3px;
                "
            >
                <figure class="qrcode">
                    <vue-qrcode
                        :value="'https://citqr.cit.kmutnb.ac.th/asset/' + it.id"
                        tag="canvas"
                        style="display: inline-block !important"
                        :options="{
                            errorCorrectionLevel: 'Q',
                            width: 72,
                            margin: 0,
                        }"
                    ></vue-qrcode>

                    <img
                        src="~/assets/img/logo/logo_cit.png"
                        class="qrcode__image"
                        style="width: 25px"
                    />
                </figure>
                <div
                    style="
                        font-size: 0.7em;
                        width: 66px;
                        word-wrap: break-word;
                        margin-top: 15px;
                        margin-left: 2px;
                        vertical-align: top;
                        display: inline-block !important;
                        color: #000;
                        line-height: 1;
                    "
                >
                    {{
                        it.input_year +
                        543 +
                        "-" +
                        it.asset_code +
                        " (" +
                        it.budget_type.category +
                        ")"
                    }}
                </div>
            </div>

            <!-- <div
        :class="'printable ' + show22"
        v-for="(it, idx) in qr_items"
        :key="idx"
        :style="'position: relative; left: 3px; margin-bottom: 2px !important;margin-top: 2px !important;'"
      >
        <figure class="qrcode" style="margin-bottom: 0px !important; margin-top: -4px !important;">
          <vue-qrcode
            :value="'http://citqresearch.cit.kmutnb.ac.th/asset/' + it.id"
            tag="canvas"
            style="margin-top: -4px !important;"
            :options="{
              errorCorrectionLevel: 'Q',
              width: 75,
              margin: 2,
            }"
          ></vue-qrcode>

          <img
            src="~/assets/img/logo/logo_cit.png"
            class="qrcode__image"
            style="width: 25px"
          />
        </figure>
        <div
          style="
            width: 65px;
            position: relative;
            display: inline-block;
            vertical-align: top;
            left: 1px;
            margin-right: 5px;
            top: 10px;
            font-size: 0.6em;
            color: #000;
            line-height: 1;
          "
        >
          {{
            it.input_year +
            543 +
            "-" +
            it.asset_code +
            " (" +
            it.budget_type.category +
            ")"
          }}
        </div>
      </div> -->
        </div>
    </ClientOnly>

    <!-- Overlay -->
    <div class="overlay"></div>
    <div :class="'spanner ' + show_spinner">
        <div class="loader"></div>
        <div class="text-loader fw-bold">Importing Asset.</div>
    </div>

    <!-- Modal Add Images -->
    <!-- Modal -->
    <div
        class="modal fade"
        data-bs-backdrop="static"
        id="modal-form-add-images"
        tabindex="-1"
        aria-labelledby="modal-form-add-images"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modal-form-label">
                        แบบฟอร์มเพิ่มรูปภาพ
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <!-- Form ประเภทข่าว -->
                    <form>
                        <div class="row">
                            <div class="col-12">
                                <label for="code" class="col-form-label"
                                    ><span class="text-danger">*</span>เลือกรูป
                                    :</label
                                >
                                <input
                                    ref="add_images_file"
                                    class="form-control"
                                    type="file"
                                    id="formFile"
                                />
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
                        @click="onSubmitAddImages()"
                    >
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
import VueQrcode from "@chenfengyuan/vue-qrcode";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// import tableItem from "~/components/list/TableItem.vue";
import BlogPagination from "~/components/common/pagination/BlogPagination.vue";
import asset_data from "~~/mixins/assetData";
import JsonExcel from "vue-json-excel3";
import XLSX from "xlsx";
import ExcelJS from "exceljs";
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
const display_qr = ref("display: inline-block;");
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
const selectAll = ref(false);
const selectedItems = ref([]);

let modalAddImagesForm;

const format = (date) => {
    const day = dayjs(date).locale("th").format("DD");
    const month = dayjs(date).locale("th").format("MMM");
    const year = dayjs(date).locale("th").format("BBBB");

    return `${day} ${month} ${year}`;
};

const json_data = ref([]);
const count_success_import = ref(0);
const count_error_import = ref(0);

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
const show_spinner = ref("");
const add_images_file = ref(null);
let modalForm;
let modalForm2;

const json_fields = {
    หมายเลขครุภัณฑ์: "หมายเลขครุภัณฑ์",
    ชื่อครุภัณฑ์: "ชื่อครุภัณฑ์",
    ปีงบประมาณ: "ปีงบประมาณ",
    รายละเอียด: "รายละเอียด",
    ประเภทครุภัณฑ์: "ประเภทครุภัณฑ์",
    วันที่ตรวจรับ: "วันที่ตรวจรับ",
    มูลค่าครุภัณฑ์: "มูลค่าครุภัณฑ์",
    ผู้จัดจำหน่าย: "ผู้จัดจำหน่าย",
    แหล่งเงิน: "แหล่งเงิน",
    การรับประกัน: "การรับประกัน",
};

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
            search.value.expire_day == null
                ? undefined
                : search.value.expire_day.id,
        input_year:
            search.value.input_year == null
                ? undefined
                : search.value.input_year.id,
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

    if (search.value.input_year.id == "all") {
        delete params.input_year;
    }

    if (useCookie("user").value.level == 3) {
        params["department_id"] = useCookie("user").value.department_id;
    }

    let data = await $fetch(`${runtimeConfig.public.apiBase}/asset`, {
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
            search.value.expire_day == null
                ? undefined
                : search.value.expire_day.id,
        input_year:
            search.value.input_year == null
                ? undefined
                : search.value.input_year.id,
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
        orderBy: search.value.orderBy
            ? search.value.orderBy.value
            : "created_at",
        order: search.value.order ? search.value.order.value : "desc",
    };

    if (useCookie("user").value.level == 3) {
        params["department_id"] = useCookie("user").value.department_id;
    }

    let data = await $fetch(`${runtimeConfig.public.apiBase}/asset/export`, {
        params: params,
    }).catch((error) => error.data);

    return data.data.map((e) => {
        return e;
        // let expire_date_all =
        //   e.warranty_type_1 != null && e.warranty_type_1 != ""
        //     ? e.warranty_type_1 + " " + e.warranty_day_1 + " วัน"
        //     : "";
        // expire_date_all +=
        //   e.warranty_type_2 != null && e.warranty_type_2 != ""
        //     ? ", " + e.warranty_type_2 + " " + e.warranty_day_2 + " วัน"
        //     : "";
        // expire_date_all +=
        //   e.warranty_type_3 != null && e.warranty_type_3 != ""
        //     ? ", " + e.warranty_type_3 + " " + e.warranty_day_3 + " วัน"
        //     : "";

        // return {
        //   หมายเลขครุภัณฑ์: e.asset_code,
        //   ชื่อครุภัณฑ์: e.asset_name,
        //   ปีงบประมาณ: e.input_year,
        //   รายละเอียด: e.asset_detail,
        //   ประเภทครุภัณฑ์: e.asset_type.name,
        //   วันที่ตรวจรับ:
        //     e.inspection_date != null
        //       ? dayjs(e.inspection_date).locale("th").format("DD MMM BBBB")
        //       : "",
        //   มูลค่าครุภัณฑ์:
        //     e.price != null
        //       ? Number(e.price)
        //           .toFixed(2)
        //           .toString()
        //           .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        //       : "",
        //   ผู้จัดจำหน่าย: e.vendor,
        //   แหล่งเงิน: e.budget_type.name,
        //   การรับประกัน: expire_date_all,
        // };
    });

    //   return json_data.value;
};

const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedItems.value = items.value.map((item) => item.id);
    } else {
        // ไม่เลือกรายการทั้งหมด
        selectedItems.value = [];
    }
};

const handleSelectedItems = () => {
    // ฟังก์ชันสำหรับจัดการกับรายการที่เลือก
    if (selectedItems.value.length === 0) {
        useToast("กรุณาเลือกรายการก่อน", "warning");
        return;
    }

    // แสดง Dropdown หรือ Modal สำหรับจัดการรายการที่เลือก
    Swal.fire({
        title: "จัดการรายการที่เลือก",
        text: `คุณได้เลือก ${selectedItems.value.length} รายการ`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "ดำเนินการ",
        cancelButtonText: "ยกเลิก",
    }).then((result) => {
        if (result.isConfirmed) {
            // ดำเนินการกับรายการที่เลือก
            // เช่น พิมพ์ QR, Export เฉพาะรายการที่เลือก, ฯลฯ
        }
    });
};

const handlerSelectItem = (item) => {
    // ตรวจสอบว่า item นี้ถูกเลือกอยู่หรือไม่
    const isChecked = selectedItems.value.includes(item.id);
    console.log("รายการ:", item.asset_code, "สถานะ checkbox:", isChecked);

    if (isChecked) {
        console.log("รายการนี้ถูกเลือก");
    } else {
        console.log("รายการนี้ถูกยกเลิกการเลือก");
    }
};

const onAddImages = () => {
    modalAddImagesForm.show();

    // show modal fom add imges
    // fetch update asset group images
    // show toast success
    // close modal
    // reload page
};

// เรียกใช้ checkSelectAll เมื่อรายการเปลี่ยน
watch(items, () => {
    // checkSelectAll();
});

// Watch
// , search
watch(
    [perPage],
    () => {
        fetchItems();
    },
    { deep: true }
);

watch(
    [currentPage],
    () => {
        fetchItems();
    },
    { deep: true }
);

watchEffect(() => {
    if (currentPage.value > totalPage.value)
        currentPage.value = totalPage.value;
});

// Event
const readFileAsync = (importFile) => {
    return new Promise((resolve, reject) => {
        // importFile

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
    let data = [];
    if (type == 1) {
        importFile = file.value.files[0];
        result = await readFileAsync(importFile);
    }

    if (type == 2) {
        importFile = file2.value.files[0];
        result = await readFileAsync(importFile);
    }

    let column_index_import = {
        asset_code: null,
        asset_name: null,
        input_year: null,
        inspection_date: null,
        approved_date: null,
        vendor: null,
        asset_detail: null,
        install_location: null,
        asset_type_code: null,
        brand: null,
        model: null,
        serial_number: null,
        price: null,
        budget_type_code: null,
        is_transfer: null,
        transfer_from: null,
        location: null,
        department_code: null,
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
            name: "คุณสมบัติ",
            name_en: "asset_detail",
        },
        {
            name: "สถานที่ติดตั้ง",
            name_en: "install_location",
        },
        {
            name: "รหัสประเภทครุภัณฑ์",
            name_en: "asset_type_code",
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
            name: "รหัสแหล่งเงิน",
            name_en: "budget_type_code",
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
            name: "รหัสภาค/กอง",
            name_en: "department_code",
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
            name: "การรับประกัน1",
            name_en: "warranty_type_1",
        },
        {
            name: "จำนวนวันรับประกัน1",
            name_en: "warranty_day_1",
        },
        {
            name: "การรับประกัน2",
            name_en: "warranty_type_2",
        },
        {
            name: "จำนวนวันรับประกัน2",
            name_en: "warranty_day_2",
        },
        {
            name: "การรับประกัน3",
            name_en: "warranty_type_3",
        },
        {
            name: "จำนวนวันรับประกัน3",
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
            name: "ผู้รับโอน",
            name_en: "transfer_to",
        },
        {
            name: "หน่วยงานผู้รับโอน",
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
        // console.log(day)
        // let day_arr = day.split("/");
        return day;
        // (
        //   day_arr[2] + "-" + day_arr[1] + "-" + day_arr[0]
        // );
    };

    for (var i = 0; i < result.result.length; i++) {
        if (result.result[i].length != 0) {
            console.log(
                "inspection_date: " +
                    result.result[i][column_index_import.inspection_date]
            );
            console.log(
                "approve_date: " +
                    result.result[i][column_index_import.approved_date]
            );
            console.log(
                "cancel_date: " +
                    result.result[i][column_index_import.cancel_date]
            );

            data.push({
                row_id: i + 1,
                asset_code:
                    column_index_import.asset_code != undefined
                        ? result?.result[i][
                              column_index_import.asset_code
                          ]?.trim()
                        : null,
                asset_name:
                    column_index_import.asset_name != undefined
                        ? result?.result[i][
                              column_index_import.asset_name
                          ]?.trim()
                        : null,
                input_year:
                    column_index_import.input_year != undefined
                        ? Number(
                              result.result[i][column_index_import.input_year]
                          ) - 543
                        : null,
                inspection_date:
                    column_index_import.inspection_date != undefined
                        ? convert_day(
                              result.result[i][
                                  column_index_import.inspection_date
                              ]
                          )
                        : null,
                approved_date:
                    column_index_import.approved_date != undefined
                        ? convert_day(
                              result.result[i][
                                  column_index_import.approved_date
                              ]
                          )
                        : null,
                vendor:
                    column_index_import.vendor != undefined
                        ? result?.result[i][column_index_import.vendor]?.trim()
                        : null,
                asset_detail:
                    column_index_import.asset_detail != undefined
                        ? result?.result[i][column_index_import.asset_detail]
                        : null,
                install_location:
                    column_index_import.install_location != undefined
                        ? result?.result[i][
                              column_index_import.install_location
                          ]?.trim()
                        : null,
                asset_type_code:
                    column_index_import.asset_type_code != undefined
                        ? result?.result[i][
                              column_index_import.asset_type_code
                          ]?.trim()
                        : null,
                brand:
                    column_index_import.brand != undefined
                        ? result?.result[i][column_index_import.brand]
                        : null,
                model:
                    column_index_import.model != undefined
                        ? result?.result[i][column_index_import.model]
                        : null,
                serial_number:
                    column_index_import.serial_number != undefined
                        ? result?.result[i][column_index_import.serial_number]
                        : null,
                price:
                    column_index_import.price != undefined
                        ? result?.result[i][column_index_import.price]?.trim()
                        : null,
                budget_type_code:
                    column_index_import.budget_type_code != undefined
                        ? result.result[i][column_index_import.budget_type_code]
                        : null,
                is_transfer:
                    column_index_import.is_transfer != undefined
                        ? result.result[i][column_index_import.is_transfer]
                        : null,
                transfer_from:
                    column_index_import.transfer_from != undefined
                        ? result.result[i][column_index_import.transfer_from]
                        : null,
                location:
                    column_index_import.location != undefined
                        ? result?.result[i][
                              column_index_import.location
                          ]?.trim()
                        : null,
                department_code:
                    column_index_import.department_code != undefined
                        ? result.result[i][column_index_import.department_code]
                        : null,
                drawer_name:
                    column_index_import.drawer_name != undefined
                        ? result.result[i][column_index_import.drawer_name]
                        : null,
                holder_name:
                    column_index_import.holder_name != undefined
                        ? result?.result[i][
                              column_index_import.holder_name
                          ]?.trim()
                        : null,
                warranty_type_1:
                    column_index_import.warranty_type_1 != undefined
                        ? result.result[i][column_index_import.warranty_type_1]
                            ? result?.result[i][
                                  column_index_import.warranty_type_1
                              ]?.trim()
                            : null
                        : null,
                warranty_day_1:
                    column_index_import.warranty_day_1 != undefined
                        ? result.result[i][column_index_import.warranty_day_1]
                            ? result?.result[i][
                                  column_index_import.warranty_day_1
                              ]?.trim()
                            : null
                        : null,
                warranty_type_2:
                    column_index_import.warranty_type_2 != undefined
                        ? result.result[i][column_index_import.warranty_type_2]
                            ? result?.result[i][
                                  column_index_import.warranty_type_2
                              ]?.trim()
                            : null
                        : null,
                warranty_day_2:
                    column_index_import.warranty_day_2 != undefined
                        ? result.result[i][column_index_import.warranty_day_2]
                            ? result?.result[i][
                                  column_index_import.warranty_day_2
                              ]?.trim()
                            : null
                        : null,
                warranty_type_3:
                    column_index_import.warranty_type_3 != undefined
                        ? result.result[i][column_index_import.warranty_type_3]
                            ? result?.result[i][
                                  column_index_import.warranty_type_3
                              ]?.trim()
                            : null
                        : null,
                warranty_day_3:
                    column_index_import.warranty_day_3 != undefined
                        ? result.result[i][column_index_import.warranty_day_3]
                            ? result?.result[i][
                                  column_index_import.warranty_day_3
                              ]?.trim()
                            : null
                        : null,
                asset_status:
                    column_index_import.asset_status != undefined
                        ? result?.result[i][
                              column_index_import.asset_status
                          ]?.trim()
                        : null,
                cancel_type:
                    column_index_import.cancel_type != undefined
                        ? result.result[i][column_index_import.cancel_type]
                            ? result?.result[i][
                                  column_index_import.cancel_type
                              ]?.trim()
                            : null
                        : null,
                cancel_date:
                    column_index_import.cancel_date != undefined
                        ? result.result[i][column_index_import.cancel_date]
                            ? convert_day(
                                  result.result[i][
                                      column_index_import.cancel_date
                                  ]
                              )
                            : null
                        : null,
                cancel_comment:
                    column_index_import.cancel_comment != undefined
                        ? result.result[i][column_index_import.cancel_comment]
                            ? result?.result[i][
                                  column_index_import.cancel_comment
                              ]?.trim()
                            : null
                        : null,
                transfer_to:
                    column_index_import.transfer_to != undefined
                        ? result.result[i][column_index_import.transfer_to]
                            ? result?.result[i][
                                  column_index_import.transfer_to
                              ]?.trim()
                            : null
                        : null,
                transfer_to_department:
                    column_index_import.transfer_to_department != undefined
                        ? result.result[i][
                              column_index_import.transfer_to_department
                          ]
                            ? result?.result[i][
                                  column_index_import.transfer_to_department
                              ]?.trim()
                            : null
                        : null,
                comment:
                    column_index_import.comment != undefined
                        ? result?.result[i][column_index_import.comment]?.trim()
                        : null,
            });
        }
    }

    let type_object = {
        text_success: "นำเข้าข้อมูลเสร็จสิ้น",
        method: "post",
        url: runtimeConfig.public.apiBase + "/asset/import-asset",
    };

    show_spinner.value = "show";
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

                count_error_import.value = 0;
                count_success_import.value = 0;

                import_result.value = data_err.filter((e) => {
                    if (e.import_success == false) {
                        count_error_import.value = count_error_import.value + 1;
                    } else {
                        count_success_import.value =
                            count_success_import.value + 1;
                    }
                    return e.import_success == false;
                });

                fetchItems();

                show_spinner.value = "";
            } else {
                throw new Error("ERROR");
            }
        })
        .catch((error) => {
            show_spinner.value = "";
            return error.data;
        });
};

const onGenerateQR = (it, size) => {
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
        qr_items.value = [...json_data.value].filter((e) => {
            return selectedItems.value.includes(e.id);
        });
        // qr_items.value = [...items.value];
    } else {
        qr_items.value.push(it);
    }
    setTimeout(() => {
        window.print();
        qr_items.value = [];
    }, 1000);
};

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
        qr_items.value = [...json_data.value].filter((e) => {
            return selectedItems.value.includes(e.id);
        });
    } else {
        qr_items.value.push(it);
    }
};

const onExport = async () => {
    onGenerateQR1("ALL", 1);
    setTimeout(async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("รายการครุภัณฑ์", {
            pageSetup: { orientation: "landscape" },
            headerFooter: {
                firstHeader: "Hello Exceljs",
                firstFooter: "Hello World",
            },
        });

        //   const title = {
        //     text: "รายงานข้อมูล",
        //     alignment: "center",
        //     font: {
        //       name: "Calibri",
        //       size: 16,
        //       bold: true,
        //     },
        //   };
        //   worksheet.mergeCells("A1:J1");
        //   worksheet.getCell("A1").value = title;

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
            {
                header: "ปีงบประมาณ",
                key: "ปีงบประมาณ",
                width: 12,
                outlineLevel: 1,
            },
            {
                header: "รายละเอียด",
                key: "รายละเอียด",
                width: 30,
                outlineLevel: 1,
            },
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
                header: "ผู้จัดจำหน่าย",
                key: "ผู้จัดจำหน่าย",
                width: 20,
                outlineLevel: 1,
            },
            {
                header: "แหล่งเงิน",
                key: "แหล่งเงิน",
                width: 20,
                outlineLevel: 1,
            },
            {
                header: "การรับประกัน",
                key: "การรับประกัน",
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

        worksheet.insertRow(1, "รายการทะเบียนครุภัณฑ์");
        worksheet.mergeCells("A1:K1");
        worksheet.getCell("A1").value = "รายการทะเบียนครุภัณฑ์";
        worksheet.getCell("A1").alignment = {
            vertical: "middle",
            horizontal: "center",
        };
        const font = { name: "Arial", size: 18, bold: true };
        worksheet.getCell("A1").font = font;

        let start_date =
            search.created_at_from != null
                ? dayjs(search.created_at_from)
                      .locale("th")
                      .format("DD MMM BBBB")
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
                    hyperlink: "https://citqr.cit.kmutnb.ac.th/asset/" + it.id,
                    tooltip: "https://citqr.cit.kmutnb.ac.th/asset/" + it.id,
                },
            });
        });
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = "รายการครุภัณฑ์.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        //   End Image

        qr_items.value = [];
    }, 3000);
};

const onSearch = () => {
    fetchItems();
};

const onSubmitAddImages = async () => {
    let data = {
        cover_photo:
            add_images_file.value.files != null
                ? add_images_file.value.files[0]
                : null,
    };
-
    console.log(data);
    var form_data = new FormData();
    for (var key in data) {
        form_data.append(key, data[key]);
    }

    console.log(form_data);

    // await $fetch(type_object.url, {
    //     method: type_object.method,
    //     body: form_data,
    //     headers: {
    //         Authorization: useCookie("token").value
    //             ? `Bearer ${useCookie("token").value}`
    //             : "",
    //     },
    // })
    //     .then((res) => {
    //         if (res.msg == "success") {
    //             useToast(type_object.text_success, "success");
    //             router.push({ path: "/asset/" + res.id });
    //         } else {
    //             throw new Error("ERROR");
    //         }
    //     })
    //     .catch((error) => error.data);
};

onMounted(async () => {
    await fetchAssetTypes();
    await fetchBudgetTypes();
    await fetchDepartments();
    console.log(selectOptions.value.departments);
    search.value.input_year = null;

    //   await fetchItems();
    modalForm = new bootstrap.Modal(document.getElementById("modal-form"));
    modalForm2 = new bootstrap.Modal(document.getElementById("modal-form-2"));
    modalAddImagesForm = new bootstrap.Modal(
        document.getElementById("modal-form-add-images")
    );
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
