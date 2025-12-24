// Service Module - Customer Support & IT Service Management
class ServiceManager {
    constructor() {
        this.tickets = [];
        this.knowledgeBase = [];
        this.slaMetrics = {};
        this.automations = [];
        this.init();
    }

    init() {
        this.loadServiceData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.ticket-card')) {
                this.viewTicket(e.target.closest('.ticket-card').dataset.ticketId);
            }
            if (e.target.closest('.create-ticket-btn')) {
                this.showCreateTicketModal();
            }
            if (e.target.closest('.kb-article')) {
                this.viewArticle(e.target.closest('.kb-article').dataset.articleId);
            }
        });
    }

    async loadServiceData() {
        // Simulate loading service data
        this.tickets = [
            {
                id: 'ticket-1',
                title: 'Cannot login to account',
                description: 'User unable to access account despite correct credentials',
                type: 'incident',
                priority: 'high',
                status: 'in-progress',
                requester: 'John Anderson',
                email: 'john.anderson@company.com',
                assignee: 'Sarah Chen',
                department: 'IT Support',
                category: 'Authentication',
                impact: 'medium',
                urgency: 'high',
                slaDue: '2024-01-20 14:00',
                created: '2024-01-19 10:30',
                updated: '2024-01-19 16:45',
                resolutionTime: null,
                customerSatisfaction: null,
                tags: ['login', 'authentication', 'urgent'],
                attachments: 2,
                comments: 5,
                aiSuggestedCategory: 'Authentication Issues',
                aiRecommendedSolution: 'Reset password and check account lockout'
            },
            {
                id: 'ticket-2',
                title: 'Slow application performance',
                description: 'Application loading times have increased significantly',
                type: 'incident',
                priority: 'medium',
                status: 'open',
                requester: 'Emma Wilson',
                email: 'emma.wilson@company.com',
                assignee: 'Mike Johnson',
                department: 'Technical Support',
                category: 'Performance',
                impact: 'medium',
                urgency: 'medium',
                slaDue: '2024-01-21 10:00',
                created: '2024-01-19 14:20',
                updated: '2024-01-19 14:20',
                resolutionTime: null,
                customerSatisfaction: null,
                tags: ['performance', 'slow', 'optimization'],
                attachments: 1,
                comments: 2,
                aiSuggestedCategory: 'Performance Issues',
                aiRecommendedSolution: 'Check database queries and server resources'
            },
            {
                id: 'ticket-3',
                title: 'Feature request: Dark mode',
                description: 'User requesting dark mode implementation',
                type: 'service-request',
                priority: 'low',
                status: 'pending',
                requester: 'Lisa Anderson',
                email: 'lisa.anderson@company.com',
                assignee: null,
                department: 'Product',
                category: 'Enhancement',
                impact: 'low',
                urgency: 'low',
                slaDue: '2024-01-25 17:00',
                created: '2024-01-18 09:15',
                updated: '2024-01-18 09:15',
                resolutionTime: null,
                customerSatisfaction: null,
                tags: ['feature-request', 'ui', 'enhancement'],
                attachments: 0,
                comments: 1,
                aiSuggestedCategory: 'Feature Requests',
                aiRecommendedSolution: 'Forward to product team for consideration'
            },
            {
                id: 'ticket-4',
                title: 'Email notifications not working',
                description: 'Users not receiving email notifications for tasks',
                type: 'incident',
                priority: 'high',
                status: 'resolved',
                requester: 'David Kim',
                email: 'david.kim@company.com',
                assignee: 'Sarah Chen',
                department: 'IT Support',
                category: 'Email',
                impact: 'high',
                urgency: 'high',
                slaDue: '2024-01-19 12:00',
                created: '2024-01-19 08:00',
                updated: '2024-01-19 11:30',
                resolutionTime: '3h 30m',
                customerSatisfaction: 5,
                tags: ['email', 'notifications', 'critical'],
                attachments: 3,
                comments: 8,
                aiSuggestedCategory: 'Email Issues',
                aiRecommendedSolution: 'Check SMTP configuration and email queue'
            }
        ];

        this.knowledgeBase = [
            {
                id: 'kb-1',
                title: 'How to reset your password',
                category: 'Authentication',
                content: 'Follow these steps to reset your password...',
                views: 1247,
                helpfulVotes: 89,
                lastUpdated: '2024-01-15',
                author: 'Sarah Chen',
                tags: ['password', 'reset', 'authentication']
            },
            {
                id: 'kb-2',
                title: 'Troubleshooting slow application performance',
                category: 'Performance',
                content: 'Common causes and solutions for slow performance...',
                views: 892,
                helpfulVotes: 67,
                lastUpdated: '2024-01-10',
                author: 'Mike Johnson',
                tags: ['performance', 'troubleshooting', 'optimization']
            },
            {
                id: 'kb-3',
                title: 'Email configuration guide',
                category: 'Email',
                content: 'Complete guide for configuring email settings...',
                views: 656,
                helpfulVotes: 78,
                lastUpdated: '2024-01-12',
                author: 'Emma Wilson',
                tags: ['email', 'configuration', 'settings']
            }
        ];

        this.slaMetrics = {
            overall: {
                firstResponse: 85,
                resolution: 78,
                customerSatisfaction: 4.2
            },
            byPriority: {
                critical: { firstResponse: 95, resolution: 92 },
                high: { firstResponse: 88, resolution: 82 },
                medium: { firstResponse: 82, resolution: 75 },
                low: { firstResponse: 75, resolution: 68 }
            }
        };

        this.automations = [
            {
                id: 'auto-1',
                name: 'Auto-assign high priority tickets',
                trigger: 'Ticket priority = high',
                action: 'Assign to senior support staff',
                active: true,
                ticketsProcessed: 156
            },
            {
                id: 'auto-2',
                name: 'Auto-categorize by keywords',
                trigger: 'New ticket created',
                action: 'Analyze content and assign category',
                active: true,
                ticketsProcessed: 342
            },
            {
                id: 'auto-3',
                name: 'Auto-respond to common issues',
                trigger: 'Keywords match',
                action: 'Send suggested solution',
                active: true,
                ticketsProcessed: 89
            }
        ];

        this.renderService();
    }

    renderService() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="service-container">
                <div class="service-header">
                    <h1>Monday Service - Customer & IT Support</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary create-ticket-btn">
                            <i class="fas fa-plus"></i> New Ticket
                        </button>
                        <button class="btn btn-secondary" onclick="showCustomerPortal()">
                            <i class="fas fa-globe"></i> Customer Portal
                        </button>
                        <button class="btn btn-secondary" onclick="exportTickets()">
                            <i class="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>

                <div class="service-stats">
                    <div class="stat-card">
                        <div class="stat-icon warning">
                            <i class="fas fa-ticket-alt"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.tickets.filter(t => t.status === 'open').length}</div>
                            <div class="stat-label">Open Tickets</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon success">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.tickets.filter(t => t.status === 'resolved').length}</div>
                            <div class="stat-label">Resolved Today</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon primary">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.slaMetrics.overall.firstResponse}%</div>
                            <div class="stat-label">SLA Compliance</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon info">
                            <i class="fas fa-smile"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.slaMetrics.overall.customerSatisfaction}</div>
                            <div class="stat-label">Avg Satisfaction</div>
                        </div>
                    </div>
                </div>

                <div class="service-tabs">
                    <button class="tab-btn active" onclick="switchServiceTab('tickets')">Tickets</button>
                    <button class="tab-btn" onclick="switchServiceTab('knowledge-base')">Knowledge Base</button>
                    <button class="tab-btn" onclick="switchServiceTab('automations')">Automations</button>
                    <button class="tab-btn" onclick="switchServiceTab('analytics')">Analytics</button>
                    <button class="tab-btn" onclick="switchServiceTab('sla')">SLA Management</button>
                </div>

                <div class="service-content">
                    ${this.renderTicketsView()}
                </div>
            </div>
        `;
    }

    renderTicketsView() {
        const ticketsByStatus = {
            'open': this.tickets.filter(t => t.status === 'open'),
            'in-progress': this.tickets.filter(t => t.status === 'in-progress'),
            'pending': this.tickets.filter(t => t.status === 'pending'),
            'resolved': this.tickets.filter(t => t.status === 'resolved')
        };

        return `
            <div class="tickets-view">
                <div class="tickets-header">
                    <h2>Ticket Management</h2>
                    <div class="ticket-controls">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search tickets..." onkeyup="filterTickets(this.value)">
                        </div>
                        <select class="filter-select" onchange="filterTicketsByPriority(this.value)">
                            <option value="">All Priorities</option>
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <select class="filter-select" onchange="filterTicketsByType(this.value)">
                            <option value="">All Types</option>
                            <option value="incident">Incident</option>
                            <option value="service-request">Service Request</option>
                            <option value="change">Change Request</option>
                        </select>
                    </div>
                </div>

                <div class="tickets-kanban">
                    ${Object.entries(ticketsByStatus).map(([status, tickets]) => `
                        <div class="kanban-column">
                            <div class="column-header">
                                <h3>${status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</h3>
                                <span class="ticket-count">${tickets.length}</span>
                            </div>
                            <div class="tickets-list" data-status="${status}">
                                ${tickets.map(ticket => this.renderTicketCard(ticket)).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderTicketCard(ticket) {
        const priorityColors = {
            critical: '#E91E63',
            high: '#FF6D00',
            medium: '#FFAB00',
            low: '#00C875'
        };

        const typeIcons = {
            incident: 'fa-exclamation-triangle',
            'service-request': 'fa-clipboard-list',
            change: 'fa-exchange-alt',
            problem: 'fa-bug'
        };

        const statusIcons = {
            open: 'fa-folder-open',
            'in-progress': 'fa-spinner',
            pending: 'fa-clock',
            resolved: 'fa-check-circle'
        };

        const isOverdue = new Date(ticket.slaDue) < new Date() && ticket.status !== 'resolved';

        return `
            <div class="ticket-card ${isOverdue ? 'overdue' : ''}" data-ticket-id="${ticket.id}">
                <div class="ticket-header">
                    <div class="ticket-type">
                        <i class="fas ${typeIcons[ticket.type]}"></i>
                    </div>
                    <div class="ticket-priority" style="color: ${priorityColors[ticket.priority]}">
                        <i class="fas fa-flag"></i>
                    </div>
                </div>
                
                <div class="ticket-title">${ticket.title}</div>
                
                <div class="ticket-meta">
                    <div class="ticket-id">#${ticket.id.split('-')[1]}</div>
                    <div class="ticket-status">
                        <i class="fas ${statusIcons[ticket.status]}"></i>
                        ${ticket.status}
                    </div>
                </div>

                <div class="ticket-requester">
                    <i class="fas fa-user"></i> ${ticket.requester}
                </div>

                ${ticket.aiSuggestedCategory ? `
                    <div class="ai-suggestion">
                        <i class="fas fa-robot"></i>
                        <span>AI: ${ticket.aiSuggestedCategory}</span>
                    </div>
                ` : ''}

                ${ticket.tags.length > 0 ? `
                    <div class="ticket-tags">
                        ${ticket.tags.slice(0, 2).map(tag => `
                            <span class="tag">${tag}</span>
                        `).join('')}
                        ${ticket.tags.length > 2 ? `<span class="tag">+${ticket.tags.length - 2}</span>` : ''}
                    </div>
                ` : ''}

                <div class="ticket-footer">
                    <div class="ticket-assignee">
                        ${ticket.assignee ? `
                            <img src="https://picsum.photos/seed/${ticket.assignee.replace(' ', '')}/24/24" alt="${ticket.assignee}">
                            <span>${ticket.assignee}</span>
                        ` : '<span class="unassigned">Unassigned</span>'}
                    </div>
                    <div class="ticket-sla ${isOverdue ? 'overdue' : ''}">
                        <i class="fas fa-clock"></i>
                        ${this.formatSLADue(ticket.slaDue)}
                    </div>
                </div>

                <div class="ticket-stats">
                    <span class="stat">
                        <i class="fas fa-comment"></i> ${ticket.comments}
                    </span>
                    <span class="stat">
                        <i class="fas fa-paperclip"></i> ${ticket.attachments}
                    </span>
                    ${ticket.customerSatisfaction ? `
                        <span class="stat satisfaction">
                            <i class="fas fa-star"></i> ${ticket.customerSatisfaction}
                        </span>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderKnowledgeBaseView() {
        return `
            <div class="knowledge-base-view">
                <div class="kb-header">
                    <h2>Knowledge Base</h2>
                    <div class="kb-actions">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search articles..." onkeyup="searchKB(this.value)">
                        </div>
                        <button class="btn btn-primary" onclick="createKBArticle()">
                            <i class="fas fa-plus"></i> New Article
                        </button>
                    </div>
                </div>

                <div class="kb-categories">
                    ${this.getKBCategories().map(category => `
                        <div class="category-card">
                            <h3>${category.name}</h3>
                            <p>${category.count} articles</p>
                            <button class="btn btn-sm btn-secondary" onclick="viewCategory('${category.id}')">
                                View Articles
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="kb-articles">
                    <h3>Recent Articles</h3>
                    <div class="articles-grid">
                        ${this.knowledgeBase.map(article => this.renderKBArticle(article)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderKBArticle(article) {
        return `
            <div class="kb-article" data-article-id="${article.id}">
                <div class="article-header">
                    <h4>${article.title}</h4>
                    <div class="article-category">${article.category}</div>
                </div>
                <div class="article-meta">
                    <span class="views">
                        <i class="fas fa-eye"></i> ${article.views}
                    </span>
                    <span class="helpful">
                        <i class="fas fa-thumbs-up"></i> ${article.helpfulVotes}
                    </span>
                    <span class="updated">
                        <i class="fas fa-clock"></i> ${article.lastUpdated}
                    </span>
                </div>
                <div class="article-author">
                    <i class="fas fa-user"></i> ${article.author}
                </div>
                ${article.tags.length > 0 ? `
                    <div class="article-tags">
                        ${article.tags.map(tag => `
                            <span class="tag">${tag}</span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderAutomationsView() {
        return `
            <div class="automations-view">
                <div class="automations-header">
                    <h2>AI-Powered Automations</h2>
                    <button class="btn btn-primary" onclick="createAutomation()">
                        <i class="fas fa-plus"></i> New Automation
                    </button>
                </div>

                <div class="automations-stats">
                    <div class="stat-card">
                        <div class="stat-value">${this.automations.filter(a => a.active).length}</div>
                        <div class="stat-label">Active Automations</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.automations.reduce((sum, a) => sum + a.ticketsProcessed, 0)}</div>
                        <div class="stat-label">Tickets Processed</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">98%</div>
                        <div class="stat-label">Automation Accuracy</div>
                    </div>
                </div>

                <div class="automations-list">
                    ${this.automations.map(automation => this.renderAutomationCard(automation)).join('')}
                </div>
            </div>
        `;
    }

    renderAutomationCard(automation) {
        return `
            <div class="automation-card">
                <div class="automation-header">
                    <div class="automation-info">
                        <h3>${automation.name}</h3>
                        <div class="automation-status ${automation.active ? 'active' : 'inactive'}">
                            <i class="fas fa-circle"></i> ${automation.active ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                    <div class="automation-actions">
                        <button class="btn btn-sm btn-secondary" onclick="editAutomation('${automation.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="toggleAutomation('${automation.id}')">
                            <i class="fas fa-power-off"></i>
                        </button>
                    </div>
                </div>
                
                <div class="automation-details">
                    <div class="automation-rule">
                        <strong>Trigger:</strong> ${automation.trigger}
                    </div>
                    <div class="automation-rule">
                        <strong>Action:</strong> ${automation.action}
                    </div>
                </div>

                <div class="automation-stats">
                    <span class="stat">
                        <i class="fas fa-ticket-alt"></i> ${automation.ticketsProcessed} tickets processed
                    </span>
                </div>
            </div>
        `;
    }

    getKBCategories() {
        const categories = {};
        this.knowledgeBase.forEach(article => {
            if (!categories[article.category]) {
                categories[article.category] = { id: article.category, name: article.category, count: 0 };
            }
            categories[article.category].count++;
        });
        return Object.values(categories);
    }

    formatSLADue(slaDue) {
        const due = new Date(slaDue);
        const now = new Date();
        const diff = due - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        
        if (hours < 0) return 'Overdue';
        if (hours < 24) return `${hours}h`;
        const days = Math.floor(hours / 24);
        return `${days}d`;
    }

    showCreateTicketModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Ticket</h3>
                    <button class="modal-close" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Ticket Title</label>
                        <input type="text" class="form-control" id="ticketTitle" placeholder="Brief description of the issue">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" id="ticketDescription" placeholder="Detailed description of the issue"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Type</label>
                            <select class="form-control" id="ticketType">
                                <option value="incident">Incident</option>
                                <option value="service-request">Service Request</option>
                                <option value="change">Change Request</option>
                                <option value="problem">Problem</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Priority</label>
                            <select class="form-control" id="ticketPriority">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Requester Name</label>
                            <input type="text" class="form-control" id="requesterName" placeholder="Full name">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" id="requesterEmail" placeholder="email@example.com">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Department</label>
                            <select class="form-control" id="ticketDepartment">
                                <option value="IT Support">IT Support</option>
                                <option value="Technical Support">Technical Support</option>
                                <option value="Customer Service">Customer Service</option>
                                <option value="Product">Product</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <select class="form-control" id="ticketCategory">
                                <option value="Authentication">Authentication</option>
                                <option value="Performance">Performance</option>
                                <option value="Email">Email</option>
                                <option value="UI/UX">UI/UX</option>
                                <option value="Billing">Billing</option>
                            </select>
                        </div>
                    </div>
                    <div class="ai-suggestion-box">
                        <i class="fas fa-robot"></i>
                        <span>AI will auto-categorize and suggest solutions based on your description</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal(this)">Cancel</button>
                    <button class="btn btn-primary" onclick="createTicket()">Create Ticket</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    viewTicket(ticketId) {
        const ticket = this.tickets.find(t => t.id === ticketId);
        if (ticket) {
            showNotification(`Viewing ticket: ${ticket.title}`, 'info');
        }
    }

    viewArticle(articleId) {
        const article = this.knowledgeBase.find(a => a.id === articleId);
        if (article) {
            showNotification(`Viewing article: ${article.title}`, 'info');
        }
    }
}

// Global functions
function loadService() {
    if (!window.serviceManager) {
        window.serviceManager = new ServiceManager();
    } else {
        window.serviceManager.renderService();
    }
}

function switchServiceTab(tab) {
    document.querySelectorAll('.service-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const contentArea = document.querySelector('.service-content');
    const serviceManager = window.serviceManager;

    switch(tab) {
        case 'tickets':
            contentArea.innerHTML = serviceManager.renderTicketsView();
            break;
        case 'knowledge-base':
            contentArea.innerHTML = serviceManager.renderKnowledgeBaseView();
            break;
        case 'automations':
            contentArea.innerHTML = serviceManager.renderAutomationsView();
            break;
        case 'analytics':
            contentArea.innerHTML = '<div class="placeholder">Analytics view coming soon...</div>';
            break;
        case 'sla':
            contentArea.innerHTML = '<div class="placeholder">SLA Management view coming soon...</div>';
            break;
    }
}

function createTicket() {
    const ticketData = {
        id: `ticket-${Date.now()}`,
        title: document.getElementById('ticketTitle').value,
        description: document.getElementById('ticketDescription').value,
        type: document.getElementById('ticketType').value,
        priority: document.getElementById('ticketPriority').value,
        requester: document.getElementById('requesterName').value,
        email: document.getElementById('requesterEmail').value,
        department: document.getElementById('ticketDepartment').value,
        category: document.getElementById('ticketCategory').value,
        status: 'open',
        created: new Date().toISOString().replace('T', ' ').slice(0, 16),
        updated: new Date().toISOString().replace('T', ' ').slice(0, 16),
        tags: [],
        attachments: 0,
        comments: 0,
        aiSuggestedCategory: 'Processing...',
        aiRecommendedSolution: 'AI analyzing...'
    };

    if (!ticketData.title || !ticketData.requester) {
        showNotification('Please fill in required fields', 'error');
        return;
    }

    // Simulate AI processing
    setTimeout(() => {
        ticketData.aiSuggestedCategory = ticketData.category;
        ticketData.aiRecommendedSolution = 'Standard troubleshooting steps recommended';
    }, 2000);

    window.serviceManager.tickets.unshift(ticketData);
    window.serviceManager.renderService();
    closeModal(document.querySelector('.modal-close'));
    showNotification('Ticket created successfully', 'success');
}

function showCustomerPortal() {
    showNotification('Opening customer portal...', 'info');
}

function exportTickets() {
    showNotification('Exporting tickets...', 'info');
}

function filterTickets(query) {
    // Implementation for filtering tickets
}

function filterTicketsByPriority(priority) {
    showNotification(`Filter tickets by priority: ${priority}`, 'info');
}

function filterTicketsByType(type) {
    showNotification(`Filter tickets by type: ${type}`, 'info');
}

function searchKB(query) {
    showNotification(`Searching knowledge base: ${query}`, 'info');
}

function createKBArticle() {
    showNotification('Create knowledge base article', 'info');
}

function viewCategory(categoryId) {
    showNotification(`View category: ${categoryId}`, 'info');
}

function createAutomation() {
    showNotification('Create automation', 'info');
}

function editAutomation(automationId) {
    showNotification(`Edit automation ${automationId}`, 'info');
}

function toggleAutomation(automationId) {
    const automation = window.serviceManager.automations.find(a => a.id === automationId);
    if (automation) {
        automation.active = !automation.active;
        window.serviceManager.renderService();
        showNotification(`Automation ${automation.active ? 'activated' : 'deactivated'}`, 'success');
    }
}

// Add Service-specific styles
const serviceStyles = `
<style>
.service-container {
    padding: 1.5rem;
}

.service-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.service-header h1 {
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.service-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.service-tabs {
    display: flex;
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.service-tabs .tab-btn {
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

.service-tabs .tab-btn:hover {
    background-color: var(--light-color);
}

.service-tabs .tab-btn.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.service-content {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
}

.tickets-view {
    padding: 1.5rem;
}

.tickets-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.ticket-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.tickets-kanban {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    height: calc(100vh - 300px);
}

.ticket-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 1rem;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow-sm);
}

.ticket-card:hover {
    box-shadow: var(--shadow-md);
}

.ticket-card.overdue {
    border-left: 4px solid var(--danger-color);
}

.ticket-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.ticket-type {
    color: var(--primary-color);
}

.ticket-priority {
    font-size: 1rem;
}

.ticket-title {
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.3;
}

.ticket-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.ticket-id {
    font-weight: 500;
}

.ticket-status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.ticket-requester {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.ai-suggestion {
    background-color: rgba(98, 126, 234, 0.1);
    color: var(--primary-color);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.ticket-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-bottom: 0.75rem;
}

.tag {
    padding: 0.125rem 0.5rem;
    background-color: var(--light-color);
    border-radius: 9999px;
    font-size: 0.625rem;
    color: var(--text-secondary);
}

.ticket-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.ticket-assignee {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.ticket-assignee img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.unassigned {
    color: var(--text-secondary);
    font-style: italic;
}

.ticket-sla {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.ticket-sla.overdue {
    color: var(--danger-color);
    font-weight: 500;
}

.ticket-stats {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.ticket-stats.satisfaction {
    color: var(--success-color);
}

.knowledge-base-view {
    padding: 1.5rem;
}

.kb-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.kb-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.kb-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.category-card {
    background-color: var(--light-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    text-align: center;
    transition: var(--transition);
}

.category-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
}

.kb-articles h3 {
    margin-bottom: 1rem;
}

.articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1rem;
}

.kb-article {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
}

.kb-article:hover {
    box-shadow: var(--shadow-md);
}

.article-header {
    margin-bottom: 1rem;
}

.article-header h4 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.article-category {
    color: var(--primary-color);
    font-size: 0.875rem;
    font-weight: 500;
}

.article-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.article-author {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.automations-view {
    padding: 1.5rem;
}

.automations-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.automations-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.automations-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.automation-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    transition: var(--transition);
}

.automation-card:hover {
    box-shadow: var(--shadow-md);
}

.automation-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.automation-info h3 {
    margin: 0 0 0.5rem 0;
}

.automation-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
}

.automation-status.active {
    color: var(--success-color);
}

.automation-status.inactive {
    color: var(--text-secondary);
}

.automation-actions {
    display: flex;
    gap: 0.5rem;
}

.automation-details {
    margin-bottom: 1rem;
}

.automation-rule {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.automation-stats {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.ai-suggestion-box {
    background-color: rgba(98, 126, 234, 0.1);
    border: 1px solid rgba(98, 126, 234, 0.3);
    border-radius: var(--radius-md);
    padding: 1rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: var(--primary-color);
}

.placeholder {
    padding: 3rem;
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', serviceStyles);