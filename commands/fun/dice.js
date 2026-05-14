const { SlashCommandBuilder, ContainerBuilder, MessageFlags } = require('discord.js');

module.exports = {
    cooldown: 60,
	data: new SlashCommandBuilder()
    .setName('dice')
    .setDescription('Rolls a fairly unusual dice. For some reason, it gets really hot when you roll it.')
	.addIntegerOption(option =>
		option.setName('sides')
			.setDescription('The number of sides on the dice')
			.setRequired(true)
			.setMinValue(2)
			.setMaxValue(64)),
	async execute(interaction) {
		const sides = interaction.options.getInteger('sides');
		const result = Math.floor(Math.random() * sides) + 1;
		const ContainerSpinning = new ContainerBuilder()
			.addTextDisplayComponents((textDisplay) =>
				textDisplay.setContent('The dice is rolling!!')
			);
		const ContainerResult = new ContainerBuilder()
			.addTextDisplayComponents((textDisplay) =>
				textDisplay.setContent('The dice has stopped rolling!')
			)
			.addSeparatorComponents((separator) => separator)
			.addTextDisplayComponents((textDisplay) =>
				textDisplay.setContent(`The result is: ${result}!`)
			);
		await interaction.reply({ components: [ContainerSpinning], flags: MessageFlags.IsComponentsV2 });
		setTimeout(3000)
		await interaction.editReply({ components: [ContainerResult], flags: MessageFlags.IsComponentsV2 });
	},
};