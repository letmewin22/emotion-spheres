export const lerp = (a, b, n) => {
  return a * (1 - n) + b * n
}

export const clamp = (num, a, b) => {
  return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))
}
