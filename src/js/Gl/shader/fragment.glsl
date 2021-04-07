varying vec2 vUv;
uniform sampler2D uTexture;
uniform sampler2D uColorTexture;
uniform float uDistortion;
uniform float uScale;
uniform float uLongScale;
uniform float uClicked;
uniform float uTime;
uniform float uHide;


#define PI 3.14159265359

float Sphere(vec2 uv, float r, float blur) {
	float d = length(uv);
	return smoothstep(r, r - blur, d);
}


void main() {

  vec2 uv = vUv;

	uv.y -= 1. * uHide;

	if (uv.y < 0.) {
    discard; 
  }

	vec2 newUv = uv - 0.5;
	vec2 uv2 = newUv - newUv * 0.5 * (1. - uScale);
	uv2 -= uv2 * 0.5 * (uLongScale);

	vec4 circleDist = vec4(vec3(Sphere(uv2, uDistortion, 0.15)), 1.0);
	// vec4 circleDist2 = vec4(vec3(Sphere(uv2, uClicked, 0.15)), 1.0);

	uv2 += (sin(newUv.x*20. + (uTime / 5.)) / 50.) * (1. - uScale);
	uv2 += (sin(newUv.y*10. + (uTime / 5.)) / 50.) * (1. - uScale);


	float roundblend = sin(PI*circleDist.r);
	float roundblend2 = sin(PI*uScale);
	float roundblend3 = sin(PI*uClicked);

	vec4 bwTexture = texture2D(uTexture, uv);
	vec4 colorTexture = texture2D(uColorTexture, (uv2 * circleDist.r + 0.5));

	vec4 mixTexture = mix(colorTexture, bwTexture, 1.0 - circleDist);

	vec4 multiplyTexture = mixTexture * roundblend * 0.8;
	vec4 multiplyTexture2 = mixTexture * roundblend2 * 0.1;
	vec4 multiplyTexture3 = mixTexture * roundblend3 * 0.8;

	vec4 finalTexture1 = mixTexture + multiplyTexture + multiplyTexture2 + multiplyTexture3;
	// vec4 colorTexture2 = texture2D(uColorTexture, (uv2 * circleDist2.r + 0.5));
	// vec4 finalTexture2 = mix(colorTexture2, finalTexture1, 1.0 - circleDist2);

	gl_FragColor = finalTexture1;
	// gl_FragColor = vec4(vUv, 0., 1.);
}