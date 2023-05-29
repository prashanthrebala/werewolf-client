/* eslint-disable no-multi-str */
export const characters = {
	villager: {
		role: "Villager",
		displayText:
			"You are lowly villager, doomed to spend your days plowing a field.",
		prompt: "These are the current players",
		action: "DONOTHING",
		team: 0,
	},
	seer: {
		role: "Seer",
		displayText:
			"You are the Seer. Each night, you may choose a player and have their role revealed to you. Admit to your role wisely! If you reveal you are the seer, the wolves will try to kill you!",
		prompt: "Choose a player, and their role will be revealed to you",
		action: "SEE",
		team: 0,
	},
	guardianAngel: {
		role: "Guardian Angel",
		displayText:
			"You are the Guardian Angel! Each night, you may choose a player to watch over. Be careful however - if you choose to watch over a wolf, there is a 50% chance you will be killed, and if you watch over the serial killer, you will be killed.",
		prompt: "Choose a player to protect tonight",
		action: "SAVE",
		team: 0,
	},
	werewolf: {
		role: "Werewolf",
		displayText:
			"Each night, you will get to pick a player to kill. Make sure your fellow werewolves agree on the same player to kill!",
		prompt: "Vote a player to feed on tonight",
		action: "EAT",
		team: 1,
	},
};
