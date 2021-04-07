vec2 bgCover(vec2 planeSize, vec2 imageSize, vec2 uv) {

  uv -=0.5;

  float aspect = planeSize.x / planeSize.y;
  float imageAspect = imageSize.x / imageSize.y;

  if (aspect < imageAspect) {
    uv.x *= aspect / imageAspect;
  } else {
    uv.y *= imageAspect / aspect;
  }

  uv += 0.5;
  return uv;
}