export class Ruler {
  constructor(scene, advancedTexture) {
    this.scene = scene;
    this.advancedTexture = advancedTexture;
    this.startPoint = null;
    this.endPoint = null;
    this.line = null;
    this.isStartPointSet = false;
    this.label = null;

    this.scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERDOWN:
                var pickedMesh = pointerInfo.pickInfo.pickedMesh;
                if (pickedMesh) {
                    var pickedPoint = pointerInfo.pickInfo.pickedPoint;
                    var closestVertex = this.getClosestVertex(pickedMesh, pickedPoint);
                    if (!this.isStartPointSet) {
                        this.setStartPoint(closestVertex);
                        this.isStartPointSet = true;
                    } else {
                        this.setEndPoint(closestVertex);
                        this.draw();
                        this.isStartPointSet = false;
                    }
                }
                break;
        }
    });
  }

  getClosestVertex(mesh, point) {
    var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    var closestVertex = null;
    var closestDistance = Infinity;
    for (var i = 0; i < positions.length; i += 3) {
        var vertex = new BABYLON.Vector3(positions[i], positions[i + 1], positions[i + 2]);
        var distance = BABYLON.Vector3.Distance(vertex, point);
        if (distance < closestDistance) {
            closestVertex = vertex;
            closestDistance = distance;
        }
    }
    return closestVertex;
  }


  setStartPoint(point) {
      this.startPoint = point;
  }

  setEndPoint(point) {
      this.endPoint = point;
  }

  draw() {
      if (this.line) {
          this.line.dispose();
      }

      if (this.label) {
          this.label.dispose();
      }

      const points = [this.startPoint, this.endPoint];
      this.line = BABYLON.MeshBuilder.CreateLines("rulerLine", {points: points}, this.scene);
      this.line.color = new BABYLON.Color3(1, 0, 0);

      const midPoint = BABYLON.Vector3.Center(this.startPoint, this.endPoint);
      var midPointMesh = BABYLON.MeshBuilder.CreateBox("midPointMesh", {size: 0.1}, this.scene);
      midPointMesh.position = midPoint;

      this.label = new BABYLON.GUI.Rectangle("label");
      this.label.background = "black";
      this.label.height = "30px";
      this.label.width = "100px";
      this.label.color = "white";
      this.label.thickness = 1;
      this.label.linkOffsetY = -30;

      const textBlock = new BABYLON.GUI.TextBlock();
      textBlock.text = this.measure().toString();
      textBlock.color = "white";

      this.label.addControl(textBlock);
      this.advancedTexture.addControl(this.label);  // add the control to the advancedTexture
      this.label.linkWithMesh(midPointMesh);  // link the control with the mesh
  }

  measure() {
      if (!this.startPoint || !this.endPoint) {
          console.error("Both start and end points must be set to measure.");
          return;
      }

      return BABYLON.Vector3.Distance(this.startPoint, this.endPoint);
  }
}
