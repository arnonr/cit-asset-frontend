<template>
  <div class="postbox__details-content-wrapper mt-40">
    <div class="row">
      <div class="col-12 col-lg-6">
        <span class="fw-bold">การรับประกันรายการที่ 1 : </span>
        <span class="fw-bold text-primary">{{
          item.warranty_type_1 != null ? item.warranty_type_1 : "-"
        }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">จำนวนวันรับประกันรายการที่ 1 : </span>
        <span class="fw-bold text-primary"
          >{{ item.warranty_type_1 ? item.warranty_day_1 + " วัน" : "-" }}
        </span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">การรับประกันรายการที่ 2 : </span>
        <span class="fw-bold text-primary">{{
          item.warranty_type_2 != null ? item.warranty_type_2 : "-"
        }}</span>
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-6">
        <span class="fw-bold">จำนวนวันรับประกันรายการที่ 2 : </span>
        <span class="fw-bold text-primary">{{
          item.warranty_type_2 ? item.warranty_day_2 + " วัน" : "-"
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
