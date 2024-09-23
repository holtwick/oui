/** @deprecated use https://vueuse.org/core/useShare/#useshare */
export const canShare = () => navigator.share != null

/** @deprecated use https://vueuse.org/core/useShare/#useshare */
export async function shareLink(
  data: ShareData,
) {
  if (navigator.share) {
    try {
      await navigator.share(data)
      return true
    }
    catch (err) {
      // log.warn(err)
    }
  }
  return false
}
