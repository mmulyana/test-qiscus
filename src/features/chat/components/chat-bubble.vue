<script setup lang="ts">
import { defineProps } from 'vue'
import type { Message } from '../../../types'

const props = defineProps<Message>()

const isCustomer = props.type === 'customer'
</script>

<template>
	<div
		:class="[
			'flex items-start mb-4',
			!isCustomer ? 'justify-end' : 'justify-start',
		]"
	>
		<img
			v-if="isCustomer"
			:src="props?.photo || ''"
			alt="User Photo"
			class="w-8 h-8 rounded-full mr-2"
		/>
		<div
			:class="[
				'max-w-xs px-4 py-2 rounded-lg',
				isCustomer ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black',
			]"
		>
			{{ message }}
		</div>
		<img
			v-if="!isCustomer"
			:src="props?.photo || ''"
			alt="User Photo"
			class="w-8 h-8 rounded-full ml-2"
		/>
	</div>
</template>
