// WorkCanvas Module - Visual Collaboration Tool
class CanvasManager {
    constructor() {
        this.canvases = [];
        this.currentCanvas = null;
        this.canvasElements = [];
        this.selectedElement = null;
        this.isDrawing = false;
        this.isDragging = false;
        this.init();
    }

    init() {
        this.loadCanvasData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('mousedown', (e) => {
            if (e.target.closest('.canvas-container')) {
                this.handleCanvasMouseDown(e);
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDrawing || this.isDragging) {
                this.handleCanvasMouseMove(e);
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (this.isDrawing || this.isDragging) {
                this.handleCanvasMouseUp(e);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Delete' && this.selectedElement) {
                this.deleteSelectedElement();
            }
        });
    }

    async loadCanvasData() {
        this.canvases = [
            {
                id: 'canvas-1',
                name: 'Q4 Marketing Strategy',
                description: 'Visual planning for Q4 marketing initiatives',
                created: '2024-01-15',
                modified: '2024-01-18',
                collaborators: 5,
                elements: [],
                shared: true,
                template: false
            },
            {
                id: 'canvas-2',
                name: 'Product Roadmap 2024',
                description: 'Product development timeline and milestones',
                created: '2024-01-10',
                modified: '2024-01-17',
                collaborators: 8,
                elements: [],
                shared: true,
                template: false
            },
            {
                id: 'canvas-3',
                name: 'Team Workflow Diagram',
                description: 'Visual representation of team processes',
                created: '2024-01-12',
                modified: '2024-01-16',
                collaborators: 3,
                elements: [],
                shared: false,
                template: false
            }
        ];

        this.templates = [
            {
                id: 'template-1',
                name: 'Project Planning',
                description: 'Template for project planning and timeline',
                category: 'Project Management',
                preview: 'project-planning-preview',
                elements: [
                    { type: 'sticky', x: 100, y: 100, text: 'Project Goals', color: '#00C875' },
                    { type: 'sticky', x: 300, y: 100, text: 'Timeline', color: '#627EEA' },
                    { type: 'sticky', x: 500, y: 100, text: 'Resources', color: '#FFAB00' }
                ]
            },
            {
                id: 'template-2',
                name: 'Brainstorming',
                description: 'Template for creative brainstorming sessions',
                category: 'Creative',
                preview: 'brainstorming-preview',
                elements: [
                    { type: 'sticky', x: 150, y: 150, text: 'Ideas', color: '#FF6D00' },
                    { type: 'sticky', x: 350, y: 150, text: 'Concepts', color: '#00B8D9' },
                    { type: 'sticky', x: 550, y: 150, text: 'Solutions', color: '#00C875' }
                ]
            },
            {
                id: 'template-3',
                name: 'Sprint Planning',
                description: 'Template for agile sprint planning',
                category: 'Development',
                preview: 'sprint-planning-preview',
                elements: [
                    { type: 'sticky', x: 100, y: 100, text: 'Backlog', color: '#E91E63' },
                    { type: 'sticky', x: 300, y: 100, text: 'Sprint Goals', color: '#627EEA' },
                    { type: 'sticky', x: 500, y: 100, text: 'Tasks', color: '#00C875' }
                ]
            }
        ];

        this.renderCanvas();
    }

    renderCanvas() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="canvas-container">
                <div class="canvas-header">
                    <h1>WorkCanvas - Visual Collaboration</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="createNewCanvas()">
                            <i class="fas fa-plus"></i> New Canvas
                        </button>
                        <button class="btn btn-secondary" onclick="showTemplates()">
                            <i class="fas fa-shapes"></i> Templates
                        </button>
                        <button class="btn btn-secondary" onclick="importCanvas()">
                            <i class="fas fa-upload"></i> Import
                        </button>
                    </div>
                </div>

                <div class="canvas-tabs">
                    <button class="tab-btn active" onclick="switchCanvasTab('my-canvases')">My Canvases</button>
                    <button class="tab-btn" onclick="switchCanvasTab('shared')">Shared with Me</button>
                    <button class="tab-btn" onclick="switchCanvasTab('templates')">Templates</button>
                    <button class="tab-btn" onclick="switchCanvasTab('recent')">Recent</button>
                </div>

                <div class="canvas-content">
                    ${this.renderCanvasesGrid()}
                </div>
            </div>
        `;
    }

    renderCanvasesGrid() {
        return `
            <div class="canvases-grid">
                ${this.canvases.map(canvas => this.renderCanvasCard(canvas)).join('')}
                <div class="canvas-card create-new" onclick="createNewCanvas()">
                    <div class="create-new-content">
                        <i class="fas fa-plus-circle"></i>
                        <h3>Create New Canvas</h3>
                        <p>Start with a blank canvas or use a template</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderCanvasCard(canvas) {
        return `
            <div class="canvas-card" data-canvas-id="${canvas.id}" onclick="openCanvas('${canvas.id}')">
                <div class="canvas-preview">
                    <div class="preview-placeholder">
                        <i class="fas fa-palette"></i>
                    </div>
                    ${canvas.shared ? '<div class="shared-badge"><i class="fas fa-share-alt"></i></div>' : ''}
                </div>
                <div class="canvas-info">
                    <h3>${canvas.name}</h3>
                    <p>${canvas.description}</p>
                    <div class="canvas-meta">
                        <span class="collaborators">
                            <i class="fas fa-users"></i> ${canvas.collaborators}
                        </span>
                        <span class="modified">
                            <i class="fas fa-clock"></i> ${canvas.modified}
                        </span>
                    </div>
                </div>
                <div class="canvas-actions">
                    <button class="action-btn" onclick="duplicateCanvas('${canvas.id}', event)">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="action-btn" onclick="shareCanvas('${canvas.id}', event)">
                        <i class="fas fa-share"></i>
                    </button>
                    <button class="action-btn" onclick="deleteCanvas('${canvas.id}', event)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderTemplatesView() {
        return `
            <div class="templates-view">
                <div class="templates-header">
                    <h2>Canvas Templates</h2>
                    <div class="template-filters">
                        <select class="filter-select" onchange="filterTemplates(this.value)">
                            <option value="">All Categories</option>
                            <option value="Project Management">Project Management</option>
                            <option value="Creative">Creative</option>
                            <option value="Development">Development</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                </div>
                <div class="templates-grid">
                    ${this.templates.map(template => this.renderTemplateCard(template)).join('')}
                </div>
            </div>
        `;
    }

    renderTemplateCard(template) {
        return `
            <div class="template-card" data-template-id="${template.id}" onclick="useTemplate('${template.id}')">
                <div class="template-preview">
                    <div class="preview-placeholder">
                        <i class="fas fa-shapes"></i>
                    </div>
                    <div class="template-category">${template.category}</div>
                </div>
                <div class="template-info">
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                </div>
                <button class="btn btn-primary use-template-btn">
                    Use Template
                </button>
            </div>
        `;
    }

    renderCanvasEditor(canvasId) {
        const canvas = this.canvases.find(c => c.id === canvasId);
        if (!canvas) return;

        return `
            <div class="canvas-editor">
                <div class="editor-toolbar">
                    <div class="toolbar-left">
                        <button class="btn btn-secondary" onclick="backToCanvases()">
                            <i class="fas fa-arrow-left"></i> Back
                        </button>
                        <div class="canvas-title">
                            <input type="text" value="${canvas.name}" class="canvas-name-input" onchange="updateCanvasName('${canvasId}', this.value)">
                        </div>
                    </div>
                    <div class="toolbar-center">
                        <div class="tool-group">
                            <button class="tool-btn ${this.currentTool === 'select' ? 'active' : ''}" onclick="selectTool('select')" title="Select">
                                <i class="fas fa-mouse-pointer"></i>
                            </button>
                            <button class="tool-btn ${this.currentTool === 'sticky' ? 'active' : ''}" onclick="selectTool('sticky')" title="Sticky Note">
                                <i class="fas fa-sticky-note"></i>
                            </button>
                            <button class="tool-btn ${this.currentTool === 'text' ? 'active' : ''}" onclick="selectTool('text')" title="Text">
                                <i class="fas fa-font"></i>
                            </button>
                            <button class="tool-btn ${this.currentTool === 'shape' ? 'active' : ''}" onclick="selectTool('shape')" title="Shape">
                                <i class="fas fa-shapes"></i>
                            </button>
                            <button class="tool-btn ${this.currentTool === 'draw' ? 'active' : ''}" onclick="selectTool('draw')" title="Draw">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="tool-btn ${this.currentTool === 'line' ? 'active' : ''}" onclick="selectTool('line')" title="Line">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button class="tool-btn ${this.currentTool === 'arrow' ? 'active' : ''}" onclick="selectTool('arrow')" title="Arrow">
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                        <div class="tool-group">
                            <button class="color-btn" onclick="showColorPicker()" style="background-color: ${this.currentColor}" title="Color">
                            </button>
                            <div class="color-palette">
                                <div class="color-option" style="background-color: #00C875" onclick="setColor('#00C875')"></div>
                                <div class="color-option" style="background-color: #627EEA" onclick="setColor('#627EEA')"></div>
                                <div class="color-option" style="background-color: #FFAB00" onclick="setColor('#FFAB00')"></div>
                                <div class="color-option" style="background-color: #FF6D00" onclick="setColor('#FF6D00')"></div>
                                <div class="color-option" style="background-color: #E91E63" onclick="setColor('#E91E63')"></div>
                                <div class="color-option" style="background-color: #9C27B0" onclick="setColor('#9C27B0')"></div>
                            </div>
                        </div>
                    </div>
                    <div class="toolbar-right">
                        <button class="btn btn-secondary" onclick="undoAction()" title="Undo">
                            <i class="fas fa-undo"></i>
                        </button>
                        <button class="btn btn-secondary" onclick="redoAction()" title="Redo">
                            <i class="fas fa-redo"></i>
                        </button>
                        <button class="btn btn-secondary" onclick="zoomIn()" title="Zoom In">
                            <i class="fas fa-search-plus"></i>
                        </button>
                        <button class="btn btn-secondary" onclick="zoomOut()" title="Zoom Out">
                            <i class="fas fa-search-minus"></i>
                        </button>
                        <button class="btn btn-secondary" onclick="shareCanvas('${canvasId}')" title="Share">
                            <i class="fas fa-share"></i>
                        </button>
                        <button class="btn btn-primary" onclick="saveCanvas('${canvasId}')" title="Save">
                            <i class="fas fa-save"></i> Save
                        </button>
                    </div>
                </div>

                <div class="editor-workspace">
                    <div class="canvas-grid" id="canvasGrid" onmousedown="handleCanvasMouseDown(event)" onmousemove="handleCanvasMouseMove(event)" onmouseup="handleCanvasMouseUp(event)">
                        ${canvas.elements.map(element => this.renderCanvasElement(element)).join('')}
                    </div>
                </div>

                <div class="editor-sidebar">
                    <div class="sidebar-section">
                        <h3>Layers</h3>
                        <div class="layers-list">
                            ${canvas.elements.map((element, index) => `
                                <div class="layer-item" data-element-id="${element.id}">
                                    <span>${element.type} ${index + 1}</span>
                                    <div class="layer-controls">
                                        <button onclick="toggleElementVisibility('${element.id}')">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button onclick="deleteElement('${element.id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="sidebar-section">
                        <h3>Properties</h3>
                        <div class="properties-panel">
                            ${this.selectedElement ? this.renderPropertiesPanel() : '<p>No element selected</p>'}
                        </div>
                    </div>
                </div>

                <div class="collaboration-panel">
                    <h4>Active Collaborators</h4>
                    <div class="collaborators-list">
                        <div class="collaborator">
                            <img src="https://picsum.photos/seed/user1/32/32" alt="You">
                            <span>You (Owner)</span>
                        </div>
                        <div class="collaborator">
                            <img src="https://picsum.photos/seed/user2/32/32" alt="Sarah">
                            <span>Sarah Chen</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCanvasElement(element) {
        switch(element.type) {
            case 'sticky':
                return `
                    <div class="canvas-element sticky-note" 
                         style="left: ${element.x}px; top: ${element.y}px; background-color: ${element.color}"
                         data-element-id="${element.id}"
                         onmousedown="selectElement('${element.id}')">
                        <div class="sticky-content">${element.text || 'Double-click to edit'}</div>
                    </div>
                `;
            case 'text':
                return `
                    <div class="canvas-element text-element" 
                         style="left: ${element.x}px; top: ${element.y}px;"
                         data-element-id="${element.id}"
                         onmousedown="selectElement('${element.id}')">
                        <div class="text-content">${element.text || 'Text'}</div>
                    </div>
                `;
            case 'shape':
                return `
                    <div class="canvas-element shape-element" 
                         style="left: ${element.x}px; top: ${element.y}px; width: ${element.width || 100}px; height: ${element.height || 100}px; background-color: ${element.color}"
                         data-element-id="${element.id}"
                         onmousedown="selectElement('${element.id}')">
                    </div>
                `;
            default:
                return '';
        }
    }

    renderPropertiesPanel() {
        if (!this.selectedElement) return '';

        return `
            <div class="property-group">
                <label>Position</label>
                <div class="property-row">
                    <input type="number" value="${this.selectedElement.x}" onchange="updateElementProperty('x', this.value)">
                    <input type="number" value="${this.selectedElement.y}" onchange="updateElementProperty('y', this.value)">
                </div>
            </div>
            <div class="property-group">
                <label>Size</label>
                <div class="property-row">
                    <input type="number" value="${this.selectedElement.width || 100}" onchange="updateElementProperty('width', this.value)">
                    <input type="number" value="${this.selectedElement.height || 100}" onchange="updateElementProperty('height', this.value)">
                </div>
            </div>
            <div class="property-group">
                <label>Color</label>
                <input type="color" value="${this.selectedElement.color || '#00C875'}" onchange="updateElementProperty('color', this.value)">
            </div>
        `;
    }

    handleCanvasMouseDown(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.currentTool === 'sticky') {
            this.addStickyNote(x, y);
        } else if (this.currentTool === 'text') {
            this.addTextElement(x, y);
        } else if (this.currentTool === 'shape') {
            this.addShape(x, y);
        } else if (this.currentTool === 'draw') {
            this.isDrawing = true;
            this.startDrawing(x, y);
        }
    }

    handleCanvasMouseMove(e) {
        if (!this.isDrawing && !this.isDragging) return;

        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.isDrawing) {
            this.continueDrawing(x, y);
        }
    }

    handleCanvasMouseUp(e) {
        if (this.isDrawing) {
            this.finishDrawing();
            this.isDrawing = false;
        }
        this.isDragging = false;
    }

    addStickyNote(x, y) {
        const element = {
            id: `element-${Date.now()}`,
            type: 'sticky',
            x: x,
            y: y,
            text: 'New Note',
            color: this.currentColor || '#00C875'
        };

        this.currentCanvas.elements.push(element);
        this.refreshCanvas();
    }

    addTextElement(x, y) {
        const element = {
            id: `element-${Date.now()}`,
            type: 'text',
            x: x,
            y: y,
            text: 'Text',
            fontSize: 16,
            color: '#2E2E36'
        };

        this.currentCanvas.elements.push(element);
        this.refreshCanvas();
    }

    addShape(x, y) {
        const element = {
            id: `element-${Date.now()}`,
            type: 'shape',
            x: x,
            y: y,
            width: 100,
            height: 100,
            color: this.currentColor || '#627EEA'
        };

        this.currentCanvas.elements.push(element);
        this.refreshCanvas();
    }

    selectElement(elementId) {
        this.selectedElement = this.currentCanvas.elements.find(e => e.id === elementId);
        this.refreshCanvas();
    }

    selectTool(tool) {
        this.currentTool = tool;
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.closest('.tool-btn').classList.add('active');
    }

    setColor(color) {
        this.currentColor = color;
        document.querySelector('.color-btn').style.backgroundColor = color;
    }

    refreshCanvas() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = this.renderCanvasEditor(this.currentCanvas.id);
    }
}

// Global functions
function loadCanvas() {
    if (!window.canvasManager) {
        window.canvasManager = new CanvasManager();
    } else {
        window.canvasManager.renderCanvas();
    }
}

function switchCanvasTab(tab) {
    document.querySelectorAll('.canvas-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const contentArea = document.querySelector('.canvas-content');
    const canvasManager = window.canvasManager;

    switch(tab) {
        case 'my-canvases':
            contentArea.innerHTML = canvasManager.renderCanvasesGrid();
            break;
        case 'shared':
            contentArea.innerHTML = '<div class="placeholder">Shared canvases view coming soon...</div>';
            break;
        case 'templates':
            contentArea.innerHTML = canvasManager.renderTemplatesView();
            break;
        case 'recent':
            contentArea.innerHTML = '<div class="placeholder">Recent canvases view coming soon...</div>';
            break;
    }
}

function createNewCanvas() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Create New Canvas</h3>
                <button class="modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Canvas Name</label>
                    <input type="text" class="form-control" id="canvasName" placeholder="Enter canvas name">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" id="canvasDescription" placeholder="What's this canvas for?"></textarea>
                </div>
                <div class="form-group">
                    <label>Start with template?</label>
                    <select class="form-control" id="canvasTemplate">
                        <option value="">Blank Canvas</option>
                        ${window.canvasManager.templates.map(template => 
                            `<option value="${template.id}">${template.name}</option>`
                        ).join('')}
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal(this)">Cancel</button>
                <button class="btn btn-primary" onclick="createCanvas()">Create Canvas</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function createCanvas() {
    const name = document.getElementById('canvasName').value;
    const description = document.getElementById('canvasDescription').value;
    const templateId = document.getElementById('canvasTemplate').value;

    if (!name) {
        showNotification('Please enter a canvas name', 'error');
        return;
    }

    const newCanvas = {
        id: `canvas-${Date.now()}`,
        name: name,
        description: description,
        created: new Date().toISOString().split('T')[0],
        modified: new Date().toISOString().split('T')[0],
        collaborators: 1,
        elements: [],
        shared: false,
        template: false
    };

    // Apply template if selected
    if (templateId) {
        const template = window.canvasManager.templates.find(t => t.id === templateId);
        if (template) {
            newCanvas.elements = [...template.elements];
        }
    }

    window.canvasManager.canvases.unshift(newCanvas);
    window.canvasManager.currentCanvas = newCanvas;
    
    closeModal(document.querySelector('.modal-close'));
    openCanvas(newCanvas.id);
    showNotification('Canvas created successfully', 'success');
}

function openCanvas(canvasId) {
    const canvasManager = window.canvasManager;
    const canvas = canvasManager.canvases.find(c => c.id === canvasId);
    
    if (canvas) {
        canvasManager.currentCanvas = canvas;
        canvasManager.currentTool = 'select';
        canvasManager.currentColor = '#00C875';
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = canvasManager.renderCanvasEditor(canvasId);
    }
}

function backToCanvases() {
    window.canvasManager.renderCanvas();
}

function duplicateCanvas(canvasId, event) {
    event.stopPropagation();
    showNotification(`Duplicate canvas ${canvasId}`, 'info');
}

function shareCanvas(canvasId, event) {
    if (event) event.stopPropagation();
    showNotification(`Share canvas ${canvasId}`, 'info');
}

function deleteCanvas(canvasId, event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this canvas?')) {
        window.canvasManager.canvases = window.canvasManager.canvases.filter(c => c.id !== canvasId);
        window.canvasManager.renderCanvas();
        showNotification('Canvas deleted', 'success');
    }
}

function showTemplates() {
    switchCanvasTab('templates');
    document.querySelector('.canvas-tabs .tab-btn:nth-child(3)').click();
}

function useTemplate(templateId) {
    const template = window.canvasManager.templates.find(t => t.id === templateId);
    if (template) {
        window.canvasManager.currentCanvas = {
            id: `canvas-${Date.now()}`,
            name: template.name,
            description: template.description,
            created: new Date().toISOString().split('T')[0],
            modified: new Date().toISOString().split('T')[0],
            collaborators: 1,
            elements: [...template.elements],
            shared: false,
            template: true
        };
        
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = window.canvasManager.renderCanvasEditor(window.canvasManager.currentCanvas.id);
        showNotification('Template applied successfully', 'success');
    }
}

function importCanvas() {
    showNotification('Import canvas feature', 'info');
}

function filterTemplates(category) {
    showNotification(`Filter templates by: ${category}`, 'info');
}

function updateCanvasName(canvasId, newName) {
    const canvas = window.canvasManager.canvases.find(c => c.id === canvasId);
    if (canvas) {
        canvas.name = newName;
        showNotification('Canvas name updated', 'success');
    }
}

function selectElement(elementId) {
    window.canvasManager.selectElement(elementId);
}

function handleCanvasMouseDown(event) {
    window.canvasManager.handleCanvasMouseDown(event);
}

function handleCanvasMouseMove(event) {
    window.canvasManager.handleCanvasMouseMove(event);
}

function handleCanvasMouseUp(event) {
    window.canvasManager.handleCanvasMouseUp(event);
}

function updateElementProperty(property, value) {
    if (window.canvasManager.selectedElement) {
        window.canvasManager.selectedElement[property] = parseInt(value) || value;
        window.canvasManager.refreshCanvas();
    }
}

function deleteElement(elementId) {
    if (window.canvasManager.currentCanvas) {
        window.canvasManager.currentCanvas.elements = window.canvasManager.currentCanvas.elements.filter(e => e.id !== elementId);
        window.canvasManager.refreshCanvas();
        showNotification('Element deleted', 'success');
    }
}

function toggleElementVisibility(elementId) {
    showNotification(`Toggle visibility for ${elementId}`, 'info');
}

function deleteSelectedElement() {
    if (window.canvasManager.selectedElement) {
        deleteElement(window.canvasManager.selectedElement.id);
    }
}

function showColorPicker() {
    showNotification('Color picker', 'info');
}

function setColor(color) {
    window.canvasManager.setColor(color);
}

function undoAction() {
    showNotification('Undo action', 'info');
}

function redoAction() {
    showNotification('Redo action', 'info');
}

function zoomIn() {
    showNotification('Zoom in', 'info');
}

function zoomOut() {
    showNotification('Zoom out', 'info');
}

function saveCanvas(canvasId) {
    showNotification('Canvas saved', 'success');
}

// Add Canvas-specific styles
const canvasStyles = `
<style>
.canvas-container {
    padding: 1.5rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.canvas-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.canvas-header h1 {
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.canvas-tabs {
    display: flex;
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.canvas-tabs .tab-btn {
    flex: 1;
    padding: 1rem;
    background: none;
    border: none;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: var(--transition);
    border-bottom: 3px solid transparent;
}

.canvas-tabs .tab-btn:hover {
    background-color: var(--light-color);
}

.canvas-tabs .tab-btn.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.canvas-content {
    flex: 1;
    overflow-y: auto;
}

.canvases-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.canvas-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
}

.canvas-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.canvas-card.create-new {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 250px;
    border: 2px dashed var(--border-color);
    background-color: var(--light-color);
}

.canvas-card.create-new:hover {
    border-color: var(--primary-color);
    background-color: rgba(98, 126, 234, 0.05);
}

.create-new-content {
    text-align: center;
    color: var(--text-secondary);
}

.create-new-content i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.create-new-content h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.canvas-preview {
    height: 150px;
    background-color: var(--light-color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.preview-placeholder {
    font-size: 3rem;
    color: var(--primary-color);
    opacity: 0.3;
}

.shared-badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
}

.canvas-info {
    padding: 1rem;
}

.canvas-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
}

.canvas-info p {
    margin: 0 0 1rem 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.canvas-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.canvas-actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    gap: 0.25rem;
    opacity: 0;
    transition: opacity 0.2s;
}

.canvas-card:hover .canvas-actions {
    opacity: 1;
}

.action-btn {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    transition: var(--transition);
}

.action-btn:hover {
    background-color: var(--light-color);
    color: var(--primary-color);
}

.templates-view {
    padding: 1.5rem;
}

.templates-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.template-filters {
    display: flex;
    gap: 1rem;
}

.templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

.template-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition);
    text-align: center;
}

.template-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.template-preview {
    height: 120px;
    background-color: var(--light-color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.template-category {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.625rem;
}

.template-info {
    padding: 1rem;
}

.template-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
}

.template-info p {
    margin: 0 0 1rem 0;
    color: var(--text-secondary);
    font-size: 0.75rem;
}

.use-template-btn {
    margin: 0 1rem 1rem 1rem;
}

.canvas-editor {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.editor-toolbar {
    background-color: white;
    border-bottom: 1px solid var(--border-color);
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.toolbar-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.canvas-title {
    flex: 1;
}

.canvas-name-input {
    border: none;
    background: none;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
}

.canvas-name-input:focus {
    outline: none;
    background-color: var(--light-color);
}

.toolbar-center {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.tool-group {
    display: flex;
    align-items: center;
    background-color: var(--light-color);
    border-radius: var(--radius-sm);
    padding: 0.25rem;
}

.tool-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
    color: var(--text-secondary);
    transition: var(--transition);
}

.tool-btn:hover {
    background-color: white;
    color: var(--text-primary);
}

.tool-btn.active {
    background-color: white;
    color: var(--primary-color);
    box-shadow: var(--shadow-sm);
}

.color-btn {
    width: 32px;
    height: 32px;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-sm);
    cursor: pointer;
}

.color-palette {
    display: none;
    gap: 0.25rem;
}

.color-btn:hover + .color-palette,
.color-palette:hover {
    display: flex;
}

.color-option {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
}

.color-option:hover {
    border-color: var(--text-primary);
}

.toolbar-right {
    display: flex;
    gap: 0.5rem;
}

.editor-workspace {
    flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;
}

.canvas-grid {
    flex: 1;
    background-color: white;
    background-image: 
        linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    position: relative;
    overflow: auto;
}

.canvas-element {
    position: absolute;
    cursor: move;
    user-select: none;
}

.sticky-note {
    padding: 1rem;
    min-width: 150px;
    min-height: 150px;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-sm);
}

.sticky-content {
    color: white;
    font-size: 0.875rem;
}

.text-element {
    padding: 0.5rem;
    min-width: 100px;
}

.text-content {
    color: var(--text-primary);
    font-size: 16px;
}

.shape-element {
    border-radius: var(--radius-sm);
}

.canvas-element.selected {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.editor-sidebar {
    width: 250px;
    background-color: white;
    border-left: 1px solid var(--border-color);
    padding: 1rem;
    overflow-y: auto;
}

.sidebar-section {
    margin-bottom: 2rem;
}

.sidebar-section h3 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-secondary);
    text-transform: uppercase;
}

.layers-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.layer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
}

.layer-controls {
    display: flex;
    gap: 0.25rem;
}

.layer-controls button {
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: var(--text-secondary);
}

.properties-panel {
    font-size: 0.875rem;
}

.property-group {
    margin-bottom: 1rem;
}

.property-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
}

.property-row {
    display: flex;
    gap: 0.5rem;
}

.property-row input {
    flex: 1;
    padding: 0.375rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
}

.collaboration-panel {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1rem;
    box-shadow: var(--shadow-lg);
    width: 200px;
}

.collaboration-panel h4 {
    margin: 0 0 0.75rem 0;
    font-size: 0.875rem;
    color: var(--text-primary);
}

.collaborators-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.collaborator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
}

.collaborator img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.placeholder {
    padding: 3rem;
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', canvasStyles);