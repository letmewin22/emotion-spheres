export function fluidSize(pc, mob) {
  const addSize = pc - mob
  const maxWidth = 1920 - 375

  return mob + addSize * ((window.innerWidth - 375) / maxWidth)
}
