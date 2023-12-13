<template>
  <div class="postbox__details-content-wrapper mt-40" v-if="item">
    <div class="row">
      <div class="col-12 col-lg-4">
        <span class="fw-bold">การรับประกันรายการที่ 1 : </span>
        <span class="fw-bold text-primary">{{
          item.warranty_type_1 != null ? item.warranty_type_1 : "-"
        }}</span>
      </div>
      <div class="col-12 col-lg-4">
        <span class="fw-bold">จำนวนวันรับประกัน : </span>
        <span class="fw-bold text-primary"
          >{{ item.warranty_type_1 ? item.warranty_day_1 + " วัน" : "-" }}
        </span>
      </div>
      <div class="col-12 col-lg-4">
        <span class="fw-bold">วันรับประกันคงเหลือ : </span>

        <span class="fw-bold text-primary">
          {{
            item.warranty_type_1
              ? item.warranty_day_1 -
                  dayjs().diff(dayjs(item.approved_date), "day") <
                0
                ? "หมดการรับประกัน"
                : item.warranty_day_1 -
                  dayjs().diff(dayjs(item.approved_date), "day") +
                  " วัน"
              : "-"
          }}
        </span>
      </div>
      <!-- 2 -->
      <div class="col-12 col-lg-12">
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-4">
        <span class="fw-bold">การรับประกันรายการที่ 2 : </span>
        <span class="fw-bold text-primary">{{
          item.warranty_type_2 != null ? item.warranty_type_2 : "-"
        }}</span>
      </div>
      <div class="col-12 col-lg-4">
        <span class="fw-bold">จำนวนวันรับประกัน : </span>
        <span class="fw-bold text-primary">{{
          item.warranty_type_2 ? item.warranty_day_2 + " วัน" : "-"
        }}</span>
      </div>
      <div class="col-12 col-lg-4">
        <span class="fw-bold">วันรับประกันคงเหลือ : </span>
        <span class="fw-bold text-primary">
          {{
            item.warranty_type_2
              ? item.warranty_day_2 -
                  dayjs().diff(dayjs(item.approved_date), "day") <
                0
                ? "หมดการรับประกัน"
                : item.warranty_day_2 -
                  dayjs().diff(dayjs(item.approved_date), "day") +
                  " วัน"
              : "-"
          }}
        </span>
      </div>
      <!-- 3 -->
      <div class="col-12 col-lg-12">
        <hr class="hr-separator" />
      </div>
      <div class="col-12 col-lg-4">
        <span class="fw-bold">การรับประกันรายการที่ 3 : </span>
        <span class="fw-bold text-primary">{{
          item.warranty_type_3 != null ? item.warranty_type_2 : "-"
        }}</span>
      </div>
      <div class="col-12 col-lg-4">
        <span class="fw-bold">จำนวนวันรับประกัน : </span>
        <span class="fw-bold text-primary">{{
          item.warranty_type_3 ? item.warranty_day_3 + " วัน" : "-"
        }}</span>
      </div>
      <div class="col-12 col-lg-4">
        <span class="fw-bold">วันรับประกันคงเหลือ : </span>
        <span class="fw-bold text-primary">
          {{
            item.warranty_type_3
              ? item.warranty_day_3 -
                  dayjs().diff(dayjs(item.approved_date), "day") <
                0
                ? "หมดการรับประกัน"
                : item.warranty_day_3 -
                  dayjs().diff(dayjs(item.approved_date), "day") +
                  " วัน"
              : "-"
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
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
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
</script>
