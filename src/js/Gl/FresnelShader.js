import fragmentShader from './shaders/fresnel/fragment.glsl'
import vertexShader from './shaders/fresnel/vertex.glsl'

export const fresnelShader = {
  uniforms: {
    mRefractionRatio: {type: 'f', value: 1.05},
    mFresnelBias: {type: 'f', value: 0.1},
    mFresnelPower: {type: 'f', value: 2.0},
    mFresnelScale: {type: 'f', value: 1.0},
    tCube: {type: 't', value: null},
  },

  vertexShader,
  fragmentShader,
}
