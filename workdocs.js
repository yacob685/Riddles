// WorkDocs Module - Document Management & Collaboration
class WorkDocsManager {
    constructor() {
        this.documents = [];
        this.folders = [];
        this.shared = [];
        this.templates = [];
        this.currentFolder = null;
        this.init();
    }

    init() {
        this.loadDocumentsData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.document-item')) {
                this.openDocument(e.target.closest('.document-item').dataset.docId);
            }
            if (e.target.closest('.folder-item')) {
                this.openFolder(e.target.closest('.folder-item').dataset.folderId);
            }
            if (e.target.closest('.create-doc-btn')) {
                this.showCreateDocumentModal();
            }
            if (e.target.closest('.create-folder-btn')) {
                this.showCreateFolderModal();
            }
        });
    }

    async loadDocumentsData() {
        this.folders = [
            {
                id: 'folder-1',
                name: 'Marketing Materials',
                description: 'All marketing-related documents and assets',
                created: '2024-01-10',
                modified: '2024-01-18',
                shared: true,
                collaborators: 5,
                itemCount: 24,
                size: '245 MB'
            },
            {
                id: 'folder-2',
                name: 'Product Specifications',
                description: 'Technical specifications and documentation',
                created: '2024-01-05',
                modified: '2024-01-17',
                shared: false,
                collaborators: 3,
                itemCount: 18,
                size: '189 MB'
            },
            {
                id: 'folder-3',
                name: 'HR Documents',
                description: 'Human resources policies and forms',
                created: '2024-01-01',
                modified: '2024-01-15',
                shared: true,
                collaborators: 8,
                itemCount: 32,
                size: '156 MB'
            }
        ];

        this.documents = [
            {
                id: 'doc-1',
                name: 'Q4 Marketing Strategy.docx',
                type: 'document',
                size: '2.4 MB',
                created: '2024-01-15',
                modified: '2024-01-18',
                owner: 'Sarah Chen',
                folder: 'folder-1',
                shared: true,
                collaborators: ['Sarah Chen', 'Mike Johnson', 'Emma Wilson'],
                version: 3,
                status: 'active',
                tags: ['marketing', 'strategy', 'Q4'],
                preview: 'https://picsum.photos/seed/doc1/200/150'
            },
            {
                id: 'doc-2',
                name: 'Product Roadmap 2024.pdf',
                type: 'pdf',
                size: '5.2 MB',
                created: '2024-01-10',
                modified: '2024-01-16',
                owner: 'Alex Rivera',
                folder: 'folder-2',
                shared: true,
                collaborators: ['Alex Rivera', 'David Kim'],
                version: 5,
                status: 'active',
                tags: ['product', 'roadmap', '2024'],
                preview: 'https://picsum.photos/seed/doc2/200/150'
            },
            {
                id: 'doc-3',
                name: 'Team Budget 2024.xlsx',
                type: 'spreadsheet',
                size: '1.8 MB',
                created: '2024-01-08',
                modified: '2024-01-19',
                owner: 'Lisa Anderson',
                folder: 'folder-1',
                shared: false,
                collaborators: ['Lisa Anderson'],
                version: 12,
                status: 'active',
                tags: ['budget', 'finance', '2024'],
                preview: 'https://picsum.photos/seed/doc3/200/150'
            },
            {
                id: 'doc-4',
                name: 'Company Presentation.pptx',
                type: 'presentation',
                size: '12.5 MB',
                created: '2024-01-12',
                modified: '2024-01-17',
                owner: 'John Anderson',
                folder: null,
                shared: true,
                collaborators: ['John Anderson', 'Sarah Chen'],
                version: 2,
                status: 'active',
                tags: ['presentation', 'company', 'overview'],
                preview: 'https://picsum.photos/seed/doc4/200/150'
            },
            {
                id: 'doc-5',
                name: 'Meeting Notes - Jan 15.docx',
                type: 'document',
                size: '0.8 MB',
                created: '2024-01-15',
                modified: '2024-01-15',
                owner: 'Emma Wilson',
                folder: null,
                shared: true,
                collaborators: ['Emma Wilson', 'Mike Johnson'],
                version: 1,
                status: 'active',
                tags: ['meeting', 'notes', 'january'],
                preview: 'https://picsum.photos/seed/doc5/200/150'
            }
        ];

        this.templates = [
            {
                id: 'template-1',
                name: 'Project Proposal',
                type: 'document',
                category: 'Business',
                description: 'Standard project proposal template',
                uses: 156,
                icon: 'fa-file-alt'
            },
            {
                id: 'template-2',
                name: 'Meeting Agenda',
                type: 'document',
                category: 'Productivity',
                description: 'Meeting agenda template with action items',
                uses: 234,
                icon: 'fa-clipboard-list'
            },
            {
                id: 'template-3',
                name: 'Budget Tracking',
                type: 'spreadsheet',
                category: 'Finance',
                description: 'Monthly budget tracking spreadsheet',
                uses: 89,
                icon: 'fa-calculator'
            },
            {
                id: 'template-4',
                name: 'Company Presentation',
                type: 'presentation',
                category: 'Business',
                description: 'Company overview presentation template',
                uses: 67,
                icon: 'fa-presentation'
            }
        ];

        this.renderWorkDocs();
    }

    renderWorkDocs() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="workdocs-container">
                <div class="workdocs-header">
                    <h1>WorkDocs - Document Management</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary create-doc-btn">
                            <i class="fas fa-plus"></i> New Document
                        </button>
                        <button class="btn btn-secondary create-folder-btn">
                            <i class="fas fa-folder-plus"></i> New Folder
                        </button>
                        <button class="btn btn-secondary" onclick="uploadFiles()">
                            <i class="fas fa-upload"></i> Upload
                        </button>
                    </div>
                </div>

                <div class="workdocs-toolbar">
                    <div class="toolbar-left">
                        <div class="breadcrumb">
                            <a href="#" onclick="navigateToRoot()">Home</a>
                            ${this.currentFolder ? `<span class="separator">/</span><span>${this.getFolderName(this.currentFolder)}</span>` : ''}
                        </div>
                    </div>
                    <div class="toolbar-right">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search documents..." onkeyup="searchDocuments(this.value)">
                        </div>
                        <div class="view-switcher">
                            <button class="view-btn ${this.currentView === 'grid' ? 'active' : ''}" onclick="switchView('grid')" title="Grid View">
                                <i class="fas fa-th"></i>
                            </button>
                            <button class="view-btn ${this.currentView === 'list' ? 'active' : ''}" onclick="switchView('list')" title="List View">
                                <i class="fas fa-list"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="workdocs-stats">
                    <div class="stat-card">
                        <div class="stat-icon primary">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.documents.length}</div>
                            <div class="stat-label">Documents</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon success">
                            <i class="fas fa-folder"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.folders.length}</div>
                            <div class="stat-label">Folders</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon warning">
                            <i class="fas fa-share-alt"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.documents.filter(d => d.shared).length}</div>
                            <div class="stat-label">Shared</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon info">
                            <i class="fas fa-hdd"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.calculateTotalStorage()}</div>
                            <div class="stat-label">Used Storage</div>
                        </div>
                    </div>
                </div>

                <div class="workdocs-tabs">
                    <button class="tab-btn active" onclick="switchWorkDocsTab('my-docs')">My Documents</button>
                    <button class="tab-btn" onclick="switchWorkDocsTab('shared')">Shared with Me</button>
                    <button class="tab-btn" onclick="switchWorkDocsTab('recent')">Recent</button>
                    <button class="tab-btn" onclick="switchWorkDocsTab('templates')">Templates</button>
                    <button class="tab-btn" onclick="switchWorkDocsTab('trash')">Trash</button>
                </div>

                <div class="workdocs-content">
                    ${this.renderDocumentsView()}
                </div>
            </div>
        `;
    }

    renderDocumentsView() {
        const viewClass = this.currentView === 'list' ? 'list-view' : 'grid-view';
        return `
            <div class="documents-view ${viewClass}">
                ${this.renderQuickActions()}
                ${this.renderFolders()}
                ${this.renderDocuments()}
            </div>
        `;
    }

    renderQuickActions() {
        return `
            <div class="quick-actions">
                <button class="action-card" onclick="createDocument('document')">
                    <i class="fas fa-file-alt"></i>
                    <span>Document</span>
                </button>
                <button class="action-card" onclick="createDocument('spreadsheet')">
                    <i class="fas fa-table"></i>
                    <span>Spreadsheet</span>
                </button>
                <button class="action-card" onclick="createDocument('presentation')">
                    <i class="fas fa-presentation"></i>
                    <span>Presentation</span>
                </button>
                <button class="action-card" onclick="createDocument('form')">
                    <i class="fas fa-wpforms"></i>
                    <span>Form</span>
                </button>
            </div>
        `;
    }

    renderFolders() {
        const filteredFolders = this.currentFolder 
            ? this.folders.filter(f => f.id !== this.currentFolder)
            : this.folders;

        if (filteredFolders.length === 0) return '';

        return `
            <div class="folders-section">
                <h3>Folders</h3>
                <div class="folders-container ${this.currentView === 'list' ? 'list' : 'grid'}">
                    ${filteredFolders.map(folder => this.renderFolderItem(folder)).join('')}
                </div>
            </div>
        `;
    }

    renderFolderItem(folder) {
        if (this.currentView === 'list') {
            return `
                <div class="folder-item list-item" data-folder-id="${folder.id}" onclick="openFolder('${folder.id}')">
                    <div class="item-icon">
                        <i class="fas fa-folder${folder.shared ? '-open' : ''}"></i>
                    </div>
                    <div class="item-content">
                        <div class="item-name">${folder.name}</div>
                        <div class="item-description">${folder.description}</div>
                    </div>
                    <div class="item-meta">
                        <span class="item-count">${folder.itemCount} items</span>
                        <span class="item-size">${folder.size}</span>
                        <span class="item-date">${folder.modified}</span>
                    </div>
                    <div class="item-actions">
                        <button class="action-btn" onclick="shareFolder('${folder.id}', event)" title="Share">
                            <i class="fas fa-share"></i>
                        </button>
                        <button class="action-btn" onclick="deleteFolder('${folder.id}', event)" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="folder-item" data-folder-id="${folder.id}" onclick="openFolder('${folder.id}')">
                    <div class="folder-icon">
                        <i class="fas fa-folder${folder.shared ? '-open' : ''}"></i>
                    </div>
                    <div class="folder-name">${folder.name}</div>
                    <div class="folder-info">
                        <span class="item-count">${folder.itemCount} items</span>
                        <span class="modified-date">${folder.modified}</span>
                    </div>
                </div>
            `;
        }
    }

    renderDocuments() {
        const filteredDocuments = this.currentFolder
            ? this.documents.filter(d => d.folder === this.currentFolder)
            : this.documents.filter(d => !d.folder);

        if (filteredDocuments.length === 0) return '';

        return `
            <div class="documents-section">
                <h3>Documents</h3>
                <div class="documents-container ${this.currentView === 'list' ? 'list' : 'grid'}">
                    ${filteredDocuments.map(doc => this.renderDocumentItem(doc)).join('')}
                </div>
            </div>
        `;
    }

    renderDocumentItem(doc) {
        const typeIcons = {
            document: 'fa-file-alt',
            pdf: 'fa-file-pdf',
            spreadsheet: 'fa-file-excel',
            presentation: 'fa-file-powerpoint',
            image: 'fa-file-image',
            video: 'fa-file-video',
            audio: 'fa-file-audio',
            archive: 'fa-file-archive'
        };

        if (this.currentView === 'list') {
            return `
                <div class="document-item list-item" data-doc-id="${doc.id}" onclick="openDocument('${doc.id}')">
                    <div class="item-icon">
                        <i class="fas ${typeIcons[doc.type] || 'fa-file'}"></i>
                    </div>
                    <div class="item-preview">
                        <img src="${doc.preview}" alt="${doc.name}" onerror="this.style.display='none'">
                    </div>
                    <div class="item-content">
                        <div class="item-name">${doc.name}</div>
                        <div class="item-meta">
                            <span class="owner">${doc.owner}</span>
                            <span class="size">${doc.size}</span>
                            <span class="modified">${doc.modified}</span>
                        </div>
                    </div>
                    <div class="item-status">
                        ${doc.shared ? '<i class="fas fa-share-alt" title="Shared"></i>' : ''}
                        <span class="version">v${doc.version}</span>
                    </div>
                    <div class="item-actions">
                        <button class="action-btn" onclick="shareDocument('${doc.id}', event)" title="Share">
                            <i class="fas fa-share"></i>
                        </button>
                        <button class="action-btn" onclick="downloadDocument('${doc.id}', event)" title="Download">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="action-btn" onclick="deleteDocument('${doc.id}', event)" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="document-item" data-doc-id="${doc.id}" onclick="openDocument('${doc.id}')">
                    <div class="document-preview">
                        <img src="${doc.preview}" alt="${doc.name}" onerror="this.parentElement.innerHTML='<i class=\&quot;fas fa-file\&quot;></i>'">
                        ${doc.shared ? '<div class="shared-badge"><i class="fas fa-share-alt"></i></div>' : ''}
                    </div>
                    <div class="document-icon">
                        <i class="fas ${typeIcons[doc.type] || 'fa-file'}"></i>
                    </div>
                    <div class="document-name">${doc.name}</div>
                    <div class="document-info">
                        <span class="owner">${doc.owner}</span>
                        <span class="size">${doc.size}</span>
                        <span class="modified">${doc.modified}</span>
                    </div>
                    <div class="document-actions">
                        <button class="action-btn" onclick="shareDocument('${doc.id}', event)" title="Share">
                            <i class="fas fa-share"></i>
                        </button>
                    </div>
                </div>
            `;
        }
    }

    renderTemplatesView() {
        return `
            <div class="templates-view">
                <div class="templates-header">
                    <h2>Document Templates</h2>
                    <div class="template-filters">
                        <select class="filter-select" onchange="filterTemplates(this.value)">
                            <option value="">All Categories</option>
                            <option value="Business">Business</option>
                            <option value="Productivity">Productivity</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>
                </div>
                <div class="templates-grid">
                    ${this.templates.map(template => this.renderTemplateItem(template)).join('')}
                </div>
            </div>
        `;
    }

    renderTemplateItem(template) {
        return `
            <div class="template-item" data-template-id="${template.id}" onclick="useTemplate('${template.id}')">
                <div class="template-icon">
                    <i class="fas ${template.icon}"></i>
                </div>
                <div class="template-content">
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                    <div class="template-meta">
                        <span class="category">${template.category}</span>
                        <span class="uses">${template.uses} uses</span>
                    </div>
                </div>
                <button class="btn btn-primary use-template-btn">
                    Use Template
                </button>
            </div>
        `;
    }

    renderDocumentEditor(docId) {
        const doc = this.documents.find(d => d.id === docId);
        if (!doc) return '';

        return `
            <div class="document-editor">
                <div class="editor-toolbar">
                    <div class="toolbar-left">
                        <button class="btn btn-secondary" onclick="backToDocuments()">
                            <i class="fas fa-arrow-left"></i> Back
                        </button>
                        <div class="document-title">
                            <input type="text" value="${doc.name}" class="document-name-input" onchange="updateDocumentName('${docId}', this.value)">
                        </div>
                    </div>
                    <div class="toolbar-center">
                        <div class="toolbar-actions">
                            <button class="toolbar-btn" onclick="formatText('bold')" title="Bold">
                                <i class="fas fa-bold"></i>
                            </button>
                            <button class="toolbar-btn" onclick="formatText('italic')" title="Italic">
                                <i class="fas fa-italic"></i>
                            </button>
                            <button class="toolbar-btn" onclick="formatText('underline')" title="Underline">
                                <i class="fas fa-underline"></i>
                            </button>
                            <div class="toolbar-separator"></div>
                            <button class="toolbar-btn" onclick="insertList('ul')" title="Bullet List">
                                <i class="fas fa-list-ul"></i>
                            </button>
                            <button class="toolbar-btn" onclick="insertList('ol')" title="Numbered List">
                                <i class="fas fa-list-ol"></i>
                            </button>
                            <div class="toolbar-separator"></div>
                            <button class="toolbar-btn" onclick="insertLink()" title="Insert Link">
                                <i class="fas fa-link"></i>
                            </button>
                            <button class="toolbar-btn" onclick="insertImage()" title="Insert Image">
                                <i class="fas fa-image"></i>
                            </button>
                            <button class="toolbar-btn" onclick="insertTable()" title="Insert Table">
                                <i class="fas fa-table"></i>
                            </button>
                        </div>
                    </div>
                    <div class="toolbar-right">
                        <button class="btn btn-secondary" onclick="shareDocument('${docId}')">
                            <i class="fas fa-share"></i> Share
                        </button>
                        <button class="btn btn-secondary" onclick="commentMode()">
                            <i class="fas fa-comment"></i> Comment
                        </button>
                        <button class="btn btn-primary" onclick="saveDocument('${docId}')">
                            <i class="fas fa-save"></i> Save
                        </button>
                    </div>
                </div>

                <div class="editor-workspace">
                    <div class="editor-sidebar">
                        <div class="sidebar-section">
                            <h4>Document Info</h4>
                            <div class="document-info">
                                <div class="info-row">
                                    <span>Owner:</span>
                                    <span>${doc.owner}</span>
                                </div>
                                <div class="info-row">
                                    <span>Created:</span>
                                    <span>${doc.created}</span>
                                </div>
                                <div class="info-row">
                                    <span>Modified:</span>
                                    <span>${doc.modified}</span>
                                </div>
                                <div class="info-row">
                                    <span>Version:</span>
                                    <span>v${doc.version}</span>
                                </div>
                            </div>
                        </div>

                        <div class="sidebar-section">
                            <h4>Collaborators</h4>
                            <div class="collaborators-list">
                                ${doc.collaborators.map(collaborator => `
                                    <div class="collaborator">
                                        <img src="https://picsum.photos/seed/${collaborator.replace(' ', '')}/32/32" alt="${collaborator}">
                                        <span>${collaborator}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="btn btn-sm btn-secondary" onclick="addCollaborator()">
                                <i class="fas fa-plus"></i> Add Collaborator
                            </button>
                        </div>

                        <div class="sidebar-section">
                            <h4>Version History</h4>
                            <div class="version-history">
                                ${this.renderVersionHistory(doc)}
                            </div>
                        </div>
                    </div>

                    <div class="editor-main">
                        <div class="editor-content" contenteditable="true">
                            <h1>${doc.name.replace(/\.[^/.]+$/, "")}</h1>
                            <p>This is a sample document content. The full editor would include rich text editing capabilities, real-time collaboration, comments, and more advanced features.</p>
                            <h2>Section 1</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <h2>Section 2</h2>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </div>
                    </div>

                    <div class="editor-comments">
                        <h4>Comments</h4>
                        <div class="comments-list">
                            <div class="comment">
                                <div class="comment-header">
                                    <img src="https://picsum.photos/seed/user1/32/32" alt="Sarah">
                                    <div class="comment-meta">
                                        <span class="author">Sarah Chen</span>
                                        <span class="time">2 hours ago</span>
                                    </div>
                                </div>
                                <div class="comment-content">
                                    Great work on this section! Maybe we should add more details about the timeline.
                                </div>
                            </div>
                        </div>
                        <div class="comment-input">
                            <input type="text" placeholder="Add a comment...">
                            <button class="btn btn-sm btn-primary">Post</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderVersionHistory(doc) {
        const versions = [];
        for (let i = doc.version; i >= 1; i--) {
            versions.push(`
                <div class="version-item">
                    <span class="version-number">v${i}</span>
                    <span class="version-author">${doc.owner}</span>
                    <span class="version-date">${doc.modified}</span>
                    <button class="version-action" onclick="restoreVersion('${doc.id}', ${i})">Restore</button>
                </div>
            `);
        }
        return versions.join('');
    }

    calculateTotalStorage() {
        // Simulate storage calculation
        const totalSize = this.documents.reduce((sum, doc) => {
            const size = parseFloat(doc.size);
            return sum + (isNaN(size) ? 0 : size);
        }, 0);
        return `${totalSize.toFixed(1)} MB`;
    }

    getFolderName(folderId) {
        const folder = this.folders.find(f => f.id === folderId);
        return folder ? folder.name : 'Unknown Folder';
    }

    openDocument(docId, event) {
        if (event) event.stopPropagation();
        const doc = this.documents.find(d => d.id === docId);
        if (doc) {
            this.currentDocument = doc;
            const contentArea = document.getElementById('contentArea');
            contentArea.innerHTML = this.renderDocumentEditor(docId);
        }
    }

    openFolder(folderId, event) {
        if (event) event.stopPropagation();
        this.currentFolder = folderId;
        this.currentView = this.currentView || 'grid';
        this.renderWorkDocs();
    }

    showCreateDocumentModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Document</h3>
                    <button class="modal-close" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="creation-options">
                        <div class="option-card" onclick="createDocument('document')">
                            <i class="fas fa-file-alt"></i>
                            <h4>Document</h4>
                            <p>Create a new text document</p>
                        </div>
                        <div class="option-card" onclick="createDocument('spreadsheet')">
                            <i class="fas fa-table"></i>
                            <h4>Spreadsheet</h4>
                            <p>Create a new spreadsheet</p>
                        </div>
                        <div class="option-card" onclick="createDocument('presentation')">
                            <i class="fas fa-presentation"></i>
                            <h4>Presentation</h4>
                            <p>Create a new presentation</p>
                        </div>
                        <div class="option-card" onclick="createDocument('form')">
                            <i class="fas fa-wpforms"></i>
                            <h4>Form</h4>
                            <p>Create a new form</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Document Name</label>
                        <input type="text" class="form-control" id="documentName" placeholder="Enter document name">
                    </div>
                    <div class="form-group">
                        <label>Folder (optional)</label>
                        <select class="form-control" id="documentFolder">
                            <option value="">Root folder</option>
                            ${this.folders.map(folder => 
                                `<option value="${folder.id}">${folder.name}</option>`
                            ).join('')}
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal(this)">Cancel</button>
                    <button class="btn btn-primary" onclick="createNewDocument()">Create</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    showCreateFolderModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Folder</h3>
                    <button class="modal-close" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Folder Name</label>
                        <input type="text" class="form-control" id="folderName" placeholder="Enter folder name">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" id="folderDescription" placeholder="Describe the folder purpose..."></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal(this)">Cancel</button>
                    <button class="btn btn-primary" onclick="createNewFolder()">Create</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }
}

// Global functions
function loadWorkDocs() {
    if (!window.workDocsManager) {
        window.workDocsManager = new WorkDocsManager();
    } else {
        window.workDocsManager.renderWorkDocs();
    }
}

function switchWorkDocsTab(tab) {
    document.querySelectorAll('.workdocs-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const contentArea = document.querySelector('.workdocs-content');
    const workDocsManager = window.workDocsManager;

    switch(tab) {
        case 'my-docs':
            contentArea.innerHTML = workDocsManager.renderDocumentsView();
            break;
        case 'shared':
            contentArea.innerHTML = '<div class="placeholder">Shared documents view coming soon...</div>';
            break;
        case 'recent':
            contentArea.innerHTML = '<div class="placeholder">Recent documents view coming soon...</div>';
            break;
        case 'templates':
            contentArea.innerHTML = workDocsManager.renderTemplatesView();
            break;
        case 'trash':
            contentArea.innerHTML = '<div class="placeholder">Trash view coming soon...</div>';
            break;
    }
}

function switchView(view) {
    window.workDocsManager.currentView = view;
    window.workDocsManager.renderWorkDocs();
}

function navigateToRoot() {
    window.workDocsManager.currentFolder = null;
    window.workDocsManager.renderWorkDocs();
}

function createDocument(type) {
    const name = prompt(`Enter ${type} name:`);
    if (name) {
        const newDoc = {
            id: `doc-${Date.now()}`,
            name: `${name}.${type === 'document' ? 'docx' : type === 'spreadsheet' ? 'xlsx' : type === 'presentation' ? 'pptx' : 'form'}`,
            type: type,
            size: '0 MB',
            created: new Date().toISOString().split('T')[0],
            modified: new Date().toISOString().split('T')[0],
            owner: 'Current User',
            folder: window.workDocsManager.currentFolder,
            shared: false,
            collaborators: ['Current User'],
            version: 1,
            status: 'active',
            tags: [],
            preview: `https://picsum.photos/seed/${Date.now()}/200/150`
        };

        window.workDocsManager.documents.unshift(newDoc);
        window.workDocsManager.openDocument(newDoc.id);
        closeModal(document.querySelector('.modal-close'));
        showNotification(`${type} created successfully`, 'success');
    }
}

function createNewDocument() {
    const name = document.getElementById('documentName').value;
    const folder = document.getElementById('documentFolder').value;

    if (!name) {
        showNotification('Please enter a document name', 'error');
        return;
    }

    const newDoc = {
        id: `doc-${Date.now()}`,
        name: name,
        type: 'document',
        size: '0 MB',
        created: new Date().toISOString().split('T')[0],
        modified: new Date().toISOString().split('T')[0],
        owner: 'Current User',
        folder: folder || null,
        shared: false,
        collaborators: ['Current User'],
        version: 1,
        status: 'active',
        tags: [],
        preview: `https://picsum.photos/seed/${Date.now()}/200/150`
    };

    window.workDocsManager.documents.unshift(newDoc);
    window.workDocsManager.openDocument(newDoc.id);
    closeModal(document.querySelector('.modal-close'));
    showNotification('Document created successfully', 'success');
}

function createNewFolder() {
    const name = document.getElementById('folderName').value;
    const description = document.getElementById('folderDescription').value;

    if (!name) {
        showNotification('Please enter a folder name', 'error');
        return;
    }

    const newFolder = {
        id: `folder-${Date.now()}`,
        name: name,
        description: description,
        created: new Date().toISOString().split('T')[0],
        modified: new Date().toISOString().split('T')[0],
        shared: false,
        collaborators: 1,
        itemCount: 0,
        size: '0 MB'
    };

    window.workDocsManager.folders.unshift(newFolder);
    window.workDocsManager.renderWorkDocs();
    closeModal(document.querySelector('.modal-close'));
    showNotification('Folder created successfully', 'success');
}

function openDocument(docId, event) {
    window.workDocsManager.openDocument(docId, event);
}

function openFolder(folderId, event) {
    window.workDocsManager.openFolder(folderId, event);
}

function shareDocument(docId, event) {
    if (event) event.stopPropagation();
    showNotification(`Share document ${docId}`, 'info');
}

function shareFolder(folderId, event) {
    if (event) event.stopPropagation();
    showNotification(`Share folder ${folderId}`, 'info');
}

function downloadDocument(docId, event) {
    if (event) event.stopPropagation();
    showNotification(`Download document ${docId}`, 'info');
}

function deleteDocument(docId, event) {
    if (event) event.stopPropagation();
    if (confirm('Are you sure you want to delete this document?')) {
        window.workDocsManager.documents = window.workDocsManager.documents.filter(d => d.id !== docId);
        window.workDocsManager.renderWorkDocs();
        showNotification('Document deleted', 'success');
    }
}

function deleteFolder(folderId, event) {
    if (event) event.stopPropagation();
    if (confirm('Are you sure you want to delete this folder?')) {
        window.workDocsManager.folders = window.workDocsManager.folders.filter(f => f.id !== folderId);
        window.workDocsManager.renderWorkDocs();
        showNotification('Folder deleted', 'success');
    }
}

function uploadFiles() {
    showNotification('Upload files feature', 'info');
}

function searchDocuments(query) {
    showNotification(`Search documents: ${query}`, 'info');
}

function useTemplate(templateId) {
    showNotification(`Use template ${templateId}`, 'info');
}

function filterTemplates(category) {
    showNotification(`Filter templates by: ${category}`, 'info');
}

function backToDocuments() {
    window.workDocsManager.renderWorkDocs();
}

function updateDocumentName(docId, newName) {
    const doc = window.workDocsManager.documents.find(d => d.id === docId);
    if (doc) {
        doc.name = newName;
        showNotification('Document name updated', 'success');
    }
}

function formatText(format) {
    document.execCommand(format, false, null);
}

function insertList(type) {
    const listHTML = type === 'ul' ? '<ul><li>List item</li></ul>' : '<ol><li>List item</li></ol>';
    document.execCommand('insertHTML', false, listHTML);
}

function insertLink() {
    const url = prompt('Enter URL:');
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

function insertImage() {
    showNotification('Insert image feature', 'info');
}

function insertTable() {
    showNotification('Insert table feature', 'info');
}

function commentMode() {
    showNotification('Comment mode activated', 'info');
}

function saveDocument(docId) {
    const doc = window.workDocsManager.documents.find(d => d.id === docId);
    if (doc) {
        doc.modified = new Date().toISOString().split('T')[0];
        doc.version++;
        showNotification('Document saved successfully', 'success');
    }
}

function addCollaborator() {
    showNotification('Add collaborator feature', 'info');
}

function restoreVersion(docId, version) {
    showNotification(`Restore to version ${version}`, 'info');
}

// Add WorkDocs-specific styles
const workDocsStyles = `
<style>
.workdocs-container {
    padding: 1.5rem;
}

.workdocs-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.workdocs-header h1 {
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.workdocs-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.breadcrumb a {
    color: var(--primary-color);
    text-decoration: none;
}

.breadcrumb a:hover {
    text-decoration: underline;
}

.separator {
    color: var(--text-secondary);
}

.search-bar {
    position: relative;
    width: 300px;
}

.search-bar i {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
}

.search-bar input {
    width: 100%;
    padding: 0.5rem 0.75rem 0.5rem 2.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
}

.view-switcher {
    display: flex;
    background-color: var(--light-color);
    border-radius: var(--radius-sm);
    padding: 0.25rem;
}

.view-btn {
    padding: 0.5rem 0.75rem;
    background: none;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    color: var(--text-secondary);
    transition: var(--transition);
}

.view-btn.active {
    background-color: white;
    color: var(--primary-color);
    box-shadow: var(--shadow-sm);
}

.workdocs-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.workdocs-tabs {
    display: flex;
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.workdocs-tabs .tab-btn {
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

.workdocs-tabs .tab-btn:hover {
    background-color: var(--light-color);
}

.workdocs-tabs .tab-btn.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.workdocs-content {
    flex: 1;
    overflow-y: auto;
}

.documents-view {
    padding: 1rem;
}

.quick-actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.action-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 2rem 1rem;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
}

.action-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--primary-color);
}

.action-card i {
    font-size: 2rem;
    color: var(--primary-color);
}

.action-card span {
    font-weight: 500;
    color: var(--text-primary);
}

.folders-section,
.documents-section {
    margin-bottom: 2rem;
}

.folders-section h3,
.documents-section h3 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.folders-container.grid,
.documents-container.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.folders-container.list,
.documents-container.list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.folder-item {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    text-align: center;
}

.folder-item:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.folder-icon {
    font-size: 3rem;
    color: var(--warning-color);
    margin-bottom: 0.75rem;
}

.folder-name {
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.folder-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.document-item {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: var(--transition);
    position: relative;
}

.document-item:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.document-item.grid {
    padding: 1rem;
    text-align: center;
}

.document-preview {
    position: relative;
    margin-bottom: 1rem;
}

.document-preview img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: var(--radius-sm);
}

.shared-badge {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: var(--primary-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.625rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.document-icon {
    font-size: 2rem;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
}

.document-name {
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
}

.document-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.document-actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    opacity: 0;
    transition: opacity 0.2s;
}

.document-item:hover .document-actions {
    opacity: 1;
}

.list-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
}

.item-icon {
    width: 40px;
    text-align: center;
    font-size: 1.5rem;
    color: var(--text-secondary);
}

.item-preview {
    width: 40px;
    height: 40px;
}

.item-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-sm);
}

.item-content {
    flex: 1;
}

.item-name {
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.item-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.item-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.item-actions {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    border-radius: var(--radius-sm);
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.template-item {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    text-align: center;
}

.template-item:hover {
    box-shadow: var(--shadow-md);
}

.template-icon {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.template-content h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.template-content p {
    margin: 0 0 1rem 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.template-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
}

.use-template-btn {
    width: 100%;
}

.document-editor {
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

.document-title {
    flex: 1;
}

.document-name-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 1rem;
    font-weight: 500;
}

.toolbar-center {
    flex: 1;
    display: flex;
    justify-content: center;
}

.toolbar-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: var(--light-color);
    border-radius: var(--radius-sm);
    padding: 0.25rem;
}

.toolbar-btn {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    border-radius: var(--radius-sm);
    transition: var(--transition);
}

.toolbar-btn:hover {
    background-color: white;
    color: var(--text-primary);
}

.toolbar-separator {
    width: 1px;
    height: 20px;
    background-color: var(--border-color);
    margin: 0 0.25rem;
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

.editor-sidebar {
    width: 300px;
    background-color: white;
    border-right: 1px solid var(--border-color);
    padding: 1rem;
    overflow-y: auto;
}

.sidebar-section {
    margin-bottom: 2rem;
}

.sidebar-section h4 {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
}

.document-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.info-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
}

.info-row span:first-child {
    color: var(--text-secondary);
}

.info-row span:last-child {
    color: var(--text-primary);
}

.collaborators-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.collaborator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
}

.collaborator img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.version-history {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.version-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
}

.version-number {
    font-weight: 500;
    color: var(--primary-color);
}

.version-action {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    font-size: 0.75rem;
}

.editor-main {
    flex: 1;
    background-color: white;
    padding: 2rem;
    overflow-y: auto;
}

.editor-content {
    min-height: 100%;
    outline: none;
    line-height: 1.6;
}

.editor-comments {
    width: 300px;
    background-color: white;
    border-left: 1px solid var(--border-color);
    padding: 1rem;
    overflow-y: auto;
}

.editor-comments h4 {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
}

.comments-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
}

.comment {
    padding: 1rem;
    background-color: var(--light-color);
    border-radius: var(--radius-md);
}

.comment-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
}

.comment-header img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.comment-meta {
    display: flex;
    flex-direction: column;
}

.author {
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.875rem;
}

.time {
    color: var(--text-secondary);
    font-size: 0.75rem;
}

.comment-content {
    font-size: 0.875rem;
    color: var(--text-primary);
}

.comment-input {
    display: flex;
    gap: 0.5rem;
}

.comment-input input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
}

.placeholder {
    padding: 3rem;
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', workDocsStyles);