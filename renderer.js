  // In-app help modal logic
  document.getElementById('help-btn').onclick = () => {
    document.getElementById('help-modal').style.display = 'block';
  };
  document.getElementById('close-help-modal').onclick = () => {
    document.getElementById('help-modal').style.display = 'none';
  };
  // Pre-built templates
  const templates = {
    hello: {
      layout: [
        {id:'comp_1', type:'button', x:60, y:100, props:{text:'Say Hello',width:120,height:40}}
      ],
      blockly: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="controls_if" x="10" y="10"></block></xml>',
      eventBlocklies: {
        'comp_1_onClick': '<xml xmlns="https://developers.google.com/blockly/xml"><block type="text_print" x="10" y="10"><value name="TEXT"><shadow type="text"><field name="TEXT">Hello, World!</field></shadow></value></block></xml>'
      }
    },
    form: {
      layout: [
        {id:'comp_2', type:'label', x:40, y:60, props:{text:'Name:',width:60,height:32}},
        {id:'comp_3', type:'input', x:110, y:60, props:{placeholder:'Enter name',width:120,height:32}},
        {id:'comp_4', type:'button', x:40, y:110, props:{text:'Submit',width:100,height:40}}
      ],
      blockly: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="controls_if" x="10" y="10"></block></xml>',
      eventBlocklies: {
        'comp_4_onClick': '<xml xmlns="https://developers.google.com/blockly/xml"><block type="text_print" x="10" y="10"><value name="TEXT"><shadow type="text"><field name="TEXT">Submitted!</field></shadow></value></block></xml>'
      }
    },
    counter: {
      layout: [
        {id:'comp_5', type:'label', x:60, y:60, props:{text:'0',width:60,height:32}},
        {id:'comp_6', type:'button', x:60, y:110, props:{text:'Increment',width:100,height:40}}
      ],
      blockly: '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
      eventBlocklies: {
        'comp_6_onClick': '<xml xmlns="https://developers.google.com/blockly/xml"><block type="variables_set" x="10" y="10"><field name="VAR">count</field><value name="VALUE"><block type="math_arithmetic"><field name="OP">ADD</field><value name="A"><block type="variables_get"><field name="VAR">count</field></block></value><value name="B"><block type="math_number"><field name="NUM">1</field></block></value></block></value></block><block type="text_print" x="10" y="80"><value name="TEXT"><block type="variables_get"><field name="VAR">count</field></block></value></block></xml>'
      }
    },
    survey: {
      layout: [
        {id:'comp_7', type:'label', x:40, y:40, props:{text:'Survey:',width:80,height:32}},
        {id:'comp_8', type:'dropdown', x:130, y:40, props:{options:'Yes,No,Maybe',width:100,height:32}},
        {id:'comp_9', type:'button', x:40, y:90, props:{text:'Submit',width:100,height:40}}
      ],
      blockly: '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
      eventBlocklies: {
        'comp_9_onClick': '<xml xmlns="https://developers.google.com/blockly/xml"><block type="text_print" x="10" y="10"><value name="TEXT"><shadow type="text"><field name="TEXT">Survey submitted!</field></shadow></value></block></xml>'
      }
    },
    imageview: {
      layout: [
        {id:'comp_10', type:'image', x:60, y:60, props:{src:'https://placekitten.com/200/200',width:120,height:120}},
        {id:'comp_11', type:'label', x:60, y:200, props:{text:'Cute Kitten',width:120,height:32}}
      ],
      blockly: '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
      eventBlocklies: {}
    },
    login: {
      layout: [
        {id:'comp_12', type:'label', x:60, y:60, props:{text:'Login',width:120,height:32}},
        {id:'comp_13', type:'input', x:60, y:110, props:{placeholder:'Username',width:140,height:32}},
        {id:'comp_14', type:'input', x:60, y:150, props:{placeholder:'Password',width:140,height:32}},
        {id:'comp_15', type:'button', x:60, y:200, props:{text:'Sign In',width:100,height:40}}
      ],
      blockly: '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
      eventBlocklies: {
        'comp_15_onClick': '<xml xmlns="https://developers.google.com/blockly/xml"><block type="text_print" x="10" y="10"><value name="TEXT"><shadow type="text"><field name="TEXT">Login pressed!</field></shadow></value></block></xml>'
      }
    },
    todo: {
      layout: [
        {id:'comp_16', type:'label', x:40, y:40, props:{text:'To-Do List',width:120,height:32}},
        {id:'comp_17', type:'input', x:40, y:90, props:{placeholder:'Add new task',width:140,height:32}},
        {id:'comp_18', type:'button', x:190, y:90, props:{text:'Add',width:60,height:32}},
        {id:'comp_19', type:'label', x:40, y:140, props:{text:'• Sample Task',width:180,height:32}}
      ],
      blockly: '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
      eventBlocklies: {
        'comp_18_onClick': '<xml xmlns="https://developers.google.com/blockly/xml"><block type="text_print" x="10" y="10"><value name="TEXT"><shadow type="text"><field name="TEXT">Add button pressed!</field></shadow></value></block></xml>'
      }
    },
    weather: {
      layout: [
        {id:'comp_20', type:'label', x:60, y:60, props:{text:'Weather',width:120,height:32}},
        {id:'comp_21', type:'label', x:60, y:100, props:{text:'🌤️ 25°C',width:120,height:32}},
        {id:'comp_22', type:'label', x:60, y:140, props:{text:'Sunny',width:120,height:32}}
      ],
      blockly: '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
      eventBlocklies: {}
    },
    profile: {
      layout: [
        {id:'comp_23', type:'label', x:60, y:60, props:{text:'👤 John Doe',width:140,height:32}},
        {id:'comp_24', type:'label', x:60, y:100, props:{text:'Email: john@example.com',width:180,height:32}},
        {id:'comp_25', type:'label', x:60, y:140, props:{text:'Location: Earth',width:180,height:32}}
      ],
      blockly: '<xml xmlns="https://developers.google.com/blockly/xml"></xml>',
      eventBlocklies: {}
    }
  };

  document.getElementById('template-select').onchange = function() {
    const val = this.value;
    if (!val || !templates[val]) return;
    // Load template layout
    layout = templates[val].layout.map(obj => ({...obj}));
    // Load UI
    canvas.innerHTML = '';
    layout.forEach(item => {
      addUIComponent(item.type, item.x, item.y, item.props);
    });
    // Load main Blockly workspace
    Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(templates[val].blockly), workspace);
    // Load event blocklies
    Object.entries(templates[val].eventBlocklies).forEach(([k, xml]) => {
      if (!eventBlocklies[k]) {
        // Create a hidden div for the mini workspace
        const tempDiv = document.createElement('div');
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);
        eventBlocklies[k] = Blockly.inject(tempDiv, {toolbox: workspace.options.toolbox});
      }
      Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(xml), eventBlocklies[k]);
    });
    updatePreview();
    updateEventMappingUI();
    this.value = '';
  };
  // Export APK button logic (placeholder)
  const fs = require('fs');
  const path = require('path');
  const { exec } = require('child_process');
  document.getElementById('export-apk').onclick = () => {
    updateLayoutFromCanvas();
    // Generate Cordova-compatible index.html
    let html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>App</title></head><body style="margin:0;padding:0;font-family:sans-serif;background:#fafafa;">';
    layout.forEach(item => {
      const style = `position:absolute;left:${item.x}px;top:${item.y}px;width:${item.props.width||100}px;height:${item.props.height||32}px;`;
      const idAttr = `id='${item.id}'`;
      if (item.type === 'button') {
        html += `<button ${idAttr} style="${style}">${item.props.text||'Button'}</button>`;
      } else if (item.type === 'label') {
        html += `<div ${idAttr} style="${style};display:flex;align-items:center;justify-content:center;">${item.props.text||'Label'}</div>`;
      } else if (item.type === 'image') {
        html += `<img ${idAttr} src="${item.props.src||''}" style="${style}" alt="Image"/>`;
      } else if (item.type === 'input') {
        html += `<input ${idAttr} type="text" placeholder="${item.props.placeholder||''}" style="${style}"/>`;
      } else if (item.type === 'switch') {
        html += `<label ${idAttr} style="${style};display:flex;align-items:center;"><input type="checkbox" ${item.props.checked?'checked':''}/> Switch</label>`;
      } else if (item.type === 'slider') {
        html += `<input ${idAttr} type="range" min="${item.props.min||0}" max="${item.props.max||100}" value="${item.props.value||50}" style="${style}"/>`;
      } else if (item.type === 'dropdown') {
        const opts = (item.props.options||'').split(',').map(o=>`<option>${o.trim()}</option>`).join('');
        html += `<select ${idAttr} style="${style}">${opts}</select>`;
      } else if (item.type === 'checkbox') {
        html += `<label ${idAttr} style="${style};display:flex;align-items:center;"><input type="checkbox" ${item.props.checked?'checked':''}/> Checkbox</label>`;
      } else if (item.type === 'progressbar') {
        html += `<progress ${idAttr} style="${style}" value="${item.props.value||0}" max="${item.props.max||100}"></progress>`;
      } else if (item.type === 'datepicker') {
        html += `<input ${idAttr} type="date" value="${item.props.value||''}" style="${style}"/>`;
      }
    });
    html += '</body></html>';
    // Write to cordovaApp/www/index.html
    const wwwPath = path.join(__dirname, 'cordovaApp', 'www');
    // Export Blockly logic as logic.js
    let logicCode = Blockly.JavaScript.workspaceToCode(workspace);
    // Add per-event logic if any
    Object.entries(eventBlocklies).forEach(([k, ws]) => {
      logicCode += '\n// Event: ' + k + '\n' + Blockly.JavaScript.workspaceToCode(ws);
    });
    fs.writeFileSync(path.join(wwwPath, 'logic.js'), logicCode, 'utf8');
    // Inject logic.js into index.html
    let htmlWithLogic = html.replace('</body>', '<script src="logic.js"></script></body>');
    fs.writeFileSync(path.join(wwwPath, 'index.html'), htmlWithLogic, 'utf8');
    // Trigger Cordova build
    exec('cd cordovaApp && cordova build android', (err, stdout, stderr) => {
      if (err) {
        alert('Cordova build failed: ' + stderr);
      } else {
        alert('APK build complete! Find your APK in cordovaApp/platforms/android/app/build/outputs/apk/');
      }
    });
  };
  // Store per-event Blockly workspaces
  const eventBlocklies = {};
  // Blockly event mapping UI
  function updateEventMappingUI() {
    const form = document.getElementById('event-mapping-form');
    if (!form) return;
    form.innerHTML = '';
    // List all components with events
    layout.forEach(item => {
      let events = [];
      if (['button', 'input', 'switch', 'slider', 'dropdown', 'checkbox', 'datepicker'].includes(item.type)) {
        if (item.type === 'button') events.push('onClick');
        else events.push('onChange');
      }
      if (events.length === 0) return;
      const compLabel = document.createElement('div');
      compLabel.innerHTML = `<strong>${item.type} (${item.id})</strong>`;
      form.appendChild(compLabel);
      events.forEach(ev => {
        const label = document.createElement('label');
        label.innerText = `Event: ${ev}`;
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit Logic';
        editBtn.style.marginLeft = '8px';
        editBtn.type = 'button';
        editBtn.onclick = () => openMiniBlockly(item.id, ev);
        form.appendChild(label);
        form.appendChild(editBtn);
      });
      form.appendChild(document.createElement('br'));
    });
  }
  // Mini Blockly editor modal logic
  let miniBlockly = null;
  function openMiniBlockly(compId, eventName) {
    const modal = document.getElementById('mini-blockly-modal');
    const area = document.getElementById('mini-blockly-area');
    const title = document.getElementById('mini-blockly-title');
    if (!modal || !area || !title) return;
    modal.style.display = 'block';
    title.innerText = `Edit Logic for ${compId} (${eventName})`;
    area.innerHTML = '';
    // Create Blockly workspace for this event/component if not exists
    const key = compId + '_' + eventName;
    if (!eventBlocklies[key]) {
      eventBlocklies[key] = Blockly.inject(area, {
        toolbox: workspace.options.toolbox,
      });
    } else {
      // Move existing workspace DOM node
      area.appendChild(eventBlocklies[key].svgBlockCanvas_.parentNode.parentNode);
    }
    miniBlockly = eventBlocklies[key];
  }
  document.getElementById('close-mini-blockly').onclick = () => {
    document.getElementById('mini-blockly-modal').style.display = 'none';
    miniBlockly = null;
  };

  // Call updateEventMappingUI whenever layout changes
  const origUpdateLayoutFromCanvas = updateLayoutFromCanvas;
  updateLayoutFromCanvas = function() {
    origUpdateLayoutFromCanvas.apply(this, arguments);
    updateEventMappingUI();
  };
  // Initial call
  updateEventMappingUI();
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
  let nextComponentId = 1;
  function addUIComponent(type, x, y, props = {}) {
    const el = document.createElement('div');
    el.className = 'ui-component';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.setAttribute('data-type', type);
    el.setAttribute('draggable', 'true');
    el.tabIndex = 0;
    // Assign unique ID
    const compId = 'comp_' + nextComponentId++;
    el.setAttribute('data-id', compId);
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
    layout.push({ id: compId, type, x, y, props });
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
      const idAttr = `id='${item.id}'`;
      if (item.type === 'button') {
        html += `<button ${idAttr} style="${style}" onclick="window.parent.postMessage({event:'onClick',id:'${item.id}'},'*')">${item.props.text||'Button'}</button>`;
      } else if (item.type === 'label') {
        html += `<div ${idAttr} style="${style};display:flex;align-items:center;justify-content:center;">${item.props.text||'Label'}</div>`;
      } else if (item.type === 'image') {
        html += `<img ${idAttr} src="${item.props.src||''}" style="${style}" alt="Image"/>`;
      } else if (item.type === 'input') {
        html += `<input ${idAttr} type="text" placeholder="${item.props.placeholder||''}" style="${style}" onchange="window.parent.postMessage({event:'onChange',id:'${item.id}'},'*')"/>`;
      } else if (item.type === 'switch') {
        html += `<label ${idAttr} style="${style};display:flex;align-items:center;"><input type="checkbox" ${item.props.checked?'checked':''} onchange="window.parent.postMessage({event:'onChange',id:'${item.id}'},'*')"/> Switch</label>`;
      } else if (item.type === 'slider') {
        html += `<input ${idAttr} type="range" min="${item.props.min||0}" max="${item.props.max||100}" value="${item.props.value||50}" style="${style}" onchange="window.parent.postMessage({event:'onChange',id:'${item.id}'},'*')"/>`;
      } else if (item.type === 'dropdown') {
        const opts = (item.props.options||'').split(',').map(o=>`<option>${o.trim()}</option>`).join('');
        html += `<select ${idAttr} style="${style}" onchange="window.parent.postMessage({event:'onChange',id:'${item.id}'},'*')">${opts}</select>`;
      } else if (item.type === 'checkbox') {
        html += `<label ${idAttr} style="${style};display:flex;align-items:center;"><input type="checkbox" ${item.props.checked?'checked':''} onchange="window.parent.postMessage({event:'onChange',id:'${item.id}'},'*')"/> Checkbox</label>`;
      } else if (item.type === 'progressbar') {
        html += `<progress ${idAttr} style="${style}" value="${item.props.value||0}" max="${item.props.max||100}"></progress>`;
      } else if (item.type === 'datepicker') {
        html += `<input ${idAttr} type="date" value="${item.props.value||''}" style="${style}" onchange="window.parent.postMessage({event:'onChange',id:'${item.id}'},'*')"/>`;
      }
    });
    html += `<script>window.addEventListener('message',()=>{});</script>`;
    html += '</body></html>';
    previewFrame.srcdoc = html;
  }
  // Listen for events from preview
  window.addEventListener('message', (e) => {
    if (!e.data || !e.data.event || !e.data.id) return;
    // Find mapping
    const comp = layout.find(c => c.id === e.data.id);
    if (!comp) return;
    // Run per-event Blockly code if exists
    const key = comp.id + '_' + e.data.event;
    if (eventBlocklies[key]) {
      try {
        const code = Blockly.JavaScript.workspaceToCode(eventBlocklies[key]);
        // eslint-disable-next-line no-eval
        eval(code);
      } catch (err) {
        alert('Error running event logic: ' + err);
      }
      return;
    }
    // Fallback: run all workspace code
    try {
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      // eslint-disable-next-line no-eval
      eval(code);
    } catch (err) {
      alert('Error running Blockly code: ' + err);
    }
  });

  // Real-time mobile preview logic (placeholder)
  const previewFrame = document.getElementById('preview-frame');
  function updatePreview() {
    // For now, just show a static preview
    previewFrame.srcdoc = `<html><body><h3>Mobile Preview</h3></body></html>`;
  }
  updatePreview();

  // TODO: Listen for changes in UI designer and Blockly, update preview live
});
