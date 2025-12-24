// Automations Module - Workflow Builder
class AutomationsManager {
    constructor() {
        this.automations = [];
        this.recipes = [];
        this.workflows = [];
        this.init();
    }

    init() {
        this.loadAutomationData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.automation-card')) {
                this.viewAutomation(e.target.closest('.automation-card').dataset.automationId);
            }
            if (e.target.closest('.create-automation-btn')) {
                this.showCreateAutomationModal();
            }
            if (e.target.closest('.recipe-card')) {
                this.useRecipe(e.target.closest('.recipe-card').dataset.recipeId);
            }
        });
    }

    async loadAutomationData() {
        this.automations = [
            {
                id: 'auto-1',
                name: 'Auto-assign tasks',
                description: 'Automatically assign tasks to team members based on workload',
                status: 'active',
                type: 'custom',
                trigger: {
                    type: 'item_created',
                    board: 'board-1',
                    column: 'status',
                    value: 'To Do'
                },
                actions: [
                    {
                        type: 'assign_item',
                        assignee: 'workload_balanced',
                        criteria: 'lowest_workload'
                    },
                    {
                        type: 'send_notification',
                        recipients: ['assignee'],
                        message: 'You have been assigned a new task'
                    }
                ],
                runs: 342,
                successRate: 98.5,
                lastRun: '2024-01-19 14:30',
                nextRun: null,
                createdBy: 'Admin',
                created: '2024-01-10',
                modified: '2024-01-15'
            },
            {
                id: 'auto-2',
                name: 'Status change notifications',
                description: 'Send email notifications when item status changes',
                status: 'active',
                type: 'recipe',
                trigger: {
                    type: 'status_changed',
                    board: 'all'
                },
                actions: [
                    {
                        type: 'send_email',
                        recipients: ['item_subscribers'],
                        template: 'status_change_template'
                    },
                    {
                        type: 'update_column',
                        column: 'last_updated',
                        value: 'now()'
                    }
                ],
                runs: 1256,
                successRate: 99.2,
                lastRun: '2024-01-19 16:45',
                nextRun: null,
                createdBy: 'Admin',
                created: '2024-01-05',
                modified: '2024-01-18'
            },
            {
                id: 'auto-3',
                name: 'Weekly summary reports',
                description: 'Generate and email weekly performance reports',
                status: 'scheduled',
                type: 'scheduled',
                trigger: {
                    type: 'schedule',
                    frequency: 'weekly',
                    day: 'friday',
                    time: '17:00'
                },
                actions: [
                    {
                        type: 'generate_report',
                        reportType: 'weekly_summary',
                        format: 'pdf'
                    },
                    {
                        type: 'send_email',
                        recipients: ['management_team'],
                        subject: 'Weekly Performance Report',
                        attachment: 'generated_report'
                    }
                ],
                runs: 8,
                successRate: 100,
                lastRun: '2024-01-12 17:00',
                nextRun: '2024-01-19 17:00',
                createdBy: 'Admin',
                created: '2024-01-01',
                modified: '2024-01-12'
            },
            {
                id: 'auto-4',
                name: 'Due date reminders',
                description: 'Send reminders 24 hours before due dates',
                status: 'active',
                type: 'scheduled',
                trigger: {
                    type: 'date_based',
                    condition: 'due_date_minus_1_day'
                },
                actions: [
                    {
                        type: 'send_notification',
                        recipients: ['assignee', 'creator'],
                        message: 'Task is due tomorrow'
                    },
                    {
                        type: 'update_column',
                        column: 'priority',
                        value: 'High',
                        condition: 'due_date_minus_1_day'
                    }
                ],
                runs: 89,
                successRate: 97.8,
                lastRun: '2024-01-18 09:00',
                nextRun: null,
                createdBy: 'Sarah Chen',
                created: '2024-01-08',
                modified: '2024-01-16'
            }
        ];

        this.recipes = [
            {
                id: 'recipe-1',
                name: 'Notify when item is done',
                description: 'Send notification to subscribers when an item is marked as done',
                category: 'Notifications',
                icon: 'fa-check-circle',
                popularity: 1247,
                rating: 4.8,
                trigger: {
                    type: 'status_changed',
                    from: 'any',
                    to: 'Done'
                },
                actions: [
                    {
                        type: 'send_notification',
                        recipients: ['subscribers', 'creator'],
                        message: 'Item has been completed!'
                    }
                ]
            },
            {
                id: 'recipe-2',
                name: 'Move items between groups',
                description: 'Automatically move items to different groups based on status',
                category: 'Organization',
                icon: 'fa-arrows-alt',
                popularity: 892,
                rating: 4.6,
                trigger: {
                    type: 'status_changed',
                    board: 'specific'
                },
                actions: [
                    {
                        type: 'move_item',
                        targetGroup: 'completed_tasks',
                        condition: 'status=Done'
                    }
                ]
            },
            {
                id: 'recipe-3',
                name: 'Create recurring tasks',
                description: 'Create new tasks on a recurring schedule',
                category: 'Scheduling',
                icon: 'fa-redo',
                popularity: 656,
                rating: 4.7,
                trigger: {
                    type: 'schedule',
                    frequency: 'custom'
                },
                actions: [
                    {
                        type: 'create_item',
                        template: 'recurring_task_template'
                    }
                ]
            },
            {
                id: 'recipe-4',
                name: 'Email digest of updates',
                description: 'Send daily email digest of board updates',
                category: 'Reporting',
                icon: 'fa-envelope',
                popularity: 543,
                rating: 4.5,
                trigger: {
                    type: 'schedule',
                    frequency: 'daily',
                    time: '09:00'
                },
                actions: [
                    {
                        type: 'generate_digest',
                        timeRange: 'last_24_hours'
                    },
                    {
                        type: 'send_email',
                        recipients: ['subscribers']
                    }
                ]
            },
            {
                id: 'recipe-5',
                name: 'Auto-fill from templates',
                description: 'Auto-fill columns based on templates when items are created',
                category: 'Data Entry',
                icon: 'fa-file-alt',
                popularity: 432,
                rating: 4.4,
                trigger: {
                    type: 'item_created'
                },
                actions: [
                    {
                        type: 'apply_template',
                        template: 'default_item_template'
                    }
                ]
            },
            {
                id: 'recipe-6',
                name: 'SLA breach alerts',
                description: 'Alert management when SLA is about to be breached',
                category: 'Alerts',
                icon: 'fa-exclamation-triangle',
                popularity: 387,
                rating: 4.9,
                trigger: {
                    type: 'sla_warning',
                    threshold: '80%'
                },
                actions: [
                    {
                        type: 'send_notification',
                        recipients: ['management'],
                        priority: 'high',
                        message: 'SLA breach warning'
                    }
                ]
            }
        ];

        this.triggerTypes = [
            { id: 'item_created', name: 'Item Created', icon: 'fa-plus' },
            { id: 'status_changed', name: 'Status Changed', icon: 'fa-exchange-alt' },
            { id: 'date_based', name: 'Date Based', icon: 'fa-calendar' },
            { id: 'schedule', name: 'Schedule', icon: 'fa-clock' },
            { id: 'manual', name: 'Manual Trigger', icon: 'fa-hand-pointer' },
            { id: 'webhook', name: 'Webhook', icon: 'fa-link' },
            { id: 'form_submitted', name: 'Form Submitted', icon: 'fa-wpforms' },
            { id: 'email_received', name: 'Email Received', icon: 'fa-envelope' }
        ];

        this.actionTypes = [
            { id: 'create_item', name: 'Create Item', icon: 'fa-plus' },
            { id: 'update_column', name: 'Update Column', icon: 'fa-edit' },
            { id: 'move_item', name: 'Move Item', icon: 'fa-arrows-alt' },
            { id: 'assign_item', name: 'Assign Item', icon: 'fa-user' },
            { id: 'send_notification', name: 'Send Notification', icon: 'fa-bell' },
            { id: 'send_email', name: 'Send Email', icon: 'fa-envelope' },
            { id: 'generate_report', name: 'Generate Report', icon: 'fa-chart-bar' },
            { id: 'webhook_call', name: 'Call Webhook', icon: 'fa-link' },
            { id: 'apply_template', name: 'Apply Template', icon: 'fa-file-alt' },
            { id: 'create_subitem', name: 'Create Subitem', icon: 'fa-list' }
        ];

        this.renderAutomations();
    }

    renderAutomations() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="automations-container">
                <div class="automations-header">
                    <h1>Automations & Workflows</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary create-automation-btn">
                            <i class="fas fa-plus"></i> Create Automation
                        </button>
                        <button class="btn btn-secondary" onclick="openWorkflowBuilder()">
                            <i class="fas fa-project-diagram"></i> Workflow Builder
                        </button>
                        <button class="btn btn-secondary" onclick="viewActivityLog()">
                            <i class="fas fa-history"></i> Activity Log
                        </button>
                    </div>
                </div>

                <div class="automations-stats">
                    <div class="stat-card">
                        <div class="stat-icon success">
                            <i class="fas fa-play-circle"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.automations.filter(a => a.status === 'active').length}</div>
                            <div class="stat-label">Active Automations</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon primary">
                            <i class="fas fa-cogs"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.automations.reduce((sum, a) => sum + a.runs, 0)}</div>
                            <div class="stat-label">Total Runs</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon warning">
                            <i class="fas fa-check-double"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.calculateAverageSuccessRate()}%</div>
                            <div class="stat-label">Success Rate</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon info">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.automations.filter(a => a.status === 'scheduled').length}</div>
                            <div class="stat-label">Scheduled</div>
                        </div>
                    </div>
                </div>

                <div class="automations-tabs">
                    <button class="tab-btn active" onclick="switchAutomationsTab('my-automations')">My Automations</button>
                    <button class="tab-btn" onclick="switchAutomationsTab('recipes')">Recipes</button>
                    <button class="tab-btn" onclick="switchAutomationsTab('workflows')">Workflows</button>
                    <button class="tab-btn" onclick="switchAutomationsTab('activity')">Activity</button>
                </div>

                <div class="automations-content">
                    ${this.renderAutomationsList()}
                </div>
            </div>
        `;
    }

    renderAutomationsList() {
        return `
            <div class="automations-list">
                <div class="list-header">
                    <h2>My Automations</h2>
                    <div class="list-filters">
                        <select class="filter-select" onchange="filterAutomations(this.value)">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="paused">Paused</option>
                        </select>
                        <select class="filter-select" onchange="filterAutomationsByType(this.value)">
                            <option value="">All Types</option>
                            <option value="custom">Custom</option>
                            <option value="recipe">Recipe</option>
                            <option value="scheduled">Scheduled</option>
                        </select>
                    </div>
                </div>

                <div class="automations-grid">
                    ${this.automations.map(automation => this.renderAutomationCard(automation)).join('')}
                </div>
            </div>
        `;
    }

    renderAutomationCard(automation) {
        const statusColors = {
            active: '#00C875',
            scheduled: '#FFAB00',
            paused: '#6C757D',
            error: '#FF6D00'
        };

        return `
            <div class="automation-card" data-automation-id="${automation.id}" onclick="editAutomation('${automation.id}')">
                <div class="automation-header">
                    <div class="automation-info">
                        <h3>${automation.name}</h3>
                        <p>${automation.description}</p>
                    </div>
                    <div class="automation-status">
                        <span class="status-indicator" style="background-color: ${statusColors[automation.status]}"></span>
                        <span class="status-text">${automation.status}</span>
                    </div>
                </div>

                <div class="automation-type">
                    <i class="fas fa-${this.getTypeIcon(automation.type)}"></i>
                    <span>${automation.type.charAt(0).toUpperCase() + automation.type.slice(1)}</span>
                </div>

                <div class="automation-flow">
                    <div class="flow-item trigger">
                        <div class="flow-icon">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="flow-content">
                            <div class="flow-label">Trigger</div>
                            <div class="flow-value">${this.formatTrigger(automation.trigger)}</div>
                        </div>
                    </div>
                    <div class="flow-arrow">
                        <i class="fas fa-arrow-down"></i>
                    </div>
                    <div class="flow-item actions">
                        <div class="flow-icon">
                            <i class="fas fa-cogs"></i>
                        </div>
                        <div class="flow-content">
                            <div class="flow-label">${automation.actions.length} Action${automation.actions.length > 1 ? 's' : ''}</div>
                            <div class="flow-value">${automation.actions[0] ? this.formatAction(automation.actions[0]) : 'No actions'}</div>
                        </div>
                    </div>
                </div>

                <div class="automation-stats">
                    <div class="stat">
                        <i class="fas fa-play"></i>
                        <span>${automation.runs} runs</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-check"></i>
                        <span>${automation.successRate}% success</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-clock"></i>
                        <span>Last: ${this.formatDate(automation.lastRun)}</span>
                    </div>
                </div>

                <div class="automation-footer">
                    <div class="automation-meta">
                        <span>Created by ${automation.createdBy}</span>
                        <span>Modified ${this.formatDate(automation.modified)}</span>
                    </div>
                    <div class="automation-controls">
                        <button class="control-btn ${automation.status === 'active' ? 'pause' : 'play'}" 
                                onclick="toggleAutomation('${automation.id}', event)" 
                                title="${automation.status === 'active' ? 'Pause' : 'Start'}">
                            <i class="fas fa-${automation.status === 'active' ? 'pause' : 'play'}"></i>
                        </button>
                        <button class="control-btn edit" onclick="editAutomation('${automation.id}', event)" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="control-btn delete" onclick="deleteAutomation('${automation.id}', event)" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderRecipesView() {
        return `
            <div class="recipes-view">
                <div class="recipes-header">
                    <h2>Automation Recipes</h2>
                    <div class="recipe-filters">
                        <select class="filter-select" onchange="filterRecipes(this.value)">
                            <option value="">All Categories</option>
                            <option value="Notifications">Notifications</option>
                            <option value="Organization">Organization</option>
                            <option value="Scheduling">Scheduling</option>
                            <option value="Reporting">Reporting</option>
                            <option value="Data Entry">Data Entry</option>
                            <option value="Alerts">Alerts</option>
                        </select>
                    </div>
                </div>

                <div class="recipes-grid">
                    ${this.recipes.map(recipe => this.renderRecipeCard(recipe)).join('')}
                </div>
            </div>
        `;
    }

    renderRecipeCard(recipe) {
        return `
            <div class="recipe-card" data-recipe-id="${recipe.id}" onclick="viewRecipeDetails('${recipe.id}')">
                <div class="recipe-header">
                    <div class="recipe-icon">
                        <i class="fas ${recipe.icon}"></i>
                    </div>
                    <div class="recipe-category">${recipe.category}</div>
                </div>
                
                <div class="recipe-content">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                </div>

                <div class="recipe-stats">
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>${recipe.popularity} uses</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>${recipe.rating}</span>
                    </div>
                </div>

                <div class="recipe-preview">
                    <div class="preview-flow">
                        <div class="preview-trigger">
                            <i class="fas fa-play"></i>
                            <span>${this.formatTrigger(recipe.trigger)}</span>
                        </div>
                        <div class="preview-arrow">→</div>
                        <div class="preview-actions">
                            <i class="fas fa-cogs"></i>
                            <span>${recipe.actions.length} actions</span>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary use-recipe-btn" onclick="useRecipe('${recipe.id}')">
                    Use Recipe
                </button>
            </div>
        `;
    }

    renderWorkflowsView() {
        return `
            <div class="workflows-view">
                <div class="workflows-header">
                    <h2>Workflow Builder</h2>
                    <button class="btn btn-primary" onclick="createWorkflow()">
                        <i class="fas fa-plus"></i> New Workflow
                    </button>
                </div>

                <div class="workflows-grid">
                    <div class="workflow-card">
                        <div class="workflow-visual">
                            <div class="workflow-nodes">
                                <div class="node trigger-node">
                                    <i class="fas fa-play"></i>
                                    <span>Trigger</span>
                                </div>
                                <div class="node decision-node">
                                    <i class="fas fa-code-branch"></i>
                                    <span>Decision</span>
                                </div>
                                <div class="node action-node">
                                    <i class="fas fa-cogs"></i>
                                    <span>Action</span>
                                </div>
                            </div>
                            <div class="workflow-connections">
                                <svg width="300" height="200">
                                    <path d="M 50 50 L 150 100" stroke="#627EEA" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
                                    <path d="M 200 100 L 250 150" stroke="#627EEA" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
                                    <defs>
                                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#627EEA"/>
                                        </marker>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div class="workflow-info">
                            <h3>Complex Approval Workflow</h3>
                            <p>Multi-step approval process with conditional logic</p>
                            <div class="workflow-stats">
                                <span>8 steps</span>
                                <span>3 conditions</span>
                                <span>5 actions</span>
                            </div>
                        </div>
                        <button class="btn btn-secondary" onclick="editWorkflow('workflow-1')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>

                    <div class="workflow-card create-workflow" onclick="createWorkflow()">
                        <div class="create-workflow-content">
                            <i class="fas fa-plus-circle"></i>
                            <h3>Create New Workflow</h3>
                            <p>Build complex multi-step workflows with conditional logic</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showCreateAutomationModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Automation</h3>
                    <button class="modal-close" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="creation-options">
                        <div class="option-card" onclick="createFromScratch()">
                            <i class="fas fa-plus"></i>
                            <h4>Create from Scratch</h4>
                            <p>Build a custom automation with specific triggers and actions</p>
                        </div>
                        <div class="option-card" onclick="createFromRecipe()">
                            <i class="fas fa-book"></i>
                            <h4>Use a Recipe</h4>
                            <p>Start with a pre-built automation recipe</p>
                        </div>
                        <div class="option-card" onclick="createFromTemplate()">
                            <i class="fas fa-file-alt"></i>
                            <h4>AI Suggestion</h4>
                            <p>Get AI-powered automation suggestions based on your workflow</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    showAutomationBuilder() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="automation-builder">
                <div class="builder-header">
                    <button class="btn btn-secondary" onclick="backToAutomations()">
                        <i class="fas fa-arrow-left"></i> Back
                    </button>
                    <div class="builder-title">
                        <input type="text" placeholder="Automation Name" class="automation-name-input">
                    </div>
                    <div class="builder-actions">
                        <button class="btn btn-secondary" onclick="testAutomation()">
                            <i class="fas fa-play"></i> Test
                        </button>
                        <button class="btn btn-primary" onclick="saveAutomation()">
                            <i class="fas fa-save"></i> Save
                        </button>
                    </div>
                </div>

                <div class="builder-workspace">
                    <div class="builder-sidebar">
                        <div class="builder-section">
                            <h4>Trigger</h4>
                            <div class="trigger-selector">
                                ${this.triggerTypes.map(trigger => `
                                    <div class="trigger-option" onclick="selectTrigger('${trigger.id}')">
                                        <i class="fas ${trigger.icon}"></i>
                                        <span>${trigger.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="builder-section">
                            <h4>Actions</h4>
                            <div class="action-selector">
                                ${this.actionTypes.map(action => `
                                    <div class="action-option" onclick="addAction('${action.id}')">
                                        <i class="fas ${action.icon}"></i>
                                        <span>${action.name}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="builder-canvas">
                        <div class="automation-flow">
                            <div class="flow-stage trigger-stage">
                                <div class="stage-header">
                                    <i class="fas fa-play"></i>
                                    <span>Trigger</span>
                                    <button class="stage-edit" onclick="editTrigger()">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                                <div class="stage-content" id="triggerStage">
                                    <div class="empty-state">
                                        <p>Select a trigger to get started</p>
                                    </div>
                                </div>
                            </div>

                            <div class="flow-connector">
                                <i class="fas fa-arrow-down"></i>
                            </div>

                            <div class="flow-stage actions-stage">
                                <div class="stage-header">
                                    <i class="fas fa-cogs"></i>
                                    <span>Actions</span>
                                    <button class="stage-add" onclick="showActionSelector()">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div class="stage-content" id="actionsStage">
                                    <div class="empty-state">
                                        <p>Add actions to execute when trigger fires</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="builder-properties">
                        <h4>Properties</h4>
                        <div class="properties-panel">
                            <div class="property-group">
                                <label>Description</label>
                                <textarea class="form-control" placeholder="Describe what this automation does..."></textarea>
                            </div>
                            <div class="property-group">
                                <label>
                                    <input type="checkbox" checked>
                                    Enable automation
                                </label>
                            </div>
                            <div class="property-group">
                                <label>Error handling</label>
                                <select class="form-control">
                                    <option>Stop on error</option>
                                    <option>Continue on error</option>
                                    <option>Retry automatically</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    calculateAverageSuccessRate() {
        if (this.automations.length === 0) return 0;
        const total = this.automations.reduce((sum, a) => sum + a.successRate, 0);
        return Math.round(total / this.automations.length);
    }

    getTypeIcon(type) {
        const icons = {
            custom: 'puzzle-piece',
            recipe: 'book',
            scheduled: 'clock',
            webhook: 'link'
        };
        return icons[type] || 'cogs';
    }

    formatTrigger(trigger) {
        switch(trigger.type) {
            case 'item_created':
                return `Item created in ${trigger.board || 'any board'}`;
            case 'status_changed':
                return `Status changes to ${trigger.to || 'any status'}`;
            case 'schedule':
                return `${trigger.frequency} at ${trigger.time || 'scheduled time'}`;
            case 'date_based':
                return `Date condition: ${trigger.condition}`;
            default:
                return trigger.type;
        }
    }

    formatAction(action) {
        switch(action.type) {
            case 'send_notification':
                return `Send notification to ${action.recipients.join(', ')}`;
            case 'send_email':
                return `Send email to ${action.recipients.join(', ')}`;
            case 'update_column':
                return `Update ${action.column} to ${action.value}`;
            case 'create_item':
                return `Create new item`;
            case 'assign_item':
                return `Assign item to ${action.assignee}`;
            default:
                return action.type.replace(/_/g, ' ');
        }
    }

    formatDate(dateString) {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    }

    viewAutomation(automationId) {
        this.editAutomation(automationId);
    }

    editAutomation(automationId, event) {
        if (event) event.stopPropagation();
        
        const automation = this.automations.find(a => a.id === automationId);
        if (automation) {
            this.currentAutomation = automation;
            this.showAutomationBuilder();
        }
    }
}

// Global functions
function loadAutomations() {
    if (!window.automationsManager) {
        window.automationsManager = new AutomationsManager();
    } else {
        window.automationsManager.renderAutomations();
    }
}

function switchAutomationsTab(tab) {
    document.querySelectorAll('.automations-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const contentArea = document.querySelector('.automations-content');
    const automationsManager = window.automationsManager;

    switch(tab) {
        case 'my-automations':
            contentArea.innerHTML = automationsManager.renderAutomationsList();
            break;
        case 'recipes':
            contentArea.innerHTML = automationsManager.renderRecipesView();
            break;
        case 'workflows':
            contentArea.innerHTML = automationsManager.renderWorkflowsView();
            break;
        case 'activity':
            contentArea.innerHTML = '<div class="placeholder">Activity log view coming soon...</div>';
            break;
    }
}

function toggleAutomation(automationId, event) {
    event.stopPropagation();
    const automation = window.automationsManager.automations.find(a => a.id === automationId);
    if (automation) {
        automation.status = automation.status === 'active' ? 'paused' : 'active';
        window.automationsManager.renderAutomations();
        showNotification(`Automation ${automation.status}`, 'success');
    }
}

function editAutomation(automationId, event) {
    window.automationsManager.editAutomation(automationId, event);
}

function deleteAutomation(automationId, event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this automation?')) {
        window.automationsManager.automations = window.automationsManager.automations.filter(a => a.id !== automationId);
        window.automationsManager.renderAutomations();
        showNotification('Automation deleted', 'success');
    }
}

function useRecipe(recipeId, event) {
    if (event) event.stopPropagation();
    
    const recipe = window.automationsManager.recipes.find(r => r.id === recipeId);
    if (recipe) {
        const newAutomation = {
            id: `auto-${Date.now()}`,
            name: recipe.name,
            description: recipe.description,
            status: 'draft',
            type: 'recipe',
            trigger: recipe.trigger,
            actions: recipe.actions,
            runs: 0,
            successRate: 0,
            lastRun: null,
            nextRun: null,
            createdBy: 'Current User',
            created: new Date().toISOString().split('T')[0],
            modified: new Date().toISOString().split('T')[0]
        };

        window.automationsManager.automations.unshift(newAutomation);
        window.automationsManager.editAutomation(newAutomation.id);
        showNotification('Recipe applied successfully', 'success');
    }
}

function viewRecipeDetails(recipeId) {
    showNotification(`View recipe details: ${recipeId}`, 'info');
}

function createFromScratch() {
    window.automationsManager.currentAutomation = {
        id: `auto-${Date.now()}`,
        name: '',
        description: '',
        status: 'draft',
        type: 'custom',
        trigger: null,
        actions: [],
        runs: 0,
        successRate: 0
    };
    
    window.automationsManager.showAutomationBuilder();
    closeModal(document.querySelector('.modal-close'));
}

function createFromRecipe() {
    switchAutomationsTab('recipes');
    document.querySelector('.automations-tabs .tab-btn:nth-child(2)').click();
    closeModal(document.querySelector('.modal-close'));
}

function createFromTemplate() {
    showNotification('AI suggestion feature coming soon', 'info');
    closeModal(document.querySelector('.modal-close'));
}

function openWorkflowBuilder() {
    switchAutomationsTab('workflows');
    document.querySelector('.automations-tabs .tab-btn:nth-child(3)').click();
}

function viewActivityLog() {
    switchAutomationsTab('activity');
    document.querySelector('.automations-tabs .tab-btn:nth-child(4)').click();
}

function filterAutomations(status) {
    showNotification(`Filter automations by status: ${status}`, 'info');
}

function filterAutomationsByType(type) {
    showNotification(`Filter automations by type: ${type}`, 'info');
}

function filterRecipes(category) {
    showNotification(`Filter recipes by category: ${category}`, 'info');
}

function createWorkflow() {
    showNotification('Create workflow', 'info');
}

function editWorkflow(workflowId) {
    showNotification(`Edit workflow ${workflowId}`, 'info');
}

function backToAutomations() {
    window.automationsManager.renderAutomations();
}

function selectTrigger(triggerId) {
    showNotification(`Selected trigger: ${triggerId}`, 'info');
}

function addAction(actionId) {
    showNotification(`Added action: ${actionId}`, 'info');
}

function editTrigger() {
    showNotification('Edit trigger', 'info');
}

function showActionSelector() {
    showNotification('Show action selector', 'info');
}

function testAutomation() {
    showNotification('Testing automation...', 'info');
    setTimeout(() => {
        showNotification('Test completed successfully', 'success');
    }, 2000);
}

function saveAutomation() {
    showNotification('Automation saved successfully', 'success');
}

// Add Automations-specific styles
const automationsStyles = `
<style>
.automations-container {
    padding: 1.5rem;
}

.automations-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.automations-header h1 {
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.automations-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.automations-tabs {
    display: flex;
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.automations-tabs .tab-btn {
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

.automations-tabs .tab-btn:hover {
    background-color: var(--light-color);
}

.automations-tabs .tab-btn.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.automations-content {
    flex: 1;
    overflow-y: auto;
}

.automations-list {
    padding: 1.5rem;
}

.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.list-filters {
    display: flex;
    gap: 1rem;
}

.filter-select {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
}

.automations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1.5rem;
}

.automation-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
}

.automation-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.automation-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.automation-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
}

.automation-info p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.automation-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.status-text {
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
}

.automation-type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    padding: 0.5rem 0.75rem;
    background-color: var(--light-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.automation-flow {
    margin-bottom: 1rem;
}

.flow-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    margin-bottom: 0.5rem;
}

.flow-item.trigger {
    background-color: rgba(0, 200, 117, 0.1);
}

.flow-item.actions {
    background-color: rgba(98, 126, 234, 0.1);
}

.flow-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-color);
    color: white;
    font-size: 0.875rem;
}

.flow-item.trigger .flow-icon {
    background-color: var(--success-color);
}

.flow-item.actions .flow-icon {
    background-color: var(--primary-color);
}

.flow-content {
    flex: 1;
}

.flow-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
}

.flow-value {
    font-size: 0.875rem;
    color: var(--text-primary);
    font-weight: 500;
}

.flow-arrow {
    text-align: center;
    color: var(--text-secondary);
    margin: 0.5rem 0;
}

.automation-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 1rem 0;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}

.automation-stats .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.automation-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.automation-meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.automation-controls {
    display: flex;
    gap: 0.5rem;
}

.control-btn {
    width: 32px;
    height: 32px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition);
}

.control-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.control-btn.pause:hover {
    border-color: var(--warning-color);
    color: var(--warning-color);
}

.control-btn.delete:hover {
    border-color: var(--danger-color);
    color: var(--danger-color);
}

.recipes-view {
    padding: 1.5rem;
}

.recipes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.recipe-filters {
    display: flex;
    gap: 1rem;
}

.recipes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
}

.recipe-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    text-align: center;
}

.recipe-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.recipe-header {
    position: relative;
    margin-bottom: 1rem;
}

.recipe-icon {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.recipe-category {
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--light-color);
    color: var(--text-secondary);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
}

.recipe-content h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.recipe-content p {
    margin: 0 0 1rem 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.recipe-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
}

.recipe-stats .stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.recipe-preview {
    background-color: var(--light-color);
    border-radius: var(--radius-md);
    padding: 1rem;
    margin-bottom: 1rem;
}

.preview-flow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.preview-trigger,
.preview-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.preview-arrow {
    color: var(--primary-color);
    font-weight: bold;
}

.use-recipe-btn {
    width: 100%;
}

.workflows-view {
    padding: 1.5rem;
}

.workflows-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.workflows-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1.5rem;
}

.workflow-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    transition: var(--transition);
}

.workflow-card:hover {
    box-shadow: var(--shadow-md);
}

.workflow-card.create-workflow {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    border: 2px dashed var(--border-color);
    background-color: var(--light-color);
    cursor: pointer;
}

.workflow-card.create-workflow:hover {
    border-color: var(--primary-color);
    background-color: rgba(98, 126, 234, 0.05);
}

.create-workflow-content {
    text-align: center;
    color: var(--text-secondary);
}

.create-workflow-content i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.create-workflow-content h3 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.workflow-visual {
    background-color: var(--light-color);
    border-radius: var(--radius-md);
    padding: 1rem;
    margin-bottom: 1rem;
    position: relative;
    height: 200px;
}

.workflow-nodes {
    position: relative;
    height: 100%;
}

.node {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    font-size: 0.75rem;
    text-align: center;
}

.trigger-node {
    top: 20px;
    left: 20px;
}

.decision-node {
    top: 70px;
    left: 120px;
    background-color: var(--warning-color);
    border-color: var(--warning-color);
    color: white;
}

.action-node {
    bottom: 20px;
    right: 20px;
}

.workflow-connections {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.workflow-info h3 {
    margin: 0 0 0.5rem 0;
}

.workflow-info p {
    margin: 0 0 1rem 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.workflow-stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.automation-builder {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.builder-header {
    background-color: white;
    border-bottom: 1px solid var(--border-color);
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.builder-title {
    flex: 1;
}

.automation-name-input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 1rem;
    font-weight: 500;
}

.builder-actions {
    display: flex;
    gap: 0.5rem;
}

.builder-workspace {
    flex: 1;
    display: flex;
    height: calc(100vh - 80px);
}

.builder-sidebar {
    width: 250px;
    background-color: white;
    border-right: 1px solid var(--border-color);
    padding: 1rem;
    overflow-y: auto;
}

.builder-section {
    margin-bottom: 2rem;
}

.builder-section h4 {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
}

.trigger-selector,
.action-selector {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.trigger-option,
.action-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: var(--transition);
    font-size: 0.875rem;
}

.trigger-option:hover,
.action-option:hover {
    background-color: var(--light-color);
    border-color: var(--primary-color);
}

.builder-canvas {
    flex: 1;
    background-color: var(--light-color);
    overflow: auto;
    padding: 2rem;
}

.automation-flow {
    max-width: 800px;
    margin: 0 auto;
}

.flow-stage {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: 1rem;
    overflow: hidden;
}

.stage-header {
    background-color: var(--light-color);
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-bottom: 1px solid var(--border-color);
}

.stage-header span {
    font-weight: 600;
    color: var(--text-primary);
}

.stage-edit,
.stage-add {
    margin-left: auto;
    background: none;
    border: none;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    border-radius: var(--radius-sm);
    transition: var(--transition);
}

.stage-edit:hover,
.stage-add:hover {
    background-color: white;
    color: var(--primary-color);
}

.stage-content {
    padding: 1.5rem;
    min-height: 100px;
}

.empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-secondary);
    font-style: italic;
}

.flow-connector {
    text-align: center;
    color: var(--text-secondary);
    font-size: 1.5rem;
    margin: 1rem 0;
}

.builder-properties {
    width: 300px;
    background-color: white;
    border-left: 1px solid var(--border-color);
    padding: 1rem;
    overflow-y: auto;
}

.builder-properties h4 {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
}

.properties-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.property-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.property-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
}

.property-group textarea,
.property-group select {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
}

.property-group textarea {
    min-height: 80px;
    resize: vertical;
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

.placeholder {
    padding: 3rem;
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', automationsStyles);