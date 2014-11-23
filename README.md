WavefrontObjSerializer
======================

Serialize 3D models into .OBJ and .MTL

### Example Usage
```javascript
require(['WavefrontObjSerializer'], function(WavefrontObjSerializer) {
  var serializer = new WavefrontObjSerializer();
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
      }
    ]
  };
});
```

serializer.serializeObj(myModel) evaluates to:
```
mtllib model.mtl
o mesh1
usemtl material1
v 0 0 1
v 0 1 0
v 0 0 1
vn 0 0 1
vt 0 1
vt 1 0
vt 1 1
f 1/1/1 2/2/1 3/1/1
o mesh2
v 0 0 1
v 0 1 0
v 0 0 1
vn 0 0 1
f 4//2 5//2 6//2
```
and serializer.serializeMtl(myModel) evaluates to:
```
newmtl material1
map_Kd diffuse.jpg
map_K specular.jpg
```
