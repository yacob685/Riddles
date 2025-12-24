// WorkForms Module - No-Code Form Builder
class FormsManager {
    constructor() {
        this.forms = [];
        this.currentForm = null;
        this.formTemplates = [];
        this.responses = [];
        this.init();
    }

    init() {
        this.loadFormsData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.form-card')) {
                this.viewForm(e.target.closest('.form-card').dataset.formId);
            }
            if (e.target.closest('.create-form-btn')) {
                this.showCreateFormModal();
            }
            if (e.target.closest('.form-field')) {
                this.selectFormField(e.target.closest('.form-field'));
            }
        });
    }

    async loadFormsData() {
        this.forms = [
            {
                id: 'form-1',
                name: 'Customer Feedback Survey',
                description: 'Collect feedback from customers about our products and services',
                status: 'published',
                responses: 342,
                views: 1523,
                created: '2024-01-10',
                modified: '2024-01-18',
                fields: [
                    { id: 'field-1', type: 'text', label: 'Full Name', required: true },
                    { id: 'field-2', type: 'email', label: 'Email Address', required: true },
                    { id: 'field-3', type: 'dropdown', label: 'Product Used', required: true, options: ['Product A', 'Product B', 'Product C'] },
                    { id: 'field-4', type: 'rating', label: 'Overall Satisfaction', required: true },
                    { id: 'field-5', type: 'textarea', label: 'Comments', required: false }
                ],
                settings: {
                    allowSubmissions: true,
                    requireAuthentication: false,
                    limitToOneResponse: false,
                    sendConfirmationEmail: true,
                    collectEmail: true,
                    branding: {
                        logo: null,
                        primaryColor: '#627EEA',
                        backgroundColor: '#ffffff'
                    }
                },
                integrations: {
                    syncToBoard: 'board-1',
                    emailNotifications: ['support@company.com'],
                    webhookUrl: null
                }
            },
            {
                id: 'form-2',
                name: 'Employee Onboarding',
                description: 'New employee information collection and onboarding workflow',
                status: 'draft',
                responses: 0,
                views: 45,
                created: '2024-01-15',
                modified: '2024-01-17',
                fields: [
                    { id: 'field-1', type: 'text', label: 'Full Name', required: true },
                    { id: 'field-2', type: 'email', label: 'Work Email', required: true },
                    { id: 'field-3', type: 'text', label: 'Job Title', required: true },
                    { id: 'field-4', type: 'date', label: 'Start Date', required: true },
                    { id: 'field-5', type: 'file', label: 'Resume/CV', required: true }
                ],
                settings: {
                    allowSubmissions: false,
                    requireAuthentication: true,
                    limitToOneResponse: true,
                    sendConfirmationEmail: false,
                    collectEmail: false,
                    branding: {
                        logo: null,
                        primaryColor: '#00C875',
                        backgroundColor: '#ffffff'
                    }
                },
                integrations: {
                    syncToBoard: null,
                    emailNotifications: ['hr@company.com'],
                    webhookUrl: null
                }
            },
            {
                id: 'form-3',
                name: 'Event Registration',
                description: 'Registration form for upcoming company event',
                status: 'published',
                responses: 128,
                views: 892,
                created: '2024-01-08',
                modified: '2024-01-16',
                fields: [
                    { id: 'field-1', type: 'text', label: 'First Name', required: true },
                    { id: 'field-2', type: 'text', label: 'Last Name', required: true },
                    { id: 'field-3', type: 'email', label: 'Email', required: true },
                    { id: 'field-4', type: 'phone', label: 'Phone Number', required: false },
                    { id: 'field-5', type: 'checkbox', label: 'Dietary Restrictions', required: false, options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Other'] },
                    { id: 'field-6', type: 'radio', label: 'Attendance Type', required: true, options: ['In-Person', 'Virtual'] }
                ],
                settings: {
                    allowSubmissions: true,
                    requireAuthentication: false,
                    limitToOneResponse: false,
                    sendConfirmationEmail: true,
                    collectEmail: true,
                    branding: {
                        logo: null,
                        primaryColor: '#FFAB00',
                        backgroundColor: '#ffffff'
                    }
                },
                integrations: {
                    syncToBoard: 'board-2',
                    emailNotifications: ['events@company.com'],
                    webhookUrl: null
                }
            }
        ];

        this.formTemplates = [
            {
                id: 'template-1',
                name: 'Contact Form',
                description: 'Basic contact information collection',
                category: 'Contact',
                icon: 'fa-envelope',
                fields: [
                    { type: 'text', label: 'Name', required: true },
                    { type: 'email', label: 'Email', required: true },
                    { type: 'textarea', label: 'Message', required: true }
                ]
            },
            {
                id: 'template-2',
                name: 'Survey',
                description: 'Customer satisfaction survey',
                category: 'Survey',
                icon: 'fa-poll',
                fields: [
                    { type: 'text', label: 'Name', required: true },
                    { type: 'rating', label: 'Satisfaction', required: true },
                    { type: 'textarea', label: 'Feedback', required: false }
                ]
            },
            {
                id: 'template-3',
                name: 'Registration',
                description: 'Event registration form',
                category: 'Registration',
                icon: 'fa-user-plus',
                fields: [
                    { type: 'text', label: 'Name', required: true },
                    { type: 'email', label: 'Email', required: true },
                    { type: 'radio', label: 'Attendance', required: true, options: ['In-Person', 'Virtual'] }
                ]
            },
            {
                id: 'template-4',
                name: 'Application',
                description: 'Job application form',
                category: 'HR',
                icon: 'fa-briefcase',
                fields: [
                    { type: 'text', label: 'Full Name', required: true },
                    { type: 'email', label: 'Email', required: true },
                    { type: 'file', label: 'Resume', required: true }
                ]
            }
        ];

        this.fieldTypes = [
            { id: 'text', name: 'Short Text', icon: 'fa-font' },
            { id: 'textarea', name: 'Long Text', icon: 'fa-align-left' },
            { id: 'email', name: 'Email', icon: 'fa-envelope' },
            { id: 'phone', name: 'Phone', icon: 'fa-phone' },
            { id: 'number', name: 'Number', icon: 'fa-hashtag' },
            { id: 'date', name: 'Date', icon: 'fa-calendar' },
            { id: 'dropdown', name: 'Dropdown', icon: 'fa-caret-down' },
            { id: 'radio', name: 'Multiple Choice', icon: 'fa-dot-circle' },
            { id: 'checkbox', name: 'Checkboxes', icon: 'fa-check-square' },
            { id: 'rating', name: 'Rating', icon: 'fa-star' },
            { id: 'file', name: 'File Upload', icon: 'fa-upload' },
            { id: 'signature', name: 'Signature', icon: 'fa-signature' }
        ];

        this.renderForms();
    }

    renderForms() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="forms-container">
                <div class="forms-header">
                    <h1>WorkForms - No-Code Form Builder</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary create-form-btn">
                            <i class="fas fa-plus"></i> New Form
                        </button>
                        <button class="btn btn-secondary" onclick="showAIBuilder()">
                            <i class="fas fa-magic"></i> AI Builder
                        </button>
                        <button class="btn btn-secondary" onclick="importForm()">
                            <i class="fas fa-upload"></i> Import
                        </button>
                    </div>
                </div>

                <div class="forms-stats">
                    <div class="stat-card">
                        <div class="stat-icon primary">
                            <i class="fas fa-wpforms"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.forms.length}</div>
                            <div class="stat-label">Total Forms</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon success">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.forms.filter(f => f.status === 'published').length}</div>
                            <div class="stat-label">Published</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon warning">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.forms.reduce((sum, f) => sum + f.responses, 0)}</div>
                            <div class="stat-label">Total Responses</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon info">
                            <i class="fas fa-eye"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.forms.reduce((sum, f) => sum + f.views, 0)}</div>
                            <div class="stat-label">Total Views</div>
                        </div>
                    </div>
                </div>

                <div class="forms-tabs">
                    <button class="tab-btn active" onclick="switchFormsTab('all-forms')">All Forms</button>
                    <button class="tab-btn" onclick="switchFormsTab('published')">Published</button>
                    <button class="tab-btn" onclick="switchFormsTab('drafts')">Drafts</button>
                    <button class="tab-btn" onclick="switchFormsTab('templates')">Templates</button>
                    <button class="tab-btn" onclick="switchFormsTab('responses')">Responses</button>
                </div>

                <div class="forms-content">
                    ${this.renderFormsGrid()}
                </div>
            </div>
        `;
    }

    renderFormsGrid() {
        return `
            <div class="forms-grid">
                ${this.forms.map(form => this.renderFormCard(form)).join('')}
                <div class="form-card create-new" onclick="showCreateFormModal()">
                    <div class="create-new-content">
                        <i class="fas fa-plus-circle"></i>
                        <h3>Create New Form</h3>
                        <p>Start from scratch or use a template</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderFormCard(form) {
        const statusColors = {
            published: '#00C875',
            draft: '#FFAB00',
            archived: '#6C757D'
        };

        return `
            <div class="form-card" data-form-id="${form.id}" onclick="editForm('${form.id}')">
                <div class="form-header">
                    <div class="form-info">
                        <h3>${form.name}</h3>
                        <p>${form.description}</p>
                    </div>
                    <div class="form-status">
                        <span class="status-badge" style="background-color: ${statusColors[form.status]}">
                            ${form.status}
                        </span>
                    </div>
                </div>

                <div class="form-stats">
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>${form.responses} responses</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-eye"></i>
                        <span>${form.views} views</span>
                    </div>
                </div>

                <div class="form-fields-preview">
                    <div class="fields-count">
                        <i class="fas fa-list"></i>
                        ${form.fields.length} fields
                    </div>
                </div>

                <div class="form-footer">
                    <div class="form-dates">
                        <span class="created">Created: ${form.created}</span>
                        <span class="modified">Modified: ${form.modified}</span>
                    </div>
                    <div class="form-actions">
                        <button class="action-btn" onclick="previewForm('${form.id}', event)">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" onclick="duplicateForm('${form.id}', event)">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="action-btn" onclick="shareForm('${form.id}', event)">
                            <i class="fas fa-share"></i>
                        </button>
                        <button class="action-btn" onclick="deleteForm('${form.id}', event)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderFormEditor(formId) {
        const form = this.forms.find(f => f.id === formId);
        if (!form) return;

        return `
            <div class="form-editor">
                <div class="editor-toolbar">
                    <div class="toolbar-left">
                        <button class="btn btn-secondary" onclick="backToForms()">
                            <i class="fas fa-arrow-left"></i> Back
                        </button>
                        <div class="form-title">
                            <input type="text" value="${form.name}" class="form-name-input" onchange="updateFormName('${formId}', this.value)">
                        </div>
                    </div>
                    <div class="toolbar-right">
                        <button class="btn btn-secondary" onclick="previewForm('${formId}')">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                        <button class="btn btn-secondary" onclick="openFormSettings('${formId}')">
                            <i class="fas fa-cog"></i> Settings
                        </button>
                        <button class="btn btn-primary" onclick="saveForm('${formId}')">
                            <i class="fas fa-save"></i> Save
                        </button>
                    </div>
                </div>

                <div class="editor-workspace">
                    <div class="form-fields-panel">
                        <h3>Form Fields</h3>
                        <div class="fields-list" id="fieldsList">
                            ${form.fields.map((field, index) => this.renderFormField(field, index)).join('')}
                        </div>
                        <button class="btn btn-secondary add-field-btn" onclick="showFieldTypes()">
                            <i class="fas fa-plus"></i> Add Field
                        </button>
                    </div>

                    <div class="form-preview-panel">
                        <div class="preview-header">
                            <h3>Form Preview</h3>
                            <div class="preview-controls">
                                <button class="btn btn-sm btn-secondary" onclick="togglePreviewMode('desktop')">
                                    <i class="fas fa-desktop"></i>
                                </button>
                                <button class="btn btn-sm btn-secondary" onclick="togglePreviewMode('tablet')">
                                    <i class="fas fa-tablet"></i>
                                </button>
                                <button class="btn btn-sm btn-secondary" onclick="togglePreviewMode('mobile')">
                                    <i class="fas fa-mobile"></i>
                                </button>
                            </div>
                        </div>
                        <div class="form-preview" id="formPreview">
                            ${this.renderFormPreview(form)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderFormField(field, index) {
        const fieldType = this.fieldTypes.find(ft => ft.id === field.type);
        const fieldIcon = fieldType ? fieldType.icon : 'fa-question';
        
        return `
            <div class="form-field" data-field-id="${field.id}" data-field-index="${index}">
                <div class="field-header">
                    <div class="field-info">
                        <i class="fas ${fieldIcon}"></i>
                        <span class="field-label">${field.label}</span>
                        ${field.required ? '<span class="required-badge">*</span>' : ''}
                    </div>
                    <div class="field-actions">
                        <button class="field-action-btn" onclick="duplicateField('${field.id}')" title="Duplicate">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="field-action-btn" onclick="deleteField('${field.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="field-action-btn drag-handle" title="Drag to reorder">
                            <i class="fas fa-grip-vertical"></i>
                        </button>
                    </div>
                </div>
                <div class="field-properties">
                    <div class="property-row">
                        <label>Field Label</label>
                        <input type="text" value="${field.label}" onchange="updateFieldProperty('${field.id}', 'label', this.value)">
                    </div>
                    <div class="property-row">
                        <label>Placeholder</label>
                        <input type="text" value="${field.placeholder || ''}" onchange="updateFieldProperty('${field.id}', 'placeholder', this.value)">
                    </div>
                    <div class="property-row">
                        <label>
                            <input type="checkbox" ${field.required ? 'checked' : ''} onchange="updateFieldProperty('${field.id}', 'required', this.checked)">
                            Required Field
                        </label>
                    </div>
                    ${(field.type === 'dropdown' || field.type === 'radio' || field.type === 'checkbox') ? `
                        <div class="property-row">
                            <label>Options</label>
                            <div class="options-list">
                                ${(field.options || []).map((option, i) => `
                                    <div class="option-row">
                                        <input type="text" value="${option}" onchange="updateFieldOption('${field.id}', ${i}, this.value)">
                                        <button class="remove-option-btn" onclick="removeFieldOption('${field.id}', ${i})">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                `).join('')}
                                <button class="add-option-btn" onclick="addFieldOption('${field.id}')">
                                    <i class="fas fa-plus"></i> Add Option
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderFormPreview(form) {
        return `
            <div class="preview-form">
                <h2 class="preview-form-title">${form.name}</h2>
                ${form.description ? `<p class="preview-form-description">${form.description}</p>` : ''}
                <form class="preview-form-content">
                    ${form.fields.map(field => this.renderPreviewField(field)).join('')}
                    <div class="preview-form-actions">
                        <button type="button" class="btn btn-secondary">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        `;
    }

    renderPreviewField(field) {
        const fieldProps = {
            id: `preview-${field.id}`,
            name: field.id,
            required: field.required || false
        };

        let fieldHTML = '';

        switch(field.type) {
            case 'text':
                fieldHTML = `
                    <div class="form-group">
                        <label>${field.label} ${field.required ? '*' : ''}</label>
                        <input type="text" class="form-control" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>
                    </div>
                `;
                break;
            case 'textarea':
                fieldHTML = `
                    <div class="form-group">
                        <label>${field.label} ${field.required ? '*' : ''}</label>
                        <textarea class="form-control" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}></textarea>
                    </div>
                `;
                break;
            case 'email':
                fieldHTML = `
                    <div class="form-group">
                        <label>${field.label} ${field.required ? '*' : ''}</label>
                        <input type="email" class="form-control" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>
                    </div>
                `;
                break;
            case 'dropdown':
                fieldHTML = `
                    <div class="form-group">
                        <label>${field.label} ${field.required ? '*' : ''}</label>
                        <select class="form-control" ${field.required ? 'required' : ''}>
                            <option value="">Select an option</option>
                            ${(field.options || []).map(option => 
                                `<option value="${option}">${option}</option>`
                            ).join('')}
                        </select>
                    </div>
                `;
                break;
            case 'radio':
                fieldHTML = `
                    <div class="form-group">
                        <label>${field.label} ${field.required ? '*' : ''}</label>
                        <div class="radio-group">
                            ${(field.options || []).map(option => `
                                <label class="radio-label">
                                    <input type="radio" name="${field.id}" value="${option}" ${field.required ? 'required' : ''}>
                                    <span>${option}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
            case 'checkbox':
                fieldHTML = `
                    <div class="form-group">
                        <label>${field.label} ${field.required ? '*' : ''}</label>
                        <div class="checkbox-group">
                            ${(field.options || []).map(option => `
                                <label class="checkbox-label">
                                    <input type="checkbox" name="${field.id}" value="${option}">
                                    <span>${option}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
            case 'rating':
                fieldHTML = `
                    <div class="form-group">
                        <label>${field.label} ${field.required ? '*' : ''}</label>
                        <div class="rating-group">
                            ${[1,2,3,4,5].map(star => `
                                <button type="button" class="rating-star" data-rating="${star}">
                                    <i class="fas fa-star"></i>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
            case 'file':
                fieldHTML = `
                    <div class="form-group">
                        <label>${field.label} ${field.required ? '*' : ''}</label>
                        <input type="file" class="form-control" ${field.required ? 'required' : ''}>
                    </div>
                `;
                break;
            default:
                fieldHTML = `
                    <div class="form-group">
                        <label>${field.label} ${field.required ? '*' : ''}</label>
                        <input type="text" class="form-control" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''}>
                    </div>
                `;
        }

        return fieldHTML;
    }

    renderTemplatesView() {
        return `
            <div class="templates-view">
                <div class="templates-header">
                    <h2>Form Templates</h2>
                    <div class="template-filters">
                        <select class="filter-select" onchange="filterTemplates(this.value)">
                            <option value="">All Categories</option>
                            <option value="Contact">Contact</option>
                            <option value="Survey">Survey</option>
                            <option value="Registration">Registration</option>
                            <option value="HR">HR</option>
                        </select>
                    </div>
                </div>
                <div class="templates-grid">
                    ${this.formTemplates.map(template => this.renderTemplateCard(template)).join('')}
                </div>
            </div>
        `;
    }

    renderTemplateCard(template) {
        return `
            <div class="template-card" data-template-id="${template.id}" onclick="useTemplate('${template.id}')">
                <div class="template-icon">
                    <i class="fas ${template.icon}"></i>
                </div>
                <div class="template-info">
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                    <span class="template-category">${template.category}</span>
                </div>
                <button class="btn btn-primary use-template-btn">
                    Use Template
                </button>
            </div>
        `;
    }

    showCreateFormModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Form</h3>
                    <button class="modal-close" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="creation-options">
                        <div class="option-card" onclick="createBlankForm()">
                            <i class="fas fa-file-alt"></i>
                            <h4>Start from Scratch</h4>
                            <p>Create a custom form with your own fields</p>
                        </div>
                        <div class="option-card" onclick="showTemplateSelector()">
                            <i class="fas fa-shapes"></i>
                            <h4>Use a Template</h4>
                            <p>Start with a pre-designed template</p>
                        </div>
                        <div class="option-card" onclick="showAIBuilder()">
                            <i class="fas fa-magic"></i>
                            <h4>AI Form Builder</h4>
                            <p>Let AI create a form based on your description</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    showFieldTypes() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add Field Type</h3>
                    <button class="modal-close" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="field-types-grid">
                        ${this.fieldTypes.map(fieldType => `
                            <div class="field-type-card" onclick="addFormField('${fieldType.id}')">
                                <i class="fas ${fieldType.icon}"></i>
                                <span>${fieldType.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    addFormField(fieldType) {
        const newField = {
            id: `field-${Date.now()}`,
            type: fieldType,
            label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
            required: false
        };

        if (fieldType === 'dropdown' || fieldType === 'radio' || fieldType === 'checkbox') {
            newField.options = ['Option 1', 'Option 2'];
        }

        this.currentForm.fields.push(newField);
        this.refreshFormEditor();
        closeModal(document.querySelector('.modal-close'));
        showNotification('Field added successfully', 'success');
    }

    viewForm(formId) {
        this.editForm(formId);
    }

    editForm(formId) {
        const form = this.forms.find(f => f.id === formId);
        if (form) {
            this.currentForm = form;
            const contentArea = document.getElementById('contentArea');
            contentArea.innerHTML = this.renderFormEditor(formId);
        }
    }

    refreshFormEditor() {
        if (this.currentForm) {
            const contentArea = document.getElementById('contentArea');
            contentArea.innerHTML = this.renderFormEditor(this.currentForm.id);
        }
    }
}

// Global functions
function loadForms() {
    if (!window.formsManager) {
        window.formsManager = new FormsManager();
    } else {
        window.formsManager.renderForms();
    }
}

function switchFormsTab(tab) {
    document.querySelectorAll('.forms-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const contentArea = document.querySelector('.forms-content');
    const formsManager = window.formsManager;

    switch(tab) {
        case 'all-forms':
            contentArea.innerHTML = formsManager.renderFormsGrid();
            break;
        case 'published':
            contentArea.innerHTML = '<div class="placeholder">Published forms view coming soon...</div>';
            break;
        case 'drafts':
            contentArea.innerHTML = '<div class="placeholder">Drafts view coming soon...</div>';
            break;
        case 'templates':
            contentArea.innerHTML = formsManager.renderTemplatesView();
            break;
        case 'responses':
            contentArea.innerHTML = '<div class="placeholder">Responses view coming soon...</div>';
            break;
    }
}

function createBlankForm() {
    const newForm = {
        id: `form-${Date.now()}`,
        name: 'Untitled Form',
        description: '',
        status: 'draft',
        responses: 0,
        views: 0,
        created: new Date().toISOString().split('T')[0],
        modified: new Date().toISOString().split('T')[0],
        fields: [],
        settings: {
            allowSubmissions: true,
            requireAuthentication: false,
            limitToOneResponse: false,
            sendConfirmationEmail: false,
            collectEmail: true,
            branding: {
                logo: null,
                primaryColor: '#627EEA',
                backgroundColor: '#ffffff'
            }
        },
        integrations: {
            syncToBoard: null,
            emailNotifications: [],
            webhookUrl: null
        }
    };

    window.formsManager.forms.unshift(newForm);
    window.formsManager.editForm(newForm.id);
    closeModal(document.querySelector('.modal-close'));
    showNotification('Form created successfully', 'success');
}

function showTemplateSelector() {
    switchFormsTab('templates');
    document.querySelector('.forms-tabs .tab-btn:nth-child(4)').click();
    closeModal(document.querySelector('.modal-close'));
}

function useTemplate(templateId) {
    const template = window.formsManager.formTemplates.find(t => t.id === templateId);
    if (template) {
        const newForm = {
            id: `form-${Date.now()}`,
            name: template.name,
            description: template.description,
            status: 'draft',
            responses: 0,
            views: 0,
            created: new Date().toISOString().split('T')[0],
            modified: new Date().toISOString().split('T')[0],
            fields: template.fields.map((field, index) => ({
                ...field,
                id: `field-${Date.now()}-${index}`
            })),
            settings: {
                allowSubmissions: true,
                requireAuthentication: false,
                limitToOneResponse: false,
                sendConfirmationEmail: false,
                collectEmail: true,
                branding: {
                    logo: null,
                    primaryColor: '#627EEA',
                    backgroundColor: '#ffffff'
                }
            },
            integrations: {
                syncToBoard: null,
                emailNotifications: [],
                webhookUrl: null
            }
        };

        window.formsManager.forms.unshift(newForm);
        window.formsManager.editForm(newForm.id);
        showNotification('Template applied successfully', 'success');
    }
}

function showAIBuilder() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>AI Form Builder</h3>
                <button class="modal-close" onclick="closeModal(this)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Describe your form</label>
                    <textarea class="form-control" id="aiFormDescription" placeholder="Describe what kind of form you want to create, what fields you need, and the purpose of the form..." rows="5"></textarea>
                </div>
                <div class="ai-suggestions">
                    <h4>Quick suggestions:</h4>
                    <div class="suggestion-chips">
                        <button class="suggestion-chip" onclick="setAIDescription('Customer feedback survey with rating, comments, and contact information')">
                            Customer Feedback Survey
                        </button>
                        <button class="suggestion-chip" onclick="setAIDescription('Event registration form with name, email, phone, and attendance type')">
                            Event Registration
                        </button>
                        <button class="suggestion-chip" onclick="setAIDescription('Job application with personal info, experience, and file upload')">
                            Job Application
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal(this)">Cancel</button>
                <button class="btn btn-primary" onclick="generateAIForm()">
                    <i class="fas fa-magic"></i> Generate Form
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
}

function setAIDescription(text) {
    document.getElementById('aiFormDescription').value = text;
}

function generateAIForm() {
    const description = document.getElementById('aiFormDescription').value;
    if (!description) {
        showNotification('Please describe your form', 'error');
        return;
    }

    showNotification('AI is generating your form...', 'info');
    
    // Simulate AI generation
    setTimeout(() => {
        const aiForm = {
            id: `form-${Date.now()}`,
            name: 'AI Generated Form',
            description: description,
            status: 'draft',
            responses: 0,
            views: 0,
            created: new Date().toISOString().split('T')[0],
            modified: new Date().toISOString().split('T')[0],
            fields: [
                { id: 'field-1', type: 'text', label: 'Name', required: true },
                { id: 'field-2', type: 'email', label: 'Email', required: true },
                { id: 'field-3', type: 'textarea', label: 'Additional Information', required: false }
            ],
            settings: {
                allowSubmissions: true,
                requireAuthentication: false,
                limitToOneResponse: false,
                sendConfirmationEmail: false,
                collectEmail: true,
                branding: {
                    logo: null,
                    primaryColor: '#627EEA',
                    backgroundColor: '#ffffff'
                }
            },
            integrations: {
                syncToBoard: null,
                emailNotifications: [],
                webhookUrl: null
            }
        };

        window.formsManager.forms.unshift(aiForm);
        window.formsManager.editForm(aiForm.id);
        closeModal(document.querySelector('.modal-close'));
        showNotification('AI form generated successfully', 'success');
    }, 2000);
}

function previewForm(formId, event) {
    if (event) event.stopPropagation();
    showNotification(`Preview form ${formId}`, 'info');
}

function duplicateForm(formId, event) {
    if (event) event.stopPropagation();
    const form = window.formsManager.forms.find(f => f.id === formId);
    if (form) {
        const duplicatedForm = {
            ...form,
            id: `form-${Date.now()}`,
            name: `${form.name} (Copy)`,
            status: 'draft',
            responses: 0,
            views: 0,
            created: new Date().toISOString().split('T')[0],
            modified: new Date().toISOString().split('T')[0],
            fields: form.fields.map(field => ({
                ...field,
                id: `field-${Date.now()}-${Math.random()}`
            }))
        };

        window.formsManager.forms.unshift(duplicatedForm);
        window.formsManager.renderForms();
        showNotification('Form duplicated successfully', 'success');
    }
}

function shareForm(formId, event) {
    if (event) event.stopPropagation();
    showNotification(`Share form ${formId}`, 'info');
}

function deleteForm(formId, event) {
    if (event) event.stopPropagation();
    if (confirm('Are you sure you want to delete this form?')) {
        window.formsManager.forms = window.formsManager.forms.filter(f => f.id !== formId);
        window.formsManager.renderForms();
        showNotification('Form deleted', 'success');
    }
}

function backToForms() {
    window.formsManager.renderForms();
}

function updateFormName(formId, newName) {
    const form = window.formsManager.forms.find(f => f.id === formId);
    if (form) {
        form.name = newName;
        showNotification('Form name updated', 'success');
    }
}

function openFormSettings(formId) {
    showNotification(`Open settings for form ${formId}`, 'info');
}

function saveForm(formId) {
    const form = window.formsManager.forms.find(f => f.id === formId);
    if (form) {
        form.modified = new Date().toISOString().split('T')[0];
        showNotification('Form saved successfully', 'success');
    }
}

function togglePreviewMode(mode) {
    showNotification(`Switch to ${mode} preview`, 'info');
}

function addFormField(fieldType) {
    window.formsManager.addFormField(fieldType);
}

function duplicateField(fieldId) {
    showNotification(`Duplicate field ${fieldId}`, 'info');
}

function deleteField(fieldId) {
    if (window.formsManager.currentForm) {
        window.formsManager.currentForm.fields = window.formsManager.currentForm.fields.filter(f => f.id !== fieldId);
        window.formsManager.refreshFormEditor();
        showNotification('Field deleted', 'success');
    }
}

function updateFieldProperty(fieldId, property, value) {
    if (window.formsManager.currentForm) {
        const field = window.formsManager.currentForm.fields.find(f => f.id === fieldId);
        if (field) {
            field[property] = value;
            window.formsManager.refreshFormEditor();
        }
    }
}

function updateFieldOption(fieldId, optionIndex, value) {
    if (window.formsManager.currentForm) {
        const field = window.formsManager.currentForm.fields.find(f => f.id === fieldId);
        if (field && field.options) {
            field.options[optionIndex] = value;
            window.formsManager.refreshFormEditor();
        }
    }
}

function addFieldOption(fieldId) {
    if (window.formsManager.currentForm) {
        const field = window.formsManager.currentForm.fields.find(f => f.id === fieldId);
        if (field && field.options) {
            field.options.push('New Option');
            window.formsManager.refreshFormEditor();
        }
    }
}

function removeFieldOption(fieldId, optionIndex) {
    if (window.formsManager.currentForm) {
        const field = window.formsManager.currentForm.fields.find(f => f.id === fieldId);
        if (field && field.options && field.options.length > 1) {
            field.options.splice(optionIndex, 1);
            window.formsManager.refreshFormEditor();
        }
    }
}

function selectFormField(fieldElement) {
    document.querySelectorAll('.form-field').forEach(field => {
        field.classList.remove('selected');
    });
    fieldElement.classList.add('selected');
}

function filterTemplates(category) {
    showNotification(`Filter templates by: ${category}`, 'info');
}

function importForm() {
    showNotification('Import form feature', 'info');
}

// Add Forms-specific styles
const formsStyles = `
<style>
.forms-container {
    padding: 1.5rem;
}

.forms-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.forms-header h1 {
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.forms-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.forms-tabs {
    display: flex;
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.forms-tabs .tab-btn {
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

.forms-tabs .tab-btn:hover {
    background-color: var(--light-color);
}

.forms-tabs .tab-btn.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.forms-content {
    flex: 1;
    overflow-y: auto;
}

.forms-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
}

.form-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition);
    position: relative;
}

.form-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.form-card.create-new {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    border: 2px dashed var(--border-color);
    background-color: var(--light-color);
}

.form-card.create-new:hover {
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

.form-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.form-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
}

.form-info p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
}

.form-stats {
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);
}

.form-stats .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.form-fields-preview {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.fields-count {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.form-footer {
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-dates {
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.form-dates span {
    display: block;
}

.form-actions {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    background: none;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    padding: 0.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    transition: var(--transition);
}

.action-btn:hover {
    background-color: var(--light-color);
    color: var(--primary-color);
    border-color: var(--primary-color);
}

.form-editor {
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

.form-title {
    flex: 1;
}

.form-name-input {
    border: none;
    background: none;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
}

.form-name-input:focus {
    outline: none;
    background-color: var(--light-color);
}

.toolbar-right {
    display: flex;
    gap: 0.5rem;
}

.editor-workspace {
    flex: 1;
    display: flex;
    height: calc(100vh - 80px);
}

.form-fields-panel {
    width: 400px;
    background-color: white;
    border-right: 1px solid var(--border-color);
    padding: 1.5rem;
    overflow-y: auto;
}

.form-fields-panel h3 {
    margin: 0 0 1rem 0;
    font-size: 1rem;
    color: var(--text-primary);
}

.fields-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-field {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    overflow: hidden;
}

.form-field.selected {
    border-color: var(--primary-color);
}

.field-header {
    background-color: var(--light-color);
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.field-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.field-label {
    font-weight: 500;
    color: var(--text-primary);
}

.required-badge {
    background-color: var(--danger-color);
    color: white;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    font-size: 0.625rem;
    font-weight: 500;
}

.field-actions {
    display: flex;
    gap: 0.25rem;
}

.field-action-btn {
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: var(--text-secondary);
    border-radius: var(--radius-sm);
}

.field-action-btn:hover {
    background-color: white;
    color: var(--primary-color);
}

.drag-handle {
    cursor: move;
}

.field-properties {
    padding: 1rem;
    background-color: white;
    border-top: 1px solid var(--border-color);
}

.property-row {
    margin-bottom: 0.75rem;
}

.property-row label {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
}

.property-row input[type="text"],
.property-row input[type="email"],
.property-row input[type="number"] {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
}

.options-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.option-row {
    display: flex;
    gap: 0.5rem;
}

.option-row input {
    flex: 1;
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
}

.remove-option-btn {
    background: none;
    border: none;
    padding: 0.375rem;
    cursor: pointer;
    color: var(--danger-color);
    border-radius: var(--radius-sm);
}

.add-option-btn {
    background: none;
    border: 1px dashed var(--primary-color);
    color: var(--primary-color);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 0.875rem;
    transition: var(--transition);
}

.add-option-btn:hover {
    background-color: rgba(98, 126, 234, 0.1);
}

.add-field-btn {
    width: 100%;
    margin-top: 1rem;
}

.form-preview-panel {
    flex: 1;
    background-color: var(--light-color);
    overflow: auto;
}

.preview-header {
    background-color: white;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;
}

.preview-header h3 {
    margin: 0;
    font-size: 1rem;
}

.preview-controls {
    display: flex;
    gap: 0.5rem;
}

.form-preview {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.preview-form {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    padding: 2rem;
}

.preview-form-title {
    margin: 0 0 0.5rem 0;
    text-align: center;
    color: var(--text-primary);
}

.preview-form-description {
    text-align: center;
    color: var(--text-secondary);
    margin-bottom: 2rem;
}

.preview-form-content .form-group {
    margin-bottom: 1.5rem;
}

.preview-form-content label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
}

.preview-form-content .form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
}

.preview-form-content textarea.form-control {
    min-height: 100px;
    resize: vertical;
}

.radio-group,
.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.radio-label,
.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

.rating-group {
    display: flex;
    gap: 0.5rem;
}

.rating-star {
    background: none;
    border: none;
    color: var(--border-color);
    font-size: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
}

.rating-star:hover,
.rating-star.active {
    color: var(--warning-color);
}

.preview-form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.template-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
}

.template-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.template-icon {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.template-info h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.template-info p {
    margin: 0 0 1rem 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.template-category {
    display: inline-block;
    background-color: var(--light-color);
    color: var(--text-secondary);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    margin-bottom: 1rem;
}

.use-template-btn {
    width: 100%;
}

.creation-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.option-card {
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 2rem 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
}

.option-card:hover {
    border-color: var(--primary-color);
    background-color: rgba(98, 126, 234, 0.05);
}

.option-card i {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.option-card h4 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.option-card p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.field-types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
}

.field-type-card {
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1.5rem 1rem;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
}

.field-type-card:hover {
    border-color: var(--primary-color);
    background-color: var(--light-color);
}

.field-type-card i {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.field-type-card span {
    display: block;
    font-size: 0.875rem;
    color: var(--text-primary);
}

.ai-suggestions {
    margin-top: 1.5rem;
}

.ai-suggestions h4 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.suggestion-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.suggestion-chip {
    background: none;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: var(--transition);
}

.suggestion-chip:hover {
    background-color: var(--primary-color);
    color: white;
}

.placeholder {
    padding: 3rem;
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', formsStyles);