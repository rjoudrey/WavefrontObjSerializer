define('types/Material', [], function() {
  function Material() {
    this.textureMaps = {
      diffuse: null,
      specular: null,
      normal: null,
      emitColor: null,
      alphaMask: null,
      opacity: null
    };
    this.name = null;
  }
  return Material;
});
