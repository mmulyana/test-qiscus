import { defineStore } from 'pinia'

export type SelectedChat = {
	name: string
	user_avatar_url: string
	user_id: string
}

export const useChatStore = defineStore('chat', {
	state: (): { selecteds: SelectedChat[] } => ({
		selecteds: [],
	}),
	getters: {
		totalSelected: (state) => state.selecteds.length,
	},
	actions: {
		addSelected(chat: SelectedChat) {
			if (!this.selecteds.some((c) => c.user_id === chat.user_id)) {
				this.selecteds.push(chat)
			}
		},
		removeSelected(user_id: string) {
			this.selecteds = this.selecteds.filter((c) => c.user_id !== user_id)
		},
		clearSelecteds() {
			this.selecteds = []
		},
	},
})
