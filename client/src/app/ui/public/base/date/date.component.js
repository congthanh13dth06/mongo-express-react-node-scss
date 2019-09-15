import React from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import * as Locale from 'date-fns/esm/locale'

registerLocale('vi', Locale['vi'])
registerLocale('enUS', Locale['enUS'])
setDefaultLocale('vi')

class DateComponent {
  constructor() {
    if (!DateComponent.instance) {
      this.primary = React.forwardRef((props, ref) => {
        return <DatePicker {...props} ref={ref}/>
      });
      this.inline = React.forwardRef((props, ref) => {
        return <DatePicker {...props} ref={ref} inline readOnly={true} />
      });
      DateComponent.instance = this
    }
    return DateComponent.instance
  }
}

export default new DateComponent()
