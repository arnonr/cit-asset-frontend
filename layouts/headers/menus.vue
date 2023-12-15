<template>
  <ul>
    <li
      v-for="(menu, i) in menuData"
      :key="i"
      :class="`${menu.hasDropdown ? 'has-dropdown' : ''}${
        menu.megaMenu ? 'has-dropdown has-mega-menu' : ''
      }`"
    >
      <NuxtLink
        :to="menu.link"
        v-if="
          is_user_type == 'admin' ||
          (is_user_type == 'staff' &&
            menu.title != 'Manage' &&
            menu.title != 'Request')
        "
      >
        {{ $t(menu.title) }}
      </NuxtLink>
      <ul v-if="menu.hasDropdown" class="submenu">
        <li v-for="(sub, i) in menu.submenus" :key="i" class="submenu-item">
          <NuxtLink :to="sub.link">
            {{ $t(sub.title) }}
            <span class="badge bg-info" v-if="sub.noti">{{
              useNotification().value[sub.noti]
            }}</span>
            <hr style="width: 100%; color: #ddd; padding: 0px; margin: 0" />
          </NuxtLink>
        </li>
      </ul>
      <ul v-if="menu.mega_menus" class="mega-menu">
        <li v-for="(mega, i) in menu.mega_menus" :key="i">
          <NuxtLink :to="mega.link" class="mega-menu-title">
            {{ mega.title }}
          </NuxtLink>
          <ul>
            <li v-for="(sub_mega, i) in mega.submenus" :key="i">
              <NuxtLink :to="sub_mega.link">
                {{ sub_mega.title }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import menuData from "~~/mixins/menuData";

export default {
  mixins: [menuData],
  setup() {
    const is_user_type = ref("guest");

    const runtimeConfig = useRuntimeConfig();

    if (useCookie("user").value != undefined) {
      if (useCookie("user").value.level == 1) {
        is_user_type.value = "admin";
      } else if (useCookie("user").value.level == 2) {
        is_user_type.value = "staff";
      } else if (useCookie("user").value.level == 3) {
        is_user_type.value = "dep";
      } else {
        is_user_type.value = "guest";
      }
    } else {
      is_user_type.value = "guest";
    }

    // Fetch
    const fetchNoti = async () => {
      let params = {
        orderBy: "created_at",
        order: "desc",
      };

      let data1 = await $fetch(
        `${runtimeConfig.public.apiBase}/asset-location-history`,
        {
          params: params,
        }
      ).catch((error) => error.data);

      let item1 = data1.data.filter((e) => {
        return e.status == 0;
      });

      let data2 = await $fetch(
        `${runtimeConfig.public.apiBase}/holder-history`,
        {
          params: params,
        }
      ).catch((error) => error.data);

      let item2 = data2.data.filter((e) => {
        return e.status == 0;
      });

      let data3 = await $fetch(
        `${runtimeConfig.public.apiBase}/repair-history`,
        {
          params: params,
        }
      ).catch((error) => error.data);

      let item3 = data3.data.filter((e) => {
        return e.status == 0;
      });

      useNotification().value = {
        location: item1.length,
        holder: item2.length,
        fix: item3.length,
      };
    };

    onMounted(() => {
      fetchNoti();
    });

    return {
      is_user_type,
    };
  },
};
</script>

<!-- <script setup> -->

<!-- </script> -->

<style scoped>
.main-menu-4 ul li a {
  color: var(--tp-common-white);
  margin-right: 2em;
}
.main-menu-4 ul li:hover > a {
  color: var(--tp-common-white);
}

.main-menu-4 ul li:hover > a::after {
  color: var(--tp-common-white);
}

.main-menu ul li .submenu li a::before {
  display: none;
}

.main-menu ul li .submenu li:hover > a {
  padding-left: 25px;
}

.main-menu-4 ul li.has-dropdown a::after {
  color: var(--tp-common-black);
}

.main-menu-4 ul li.has-dropdown:hover a::after {
  color: var(--tp-common-white);
}

/* .submenu-item {
    border-bottom: solid 1px #efefef;
    
} */
/* .main-menu ul li:hover > .submenu {
   line-height: 2.5em;
} */

.main-menu ul li .submenu {
  min-width: 250px;
  line-height: 2.5em;
}
</style>
