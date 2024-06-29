
const hyprland = await Service.import('hyprland')

const scrollable = Widget.Scrollable({
	hscroll: 'automatic',
	css: 'min-width: 30em; min-height: 4.7em',
	child: Widget.Box({
		vertical: true,
		children: hyprland.clients.map(self => Widget.Button({ label: self.title }))
	})
})
App.config({
	windows: [
		Widget.Window({
			monitor: 0,
			name: 'scroll',
			child: scrollable
		})
	]
})
