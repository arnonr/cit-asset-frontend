<template>
  <nav class="mean-nav">
    <ul>
      <template v-for="(menu, i) in menuData" :key="i">
        <li
          v-if="!menu.hasDropdown && !menu.megaMenu && !menu.pages"
          class="has-dropdown"
        >
          <nuxt-link
            :href="menu.link"
            @click="$emit('close:Offcanvas', false)"
            >{{ $t(menu.title) }}</nuxt-link
          >
        </li>

        <li
          v-if="menu.hasDropdown && !menu.megaMenu && !menu.pages"
          class="has-dropdown"
        >
          <nuxt-link
            :href="menu.link"
            v-if="
              is_user_type == 'admin' ||
              (is_user_type == 'staff' &&
                menu.title != 'Manage' &&
                menu.title != 'Request')
            "
            >{{ $t(menu.title) }}</nuxt-link
          >
          <ul
            class="submenu"
            :style="{ display: navTitle === menu.title ? 'block' : 'none' }"
          >
            <li v-for="(sub, i) in menu.submenus" :key="i">
              <nuxt-link
                :href="sub.link"
                @click="$emit('close:Offcanvas', false)"
                >{{ $t(sub.title) }}</nuxt-link
              >
            </li>
          </ul>
          <a
            :class="`mean-expand ${
              navTitle === menu.title ? 'mean-clicked' : ''
            }`"
            @click.prevent="openMobileMenu(menu.title)"
            style="font-size: 18px; cursor: pointer"
          >
            <i class="fal fa-plus"></i>
          </a>
        </li>

        <li
          v-if="menu.megaMenu && !menu.pages"
          class="has-dropdown has-mega-menu"
        >
          <nuxt-link :href="menu.link">{{ $t(menu.title) }}</nuxt-link>
          <ul
            class="mega-menu"
            :style="{ display: navTitle === menu.title ? 'block' : 'none' }"
          >
            <li v-for="(mega_m, i) in menu.mega_menus" :key="i">
              <nuxt-link class="mega-menu-title" :href="mega_m.link">
                {{ mega_m.title }}
              </nuxt-link>
              <ul
                :style="{
                  display: subMenu === mega_m.title ? 'block' : 'none',
                }"
              >
                <li v-for="(sub_m, i) in mega_m.submenus" :key="i">
                  <nuxt-link :href="sub_m.link">
                    {{ $t(sub_m.title) }}
                  </nuxt-link>
                </li>
              </ul>
              <a
                :class="`mean-expand ${
                  subMenu === mega_m.title ? 'mean-clicked' : ''
                }`"
                @click.prevent="openSubMobileMenu(mega_m.title)"
                style="font-size: 18px; cursor: pointer"
              >
                <i class="fal fa-plus"></i>
              </a>
            </li>
          </ul>
          <a
            :class="`mean-expand ${
              navTitle === menu.title ? 'mean-clicked' : ''
            }`"
            @click.prevent="openMobileMenu(menu.title)"
            style="font-size: 18px; cursor: pointer"
          >
            <i class="fal fa-plus"></i>
          </a>
        </li>

        <li v-if="menu.pages" class="has-dropdown has-mega-menu">
          <nuxt-link :href="menu.link">{{ menu.title }}</nuxt-link>
          <ul
            class="mega-menu"
            :style="{ display: navTitle === menu.title ? 'block' : 'none' }"
          >
            <li v-for="(mega_m, i) in menu.mega_menus" :key="i">
              <nuxt-link :href="mega_m.link" class="mega-menu-title">
                {{ mega_m.title }}
              </nuxt-link>
              <ul
                :style="{
                  display: subMenu === mega_m.title ? 'block' : 'none',
                }"
              >
                <li v-for="(sub_m, i) in mega_m.submenus" :key="i">
                  <nuxt-link :href="sub_m.link">{{ sub_m.title }}</nuxt-link>
                </li>
              </ul>
              <a
                :class="`mean-expand ${
                  subMenu === mega_m.title ? 'mean-clicked' : ''
                }`"
                @click.prevent="openSubMobileMenu(mega_m.title)"
                style="font-size: 18px; cursor: pointer"
              >
                <i class="fal fa-plus"></i>
              </a>
            </li>
          </ul>
          <a
            :class="`mean-expand ${
              navTitle === menu.title ? 'mean-clicked' : ''
            }`"
            @click.prevent="openMobileMenu(menu.title)"
            style="font-size: 18px; cursor: pointer"
          >
            <i class="fal fa-plus"></i>
          </a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import { ref } from "vue";
import menuData from "~~/mixins/menuData";

export default {
  name: "MobileMenus",
  mixins: [menuData],
  emits: ["close:Offcanvas"],
  setup() {
    const navTitle = ref("");
    const subMenu = ref("");

    const openMobileMenu = (menu) => {
      navTitle.value = navTitle.value === menu ? "" : menu;
    };

    const openSubMobileMenu = (s_menu) => {
      subMenu.value = subMenu.value === s_menu ? "" : s_menu;
    };

    const is_user_type = ref("guest");
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

    return {
      is_user_type,
      navTitle,
      subMenu,
      openMobileMenu,
      openSubMobileMenu,
    };
  },
};
</script>
