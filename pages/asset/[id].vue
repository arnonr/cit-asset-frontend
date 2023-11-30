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
                          v-if="
                            useCookie('user').value != undefined &&
                            useCookie('user').value.level == 1
                          "
                          :to="{
                            name: 'asset-edit-id',
                            params: { id: item.id },
                          }"
                          class="btn btn-warning"
                          >Edit</NuxtLink
                        >

                        <button
                          v-if="
                            useCookie('user').value != undefined &&
                            useCookie('user').value.level == 1
                          "
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
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            id="nav-location-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-location"
                            type="button"
                            role="tab"
                            aria-controls="nav-location"
                            aria-selected="false"
                            >ประวัติสถานที่ติดตั้ง</a
                          >
                        </li>

                        <li class="nav-item">
                          <a
                            class="nav-link"
                            id="nav-holder-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-holder"
                            type="button"
                            role="tab"
                            aria-controls="nav-holder"
                            aria-selected="false"
                            >ประวัติผู้ถือ</a
                          >
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            id="nav-fix-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-fix"
                            type="button"
                            role="tab"
                            aria-controls="nav-fix"
                            aria-selected="false"
                            >ประวัติการซ่อม</a
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
                          <AssetData
                            v-if="item"
                            :item="item"
                            :gallery="gallery"
                          ></AssetData>
                        </div>

                        <div
                          class="tab-pane fade"
                          id="nav-warranty"
                          role="tabpanel"
                          aria-labelledby="nav-warranty-tab"
                        >
                          <AssetWarranty
                            :item="item"
                            v-if="item"
                          ></AssetWarranty>
                        </div>

                        <div
                          class="tab-pane fade"
                          id="nav-cancel"
                          role="tabpanel"
                          aria-labelledby="nav-cancel-tab"
                        >
                          <AssetCancel :item="item" v-if="item"></AssetCancel>
                        </div>

                        <div
                          class="tab-pane fade"
                          id="nav-location"
                          role="tabpanel"
                          aria-labelledby="nav-location-tab"
                        >
                          <AssetLocation
                            :item="item"
                            v-if="item"
                          ></AssetLocation>
                        </div>

                        <div
                          class="tab-pane fade"
                          id="nav-holder"
                          role="tabpanel"
                          aria-labelledby="nav-holder-tab"
                        >
                          <AssetHolder :item="item" v-if="item"></AssetHolder>
                        </div>

                        <div
                          class="tab-pane fade"
                          id="nav-fix"
                          role="tabpanel"
                          aria-labelledby="nav-fix-tab"
                        >
                          <AssetFix :item="item" v-if="item"></AssetFix>
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
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import booking_data from "~~/mixins/bookingData";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

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
  if (item.value.cover_photo != null) {
    gallery.value.unshift({
      id: 1,
      asset_photo_file: item.value.cover_photo,
    });
  }
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
    confirmButtonText: "Yes, Cancel it!",
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete(id);
    }
  });
};

const onDelete = async (id) => {
  await $fetch(`${runtimeConfig.public.apiBase}/asset/${id}`, {
    headers: {
      Authorization: useCookie("token").value
        ? `Bearer ${useCookie("token").value}`
        : "",
    },
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
