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
  let selectedComponent = null;
  let layout = [];

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
  function addUIComponent(type, x, y, props = {}) {
    const el = document.createElement('div');
    el.className = 'ui-component';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.setAttribute('data-type', type);
    el.setAttribute('draggable', 'true');
    el.tabIndex = 0;
    // Set default properties
    let defaultProps = { text: type.charAt(0).toUpperCase() + type.slice(1), width: 100, height: 32 };
    if (type === 'image') defaultProps.src = '';
    if (type === 'input') defaultProps.placeholder = 'Enter text';
    if (type === 'switch') defaultProps.checked = false;
    if (type === 'slider') { defaultProps.min = 0; defaultProps.max = 100; defaultProps.value = 50; }
    if (type === 'dropdown') defaultProps.options = 'Option 1,Option 2';
    if (type === 'checkbox') defaultProps.checked = false;
    if (type === 'progressbar') { defaultProps.value = 50; defaultProps.max = 100; }
    if (type === 'datepicker') defaultProps.value = '';
    props = { ...defaultProps, ...props };
    // Render preview in canvas
    if (type === 'button') {
      el.innerText = props.text || 'Button';
    } else if (type === 'label') {
      el.innerText = props.text || 'Label';
    } else if (type === 'image') {
      el.innerText = '[Image]';
    } else if (type === 'input') {
      el.innerText = props.placeholder || 'Input';
    } else if (type === 'switch') {
      el.innerText = 'Switch';
    } else if (type === 'slider') {
      el.innerText = 'Slider';
    } else if (type === 'dropdown') {
      el.innerText = 'Dropdown';
    } else if (type === 'checkbox') {
      el.innerText = 'Checkbox';
    } else if (type === 'progressbar') {
      el.innerText = 'ProgressBar';
    } else if (type === 'datepicker') {
      el.innerText = 'DatePicker';
    }
    el.style.width = (props.width || 100) + 'px';
    el.style.height = (props.height || 32) + 'px';
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
      updateLayoutFromCanvas();
      updatePreview();
    });
    // Select component for editing
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      selectComponent(el);
    });
    // Store properties on element
    el._props = props;
    canvas.appendChild(el);
    // Add to layout
    layout.push({ type, x, y, props });
    updatePreview();
  }

  // Select a component and show property editor
  function selectComponent(el) {
    selectedComponent = el;
    const form = document.getElementById('property-form');
    form.innerHTML = '';
    const type = el.getAttribute('data-type');
    const props = el._props || {};
    // Editable properties by type
    let fields = [
      { label: 'Width', key: 'width', type: 'number' },
      { label: 'Height', key: 'height', type: 'number' }
    ];
    if (type === 'button' || type === 'label') fields.unshift({ label: 'Text', key: 'text', type: 'text' });
    if (type === 'image') fields.push({ label: 'Image URL', key: 'src', type: 'text' });
    if (type === 'input') fields.push({ label: 'Placeholder', key: 'placeholder', type: 'text' });
    if (type === 'switch') fields.push({ label: 'Checked', key: 'checked', type: 'checkbox' });
    if (type === 'slider') {
      fields.push({ label: 'Min', key: 'min', type: 'number' });
      fields.push({ label: 'Max', key: 'max', type: 'number' });
      fields.push({ label: 'Value', key: 'value', type: 'number' });
    }
    if (type === 'dropdown') fields.push({ label: 'Options (comma separated)', key: 'options', type: 'text' });
    fields.forEach(f => {
      const label = document.createElement('label');
      label.innerText = f.label;
      let input;
      if (f.type === 'checkbox') {
        input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = !!props[f.key];
        input.addEventListener('change', () => {
          el._props[f.key] = input.checked;
          updateLayoutFromCanvas();
          updatePreview();
        });
      } else {
        input = document.createElement('input');
        input.type = f.type;
        input.value = props[f.key] || '';
        input.addEventListener('input', () => {
          el._props[f.key] = f.type === 'number' ? Number(input.value) : input.value;
          if (f.key === 'text' && (type === 'button' || type === 'label')) el.innerText = input.value;
          updateLayoutFromCanvas();
          updatePreview();
        });
      }
      form.appendChild(label);
      form.appendChild(input);
    });
  }

  // Deselect on canvas click
  canvas.addEventListener('click', () => {
    selectedComponent = null;
    document.getElementById('property-form').innerHTML = '';
  });

  // Save/load layout
  document.getElementById('save-layout').onclick = () => {
    updateLayoutFromCanvas();
    const data = JSON.stringify(layout, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'layout.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  document.getElementById('load-layout').onclick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const arr = JSON.parse(evt.target.result);
          loadLayout(arr);
        } catch (err) { alert('Invalid layout file'); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  function updateLayoutFromCanvas() {
    layout = [];
    canvas.querySelectorAll('.ui-component').forEach(el => {
      const type = el.getAttribute('data-type');
      const x = parseInt(el.style.left);
      const y = parseInt(el.style.top);
      const props = el._props || {};
      layout.push({ type, x, y, props });
    });
  }

  function loadLayout(arr) {
    layout = arr;
    canvas.innerHTML = '';
    arr.forEach(item => {
      addUIComponent(item.type, item.x, item.y, item.props);
    });
    updatePreview();
  }

  // Connect to real-time mobile preview
    if (type === 'progressbar') {
      fields.push({ label: 'Value', key: 'value', type: 'number' });
      fields.push({ label: 'Max', key: 'max', type: 'number' });
    }
    if (type === 'datepicker') fields.push({ label: 'Value', key: 'value', type: 'date' });
  function updatePreview() {
    // Render a simple mobile preview based on layout
    let html = '<html><body style="margin:0;padding:0;font-family:sans-serif;background:#fafafa;">';
    layout.forEach(item => {
      const style = `position:absolute;left:${item.x}px;top:${item.y}px;width:${item.props.width||100}px;height:${item.props.height||32}px;`;
      if (item.type === 'button') {
        html += `<button style="${style}">${item.props.text||'Button'}</button>`;
      } else if (item.type === 'label') {
        html += `<div style="${style};display:flex;align-items:center;justify-content:center;">${item.props.text||'Label'}</div>`;
      } else if (item.type === 'image') {
        html += `<img src="${item.props.src||''}" style="${style}" alt="Image"/>`;
      } else if (item.type === 'input') {
        html += `<input type="text" placeholder="${item.props.placeholder||''}" style="${style}"/>`;
      } else if (item.type === 'switch') {
        html += `<label style="${style};display:flex;align-items:center;"><input type="checkbox" ${item.props.checked?'checked':''}/> Switch</label>`;
      } else if (item.type === 'slider') {
        html += `<input type="range" min="${item.props.min||0}" max="${item.props.max||100}" value="${item.props.value||50}" style="${style}"/>`;
      } else if (item.type === 'dropdown') {
        const opts = (item.props.options||'').split(',').map(o=>`<option>${o.trim()}</option>`).join('');
        html += `<select style="${style}">${opts}</select>`;
      } else if (item.type === 'checkbox') {
        html += `<label style="${style};display:flex;align-items:center;"><input type="checkbox" ${item.props.checked?'checked':''}/> Checkbox</label>`;
      } else if (item.type === 'progressbar') {
        html += `<progress style="${style}" value="${item.props.value||0}" max="${item.props.max||100}"></progress>`;
      } else if (item.type === 'datepicker') {
        html += `<input type="date" value="${item.props.value||''}" style="${style}"/>`;
      }
    });
    html += '</body></html>';
    previewFrame.srcdoc = html;
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
