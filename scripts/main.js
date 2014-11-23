require(['WavefrontObjSerializer'], function(WavefrontObjSerializer) {
  QUnit.test("Test 1", function(assert) {
    var myModel = {
      name: 'model',
      materials: [
        {
          textureMaps: {
            diffuse: 'diffuse.jpg',
            specular: 'specular.jpg'
          },
          name: 'material1'
        }
      ],
      meshes: [
        {
          vertices: [0, 0, 1, 0, 1, 0, 0, 0, 1],
          normals: [0, 0, 1],
          texCoords: [0, 1, 1, 0, 1, 1],
          indices: {
            vertex: [0, 1, 2],
            normal: [0, 0, 0],
            texCoord: [0, 1, 0]
          },
          material: 0,
          name: 'mesh1'
        },
        {
          vertices: [0, 0, 1, 0, 1, 0, 0, 0, 1],
          normals: [0, 0, 1],
          indices: {
            vertex: [0, 1, 2],
            normal: [0, 0, 0]
          },
          name: 'mesh2'
        },
        {
          vertices: [0, 0, 1, 0, 1, 0, 0, 0, 1],
          indices: {
            vertex: [0, 1, 2]
          },
          name: 'mesh3'
        },
        {
          vertices: [0, 0, 1, 0, 1, 0, 0, 0, 1],
          texCoords: [0, 1, 1, 0, 1, 1],
          indices: {
            vertex: [0, 1, 2],
            texCoord: [0, 1, 0]
          },
          material: 0,
          name: 'mesh4'
        }
      ]
    };
    var serializer = new WavefrontObjSerializer();
    var obj = serializer.serializeObj(myModel)
    var mtl = serializer.serializeMtl(myModel);
    document.getElementById("objArea").value = obj;
    document.getElementById("mtlArea").value = mtl;
    assert.ok(true, "No errors");
  });
});
