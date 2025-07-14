<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { watch } from 'vue'

import { useLocalStorage } from '../../../hooks/use-localstorages'

const isDark = useLocalStorage<boolean>('theme-dark', false)

watch(
	isDark,
	(value) => {
		document.documentElement.classList.toggle('dark', value)
	},
	{ immediate: true }
)

const toggleDarkMode = () => {
	isDark.value = !isDark.value
}
</script>

<template>
	<button
		@click="toggleDarkMode"
		class="p-2 rounded-full border border-white/20 w-fit"
	>
		<component :is="isDark ? Sun : Moon" class="w-5 h-5 text-white" />
	</button>
</template>
