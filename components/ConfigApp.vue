<script setup>
import ConfigAppBox from "~/components/ConfigAppBox.vue";

const themeStore = useThemeStore();

const isOpen = ref(false);
const checked = ref(themeStore.isDark);

const toggleSidebar = (value) => {
  isOpen.value = value;
};

watch(checked, () => {
  if (checked.value) {
    themeStore.toggleMode("dark");
    document.documentElement.classList.add("dark");
  } else {
    themeStore.toggleMode("light");
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <div>
    <button
        @click="toggleSidebar(true)"
        class="btn btn-square bg-blue-700 fixed top-2/4 right-0 truncate -mt-6 text-center z-50 rounded-l-lg rounded-r-none border-0 hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-700">
      <IconCog className="h-7 w-7 text-white dark:text-white"/>
    </button>
    <transition enter-active-class="animate__animated animate__slideInRight"
                leave-active-class="animate__animated animate__slideOutRight">
      <ConfigAppBox v-if="isOpen" @toggle-sidebar="toggleSidebar">
        <template #default>
          <div class="flex flex-col">
            <div class="px-4 py-3">
              <h5 class="text-lg font-semibold dark:text-white">Theme App</h5>
              <div>
                <label class="label cursor-pointer justify-start radio-control">
                  <input type="radio" name="radio-theme" class="radio-custom" v-model="checked" :value="false"/>
                  <span class="label-text font-semibold text-sm ml-2 dark:text-white">Light</span>
                </label>
                <label class="label cursor-pointer justify-start radio-control">
                  <input type="radio" name="radio-theme" class="radio-custom" v-model="checked" :value="true"/>
                  <span class="label-text font-semibold text-sm ml-2 dark:text-white">Dark</span>
                </label>
              </div>
            </div>
            <hr class="border-t border-gray-400"/>
          </div>
        </template>
      </ConfigAppBox>
    </transition>
  </div>
</template>