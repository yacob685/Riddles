// CRM Module
class CRMManager {
    constructor() {
        this.deals = [];
        this.contacts = [];
        this.leads = [];
        this.activities = [];
        this.pipelines = [];
        this.init();
    }

    init() {
        this.loadCRMData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Event listeners for CRM interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.deal-card')) {
                this.viewDeal(e.target.closest('.deal-card').dataset.dealId);
            }
            if (e.target.closest('.create-deal-btn')) {
                this.showCreateDealModal();
            }
            if (e.target.closest('.pipeline-stage')) {
                this.handleStageDrop(e);
            }
        });
    }

    async loadCRMData() {
        // Simulate loading CRM data
        this.pipelines = [
            {
                id: 'sales-pipeline',
                name: 'Sales Pipeline',
                stages: [
                    { id: 'lead', name: 'Lead', value: 0, color: '#E3E4E8' },
                    { id: 'contacted', name: 'Contacted', value: 5000, color: '#FFAB00' },
                    { id: 'qualified', name: 'Qualified', value: 15000, color: '#FF6D00' },
                    { id: 'proposal', name: 'Proposal', value: 35000, color: '#627EEA' },
                    { id: 'negotiation', name: 'Negotiation', value: 50000, color: '#00B8D9' },
                    { id: 'closed-won', name: 'Closed Won', value: 100000, color: '#00C875' },
                    { id: 'closed-lost', name: 'Closed Lost', value: 0, color: '#FF6D00' }
                ]
            }
        ];

        this.deals = [
            {
                id: 'deal-1',
                title: 'Enterprise Software License',
                company: 'Tech Corp International',
                contact: 'John Anderson',
                value: 125000,
                stage: 'negotiation',
                probability: 75,
                expectedCloseDate: '2024-02-15',
                activities: 23,
                lastActivity: '2 hours ago',
                health: 'good',
                tags: ['enterprise', 'software', 'Q1-target']
            },
            {
                id: 'deal-2',
                title: 'Marketing Automation Package',
                company: 'Digital Marketing Agency',
                contact: 'Sarah Mitchell',
                value: 45000,
                stage: 'proposal',
                probability: 60,
                expectedCloseDate: '2024-01-30',
                activities: 15,
                lastActivity: '1 day ago',
                health: 'warning',
                tags: ['marketing', 'automation', 'SMB']
            },
            {
                id: 'deal-3',
                title: 'Consulting Services Contract',
                company: 'Global Solutions Ltd',
                contact: 'Michael Chen',
                value: 85000,
                stage: 'qualified',
                probability: 45,
                expectedCloseDate: '2024-03-01',
                activities: 8,
                lastActivity: '3 days ago',
                health: 'good',
                tags: ['consulting', 'services', 'enterprise']
            },
            {
                id: 'deal-4',
                title: 'Mobile App Development',
                company: 'StartupHub',
                contact: 'Emma Rodriguez',
                value: 65000,
                stage: 'contacted',
                probability: 25,
                expectedCloseDate: '2024-02-28',
                activities: 5,
                lastActivity: '5 days ago',
                health: 'critical',
                tags: ['development', 'mobile', 'startup']
            }
        ];

        this.contacts = [
            {
                id: 'contact-1',
                name: 'John Anderson',
                email: 'john.anderson@techcorp.com',
                phone: '+1 (555) 123-4567',
                company: 'Tech Corp International',
                title: 'CTO',
                deals: ['deal-1'],
                lastContact: '2024-01-10',
                source: 'Website',
                leadScore: 85
            },
            {
                id: 'contact-2',
                name: 'Sarah Mitchell',
                email: 'sarah.m@digitalagency.com',
                phone: '+1 (555) 987-6543',
                company: 'Digital Marketing Agency',
                title: 'Marketing Director',
                deals: ['deal-2'],
                lastContact: '2024-01-08',
                source: 'Referral',
                leadScore: 72
            }
        ];

        this.renderCRM();
    }

    renderCRM() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="crm-container">
                <div class="crm-header">
                    <h1>CRM - Customer Relationship Management</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary create-deal-btn">
                            <i class="fas fa-plus"></i> New Deal
                        </button>
                        <button class="btn btn-secondary" onclick="importContacts()">
                            <i class="fas fa-upload"></i> Import
                        </button>
                        <button class="btn btn-secondary" onclick="exportData()">
                            <i class="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>

                <div class="crm-stats">
                    <div class="stat-card">
                        <div class="stat-icon primary">
                            <i class="fas fa-handshake"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">$${this.calculateTotalPipeline().toLocaleString()}</div>
                            <div class="stat-label">Total Pipeline</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon success">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.deals.filter(d => d.stage === 'closed-won').length}</div>
                            <div class="stat-label">Won Deals</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon warning">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.calculateAverageProbability()}%</div>
                            <div class="stat-label">Avg Probability</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon info">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.contacts.length}</div>
                            <div class="stat-label">Total Contacts</div>
                        </div>
                    </div>
                </div>

                <div class="crm-tabs">
                    <button class="tab-btn active" onclick="switchCRMTab('pipeline')">Pipeline</button>
                    <button class="tab-btn" onclick="switchCRMTab('deals')">Deals</button>
                    <button class="tab-btn" onclick="switchCRMTab('contacts')">Contacts</button>
                    <button class="tab-btn" onclick="switchCRMTab('activities')">Activities</button>
                    <button class="tab-btn" onclick="switchCRMTab('analytics')">Analytics</button>
                </div>

                <div class="crm-content">
                    ${this.renderPipelineView()}
                </div>
            </div>
        `;
    }

    renderPipelineView() {
        const pipeline = this.pipelines[0];
        return `
            <div class="pipeline-view">
                <div class="pipeline-header">
                    <h2>${pipeline.name}</h2>
                    <div class="pipeline-controls">
                        <select class="filter-select">
                            <option>All Deals</option>
                            <option>My Deals</option>
                            <option>This Quarter</option>
                            <option>High Value</option>
                        </select>
                        <button class="btn btn-secondary" onclick="customizePipeline()">
                            <i class="fas fa-cog"></i> Customize
                        </button>
                    </div>
                </div>

                <div class="pipeline-stages">
                    ${pipeline.stages.map(stage => this.renderPipelineStage(stage)).join('')}
                </div>
            </div>
        `;
    }

    renderPipelineStage(stage) {
        const stageDeals = this.deals.filter(deal => deal.stage === stage.id);
        const totalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);

        return `
            <div class="pipeline-stage" data-stage="${stage.id}">
                <div class="stage-header" style="background-color: ${stage.color}">
                    <h3>${stage.name}</h3>
                    <div class="stage-stats">
                        <span class="deal-count">${stageDeals.length}</span>
                        <span class="stage-value">$${totalValue.toLocaleString()}</span>
                    </div>
                </div>
                <div class="stage-deals" ondrop="handleDrop(event, '${stage.id}')" ondragover="allowDrop(event)">
                    ${stageDeals.map(deal => this.renderDealCard(deal)).join('')}
                </div>
            </div>
        `;
    }

    renderDealCard(deal) {
        const healthColors = {
            good: '#00C875',
            warning: '#FFAB00',
            critical: '#FF6D00'
        };

        return `
            <div class="deal-card" data-deal-id="${deal.id}" draggable="true" ondragstart="handleDragStart(event, '${deal.id}')">
                <div class="deal-header">
                    <h4>${deal.title}</h4>
                    <div class="deal-health" style="color: ${healthColors[deal.health]}">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
                <div class="deal-company">${deal.company}</div>
                <div class="deal-value">$${deal.value.toLocaleString()}</div>
                <div class="deal-contact">
                    <i class="fas fa-user"></i> ${deal.contact}
                </div>
                <div class="deal-probability">
                    <div class="probability-bar">
                        <div class="probability-fill" style="width: ${deal.probability}%"></div>
                    </div>
                    <span>${deal.probability}%</span>
                </div>
                <div class="deal-footer">
                    <div class="deal-date">
                        <i class="fas fa-calendar"></i> ${deal.expectedCloseDate}
                    </div>
                    <div class="deal-activities">
                        <i class="fas fa-bell"></i> ${deal.activities}
                    </div>
                </div>
                ${deal.tags.length > 0 ? `
                    <div class="deal-tags">
                        ${deal.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderDealsList() {
        return `
            <div class="deals-list">
                <div class="list-header">
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Search deals..." onkeyup="filterDeals(this.value)">
                    </div>
                    <div class="list-filters">
                        <select onchange="filterByStage(this.value)">
                            <option value="">All Stages</option>
                            ${this.pipelines[0].stages.map(stage => 
                                `<option value="${stage.id}">${stage.name}</option>`
                            ).join('')}
                        </select>
                        <select onchange="sortByValue(this.value)">
                            <option value="desc">Value (High to Low)</option>
                            <option value="asc">Value (Low to High)</option>
                            <option value="date">Close Date</option>
                        </select>
                    </div>
                </div>

                <div class="deals-table">
                    <div class="table-header">
                        <div class="table-row">
                            <div class="table-cell">Deal Name</div>
                            <div class="table-cell">Company</div>
                            <div class="table-cell">Contact</div>
                            <div class="table-cell">Value</div>
                            <div class="table-cell">Stage</div>
                            <div class="table-cell">Probability</div>
                            <div class="table-cell">Close Date</div>
                            <div class="table-cell">Actions</div>
                        </div>
                    </div>
                    <div class="table-body">
                        ${this.deals.map(deal => this.renderDealRow(deal)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderDealRow(deal) {
        const stage = this.pipelines[0].stages.find(s => s.id === deal.stage);
        return `
            <div class="table-row" data-deal-id="${deal.id}">
                <div class="table-cell">
                    <strong>${deal.title}</strong>
                </div>
                <div class="table-cell">${deal.company}</div>
                <div class="table-cell">${deal.contact}</div>
                <div class="table-cell">$${deal.value.toLocaleString()}</div>
                <div class="table-cell">
                    <span class="stage-badge" style="background-color: ${stage.color}">
                        ${stage.name}
                    </span>
                </div>
                <div class="table-cell">${deal.probability}%</div>
                <div class="table-cell">${deal.expectedCloseDate}</div>
                <div class="table-cell">
                    <button class="action-btn" onclick="editDeal('${deal.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" onclick="deleteDeal('${deal.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderContactsList() {
        return `
            <div class="contacts-list">
                <div class="list-header">
                    <h2>Contacts</h2>
                    <button class="btn btn-primary" onclick="showCreateContactModal()">
                        <i class="fas fa-plus"></i> New Contact
                    </button>
                </div>

                <div class="contacts-grid">
                    ${this.contacts.map(contact => this.renderContactCard(contact)).join('')}
                </div>
            </div>
        `;
    }

    renderContactCard(contact) {
        return `
            <div class="contact-card" data-contact-id="${contact.id}">
                <div class="contact-header">
                    <img src="https://picsum.photos/seed/${contact.name.replace(' ', '')}/60/60" alt="${contact.name}">
                    <div class="contact-info">
                        <h3>${contact.name}</h3>
                        <p>${contact.title} at ${contact.company}</p>
                    </div>
                    <div class="contact-score">
                        <span class="score-value">${contact.leadScore}</span>
                        <span class="score-label">Lead Score</span>
                    </div>
                </div>
                <div class="contact-details">
                    <div class="detail">
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:${contact.email}">${contact.email}</a>
                    </div>
                    <div class="detail">
                        <i class="fas fa-phone"></i>
                        <a href="tel:${contact.phone}">${contact.phone}</a>
                    </div>
                    <div class="detail">
                        <i class="fas fa-building"></i>
                        <span>${contact.company}</span>
                    </div>
                    <div class="detail">
                        <i class="fas fa-tag"></i>
                        <span>${contact.source}</span>
                    </div>
                </div>
                <div class="contact-footer">
                    <span>Last contact: ${contact.lastContact}</span>
                    <div class="contact-actions">
                        <button class="btn btn-sm btn-secondary" onclick="emailContact('${contact.id}')">
                            <i class="fas fa-envelope"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="callContact('${contact.id}')">
                            <i class="fas fa-phone"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    calculateTotalPipeline() {
        return this.deals
            .filter(deal => deal.stage !== 'closed-lost')
            .reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);
    }

    calculateAverageProbability() {
        if (this.deals.length === 0) return 0;
        const total = this.deals.reduce((sum, deal) => sum + deal.probability, 0);
        return Math.round(total / this.deals.length);
    }

    showCreateDealModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Deal</h3>
                    <button class="modal-close" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Deal Name</label>
                        <input type="text" class="form-control" id="dealTitle" placeholder="Enter deal name">
                    </div>
                    <div class="form-group">
                        <label>Company</label>
                        <input type="text" class="form-control" id="dealCompany" placeholder="Company name">
                    </div>
                    <div class="form-group">
                        <label>Contact</label>
                        <input type="text" class="form-control" id="dealContact" placeholder="Contact person">
                    </div>
                    <div class="form-group">
                        <label>Value ($)</label>
                        <input type="number" class="form-control" id="dealValue" placeholder="Deal value">
                    </div>
                    <div class="form-group">
                        <label>Stage</label>
                        <select class="form-control" id="dealStage">
                            ${this.pipelines[0].stages.map(stage => 
                                `<option value="${stage.id}">${stage.name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Probability (%)</label>
                        <input type="number" class="form-control" id="dealProbability" min="0" max="100" value="25">
                    </div>
                    <div class="form-group">
                        <label>Expected Close Date</label>
                        <input type="date" class="form-control" id="dealCloseDate">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal(this)">Cancel</button>
                    <button class="btn btn-primary" onclick="createDeal()">Create Deal</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    viewDeal(dealId) {
        const deal = this.deals.find(d => d.id === dealId);
        if (!deal) return;

        showNotification(`Viewing deal: ${deal.title}`, 'info');
    }
}

// Global functions
function loadCRM() {
    if (!window.crmManager) {
        window.crmManager = new CRMManager();
    } else {
        window.crmManager.renderCRM();
    }
}

function switchCRMTab(tab) {
    document.querySelectorAll('.crm-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const contentArea = document.querySelector('.crm-content');
    const crmManager = window.crmManager;

    switch(tab) {
        case 'pipeline':
            contentArea.innerHTML = crmManager.renderPipelineView();
            break;
        case 'deals':
            contentArea.innerHTML = crmManager.renderDealsList();
            break;
        case 'contacts':
            contentArea.innerHTML = crmManager.renderContactsList();
            break;
        case 'activities':
            contentArea.innerHTML = '<div class="placeholder">Activities view coming soon...</div>';
            break;
        case 'analytics':
            contentArea.innerHTML = '<div class="placeholder">Analytics view coming soon...</div>';
            break;
    }
}

function handleDragStart(event, dealId) {
    event.dataTransfer.setData('dealId', dealId);
}

function allowDrop(event) {
    event.preventDefault();
}

function handleDrop(event, stageId) {
    event.preventDefault();
    const dealId = event.dataTransfer.getData('dealId');
    
    // Update deal stage
    const crmManager = window.crmManager;
    const deal = crmManager.deals.find(d => d.id === dealId);
    if (deal) {
        deal.stage = stageId;
        crmManager.renderCRM();
        showNotification('Deal moved successfully', 'success');
    }
}

function createDeal() {
    const dealData = {
        id: `deal-${Date.now()}`,
        title: document.getElementById('dealTitle').value,
        company: document.getElementById('dealCompany').value,
        contact: document.getElementById('dealContact').value,
        value: parseInt(document.getElementById('dealValue').value) || 0,
        stage: document.getElementById('dealStage').value,
        probability: parseInt(document.getElementById('dealProbability').value) || 25,
        expectedCloseDate: document.getElementById('dealCloseDate').value,
        activities: 0,
        lastActivity: 'Just now',
        health: 'good',
        tags: []
    };

    if (!dealData.title || !dealData.company) {
        showNotification('Please fill in required fields', 'error');
        return;
    }

    window.crmManager.deals.push(dealData);
    window.crmManager.renderCRM();
    closeModal(document.querySelector('.modal-close'));
    showNotification('Deal created successfully', 'success');
}

function editDeal(dealId) {
    showNotification(`Edit deal ${dealId}`, 'info');
}

function deleteDeal(dealId) {
    if (confirm('Are you sure you want to delete this deal?')) {
        const crmManager = window.crmManager;
        crmManager.deals = crmManager.deals.filter(d => d.id !== dealId);
        crmManager.renderCRM();
        showNotification('Deal deleted', 'success');
    }
}

function showCreateContactModal() {
    showNotification('Create contact modal', 'info');
}

function emailContact(contactId) {
    showNotification(`Email contact ${contactId}`, 'info');
}

function callContact(contactId) {
    showNotification(`Call contact ${contactId}`, 'info');
}

function importContacts() {
    showNotification('Import contacts feature', 'info');
}

function exportData() {
    showNotification('Export data feature', 'info');
}

function customizePipeline() {
    showNotification('Customize pipeline feature', 'info');
}

// Add CRM-specific styles
const crmStyles = `
<style>
.crm-container {
    padding: 1.5rem;
}

.crm-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.crm-header h1 {
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.crm-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.stat-card {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}

.stat-icon.primary { background-color: rgba(98, 126, 234, 0.1); color: var(--primary-color); }
.stat-icon.success { background-color: rgba(0, 200, 117, 0.1); color: var(--success-color); }
.stat-icon.warning { background-color: rgba(255, 171, 0, 0.1); color: var(--warning-color); }
.stat-icon.info { background-color: rgba(0, 184, 217, 0.1); color: var(--secondary-color); }

.stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
}

.stat-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.crm-tabs {
    display: flex;
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.crm-tabs .tab-btn {
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

.crm-tabs .tab-btn:hover {
    background-color: var(--light-color);
}

.crm-tabs .tab-btn.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.crm-content {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
}

.pipeline-view {
    height: 100%;
}

.pipeline-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pipeline-header h2 {
    margin: 0;
}

.pipeline-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.filter-select {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
}

.pipeline-stages {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    padding: 1.5rem;
    height: calc(100vh - 300px);
    overflow-y: auto;
}

.pipeline-stage {
    background-color: var(--light-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.stage-header {
    padding: 1rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.stage-header h3 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
}

.stage-stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: right;
}

.deal-count {
    font-weight: 700;
    font-size: 1rem;
}

.stage-value {
    font-size: 0.75rem;
    opacity: 0.9;
}

.stage-deals {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    min-height: 200px;
}

.deal-card {
    background-color: white;
    border-radius: var(--radius-md);
    padding: 1rem;
    margin-bottom: 0.75rem;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow-sm);
}

.deal-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
}

.deal-card:last-child {
    margin-bottom: 0;
}

.deal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
}

.deal-header h4 {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.3;
}

.deal-health {
    font-size: 1rem;
}

.deal-company {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.deal-value {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.deal-contact {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
}

.deal-probability {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    font-size: 0.75rem;
}

.probability-bar {
    flex: 1;
    height: 4px;
    background-color: var(--border-color);
    border-radius: 2px;
    overflow: hidden;
}

.probability-fill {
    height: 100%;
    background-color: var(--success-color);
    transition: width 0.3s ease;
}

.deal-footer {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
}

.deal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
}

.tag {
    padding: 0.125rem 0.5rem;
    background-color: var(--light-color);
    border-radius: 9999px;
    font-size: 0.625rem;
    color: var(--text-secondary);
}

.deals-list, .contacts-list {
    padding: 1.5rem;
}

.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
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

.list-filters {
    display: flex;
    gap: 1rem;
}

.deals-table {
    background-color: white;
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.table-header {
    background-color: var(--light-color);
    border-bottom: 1px solid var(--border-color);
}

.table-row {
    display: flex;
    border-bottom: 1px solid var(--border-color);
}

.table-row:hover {
    background-color: var(--light-color);
}

.table-cell {
    flex: 1;
    padding: 0.75rem;
    font-size: 0.875rem;
}

.table-header .table-cell {
    font-weight: 600;
    color: var(--text-primary);
}

.stage-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
}

.action-btn {
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: var(--text-secondary);
    margin-right: 0.5rem;
}

.action-btn:hover {
    color: var(--primary-color);
}

.contacts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
}

.contact-card {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    padding: 1.5rem;
    transition: var(--transition);
}

.contact-card:hover {
    box-shadow: var(--shadow-md);
}

.contact-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.contact-header img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

.contact-info {
    flex: 1;
}

.contact-info h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
}

.contact-info p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.contact-score {
    text-align: center;
}

.score-value {
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--primary-color);
}

.score-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.contact-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.detail {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.detail i {
    width: 16px;
    color: var(--primary-color);
}

.detail a {
    color: var(--primary-color);
    text-decoration: none;
}

.detail a:hover {
    text-decoration: underline;
}

.contact-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.contact-actions {
    display: flex;
    gap: 0.5rem;
}

.placeholder {
    padding: 3rem;
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', crmStyles);