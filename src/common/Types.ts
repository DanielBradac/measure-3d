export type SelectOption = {
  value: string | number | readonly string[] | undefined
  label: string
}

export enum AlertType {
  INFO = 'alert-info',
  WARNING = 'alert-warning',
  SUCCESS = 'alert-success',
  ERROR = 'alert-error',
}

export type AlertMes = {
  type: AlertType
  messages: string[]
}
