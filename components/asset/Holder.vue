<template>
    <div class="postbox__details-content-wrapper mt-40">
      <div class="row">
        <div class="col-12 col-lg-12">
          <div class="mb-30">
            <button
              type="button"
              class="btn btn-warning"
              @click="
                () => {
                  holder_item = {};
                  type_submit = 'add';
                  modalForm.show();
                }
              "
            >
              <i class="fa-regular fa-plus"></i>
              คำขอเปลี่ยนผู้ใช้งาน
            </button>
          </div>
  
          <div class="row gx-2 grid">
            <div class="col-12">
              <div class="table-responsive">
                <table class="table table-bordered table-striped table-admin">
                  <thead>
                    <tr>
                      <th class="text-center">ผู้ใช้งาน</th>
                      <th class="text-center">สถานะ</th>
                      <th class="text-center">วันที่ขอเปลี่ยน</th>
                      <th class="text-center">วันที่อนุมัติ</th>
                      <th class="text-center">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody v-if="items.length != 0">
                    <tr v-for="(it, idx) in items" :key="idx">
                      <td>{{ it.holder_name }}</td>
                      <td class="text-center">
                        <span
                          v-if="it.status != null"
                          :class="
                            'badge rounded-pill bg-' +
                            selectOptions.holder_statuses[it.status].color
                          "
                          >{{
                            selectOptions.holder_statuses[it.status].name
                          }}</span
                        >
                      </td>
                      <td class="text-center">
                        {{
                          it.created_at != null
                            ? dayjs(it.created_at)
                                .locale("th")
                                .format("DD MMM BBBB")
                            : "-"
                        }}
                      </td>
                      <td class="text-center">
                        {{
                          it.approved_at != null
                            ? dayjs(it.approved_at)
                                .locale("th")
                                .format("DD MMM BBBB")
                            : "-"
                        }}
                      </td>
  
                      <td class="text-center">
                        <button class="btn btn-info">
                          <i
                            class="fa fa-edit"
                            @click="
                              () => {
                                holder_item = { ...it };
                                holder_item.status =
                                  selectOptions.holder_statuses.find((x) => {
                                    return x.id == it.status;
                                  });
                                type_submit = 'edit';
                                modalForm.show();
                              }
                            "
                          ></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Modal -->
    <div
      class="modal fade"
      id="modal-form-1"
      tabindex="-1"
      aria-labelledby="modal-form-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modal-form-label">
              แบบฟอร์มคำเปลี่ยนผู้ใช้งาน
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
                <div class="col-12">
                  <label for="holder-name" class="col-form-label"
                    ><span class="text-danger">*</span>ผู้ใช้งาน :</label
                  >
                  <input
                    type="text"
                    class="form-control form-control-plaintext"
                    id="txt-holder-name"
                    v-model="holder_item.holder_name"
                    placeholder="ผู้ใช้งาน"
                  />
                </div>
                <div class="col-12 mt-4">
                  <label for="recipient-name" class="col-form-label"
                    ><span class="text-danger">*</span>สถานะ :</label
                  >
                  <v-select
                    v-if="useCookie('user').value.level == 1"
                    label="name"
                    placeholder="สถานะการอนุมัติ"
                    :options="selectOptions.holder_statuses"
                    id="slt-status"
                    v-model="holder_item.status"
                    class="form-control v-select-no-border"
                    :clearable="true"
                  ></v-select>
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
  </template>
  
  <script>
  import asset_data from "~~/mixins/assetData";
  import dayjs from "dayjs";
  import vSelect from "vue-select";
  import "dayjs/locale/th";
  import buddhistEra from "dayjs/plugin/buddhistEra";
  dayjs.extend(buddhistEra);
  
  const route = useRoute();
  
  export default {
    props: {
      item: {},
      masonry: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  <script setup>
  import asset_data from "~~/mixins/assetData";
  
  // Variable
  const runtimeConfig = useRuntimeConfig();
  const type_submit = ref("add");
  const items = ref([]);
  const holder_item = ref({});
  const totalPage = ref(1);
  const totalItems = ref(0);
  const update_holder = ref(false);
  let modalForm;
  const selectOptions = ref({
    perPage: [
      { title: "20", value: 20 },
      { title: "40", value: 40 },
      { title: "60", value: 60 },
    ],
    holder_statuses: asset_data.data().holder_statuses,
  });
  
  // Function Fetch
  const fetchItems = async () => {
    let params = {
      asset_id: route.params.id,
      orderBy: "created_at",
      order: "desc",
    };
  
    let data = await $fetch(
      `${runtimeConfig.public.apiBase}/holder-history`,
      {
        params: params,
      }
    ).catch((error) => error.data);
  
    items.value = data.data.map((e) => {
      return e;
    });
  
    totalPage.value = data.totalPage;
    totalItems.value = data.totalData;
  };
  
  // Event
  const onSubmit = async () => {
    if (
      holder_item.value.holder_name == null ||
      holder_item.value.holder_name == ""
    ) {
      useToast("โปรดระบุข้อมูลให้ครบถ้วน", "error");
      return;
    }
  
    let type_object = {
      text_success: "เพิ่มคำขอเสร็จสิ้น",
      method: "post",
      url: runtimeConfig.public.apiBase + "/holder-history",
    };
  
    let approved_date = undefined;
    let approved_by = undefined;
    let created_by = undefined;
    if (type_submit.value == "edit") {
      type_object = {
        text_success: "แก้ไขรายการเสร็จสิ้น",
        method: "put",
        url: type_object.url + "/" + holder_item.value.id,
      };
  
      let find_item = items.value.find((x) => {
        return x.id == holder_item.value.id;
      });
  
      if (holder_item.value.status.id != find_item.status) {
        if (holder_item.value.status != 0) {
          approved_date = dayjs().format("YYYY-MM-DD");
          approved_by = useCookie("user").value.firstname;
          update_holder.value = true;
        } else {
          approved_date = null;
        }
      }
    } else {
      created_by = useCookie("user").value.firstname;
  
      if (holder_item.value.status != null) {
        if (holder_item.value.status.id != 0) {
          approved_date = dayjs().format("YYYY-MM-DD");
          approved_by = useCookie("user").value.firstname;
          update_holder.value = true;
        }
      }
    }
  
    await $fetch(type_object.url, {
      method: type_object.method,
      body: {
        ...holder_item.value,
        created_by: created_by,
        asset_id: Number(route.params.id),
        status:
          holder_item.value.status != null ? holder_item.value.status.id : "",
        approved_at: approved_date,
        approved_by: approved_by,
      },
    })
      .then(async (res) => {
        if (res.msg == "success") {
          useToast(type_object.text_success, "success");
  
          if (update_holder.value == true) {
            await $fetch(
              runtimeConfig.public.apiBase + "/asset/" + route.params.id,
              {
                method: 'post',
                body: {
                  holder_name: holder_item.value.holder_name,
                },
              }
            );
          }
          modalForm.hide();
          fetchItems();
  
          holder_item.value = {};
          update_holder.value = false;
        } else {
          throw new Error("ERROR");
        }
      })
      .catch((error) => error.data);
  };
  
  onMounted(() => {
    fetchItems();
    modalForm = new bootstrap.Modal(document.getElementById("modal-form-1"));
  });
  </script>
  