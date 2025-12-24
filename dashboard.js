// Dashboard Module
class DashboardManager {
    constructor() {
        this.currentSection = 'work-management';
        this.dashboardData = {};
        this.init();
    }

    init() {
        this.loadDashboardData();
        this.setupEventListeners();
        this.renderDashboard();
    }

    setupEventListeners() {
        // Search functionality
        const searchBar = document.querySelector('.search-bar input');
        if (searchBar) {
            searchBar.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Real-time updates simulation
        setInterval(() => {
            this.updateRealTimeData();
        }, 30000); // Update every 30 seconds
    }

    async loadDashboardData() {
        // Simulate loading dashboard data
        this.dashboardData = {
            overview: {
                totalTasks: 1247,
                completedTasks: 892,
                teamMembers: 24,
                activeProjects: 8,
                completionRate: 71.5,
                weeklyProgress: 12.3
            },
            recentActivity: [
                {
                    id: 1,
                    type: 'task_completed',
                    title: 'Design Review Completed',
                    description: 'Website redesign review was completed successfully',
                    user: 'Sarah Chen',
                    time: '2 minutes ago',
                    icon: 'fa-check-circle',
                    color: 'success'
                },
                {
                    id: 2,
                    type: 'new_task',
                    title: 'New Task Assigned',
                    description: 'You\'ve been assigned to "Q4 Planning"',
                    user: 'Mike Johnson',
                    time: '15 minutes ago',
                    icon: 'fa-plus-circle',
                    color: 'primary'
                },
                {
                    id: 3,
                    type: 'comment',
                    title: 'New Comment',
                    description: 'Sarah commented on "Website Redesign"',
                    user: 'Sarah Chen',
                    time: '1 hour ago',
                    icon: 'fa-comment',
                    color: 'secondary'
                },
                {
                    id: 4,
                    type: 'deadline',
                    title: 'Deadline Reminder',
                    description: 'Marketing Campaign deadline is tomorrow',
                    user: 'System',
                    time: '2 hours ago',
                    icon: 'fa-clock',
                    color: 'warning'
                }
            ],
            quickActions: [
                { id: 1, title: 'Create Board', icon: 'fa-plus', section: 'work-management' },
                { id: 2, title: 'Add Task', icon: 'fa-tasks', section: 'work-management' },
                { id: 3, title: 'New Lead', icon: 'fa-user-plus', section: 'crm' },
                { id: 4, title: 'Create Ticket', icon: 'fa-ticket-alt', section: 'service' },
                { id: 5, title: 'Start Sprint', icon: 'fa-running', section: 'dev' },
                { id: 6, title: 'New Form', icon: 'fa-wpforms', section: 'forms' }
            ]
        };
    }

    renderDashboard() {
        this.renderOverviewCards();
        this.renderQuickActions();
        this.renderRecentActivity();
    }

    renderOverviewCards() {
        const overview = this.dashboardData.overview;
        const cardsHTML = `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="card-icon primary">
                        <i class="fas fa-tasks"></i>
                    </div>
                    <div class="card-title">Total Tasks</div>
                    <div class="card-value">${overview.totalTasks.toLocaleString()}</div>
                    <div class="card-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>${overview.weeklyProgress}% this week</span>
                    </div>
                </div>
                
                <div class="dashboard-card">
                    <div class="card-icon success">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="card-title">Completed</div>
                    <div class="card-value">${overview.completedTasks.toLocaleString()}</div>
                    <div class="card-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>${overview.completionRate}% completion rate</span>
                    </div>
                </div>
                
                <div class="dashboard-card">
                    <div class="card-icon warning">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="card-title">Team Members</div>
                    <div class="card-value">${overview.teamMembers}</div>
                    <div class="card-change positive">
                        <i class="fas fa-arrow-up"></i>
                        <span>2 new this month</span>
                    </div>
                </div>
                
                <div class="dashboard-card">
                    <div class="card-icon danger">
                        <i class="fas fa-project-diagram"></i>
                    </div>
                    <div class="card-title">Active Projects</div>
                    <div class="card-value">${overview.activeProjects}</div>
                    <div class="card-change">
                        <i class="fas fa-minus"></i>
                        <span>No change this week</span>
                    </div>
                </div>
            </div>
        `;

        // Insert cards at the beginning of content area
        const contentArea = document.getElementById('contentArea');
        contentArea.insertAdjacentHTML('afterbegin', cardsHTML);
    }

    renderQuickActions() {
        const actions = this.dashboardData.quickActions;
        const actionsHTML = `
            <div class="quick-actions">
                <h2>Quick Actions</h2>
                <div class="action-grid">
                    ${actions.map(action => `
                        <div class="action-item" onclick="handleQuickAction('${action.section}', '${action.title}')">
                            <i class="fas ${action.icon}"></i>
                            <span>${action.title}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const contentArea = document.getElementById('contentArea');
        contentArea.insertAdjacentHTML('beforeend', actionsHTML);
    }

    renderRecentActivity() {
        const activities = this.dashboardData.recentActivity;
        const activityHTML = `
            <div class="recent-activity">
                <h2>Recent Activity</h2>
                <div class="activity-list">
                    ${activities.map(activity => `
                        <div class="activity-item">
                            <div class="activity-icon" style="background-color: var(--${activity.color}-color);">
                                <i class="fas ${activity.icon}"></i>
                            </div>
                            <div class="activity-content">
                                <div class="activity-title">${activity.title}</div>
                                <div class="activity-description">${activity.description}</div>
                                <div class="activity-time">${activity.time}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const contentArea = document.getElementById('contentArea');
        contentArea.insertAdjacentHTML('beforeend', activityHTML);
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.renderDashboard();
            return;
        }

        // Filter and re-render based on search
        const filteredData = this.filterData(query);
        this.renderFilteredDashboard(filteredData);
    }

    filterData(query) {
        const lowerQuery = query.toLowerCase();
        return {
            ...this.dashboardData,
            recentActivity: this.dashboardData.recentActivity.filter(activity =>
                activity.title.toLowerCase().includes(lowerQuery) ||
                activity.description.toLowerCase().includes(lowerQuery)
            )
        };
    }

    renderFilteredDashboard(filteredData) {
        // Re-render with filtered data
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = '';
        this.renderOverviewCards();
        this.renderQuickActions();
        
        if (filteredData.recentActivity.length > 0) {
            this.dashboardData.recentActivity = filteredData.recentActivity;
            this.renderRecentActivity();
        } else {
            contentArea.insertAdjacentHTML('beforeend', `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No results found for "${query}"</p>
                </div>
            `);
        }
    }

    updateRealTimeData() {
        // Simulate real-time data updates
        const randomChange = Math.floor(Math.random() * 10) - 5;
        this.dashboardData.overview.totalTasks += randomChange;
        
        // Add new activity
        const newActivity = {
            id: Date.now(),
            type: 'update',
            title: 'Live Update',
            description: 'Dashboard data has been refreshed',
            user: 'System',
            time: 'Just now',
            icon: 'fa-sync',
            color: 'info'
        };
        
        this.dashboardData.recentActivity.unshift(newActivity);
        if (this.dashboardData.recentActivity.length > 10) {
            this.dashboardData.recentActivity.pop();
        }
        
        // Only update if user is on dashboard
        if (this.currentSection === 'dashboard') {
            this.renderDashboard();
        }
    }

    getStatsSummary() {
        return {
            productivity: Math.round(this.dashboardData.overview.completionRate),
            engagement: Math.round((this.dashboardData.overview.completedTasks / this.dashboardData.overview.totalTasks) * 100),
            efficiency: Math.round(Math.random() * 30 + 70) // Simulated efficiency
        };
    }
}

// Global functions
function showSection(section) {
    // Update active navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNav = document.querySelector(`[onclick="showSection('${section}')"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // Clear content area
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = '';

    // Load section content
    switch(section) {
        case 'work-management':
            loadWorkManagement();
            break;
        case 'crm':
            loadCRM();
            break;
        case 'dev':
            loadDev();
            break;
        case 'service':
            loadService();
            break;
        case 'canvas':
            loadCanvas();
            break;
        case 'forms':
            loadForms();
            break;
        case 'automations':
            loadAutomations();
            break;
        case 'workdocs':
            loadWorkDocs();
            break;
        case 'dashboards':
            loadDashboards();
            break;
        case 'ai-tools':
            loadAITools();
            break;
        default:
            loadWorkManagement();
    }

    // Update current section
    if (window.dashboardManager) {
        window.dashboardManager.currentSection = section;
    }
}

function handleQuickAction(section, action) {
    showSection(section);
    
    // Show notification
    showNotification(`${action} action initiated`, 'info');
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('collapsed');
    sidebar.classList.toggle('active');
}

function showNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('active');
}

function closePanel(panelId) {
    const panel = document.getElementById(panelId);
    panel.classList.remove('active');
}

function createNewItem() {
    // Show modal for creating new items
    showCreateModal();
}

function showHelp() {
    showNotification('Help center opening...', 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardManager = new DashboardManager();
});

// Add notification styles to head
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease-out;
    max-width: 350px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success { border-left: 4px solid var(--success-color); color: var(--success-color); }
.notification-error { border-left: 4px solid var(--danger-color); color: var(--danger-color); }
.notification-warning { border-left: 4px solid var(--warning-color); color: var(--warning-color); }
.notification-info { border-left: 4px solid var(--primary-color); color: var(--primary-color); }

.no-results {
    text-align: center;
    padding: 3rem;
    color: var(--text-secondary);
}

.no-results i {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);