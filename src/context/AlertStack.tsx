import { AlertMessage } from '../common/AlertMessageTypes'
import { Context } from './Context'

export class AlertStack implements Context {
  constructor(private _messages: AlertMessage[] = []) {}

  get messages(): AlertMessage[] {
    return this._messages
  }

  copy(): AlertStack {
    return new AlertStack(this.messages)
  }

  // Add message must create new object to trigger a change
  addMessage(message: AlertMessage): AlertStack {
    this._messages.push(message)
    return this.copy()
  }
}
