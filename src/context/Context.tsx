// Base interface for context
export interface Context {
  // We need to be able to copy Context for state updates
  copy(): Context
}
