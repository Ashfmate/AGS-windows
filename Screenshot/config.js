export { }
import { icon_path, rad_btn_children, RadioButton, chooser } from './radio_buttons.js';

let file_name = ''

const file_input = Widget.Entry({
    placeholder_text: 'file_name',
    text: Utils.exec('date "+%Y_%m_%d-%H_%M_%S"') + '.png',
    onAccept: ({ text }) => {
        if (text) {
            file_name = text
        }
    },
    class_name: 'file_input',
    xalign: 0.3,
})

const region_cap = Widget.Button({
    child: Widget.Icon(icon_path('tool-crop')),
})
const win_cap = Widget.Button({
    child: Widget.Icon(icon_path('window-alt')),
})
const full_cap = Widget.Button({
    child: Widget.Icon(icon_path('expand')),
})

rad_btn_children.push(new RadioButton(region_cap, 'button_active', 'button_inactive'))
rad_btn_children.push(new RadioButton(win_cap, 'button_active', 'button_inactive'))
rad_btn_children.push(new RadioButton(full_cap, 'button_active', 'button_inactive'))

const screen_cap = Widget.Box({
    class_name: 'screen_cap',
    hpack: "center",
    spacing: 8,
    children: rad_btn_children.map(self => self.widget)
})

const video = Widget.Button({
    class_name: 'media_btn',
    child: Widget.Icon(icon_path('play-alt')),
    on_clicked: () => {
        switch (chooser.value) {
            case 0:
                Utils.execAsync('hyprshot -m region -f "' + file_input.text + '"')
                break
            case 1:
                Utils.execAsync('hyprshot -m window -f "' + file_input.text + '"')
                break
            case 2:
                Utils.execAsync('hyprshot -m output -f "' + file_input.text + '"')
                break
        }
        App.quit()
    }
})

const picture = Widget.Button({
    class_name: 'media_btn',
    child: Widget.Icon(icon_path('camera')),
    on_clicked: () => {
        switch (chooser.value) {
            case 0:
                Utils.execAsync('hyprshot -m region -f "' + file_input.text + '"')
                break
            case 1:
                Utils.execAsync('hyprshot -m window -f "' + file_input.text + '"')
                break
            case 2:
                Utils.execAsync('hyprshot -m output -f "' + file_input.text + '"')
                break
        }
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

export const Bar = Widget.Window({
    monitor: 0,
    name: 'screenshot',
    exclusivity: 'exclusive',
    keymode: "on-demand",
    layer: "top",
    child: pop_up
})
App.resetCss()
App.applyCss(App.configDir + '/windows/Screenshot/style.css')
