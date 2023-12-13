<template>
  <div class="postbox__details-content-wrapper mt-40">
    <div class="row" v-if="item">
      <div class="col-12 text-center">
        <!-- <img :src="item.cover_photo" alt="" style="max-width: 80%" /> -->
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
              v-if="gallery.length != 0 && item.cover_photo"
            >
              <SwiperSlide v-for="ng in gallery" :key="ng.id">
                <img
                  :src="ng.asset_photo_file"
                  style="
                    max-width: 100%;
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
              v-if="gallery.length != 0 && item.cover_photo"
            >
              <SwiperSlide v-for="ng in gallery" :key="ng.id">
                <img
                  :src="ng.asset_photo_file"
                  style="max-width: 200px; cursor: pointer"
                />
              </SwiperSlide>
            </Swiper>

            <img
              v-if="!item.cover_photo"
              src="~/assets/img/icon/no-photo-available.png"
              class="img-thumbnail mx-auto"
              style="max-width: 500px"
            />
          </ClientOnly>
        </div>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">หมายเลขครุภัณฑ์ : </span>
        <span class="fw-bold text-primary">{{ item.asset_code }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">ชื่อครุภัณฑ์ : </span>
        <span class="fw-bold text-primary">{{ item.asset_name }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">ปีที่รับเข้าคลัง (พ.ศ.) : </span>
        <span class="fw-bold text-primary">{{ item.input_year + 543 }}</span>
        <hr class="hr-separator" />
      </div>

      <div class="col-12 col-lg-6" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">วันที่ตรวจรับ : </span>
        <span class="fw-bold text-primary">{{
          dayjs(item.inspection_date).locale("th").format("DD MMM BBBB")
        }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">วันที่คณะกรรมการเห็นถูกต้องครบถ้วน : </span>
        <span class="fw-bold text-primary">{{
          dayjs(item.approved_date).locale("th").format("DD MMM BBBB")
        }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">ผู้จัดจำหน่าย : </span>
        <span class="fw-bold text-primary">{{ item.vendor }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">ประเภทครุภัณฑ์ : </span>
        <span class="fw-bold text-primary">{{ item.asset_type?.name }}</span>
        <hr class="hr-separator" />
      </div>

      <div class="col-12 col-lg-6" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">ยี่ห้อ : </span>
        <span class="fw-bold text-primary">{{ item.brand }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">รุ่น : </span>
        <span class="fw-bold text-primary">{{ item.model }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">หมายเลขประจำเครื่อง : </span>
        <span class="fw-bold text-primary">{{ item.serial_number }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-12">
        <span class="fw-bold">รายละเอียด : </span>
        <span class="fw-bold text-primary">{{ item.asset_detail }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">มูลค่าการได้มา : </span>
        <span class="fw-bold text-primary"
          >{{
            item.price != null
              ? Number(item.price)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : ""
          }}
          <!-- // toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") -->
          บาท</span
        >
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">แหล่งเงิน : </span>
        <span class="fw-bold text-primary">{{ item.budget_type?.name }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">สถานที่ติดตั้ง : </span>
        <span class="fw-bold text-primary">{{ item.install_location }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12">
        <span class="fw-bold">สถานที่ใช้งาน : </span>
        <span class="fw-bold text-primary">{{ item.location }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12">
        <span class="fw-bold">หน่วยงานที่รับผิดชอบ : </span>
        <span class="fw-bold text-primary">{{ item.department?.name }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">ผู้เบิก : </span>
        <span class="fw-bold text-primary">{{ item.drawer_name }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">ผู้ใช้งาน : </span>
        <span class="fw-bold text-primary">{{ item.holder_name }}</span>
        <hr class="hr-separator" />
      </div>

      <div class="col-12 col-lg-6" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">ได้รับโอนมา : </span>
        <span class="fw-bold text-primary">{{
          item.is_transfer == 1 ? "YES" : "NO"
        }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">ได้รับโอนจาก : </span>
        <span class="fw-bold text-primary">{{
          item.is_transfer == 1 ? item.transfer_from : "-"
        }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6" v-if="useCookie('user').value != undefined">
        <span class="fw-bold">หมายเหตุ : </span>
        <span class="fw-bold text-primary">{{ item.comment }}</span>
        <hr class="hr-separator" />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
export default {
  props: {
    item: {},
    gallery: {
      type: Array,
    },
    masonry: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

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

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const modules = [Autoplay, FreeMode, Navigation, Pagination, Scrollbar, Thumbs];
</script>
