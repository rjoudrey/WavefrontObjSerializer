define('WavefrontObjSerializer', [], function() {
  function WavefrontObjSerializer() {
    this.indexModifiers = { };
  };
  WavefrontObjSerializer.prototype = {
    constructor: WavefrontObjSerializer,
    serializeMtl: function(model) {
      var mtlString = [];
      var thisRef = this;
      model.materials.forEach(function(material) {
        thisRef.serializeMaterial(mtlString, material);
      });
      return mtlString.join('\n');
    },
    serializeMaterial: function(mtlString, material) {
      mtlString.push('newmtl ' + material.name);
      var textureMaps = material.textureMaps;
      var thisRef = this;
      Object.keys(textureMaps).forEach(function(textureMapType) {
        thisRef.serializeTextureMap(mtlString, textureMapType, textureMaps[textureMapType]);
      });
    },
    serializeTextureMap: function(mtlString, textureMapType, textureMapName) {
      if (!textureMapName) {
        return;
      }
      mtlString.push(this.getObjTextureMapType(textureMapType) + ' ' + textureMapName);
    },
    getObjTextureMapType: function(textureMapName) {
      return {
        diffuse: 'map_Kd',
        specular: 'map_K',
        normal: 'map_bump',
        emitColor: 'map_K',
        alphaMask: 'map_d',
        opacity: 'map_o'
      }[textureMapName];
    },
    serializeObj: function(model) {
      var objString = [];
      objString.push('mtllib ' + model.name + '.mtl');
      this.serializeMeshes(objString, model);
      return objString.join('\n');
    },
    serializeVectorArray: function(objString, prefix, vectorSize, array) {
      if (!array)
        return;
      for (i = 0; i < array.length; i += vectorSize) {
        var vectorLine = '';
        vectorLine += prefix;
        for (j = 0; j < vectorSize; ++j) {
          vectorLine += ' ' + array[i + j];
        }
        objString.push(vectorLine);
      }
    },
    serializeMeshes: function(objString, model) {
      this.indexModifiers.vertex = 1;
      this.indexModifiers.texCoord = 1;
      this.indexModifiers.normal = 1;
      var thisRef = this;
      model.meshes.forEach(function(mesh) {
        thisRef.serializeMesh(objString, model, mesh);
        thisRef.indexModifiers.vertex += mesh.vertices.length / 3;
        if (mesh.normals) {
          thisRef.indexModifiers.normal += mesh.normals.length / 3;
        }
        if (mesh.texCoords)  {
          thisRef.indexModifiers.texCoord += mesh.texCoords.length / 2;
        }
      });
    },
    serializeMesh: function(objString, model, mesh) {
      objString.push('o ' + mesh.name);
      if (mesh.material !== undefined) {
        objString.push('usemtl ' + model.materials[mesh.material].name);
      }
      this.serializeVectorArray(objString, 'v', 3, mesh.vertices);
      this.serializeVectorArray(objString, 'vn', 3, mesh.normals);
      this.serializeVectorArray(objString, 'vt', 2, mesh.texCoords);
      this.serializeFaces(objString, mesh.indices);
    },
    serializeFaces: function(objString, indices) {
      var type = (indices.normal && !!indices.normal.length) << 1 |
          (indices.texCoord && !!indices.texCoord.length);
      for (i = 0; i < indices.vertex.length; i += 3) {
        this.serializeFace(objString, type, indices, i);
      }
    },
    serializeFace: function(objString, type, indices, base) {
      var faceLine = 'f';
      var end = base + 3;
      for (i = base; i < end; ++i) {
        var faceIndices = {
          vertex: indices.vertex[i],
          normal: indices.normal ? indices.normal[i] : null,
          texCoord: indices.texCoord ? indices.texCoord[i] : null
        };
        faceLine += ' ' + this.getFaceComponentString(type, faceIndices);
      }
      objString.push(faceLine);
    },
    getFaceComponentString: function(type, indices) {
      var componentString = '';
      componentString += indices.vertex + this.indexModifiers.vertex;
      if (!type) {
        return componentString;
      }
      componentString += '/';
      var normalIndex = indices.normal + this.indexModifiers.normal;
      if (type == 2) {
        return componentString + '/' + normalIndex;
      }
      componentString += indices.texCoord + this.indexModifiers.texCoord;
      if (type == 1) {
        return componentString;
      }
      return componentString + '/' + normalIndex;
    }
  };
  return WavefrontObjSerializer;
});
