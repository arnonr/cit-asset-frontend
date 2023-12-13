<template>
  <section class="portfolio__area pt-40">
    <div class="container">
      <div class="row">
        <div class="col-xl-12 text-center">
          <ClientOnly>
            <h4 class="mb-4">จำนวนครุภัณฑ์แบ่งตามหน่วยงาน</h4>
            <Bar :data="data_department" :options="bar_options" v-if="loaded" />
          </ClientOnly>
        </div>

        <div class="row mt-40 mb-40">
          <hr />
        </div>

        <div class="col-xl-4 ps-4 text-center">
          <ClientOnly>
            <h4 class="mb-4">จำนวนครุภัณฑ์แบ่งตามประเภท</h4>
            <Pie :data="data_asset_type" :options="options" v-if="loaded" />
          </ClientOnly>
        </div>

        <div class="col-xl-4">
          <ClientOnly>
            <h4 class="mb-4 text-center">จำนวนครุภัณฑ์แบ่งตามแหล่งเงิน</h4>
            <Pie :data="data_budget_type" :options="options" v-if="loaded" />
          </ClientOnly>
        </div>

        <div class="col-xl-4">
          <ClientOnly>
            <h4 class="mb-4 text-center">จำนวนครุภัณฑ์แบ่งตามปีเข้าคลัง</h4>
            <Pie :data="data_input_year" :options="options" v-if="loaded" />
          </ClientOnly>
        </div>

        <div class="row mt-40">
          <hr />
        </div>

        <div class="col-xl-4 mb-40">
          <ClientOnly>
            <h4 class="mb-4 text-center">จำนวนครุภัณฑ์แบ่งตามสถานะ</h4>
            <Pie :data="data_asset_status" :options="options" v-if="loaded" />
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "vue-chartjs";

// Variable
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const runtimeConfig = useRuntimeConfig();

const data_department = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
});
const data_asset_type = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
});
const data_budget_type = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
});
const data_input_year = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
});
const data_asset_status = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: [],
    },
  ],
});

const bar_options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
};

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
};

const items = ref([]);
const perPage = ref(100000);
const currentPage = ref(1);
const totalPage = ref(1);
const totalItems = ref(0);
const search = ref({});
const loaded = ref(false);

// Fetch
const fetchItems = async () => {
  let params = {
    asset_status: 1,
    budget_type_id:
      search.value.budget_type_id != null
        ? search.value.budget_type_id
        : undefined,
    department_id:
      search.value.departmentid != null
        ? search.value.department_id
        : undefined,
    perPage: perPage.value,
    currentPage: currentPage.value,
    orderBy: "department_id",
    order: "asc",
  };

  if (useCookie("user").value.level == 3) {
    params["department_id"] = useCookie("user").value.department_id;
  }

  let data = await $fetch(`${runtimeConfig.public.apiBase}/asset`, {
    params: params,
  }).catch((error) => error.data);

  let department_report = [];
  let asset_type_report = [];
  let budget_type_report = [];
  let input_year_report = [];
  let asset_status_report = [];
  items.value = data.data.map((e) => {
    let find_department = department_report.find((x) => {
      return x.department_id == e.department_id;
    });

    if (find_department) {
      find_department.count = find_department.count + 1;
    } else {
      department_report.push({
        department_id: e.department_id,
        department_name: e.department.name,
        count: 1,
      });
    }

    let find_asset_type = asset_type_report.find((x) => {
      return x.asset_type_id == e.asset_type_id;
    });

    if (find_asset_type) {
      find_asset_type.count = find_asset_type.count + 1;
    } else {
      asset_type_report.push({
        asset_type_id: e.asset_type_id,
        asset_type_name: e.asset_type.name,
        count: 1,
      });
    }

    let find_budget_type = budget_type_report.find((x) => {
      return x.budget_type_id == e.budget_type_id;
    });

    if (find_budget_type) {
      find_budget_type.count = find_budget_type.count + 1;
    } else {
      budget_type_report.push({
        budget_type_id: e.budget_type_id,
        budget_type_name: e.budget_type.name,
        count: 1,
      });
    }

    let find_input_year = input_year_report.find((x) => {
      return x.input_year == e.input_year;
    });

    if (find_input_year) {
      find_input_year.count = find_input_year.count + 1;
    } else {
      input_year_report.push({
        input_year: e.input_year,
        input_year_name: e.input_year,
        count: 1,
      });
    }

    let find_asset_status = asset_status_report.find((x) => {
      return x.asset_status == e.asset_status;
    });

    if (find_asset_status) {
      find_asset_status.count = find_asset_status.count + 1;
    } else {
      asset_status_report.push({
        asset_status: e.asset_status,
        asset_status_name: e.asset_status == 1 ? "ใช้งาน" : "ยกเลิก",
        count: 1,
      });
    }

    return e;
  });

  items.value = data.data;
  totalPage.value = data.totalPage;
  totalItems.value = data.totalData;

  department_report.forEach((x) => {
    data_department.value.labels.push(x.department_name);
    data_department.value.datasets[0].data = [
      ...data_department.value.datasets[0].data,
      x.count,
    ];
    data_department.value.datasets[0].backgroundColor = [
      ...data_department.value.datasets[0].backgroundColor,
      "#" + Math.floor(Math.random() * 16777215).toString(16),
    ];
  });

  asset_type_report.forEach((x) => {
    data_asset_type.value.labels.push(x.asset_type_name);
    data_asset_type.value.datasets[0].data = [
      ...data_asset_type.value.datasets[0].data,
      x.count,
    ];
    data_asset_type.value.datasets[0].backgroundColor = [
      ...data_asset_type.value.datasets[0].backgroundColor,
      "#" + Math.floor(Math.random() * 16777215).toString(16),
    ];
  });

  budget_type_report.forEach((x) => {
    data_budget_type.value.labels.push(x.budget_type_name);
    data_budget_type.value.datasets[0].data = [
      ...data_budget_type.value.datasets[0].data,
      x.count,
    ];
    data_budget_type.value.datasets[0].backgroundColor = [
      ...data_budget_type.value.datasets[0].backgroundColor,
      "#" + Math.floor(Math.random() * 16777215).toString(16),
    ];
  });

  input_year_report.forEach((x) => {
    data_input_year.value.labels.push(x.input_year_name);
    data_input_year.value.datasets[0].data = [
      ...data_input_year.value.datasets[0].data,
      x.count,
    ];
    data_input_year.value.datasets[0].backgroundColor = [
      ...data_input_year.value.datasets[0].backgroundColor,
      "#" + Math.floor(Math.random() * 16777215).toString(16),
    ];
  });

  asset_status_report.forEach((x) => {
    data_asset_status.value.labels.push(x.asset_status_name);
    data_asset_status.value.datasets[0].data = [
      ...data_asset_status.value.datasets[0].data,
      x.count,
    ];
    data_asset_status.value.datasets[0].backgroundColor = [
      ...data_asset_status.value.datasets[0].backgroundColor,
      "#" + Math.floor(Math.random() * 16777215).toString(16),
    ];
  });

  loaded.value = true;
};

// Event
onMounted(async () => {
  fetchItems();
});

useHead({
  title: "CIT",
});

if (process.client) {
  if (localStorage.getItem("login")) {
    useToast("เข้าสู่ระบบเสร็จสิ้น", "success");
    localStorage.removeItem("login");
  }
}

definePageMeta({
  middleware: "auth",
});
</script>
