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

  float maxDistance = distance(vec2(0.),vec2(0.5));
  float dist = distance(vec2(0.), uv-0.5);
  float activation = smoothstep(0.,maxDistance,dist);
  


	// float latestStart = 0.5;
	// float startAt = activation * latestStart;
	// float vertexProgress = smoothstep(startAt,1.,roundblend);

	// pos.y += pos.y * vertexProgress * uClicked;
	// pos.x += pos.x * vertexProgress * uClicked;

  pos.z += sin((uv.x - 1.) * activation * 4. * M_PI) * activation * 60. * activator;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}


