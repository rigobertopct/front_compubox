<template>
  <a
    :data-bs-toggle="collapse ? 'collapse' : ''"
    :aria-controls="collapseRef"
    :aria-expanded="isExpanded"
    class="nav-link"
    v-bind="$attrs"
    @click="show()"
  >
    <div
      class="text-center d-flex align-items-center justify-content-center me-2"
    >
      <slot name="icon"></slot>
    </div>
    <span class="nav-link-text ms-1">{{ navText }}</span>
  </a>
  <transition name="fade">
    <div :ref="collapseRef" class="collapse">
      <slot name="list"></slot>
    </div>
  </transition>
</template>
<script>
import collapse from "bootstrap/js/src/collapse";

export default {
  name: "SidenavCollapse",
  props: {
    collapseRef: {
      type: String,
      required: true
    },
    navText: {
      type: String,
      required: true
    },
    collapse: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isExpanded: false
    };
  },
  methods: {
    show() {
      this.isExpanded = !this.isExpanded;
      const menu = this.$refs[this.collapseRef];
      if (this.isExpanded) {
        menu.classList.add("show");
      } else {
        menu.classList.remove("show");
      }
    }
  }
};
</script>

