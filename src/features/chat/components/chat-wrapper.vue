<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import { useChatStore } from '../../../stores/chat'
import data from '../../../assets/list_rooms.json'
import ChatItem from './chat-item.vue'

const chatStore = useChatStore()
const { selecteds } = storeToRefs(chatStore)

const search = ref('')
const selectedsIds = computed(() => selecteds.value.map((i) => i.user_id))

function handleClick(id: number) {
	const chat = data.data.customer_rooms.find((item) => item.id === id)

	if (chat) {
		if (selectedsIds.value.includes(chat.user_id)) {
			chatStore.removeSelected(chat.user_id)
			return
		}
		if (selecteds.value.length > 3) return

		chatStore.addSelected({
			name: chat.name,
			user_avatar_url: chat.user_avatar_url,
			user_id: chat.user_id,
		})
	}
}

const filteredRooms = computed(() =>
	data.data.customer_rooms.filter((room) =>
		room.name.toLowerCase().includes(search.value.toLowerCase())
	)
)
</script>

<template>
	<div
		class="border border-gray-200 dark:border-gray-900/5 bg-white dark:bg-[#2a2929] rounded-lg w-88 overflow-hidden h-[calc(100vh-2rem)]"
	>
		<div class="h-full overflow-y-auto overflow-x-hidden">
			<div class="p-4">
				<div class="h-fit w-full relative">
					<input
						v-model="search"
						class="w-full h-10 rounded-lg px-4 bg-gray-100 dark:bg-[#3d3d3d] dark:text-white"
						placeholder="Search Customer"
					/>
					<Search
						class="absolute top-1/2 right-2 -translate-y-1/2 dark:text-white"
						:size="18"
					/>
				</div>
			</div>
			<div class="flex flex-col" v-for="item in filteredRooms" :key="item.id">
				<ChatItem
					:active="selectedsIds.includes(item.user_id)"
					:last_comment_sender="item.last_comment_sender"
					:last_comment_text="item.last_comment_text"
					:last_comment_timesmap="item.last_comment_timestamp"
					:id="item.id"
					:name="item.name"
					:user_avatar_url="item.user_avatar_url"
					:onClick="() => handleClick(item.id)"
				/>
			</div>
		</div>
	</div>
</template>
