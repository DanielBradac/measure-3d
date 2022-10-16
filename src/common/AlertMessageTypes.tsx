export enum AlertType {
  INFO = 'alert-info',
  WARNING = 'alert-warning',
  SUCCESS = 'alert-success',
  ERROR = 'alert-error',
}

export class AlertMessage {
  constructor(private _message: string, private _type: AlertType) {}

  get type(): AlertType {
    return this._type
  }

  get message(): string {
    return this._message
  }
}

export class InfoMessage extends AlertMessage {
  constructor(message: string) {
    super(message, AlertType.INFO)
  }
}

export class WarningMessage extends AlertMessage {
  constructor(message: string) {
    super(message, AlertType.WARNING)
  }
}

export class SuccessMessage extends AlertMessage {
  constructor(message: string) {
    super(message, AlertType.SUCCESS)
  }
}

export class ErrorMessage extends AlertMessage {
  constructor(message: string) {
    super(message, AlertType.ERROR)
  }
}
