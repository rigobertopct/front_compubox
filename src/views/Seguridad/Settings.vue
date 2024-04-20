<template>
  <div class="container-fluid mt-4">
    <div class="row mb-5">
      <div class="col-lg-3">
        <side-nav />
      </div>
      <div class="col-lg-9 mt-lg-0 mt-4">
        <side-nav-item />
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/seguridad/SideNav.vue";
import SideNavItem from "@/components/seguridad/SideNavItem.vue";

export default {
  name: "Perfil",
  components: {
    SideNav,
    SideNavItem
  }
};
</script>
