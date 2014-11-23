define('types/Mesh', [], function() {
  function Mesh() {
    this.vertices = [];
    this.normals = [];
    this.texCoords = [];
    this.faces = [];
    this.material = null;
    this.name = null;
    this.indices = {
      vertex: [],
      normal: [],
      texCoord: []
    };
  }
  return Mesh;
});
