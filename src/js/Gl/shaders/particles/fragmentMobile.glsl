uniform float uTime;
uniform samplerCube tCube;

varying vec2 vUv;
varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

const int ITERATIONS = 50;
const float SPEED = 0.00025;
const float PAN = 2.8;
const float MASK_VIS = 0.0;


float vortex(vec2 uv, float dist, float seed, float bias, float offset)
{
    float ang = atan(uv.y, uv.x)+sin(dist+1.5*seed)*(1.2-offset)*2.0;
    ang += 3.14159*(0.01*seed);
    return clamp((sin((ang)*(3.0+offset*float(ITERATIONS)))+bias)/(1.0+bias), 0.0, 1.0);
}

void main() {

  vec2 uv = vUv;
    float texel = 1.0/gl_FragCoord.y;
    float dist = length(uv);
    vec3 col = vec3(0.0);
    for (int i=0; i<ITERATIONS; i++) 
    {
        float offset = float(i)/float(ITERATIONS);
        float seed = 1000.0*fract(3.1379136*floor(uTime*SPEED+offset));
        float time = fract(uTime*SPEED+offset);
        vec2 pan = vec2(0.0, time*PAN);
        float maskA = vortex(uv, dist, seed+100.0*float(i), -0.992+texel, offset);
        float dist2 = length(uv+pan);
        float maskB = vortex(uv+pan, dist2, seed+42.0*float(i), -0.95+texel, offset);
        float radius = pow(((maskA*maskA)+(maskB*maskB)), 2.0);
        float fade = time*(1.0-time);
        float mask = maskA*maskB*fade*radius;

        col = mix(col, vec3(0.6* (0.5 + dist), 0.1, 3.8 + dist), mask);
        col = max(vec3(maskA*MASK_VIS, maskB*MASK_VIS+0.1, max(maskA*MASK_VIS*2.0, maskB*MASK_VIS)+0.12)*fade, col);
    }

  vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );
  vec4 refractedColor = vec4( 1.0 );

  refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;
  refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;
  refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;

  vec4 glassTexture = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );

  vec4 finalTexture = vec4(col*1.5,1.0) + glassTexture*1.7;
  
  gl_FragColor = finalTexture;

}