// MIT, https://github.com/feross/clipboard-copy/blob/master/index.js

/** @deprecated use https://vueuse.org/core/useClipboard/#useclipboard */
export function canCopy() {
  try {
    const w = window as any
    return !!navigator.clipboard || document.queryCommandSupported('copy') || w.electron?.clipboard?.writeText
  }
  catch (err) {
    return false
  }
}

async function copyClipboardApi(text: string) {
  // Use the Async Clipboard API when available. Requires a secure browsing context (i.e. HTTPS)
  if (navigator.clipboard)
    return !!navigator.clipboard.writeText(text)
  return false
}

async function copyExecCommand(text: string) {
  // Put the text to copy into a <span>
  const span = document.createElement('span')
  span.textContent = text

  // Preserve consecutive spaces and newlines
  span.style.whiteSpace = 'pre'
  span.style.webkitUserSelect = 'auto'
  span.style.userSelect = 'all'

  // Add the <span> to the page
  document.body.appendChild(span)

  // Make a selection object representing the range of text selected by the user
  const selection = window.getSelection() as any
  const range = window.document.createRange()
  selection.removeAllRanges()
  range.selectNode(span)
  selection.addRange(range)

  // Copy text to the clipboard
  let success = false
  try {
    success = window.document.execCommand('copy')
  }
  finally {
    // Cleanup
    selection.removeAllRanges()
    window.document.body.removeChild(span)
  }

  return success
}

/** @deprecated use https://vueuse.org/core/useClipboard/#useclipboard */
export async function clipboardCopy(text: string) {
  const w = window as any
  if (w.electron) {
    // https://electronjs.org/docs/api/clipboard
    await w.electron?.clipboard?.writeText(text)
    return true
  }

  if (await copyClipboardApi(text))
    return true

  return await copyExecCommand(text)
}
