import { computed, defineComponent, ref } from "@vue/composition-api";
import event from "./event";
import { HopeLangI18nConfigItem, i18n } from "@mr-hope/vuepress-shared-utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UpdateEvent = Record<string, any> & { skipWaiting?: () => Promise<void> };

export default defineComponent({
  name: "SWUpdatePopup",

  setup() {
    const updateEvent = ref({} as UpdateEvent);

    const onSWUpdated = (value: UpdateEvent): void => {
      updateEvent.value = value || {};
    };

    const reload = (): void => {
      if (updateEvent.value.skipWaiting)
        void updateEvent.value.skipWaiting().then(() => {
          location.reload();
          updateEvent.value = {};
        });
    };

    const enabled = computed(() => Boolean(updateEvent));

    event.$on("sw-updated", onSWUpdated);

    return { enabled, onSWUpdated, reload };
  },

  computed: {
    message(): HopeLangI18nConfigItem["pwa"] {
      return i18n.getLocale(this.$lang).pwa || i18n.getDefaultLocale().pwa;
    },
  },
});
