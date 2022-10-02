// This function prevents submit on Enter keypress in form
export const prevEnterSub = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.code === 'Enter') e.preventDefault()
}
