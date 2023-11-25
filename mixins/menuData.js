export default {
  data() {
    return {
      menuData: [
        {
          id: 1,
          hasDropdown: false,
          title: 'Asset',
          link: "/asset",
        },
        {
          id: 2,
          title: "Report",
          hasDropdown: false,
          link: "/news",
        },
        // {
        //   id: 3,
        //   title: "News & Annoucements",
        //   hasDropdown: false,
        //   link: "/news",
        // },
        {
          id: 4,
          title: "Manage",
          hasDropdown: true,
          link: "#",
          submenus: [
            { title: "Asset Type", link: "/asset-type" },
            { title: "Budget", link: "/budget-type" },
            { title: "Department", link: "/department" },
          ],
        },
        // {
        //   id: 5,
        //   hasDropdown: false,
        //   title: "Contact Us",
        //   link: "/contact-us",
        // },
      ],
    };
  },
};
