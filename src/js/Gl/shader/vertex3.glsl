@import ./bgCover;
@import ./snoise;

varying vec2 vUv;
uniform vec2 uSize;
uniform vec2 uResolution;
uniform float uTime;
uniform float uClicked;
uniform float uScale;


void main() {
  vec3 pos = position; 
  vUv = bgCover(uSize, uResolution, uv);

  float speed = uTime * 0.1;
  float activator = uClicked;
  float roundblend = sin(M_PI*activator);

  float noiseFreq = 2.;
  float noiseAmp = clamp((uv.x + uv.y / 10.) * 25., -1.25, 1.25); 
    
  vec3 noisePos = vec3(pos.x * noiseFreq + (uTime / 120.), pos.y, pos.z);
  pos.z += roundblend * snoise(noisePos) * 160. * noiseAmp;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}


