const presence = new Presence({
		clientId: "843791837273391104",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const showTimestamp = await presence.getSetting<boolean>("timestamp"),
		showButtons = await presence.getSetting<boolean>("buttons"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/ZjtyAQx.png",
		};

	if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname === "/servers/search") {
		presenceData.details = `🔍 Searching for: ${
			document
				.querySelector("h1.text-center")
				?.textContent.replace("Discord Servers", " ") || "Nothing"
		}`;
		presenceData.state = `📖 Page ${
			document.querySelector("li.page-item.active")?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Results",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/servers/tag/")) {
		presenceData.details = `Viewing 📛 ${
			document
				.querySelector("h1.text-center")
				?.textContent.replace("Discord Servers", " ") || "Nothing"
		} tag`;
		presenceData.state = `📖 Page ${
			document.querySelector("li.page-item.active")?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Tag",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/servers/tags/")) {
		presenceData.details = `Viewing 🔑 ${
			document
				.querySelector("h1.text-center")
				?.textContent.replace("Discord Servers", " ") || "Nothing"
		} keyword`;
		presenceData.state = `📖 Page ${
			document.querySelector("li.page-item.active")?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Keyword",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname === "/servers/top-100") {
		presenceData.details = "Viewing 🏅 top-100 servers";
		presenceData.state = `📖 Page ${
			document.querySelector("li.page-item.active")?.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Top-100",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/join")) {
		const serverNameJoin = document.querySelector("h2.mt-4")?.textContent;
		presenceData.details = `Looking at 🚦 ${
			serverNameJoin || "N/A"
		}'s join page`;
		if (serverNameJoin) {
			presenceData.buttons = [
				{
					label: `Join ${serverNameJoin}`,
					url: document.location.href,
				},
			];
		}
	} else if (document.location.pathname.includes("/upvote")) {
		const serverNameUpvote = document.querySelector(
			"h1.JoinUpvote_clickable-server-name__3l6Es"
		)?.textContent;
		presenceData.details = `Upvoting 🗳️ ${serverNameUpvote || "N/A"} `;
		if (serverNameUpvote) {
			presenceData.buttons = [
				{
					label: `Upvote ${serverNameUpvote}`,
					url: document.location.href,
				},
			];
		}
	} else if (document.location.pathname.includes("/servers/")) {
		presenceData.details = `Viewing 🎨 ${document
			.querySelector("h1.servernameh1")
			?.textContent.replace("PREMIUM", " ")}`;
		presenceData.state = `${
			document
				.querySelectorAll("span.mr-2")[0]
				?.textContent.replace(
					`${document.querySelectorAll("span.mr-2")[0]?.textContent}`,
					`${`👥 ${document.querySelectorAll("span.mr-2")[0]?.textContent}`}`
				) || "0 members online"
		}, ${
			document
				.querySelectorAll("span.mr-2")[1]
				?.textContent.replace(
					`${document.querySelectorAll("span.mr-2")[1]?.textContent}`,
					`${`🎁 ${document.querySelectorAll("span.mr-2")[1]?.textContent}`}`
				) || "0 members"
		}, ${
			document
				.querySelectorAll("span.mr-2")[2]
				?.textContent.replace(
					`${document.querySelectorAll("span.mr-2")[2]?.textContent}`,
					`${`💎 ${document.querySelectorAll("span.mr-2")[2]?.textContent}`}`
				) || "0 boosts"
		}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/about")) {
		presenceData.details = "Viewing 🎫 about page";
		presenceData.buttons = [
			{
				label: "View Page",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/payment")) {
		presenceData.details = "Purchasing 💳 premium";
		presenceData.buttons = [
			{
				label: "Purchase Premium",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname === "/premium/") {
		presenceData.details = "Viewing 💎 premium plans";
		presenceData.buttons = [
			{
				label: "View Premium",
				url: document.location.href,
			},
		];
	} else if (document.location.pathname.includes("/partners")) {
		presenceData.details = "Viewing 🤝 partners";
		presenceData.buttons = [
			{
				label: "View Partners",
				url: document.location.href,
			},
		];
	} else {
		switch (document.location.pathname) {
			case "/u/dashboard": {
				presenceData.details = "Viewing 👤 dashboard";
				break;
			}
			case "/emoji-list": {
				presenceData.details = "Viewing 😃 Emoji list";
				presenceData.buttons = [
					{
						label: "View Emojis",
						url: document.location.href,
					},
				];

				break;
			}
			case "/emoji-list/search": {
				presenceData.details = `🔍 Searching for emoji: ${
					document
						.querySelector("h2.EmoList_heading1__3KEr_")
						?.textContent.replace("Emoji List", " ") || "N/A"
				}`;
				presenceData.state = `📖 Page ${
					document.querySelector("li.page-item.active")?.textContent
				}`;
				presenceData.buttons = [
					{
						label: "View Results",
						url: document.location.href,
					},
				];

				break;
			}
			default:
				if (document.location.pathname.includes("/emoji-list/tag/")) {
					presenceData.details = `Looking at 📛 ${
						document
							.querySelector("h2.EmoList_heading1__3KEr_")
							?.textContent.replace("Emoji List", " ") || "N/A"
					} emoji tag`;
					presenceData.state = `📖 Page ${
						document.querySelector("li.page-item.active")?.textContent
					}`;
					presenceData.buttons = [
						{
							label: "View Emoji Tag",
							url: document.location.href,
						},
					];
				} else if (document.location.pathname.includes("/termsofservice")) {
					presenceData.details = "Viewing 👩‍⚖️ Terms of Service";
					presenceData.buttons = [
						{
							label: "View Page",
							url: document.location.href,
						},
					];
					// discord.bio
				} else if (document.location.pathname.includes("/profiles")) {
					presenceData.largeImageKey = "discordbio_logo";
					presenceData.smallImageKey = Assets.Reading;
					presenceData.smallImageText = "Browsing...";
					presenceData.details = "Browsing top bios";
					presenceData.buttons = [
						{
							label: "View Bios",
							url: document.location.href,
						},
					];
				} else if (document.location.pathname === "/bio/premium") {
					presenceData.largeImageKey = "discordbio_logo";
					presenceData.details = "Viewing 💎 premium plans";
					presenceData.buttons = [
						{
							label: "View Premium Plans",
							url: document.location.href,
						},
					];
				} else if (document.location.pathname.includes("/customise")) {
					presenceData.largeImageKey = "discordbio_logo";
					presenceData.details = "Editing bio";
				} else if (document.location.pathname.includes("/settings")) {
					presenceData.largeImageKey = "discordbio_logo";
					presenceData.details = "Viewing ⚙️ settings";
				} else if (document.location.pathname.includes("/p/")) {
					presenceData.largeImageKey = "discordbio_logo";
					const profileName = document.querySelector(
						"span.text-white.font-bold.text-2xl"
					)?.textContent;
					presenceData.details = `Viewing ${
						profileName
							? profileName.endsWith("s")
								? `${`${profileName}'`}`
								: `${`${profileName}'s`}`
							: "Unknown"
					} bio`;
					presenceData.state = `${
						document.querySelector(
							"div.text-xs.uppercase.tracking-widest.font-bold.text-blue-300"
						)?.textContent
							? "💎 Premium User"
							: "🎟️ Normal User"
					}`;
					presenceData.buttons = [
						{
							label: "View Bio",
							url: document.location.href,
						},
					];
				} else if (document.location.pathname.includes("/bio")) {
					presenceData.largeImageKey = "discordbio_logo";
					presenceData.details = "Viewing home page";
					// discord templates
				} else if (document.location.pathname.includes("/edit")) {
					presenceData.largeImageKey = "discordtemplates_logo";
					presenceData.details = "Editing a template";
					presenceData.buttons = [
						{
							label: "View Template",
							url: document.location.href.split("/edit")[0],
						},
					];
				} else if (document.location.pathname.includes("/templates/id/new")) {
					presenceData.largeImageKey = "discordtemplates_logo";
					presenceData.details = "Creating New Template:";
					presenceData.state = `${
						document.querySelector("h5.font-semibold.text-lg.truncate")
							?.textContent ?? "Unknown"
					}`;
				} else if (document.location.pathname.includes("/templates/id/top")) {
					presenceData.largeImageKey = "discordtemplates_logo";
					presenceData.details = "Viewing Top-10 templates";
					presenceData.smallImageKey = Assets.Reading;
					presenceData.smallImageText = "Browsing...";
					presenceData.buttons = [
						{
							label: "View Top-10",
							url: document.location.href,
						},
					];
				} else if (document.location.pathname.includes("/templates/id/")) {
					presenceData.largeImageKey = "discordtemplates_logo";
					presenceData.details = "Viewing Template:";
					presenceData.state = `${
						document.querySelector("h1.font-semibold.truncate")?.textContent ??
						"Unknown"
					}`;
					presenceData.buttons = [
						{
							label: "View Template",
							url: document.location.href,
						},
					];
				} else if (document.location.pathname.includes("/templates/users/")) {
					presenceData.largeImageKey = "discordtemplates_logo";
					presenceData.details = "Viewing User:";
					presenceData.state = `${
						document.querySelector("h1.text-3xl.font-semibold")?.textContent ??
						"Unknown"
					}`;
					presenceData.buttons = [
						{
							label: "View User",
							url: document.location.href,
						},
					];
				} else if (document.location.pathname.includes("/templates/search/")) {
					presenceData.largeImageKey = "discordtemplates_logo";
					presenceData.details = "Searching for:";
					presenceData.state = `${
						document.location.pathname.split("/templates/search/")[1] ??
						"Unknown"
					}`;
					presenceData.smallImageKey = Assets.Search;
					presenceData.smallImageText = "Searching...";
				} else if (document.location.pathname.includes("/templates/tags/")) {
					presenceData.largeImageKey = "discordtemplates_logo";
					presenceData.details = "Searching by tag:";
					presenceData.state = `${
						document.location.pathname.split("/templates/tags/")[1] ?? "Unknown"
					}`;
					presenceData.smallImageKey = Assets.Search;
					presenceData.smallImageText = "Searching...";
				} else if (document.location.pathname.includes("/templates")) {
					presenceData.largeImageKey = "discordtemplates_logo";
					presenceData.details = "Viewing home page";
				}
		}
	}

	if (!showButtons) delete presenceData.buttons;
	if (showTimestamp) presenceData.startTimestamp = browsingTimestamp;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
