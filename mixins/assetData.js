export default {
    data() {
      return {
        asset_statuses: [
          {
            id: 1,
            value: 1,
            name: "ใช้งาน",
            color: "success",
          },
          {
            id: 2,
            value: 2,
            name: "ยกเลิก",
            color: "danger",
          },
        ],
        publishes: [
          {
            id: 0,
            value: 0,
            name_th: "none",
            name_en: "none",
            color: "warning",
          },
          {
            id: 1,
            value: 1,
            name_th: "publish",
            name_en: "publish",
            color: "success",
          },
        ],
        actives: [
          {
            id: 0,
            value: 0,
            name: "none",
            color: "warning",
          },
          {
            id: 1,
            value: 1,
            name: "active",
            color: "success",
          },
        ],
        user_statuses: [
          {
            id: 0,
            value: 0,
            name_th: "Block",
            name_en: "Block",
            color: "danger",
          },
          {
            id: 1,
            value: 1,
            name_th: "รอยืนยันอีเมล",
            name_en: "รอยืนยันอีเมล",
            color: "warning",
          },
          {
            id: 2,
            value: 2,
            name_th: "ยืนยันอีเมลเรียบร้อย",
            name_en: "ยืนยันอีเมลเรียบร้อย",
            color: "success",
          },
        ],
      };
    },
  };
  