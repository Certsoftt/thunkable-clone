// Renderer process for Electron (UI logic)
window.addEventListener('DOMContentLoaded', () => {
  // Initialize Blockly
  const blocklyDiv = document.getElementById('blocklyDiv');
  const workspace = Blockly.inject(blocklyDiv, {
    toolbox: {
      "kind": "flyoutToolbox",
      "contents": [
        { "kind": "block", "type": "controls_if" },
        { "kind": "block", "type": "logic_compare" },
        { "kind": "block", "type": "math_number" },
        { "kind": "block", "type": "text" }
      ]
    }
  });


  // Native UI designer: Drag-and-drop logic
  const palette = document.getElementById('ui-palette');
  const canvas = document.getElementById('ui-canvas');
  let dragType = null;

  // Handle drag start from palette
  if (palette) {
    palette.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('palette-item')) {
        dragType = e.target.getAttribute('data-type');
      }
    });
  }

  // Allow drop on canvas
  if (canvas) {
    canvas.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!dragType) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addUIComponent(dragType, x, y);
      dragType = null;
    });
  }

  // Add a UI component to the canvas
  function addUIComponent(type, x, y) {
    const el = document.createElement('div');
    el.className = 'ui-component';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.setAttribute('data-type', type);
    el.setAttribute('draggable', 'true');
    el.innerText = type.charAt(0).toUpperCase() + type.slice(1);
    // Drag within canvas
    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', '');
      el.classList.add('dragging');
      el._dragOffsetX = e.offsetX;
      el._dragOffsetY = e.offsetY;
    });
    el.addEventListener('dragend', (e) => {
      el.classList.remove('dragging');
      const rect = canvas.getBoundingClientRect();
      el.style.left = (e.clientX - rect.left - (el._dragOffsetX || 0)) + 'px';
      el.style.top = (e.clientY - rect.top - (el._dragOffsetY || 0)) + 'px';
    });
    canvas.appendChild(el);
  }

  // Real-time mobile preview logic (placeholder)
  const previewFrame = document.getElementById('preview-frame');
  function updatePreview() {
    // For now, just show a static preview
    previewFrame.srcdoc = `<html><body><h3>Mobile Preview</h3></body></html>`;
  }
  updatePreview();

  // TODO: Listen for changes in UI designer and Blockly, update preview live
});
