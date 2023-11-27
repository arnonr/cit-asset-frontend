export default {
  data() {
    return {
      menuData: [
        {
          id: 1,
          title: "Home",
          hasDropdown: false,
          link: "/",
        },
        {
          id: 2,
          hasDropdown: false,
          title: "Asset",
          link: "/asset",
        },
        {
          id: 3,
          title: "Request",
          hasDropdown: true,
          link: "#",
          submenus: [
            { title: "Location", link: "/location" },
            { title: "Holder", link: "/holder" },
            { title: "Fix", link: "/fix" },
          ],
        },
        {
          id: 4,
          title: "Manage",
          hasDropdown: true,
          link: "#",
          submenus: [
            { title: "Asset Type", link: "/asset-type" },
            { title: "Budget", link: "/budget-type" },
            { title: "Department", link: "/department" },
            { title: "User", link: "/user" },
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
