<template>
  <!-- -------- START FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- -->
  <footer class="py-5 footer">
    <div class="container">
      <div class="row">
        <div class="mx-auto mt-1 text-center col-8">
          <p class="mb-0 text-secondary">
            © {{ new Date().getFullYear() }} {{ copyrigt }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AppFooter",
  data() {
    return {
      copyrigt: ""
    };
  },
  computed: {
    ...mapState(["idioma"])
  },
  created() {
    if (this.idioma === "es") {
      this.copyrigt = "Suite de Inteligencia Deportiva. Todos los Derechos Reservados. CIDC - PCT Matanzas - XETID ";
    }
    if (this.idioma === "ru") {
      this.copyrigt = "Спортивная разведывательная сюита. Все права защищены. CIDC - PCT Matanzas - XETID";
    }
    if (this.idioma === "in") {
      this.copyrigt = "Sports Intelligence Suite. Copyright. CIDC - PCT Matanzas - XETID ";
    }
    if (this.idioma === "fr") {
      this.copyrigt = "Suite d'intelligence sportive. Tous droits réservés. CIDC - PCT Matanzas - XETID ";
    }
  },
  watch: {
    idioma() {
      if (this.idioma === "es") {
        this.copyrigt = "Suite de Inteligencia Deportiva. Todos los Derechos Reservados. CIDC - PCT Matanzas - XETID ";
      }
      if (this.idioma === "ru") {
        this.copyrigt = "Спортивная разведывательная сюита. Все права защищены. CIDC - PCT Matanzas - XETID";
      }
      if (this.idioma === "in") {
        this.copyrigt = "Sports Intelligence Suite. Copyright. CIDC - PCT Matanzas - XETID ";
      }
      if (this.idioma === "fr") {
        this.copyrigt = "Suite d'intelligence sportive. Tous droits réservés. CIDC - PCT Matanzas - XETID ";
      }
    }
  }
};
</script>
