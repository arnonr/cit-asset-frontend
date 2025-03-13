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
      level_statuses: [
        {
          id: 1,
          value: 1,
          name: "แอดมิน",
          color: "warning",
        },
        {
          id: 2,
          value: 2,
          name: "เจ้าหน้าที่พัสดุ",
          color: "success",
        },
        {
          id: 3,
          value: 3,
          name: "เลขาภาควิชา",
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
      location_statuses: [
        {
          id: 0,
          value: 0,
          name: "รอการตรวจสอบ",
          color: "warning",
        },
        {
          id: 1,
          value: 1,
          name: "ตรวจสอบเรียบร้อยแล้ว",
          color: "success",
        },
        {
          id: 2,
          value: 2,
          name: "ไม่สามารถดำเนินการได้",
          color: "danger",
        },
      ],
      holder_statuses: [
        {
          id: 0,
          value: 0,
          name: "รอการตรวจสอบ",
          color: "warning",
        },
        {
          id: 1,
          value: 1,
          name: "ตรวจสอบเรียบร้อยแล้ว",
          color: "success",
        },
        {
          id: 2,
          value: 2,
          name: "ไม่สามารถดำเนินการได้",
          color: "danger",
        },
      ],
      fix_statuses: [
        {
          id: 0,
          value: 0,
          name: "รอการตรวจสอบ",
          color: "warning",
        },
        {
          id: 1,
          value: 1,
          name: "ตรวจสอบเรียบร้อยแล้ว",
          color: "success",
        },
        {
          id: 2,
          value: 2,
          name: "ไม่สามารถดำเนินการได้",
          color: "danger",
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
      expire_days: [
        {
          id: 30,
          value: 30,
          name: "น้อยกว่า 1 เดือน",
        },
        {
          id: 90,
          value: 90,
          name: "น้อยกว่า 3 เดือน",
        },
        {
          id: 180,
          value: 180,
          name: "น้อยกว่า 6 เดือน",
        },
        {
          id: 360,
          value: 360,
          name: "น้อยกว่า 1 ปี",
        },
        {
          id: 720,
          value: 720,
          name: "น้อยกว่า 2 ปี",
        },
        {
          id: 1080,
          value: 1080,
          name: "น้อยกว่า 3 ปี",
        },
        {
          id: 1440,
          value: 1440,
          name: "น้อยกว่า 4 ปี",
        },
        {
          id: 1800,
          value: 1800,
          name: "น้อยกว่า 5 ปี",
        },
      ],
      input_years: () => {
        let year = new Date().getFullYear();

        let year_data = [];

        for (let i = 0; i < 11; i++) {
          year_data.push({
            id: Number(year)-i,
            value: Number(year)-i,
            name: (Number(year)-i) + 543,
          });
        }
        year_data.push({
          id: "all",
          value: "all",
          name: "ทั้งหมด",
        });

        return year_data;
      },
    };
  },
};
