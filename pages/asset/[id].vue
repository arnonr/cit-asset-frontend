<template>
  <section class="breadcrumb__area include-bg pb-40 pt-30 grey-bg-4">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12" v-if="item != null">
          <div class="breadcrumb__content p-relative z-index-1">
            <div class="breadcrumb__list">
              <span> <NuxtLink href="/asset"> รายการครุภัณฑ์ </NuxtLink></span>
              <span class="dvdr"><i class="fa-solid fa-circle-small"></i></span>
              <span> {{ item.asset_code }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  -->
  <section class="postbox__area pt-40 pb-120">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="postbox__wrapper" v-if="item != null">
            <!-- Image -->
            <!-- <div class="postbox__top">
                
              </div> -->
            <!-- Content -->
            <div class="postbox__main">
              <div class="row">
                <div class="col-lg-12">
                  <div class="postbox__main-wrapper">
                    <div class="postbox__details-content-wrapper">
                      <div class="text-end">
                        <NuxtLink
                          :to="{
                            name: 'asset-edit-id',
                            params: { id: item.id },
                          }"
                          class="btn btn-warning"
                          >Edit</NuxtLink
                        >

                        <button
                          class="btn btn-danger ml-5"
                          @click="onConfirmDelete(item.id)"
                        >
                          Delete
                        </button>
                      </div>
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
                        <li class="nav-item">
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
                        <li class="nav-item">
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
                          <div class="postbox__details-content-wrapper mt-40">
                            <div class="row">
                              <div class="col-12 text-center">
                                <img
                                  :src="item.cover_photo"
                                  alt=""
                                  style="max-width: 80%"
                                />
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">รหัสครุภัณฑ์ : </span>
                                <span class="fw-bold text-primary">{{
                                  item.asset_code
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ปี : </span>
                                <span class="fw-bold text-primary">{{
                                  item.input_year
                                }}</span>
                                <hr class="hr-separator" />
                              </div>

                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">วันที่ตรวจรับ : </span>
                                <span class="fw-bold text-primary">{{
                                  dayjs(item.inspection_date)
                                    .locale("th")
                                    .format("DD MMM BBBB")
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">วันที่...... : </span>
                                <span class="fw-bold text-primary">{{
                                  dayjs(item.approved_date)
                                    .locale("th")
                                    .format("DD MMM BBBB")
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ผู้ขาย : </span>
                                <span class="fw-bold text-primary">{{
                                  item.vendor
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ประเภทครุภัณฑ์ : </span>
                                <span class="fw-bold text-primary">{{
                                  item.asset_type.name
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ยี่ห้อ : </span>
                                <span class="fw-bold text-primary">{{
                                  item.brand
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">รุ่น : </span>
                                <span class="fw-bold text-primary">{{
                                  item.model
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12">
                                <span class="fw-bold">เลขซีเรียล : </span>
                                <span class="fw-bold text-primary">{{
                                  item.serial_number
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ราคา : </span>
                                <span class="fw-bold text-primary"
                                  >{{ item.price }}.00 บาท</span
                                >
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">แหล่งงบประมาณ : </span>
                                <span class="fw-bold text-primary">{{
                                  item.budget_type.name
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ได้รับโอนมา : </span>
                                <span class="fw-bold text-primary">{{
                                  item.is_transfer == 1 ? "YES" : "NO"
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ได้รับโอนจาก : </span>
                                <span class="fw-bold text-primary">{{
                                  item.is_transfer == 1
                                    ? item.transfer_from
                                    : "-"
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12">
                                <span class="fw-bold">สถานที่ตั้ง : </span>
                                <span class="fw-bold text-primary">{{
                                  item.location
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12">
                                <span class="fw-bold"
                                  >หน่วยงานที่รับผิดชอบ :
                                </span>
                                <span class="fw-bold text-primary">{{
                                  item.department.name
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ผู้เบิก : </span>
                                <span class="fw-bold text-primary">{{
                                  item.drawer_name
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ผู้ใช้งาน : </span>
                                <span class="fw-bold text-primary">{{
                                  item.holder_name
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12">
                                <!-- <span class="fw-bold">แกลลอรี่ : </span> -->
                                <div class="mx-auto">
                                  <ClientOnly>
                                    <Swiper
                                      :slidesPerView="1"
                                      :spaceBetween="10"
                                      :loop="true"
                                      :thumbs="{ swiper: thumbsSwiper }"
                                      :navigation="true"
                                      :modules="modules"
                                      :speed="5000"
                                      :autoplay="{
                                        delay: 5000,
                                        disableOnInteraction: true,
                                      }"
                                      class="mySwiper2 mb-10"
                                      v-if="gallery.length != 0"
                                    >
                                      <SwiperSlide
                                        v-for="ng in gallery"
                                        :key="ng.id"
                                      >
                                        <img
                                          :src="ng.asset_photo_file"
                                          style="
                                            max-width: 800px;
                                            margin-left: auto;
                                            margin-right: auto;
                                            display: block;
                                          "
                                        />
                                      </SwiperSlide>
                                    </Swiper>

                                    <Swiper
                                      @swiper="setThumbsSwiper"
                                      :spaceBetween="10"
                                      :slidesPerView="4"
                                      :freeMode="true"
                                      :watchSlidesProgress="true"
                                      :modules="modules"
                                      class="mySwiper"
                                    >
                                      <SwiperSlide
                                        v-for="ng in gallery"
                                        :key="ng.id"
                                      >
                                        <img
                                          :src="ng.asset_photo_file"
                                          style="
                                            max-width: 200px;
                                            cursor: pointer;
                                          "
                                        />
                                      </SwiperSlide>
                                    </Swiper>
                                  </ClientOnly>
                                </div>

                                <hr />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          class="tab-pane fade"
                          id="nav-warranty"
                          role="tabpanel"
                          aria-labelledby="nav-warranty-tab"
                        >
                          <div class="postbox__details-content-wrapper mt-40">
                            <div class="row">
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold"
                                  >การรับประกันรายการที่ 1 :
                                </span>
                                <span class="fw-bold text-primary">{{
                                  item.warranty_type_1 != null
                                    ? item.warranty_type_1
                                    : "-"
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold"
                                  >จำนวนวันรับประกันรายการที่ 1 :
                                </span>
                                <span class="fw-bold text-primary"
                                  >{{
                                    item.warranty_type_1
                                      ? item.warranty_day_1 + " วัน"
                                      : "-"
                                  }}
                                </span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold"
                                  >การรับประกันรายการที่ 2 :
                                </span>
                                <span class="fw-bold text-primary">{{
                                  item.warranty_type_2 != null
                                    ? item.warranty_type_2
                                    : "-"
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold"
                                  >จำนวนวันรับประกันรายการที่ 2 :
                                </span>
                                <span class="fw-bold text-primary">{{
                                  item.warranty_type_2
                                    ? item.warranty_day_2 + " วัน"
                                    : "-"
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          class="tab-pane fade"
                          id="nav-cancel"
                          role="tabpanel"
                          aria-labelledby="nav-cancel-tab"
                        >
                          <div class="postbox__details-content-wrapper mt-40">
                            <div class="row">
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ประเภทการยกเลิก : </span>
                                <span class="fw-bold text-primary">{{
                                  item.cancel_type != null
                                    ? item.cancel_type == 1
                                      ? "โอน"
                                      : "จำหน่าย"
                                    : "-"
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">วันที่ยกเลิก : </span>
                                <span class="fw-bold text-primary"
                                  >{{
                                    item.cancel_type != null
                                      ? dayjs(item.cancel_date)
                                          .locale("th")
                                          .format("DD MMM BBB")
                                      : "-"
                                  }}
                                </span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-12">
                                <span class="fw-bold"
                                  >หมายเหตุการยกเลิก :
                                </span>
                                <span class="fw-bold text-primary">{{
                                  item.cancel_type != null
                                    ? item.cancel_comment
                                    : "-"
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold">ผู้รับโอน : </span>
                                <span class="fw-bold text-primary">{{
                                  item.cancel_type != null
                                    ? item.transfer_to
                                    : "-"
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                              <div class="col-12 col-lg-6">
                                <span class="fw-bold"
                                  >หน่วยงานผู้รับโอน :
                                </span>
                                <span class="fw-bold text-primary">{{
                                  item.cancel_type != null
                                    ? item.transfer_to_department
                                    : "-"
                                }}</span>
                                <hr class="hr-separator" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from "swiper";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import booking_data from "~~/mixins/bookingData";

import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const modules = [Autoplay, FreeMode, Navigation, Pagination, Scrollbar, Thumbs];

const gallery = ref([]);
const thumbsSwiper = ref(null);

const item = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

// Fetch
const fetchGallery = async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/asset-photo`, {
    params: {
      is_publish: 1,
      asset_id: route.params.id,
    },
  }).catch((error) => error.data);

  gallery.value = data.data;
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
};

onMounted(() => {
  fetchGallery();
  fetchItem();
});

// Event
const onConfirmDelete = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Cancle it!",
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete(id);
    }
  });
};

const onDelete = async (id) => {
  await $fetch(`${runtimeConfig.public.apiBase}/asset/${id}`, {
    method: "delete",
  })
    .then((res) => {
      if (res.msg == "success") {
        useToast("ลบรายการเสร็จสิ้น", "success");
        router.push({ path: "/asset" });
      } else {
        throw new Error("ERROR");
      }
    })
    .catch((error) => error.data);
};

useHead({
  title: "ข้อมูลครุภัณฑ์",
});
</script>

<style scoped>
.breadcrumb__title {
  font-size: 50px;
}
</style>
