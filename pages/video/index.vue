<template>
  <section class="portfolio__area pt-40 pb-40">
    <div class="container" v-if="items.length != 0">
      <div class="text-center pb-30 pt-320">
        <h3 class="text-color-primary">วิดีโอ</h3>
        <hr>
      </div>
      <div class="row gx-2 grid">
        <div
          v-for="(it, i) in items"
          :key="i"
          class="col-xxl-4 col-xl-4 col-lg-6 col-md-6"
        >
          <VideoGridItem :item="it" />
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
</template>

<script setup>
// Import
import VideoGridItem from "~/components/video/VideoGridItem.vue";
import BlogPagination from "~/components/common/pagination/BlogPagination.vue";
// Variable
const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const items = ref([]);
const perPage = ref(12);
const currentPage = ref(1);
const totalPage = ref(1);
const totalItems = ref(0);
const search = ref({
  is_publish: 1,
});

// Function Fetch
if (route.query.page) {
  currentPage.value = route.query.page;
}
const { data: res } = await useAsyncData("video", async () => {
  let data = await $fetch(`${runtimeConfig.public.apiBase}/video`, {
    params: {
      ...search.value,
      perPage: perPage.value,
      currentPage: currentPage.value,
    },
  });
  items.value = data.data;
  return data;
});

items.value = res.value.data;
totalPage.value = res.value.totalPage;
totalItems.value = res.value.totalData;

watch(
  [currentPage, search],
  () => {
    router.replace({
      name: "video",
      query: { page: currentPage.value },
    });
    refreshNuxtData("video");
  },
  { deep: true }
);

// Function Change

onMounted(() => {});

watchEffect(() => {
  if (currentPage.value > totalPage.value) currentPage.value = totalPage.value;
});

useHead({
  title: "วิดีโอ อุทยานเทคโนโลยี มจพ.",
});
</script>

<style scoped></style>
