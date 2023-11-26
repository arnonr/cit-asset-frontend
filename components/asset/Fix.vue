<template>
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
              ? dayjs(item.cancel_date).locale("th").format("DD MMM BBB")
              : "-"
          }}
        </span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-12">
        <span class="fw-bold">หมายเหตุการยกเลิก : </span>
        <span class="fw-bold text-primary">{{
          item.cancel_type != null ? item.cancel_comment : "-"
        }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">ผู้รับโอน : </span>
        <span class="fw-bold text-primary">{{
          item.cancel_type != null ? item.transfer_to : "-"
        }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">หน่วยงานผู้รับโอน : </span>
        <span class="fw-bold text-primary">{{
          item.cancel_type != null ? item.transfer_to_department : "-"
        }}</span>
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
    masonry: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
