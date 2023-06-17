import { AdvancedDynamicTexture, Control, Button } from '@babylonjs/gui';
import { cameraState } from './main.js';

export function createGUI(canvas, scene) {  
  let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

  let button = Button.CreateSimpleButton("button", "Full Screen");
  button.width = 0.2;
  button.height = "40px";
  button.color = "white";
  button.cornerRadius = 20;
  button.background = "green";
  button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;

  button.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
  button.onPointerUpObservable.add(function() {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      button.textBlock.text = "Shrink Screen";
    } else {
      document.exitFullscreen();
      button.textBlock.text = "Full Screen";
    }
  });
  
  advancedTexture.addControl(button);   

let toggleButton = Button.CreateSimpleButton("toggleButton", "Switch to Walk Mode");
toggleButton.width = 0.2;
toggleButton.height = "40px";
toggleButton.color = "white";
toggleButton.cornerRadius = 20;
toggleButton.background = "blue";
toggleButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
toggleButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

toggleButton.onPointerUpObservable.add(function() {
  if (cameraState.camera.flyModeEnabled) {
      // Switch to Walk mode
      cameraState.camera.flyModeEnabled = false;
      cameraState.camera.applyGravity = true;
      cameraState.camera.checkCollisions = true;
      cameraState.camera.speed = -1;
      toggleButton.textBlock.text = "Switch to Fly Mode";
  } else {
      // Switch to Fly mode
      cameraState.camera.flyModeEnabled = true;
      cameraState.camera.applyGravity = false;
      cameraState.camera.checkCollisions = false;
      cameraState.camera.speed = 1;
      toggleButton.textBlock.text = "Switch to Walk Mode";
  }});

advancedTexture.addControl(toggleButton);

}
