export { }
export let chooser = Variable(0)
let btn_id = 0
export let icon_path = (/**@type String */input) => `/home/ashforest/Pictures/Icons/${input}.svg`

export class RadioButton {
    /**
     * @param {string} active_class_name
     * @param {string} inactive_class_name
     * @param {import("/home/ashforest/.config/ags/types/widgets/button").Button<any, unknown>} widget
     */
    constructor(widget, active_class_name, inactive_class_name) {
        this.widget = widget
        this.active_class_name = active_class_name
        this.inactive_class_name = inactive_class_name
        this.idx = btn_id++
        this.widget.on('clicked', () => chooser.value = this.idx)
        if (this.idx === chooser.value)
            this.widget.class_name = this.active_class_name
        else
            this.widget.class_name = this.inactive_class_name
    }
}



/**
 * @type RadioButton[]
 */
export const rad_btn_children = []

chooser.connect('changed', () => {
    rad_btn_children.forEach((elem, idx) => {
        if (chooser.value === idx) {
            elem.widget.class_name = elem.active_class_name
        } else {
            elem.widget.class_name = elem.inactive_class_name
        }
    })
})
