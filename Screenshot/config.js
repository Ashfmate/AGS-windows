export { }
App.addIcons(App.configDir + '/windows/Screenshot/Icons')
class WidgetSwitcher {
    /**
     * @param {import('/home/ashforest/.config/ags/types/widgets/widget').Widget} widget
     * @param {string} class_name
     * */
    constructor(widget, class_name) {
        this.old_widget = { widget, class_name }
        this.new_widget = Variable(this.old_widget)
        this.new_widget.connect('changed', (self) => {
            self.getValue().widget.toggleClassName(self.getValue().class_name, true)
            if (self.getValue().widget != this.old_widget.widget) {
                this.old_widget.widget.toggleClassName(this.old_widget.class_name, false)
                this.old_widget = self.getValue()
            }
        })
    }

    /**
     * @param {import('/home/ashforest/.config/ags/types/widgets/widget').Widget} widget
     * @param {string} class_name
     * */
    takeActive(widget, class_name) {
        this.new_widget.setValue({
            widget,
            class_name
        })
    }
}
const file_input = Widget.Entry({
    placeholder_text: 'file_name',
    text: Utils.exec('date "+%Y_%m_%d-%H_%M_%S"') + '.png',
    class_name: 'file_input',
    xalign: 0.3,
})


const region_cap = Widget.Button({
    class_name: 'button',
    attribute: () => {
        Utils.execAsync('hyprshot -m region -f "' + file_input.text + '"')
    },
    child: Widget.Icon('tool-crop'),
    on_clicked: (self) => {
        ws.takeActive(self, 'button_active')
    }
})
const win_cap = Widget.Button({
    class_name: 'button',
    attribute: () => {
        Utils.execAsync('hyprshot -m window -f "' + file_input.text + '"')
    },
    child: Widget.Icon('window-alt'),
    on_clicked: (self) => {
        ws.takeActive(self, 'button_active')
    }
})
const full_cap = Widget.Button({
    class_name: 'button',
    attribute: () => {
        Utils.execAsync('hyprshot -m output -f "' + file_input.text + '"')
    },
    child: Widget.Icon('expand'),
    on_clicked: (self) => {
        ws.takeActive(self, 'button_active')
    }
})
const ws = new WidgetSwitcher(region_cap, 'button_active')

const screen_cap = Widget.Box({
    class_name: 'screen_cap',
    hpack: "center",
    spacing: 8,
    children: [region_cap, win_cap, full_cap]
})

const video = Widget.Button({
    class_name: 'media_btn',
    child: Widget.Icon('play-alt(1)'),
    on_clicked: () => {
        ws.new_widget.getValue().widget.attribute()
        App.quit()
    }
})

const picture = Widget.Button({
    class_name: 'media_btn',
    child: Widget.Icon('camera(1)'),
    on_clicked: () => {
        ws.new_widget.getValue().widget.attribute()
        App.quit()
    }
})

const media_choice = Widget.Box({
    class_name: 'media_choice',
    spacing: 16,
    hpack: "center",
    children: [picture, video]
})

const pop_up = Widget.CenterBox({
    class_name: 'pop_up',
    vertical: true,
    spacing: 5,
    hpack: "center",
    start_widget: file_input,
    center_widget: screen_cap,
    end_widget: media_choice,
})

export const ScreenshotPopUp = Widget.Window({
    monitor: 0,
    name: 'screenshot',
    exclusivity: 'exclusive',
    keymode: "on-demand",
    layer: "top",
    child: pop_up
})
App.resetCss()
App.applyCss(App.configDir + '/windows/Screenshot/style.css')
