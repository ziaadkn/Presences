const presence = new Presence({
		clientId: "782853565550034954",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	stationIDMap: { [key: string]: string } = {
		olliolliworld: "OlliOlli World",
		spacechannel5: "Space Channel 5",
		live: "Jet Set Radio Live",
		outerspace: "Outer Space",
		classic: "Classic",
		future: "Future",
		ultraremixes: "Ultra Remixes",
		garage: "The Garage",
		ggs: "GG's",
		noisetanks: "Noise Tanks",
		poisonjam: "Poison Jam",
		rapid99: "Rapid 99",
		loveshockers: "Love Shockers",
		immortals: "The Immortals",
		doomriders: "Doom Riders",
		goldenrhinos: "Golden Rhinos",
		ganjah: "Ganjah",
		lofi: "Lo-Fi",
		chiptunes: "Chiptunes",
		retroremix: "Retro Remix",
		classical: "Classical Remix",
		revolution: "Revolution",
		endofdays: "End of Days",
		silvagunner: "SilvaGunner x JSR",
		futuregeneration: "Future Generation",
		jetmashradio: "Jet Mash Radio",
		memoriesoftokyoto: "Memories of Tokyo-to",
		tokyotofuture: "Sounds of Tokyo-to Future",
		crazytaxi: "Crazy Taxi",
		ollieking: "Ollie King",
		toejamandearl: "Toe Jam & Earl",
		hover: "Hover",
		butterflies: "Butterflies",
		lethalleagueblaze: "Lethal League Blace",
		bonafidebloom: "BonafideBloom",
		djchidow: "DJ Chidow",
		verafx: "VeraFX",
		summer: "Summer",
		halloween: "Halloween",
		christmas: "Christmas",
		snowfi: "Snow-Fi",
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/ZiIN6t9.png",
		},
		audio = document.querySelector<HTMLAudioElement>("#audioPlayer"),
		songName = document.querySelector(
			"#programInformationText.objectSettings.touchableOff"
		),
		buttons = await presence.getSetting<boolean>("buttons");

	if (songName.textContent.length < 1 || !audio) {
		presenceData.details = "Not tuned in.";
		presenceData.smallImageKey = Assets.Pause;
		presenceData.smallImageText = (await strings).pause;
	} else {
		const stationID = document
			.querySelector<HTMLImageElement>("#graffitiSoul")
			.src.split("/")[5];
		presenceData.largeImageKey = stationID;
		presenceData.state = stationIDMap[stationID];
		if (
			!audio.paused &&
			!document.querySelector('#loadingTrackCircle:not([style*="hidden"])')
		) {
			if (await presence.getSetting<boolean>("song"))
				presenceData.details = songName.textContent;
			if (
				(await presence.getSetting<boolean>("timestamp")) &&
				isFinite(audio.duration)
			) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(audio);
			}
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = (await strings).play;
		} else {
			presenceData.details = "Paused";
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = (await strings).pause;
		}

		if (buttons) {
			presenceData.buttons = [
				{
					label: "Tune In",
					url: document.URL,
				},
			];
		}
	}

	if (!presenceData.details && presenceData.state) presence.setActivity();
	else presence.setActivity(presenceData);
});
