// Development Module - Monday Dev
class DevManager {
    constructor() {
        this.projects = [];
        this.sprints = [];
        this.issues = [];
        this.repositories = [];
        this.currentProject = null;
        this.init();
    }

    init() {
        this.loadDevData();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.issue-card')) {
                this.viewIssue(e.target.closest('.issue-card').dataset.issueId);
            }
            if (e.target.closest('.sprint-card')) {
                this.viewSprint(e.target.closest('.sprint-card').dataset.sprintId);
            }
            if (e.target.closest('.create-sprint-btn')) {
                this.showCreateSprintModal();
            }
            if (e.target.closest('.create-issue-btn')) {
                this.showCreateIssueModal();
            }
        });
    }

    async loadDevData() {
        // Simulate loading development data
        this.projects = [
            {
                id: 'project-1',
                name: 'Mobile App Redesign',
                description: 'Complete redesign of the mobile application',
                repository: 'mobile-app',
                team: 8,
                sprints: 4,
                currentSprint: 'Sprint 3',
                velocity: 42,
                burndown: 75,
                status: 'active',
                technologies: ['React Native', 'Node.js', 'MongoDB'],
                startDate: '2024-01-01',
                targetDate: '2024-03-31'
            },
            {
                id: 'project-2',
                name: 'API Infrastructure',
                description: 'Build scalable API infrastructure',
                repository: 'backend-api',
                team: 6,
                sprints: 6,
                currentSprint: 'Sprint 5',
                velocity: 38,
                burndown: 60,
                status: 'active',
                technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
                startDate: '2023-12-01',
                targetDate: '2024-02-29'
            },
            {
                id: 'project-3',
                name: 'Data Analytics Platform',
                description: 'Real-time analytics and reporting platform',
                repository: 'analytics-platform',
                team: 5,
                sprints: 8,
                currentSprint: 'Sprint 7',
                velocity: 35,
                burndown: 45,
                status: 'planning',
                technologies: ['Python', 'TensorFlow', 'Docker', 'Kubernetes'],
                startDate: '2024-02-01',
                targetDate: '2024-05-31'
            }
        ];

        this.sprints = [
            {
                id: 'sprint-1',
                name: 'Sprint 3 - User Authentication',
                project: 'project-1',
                startDate: '2024-01-15',
                endDate: '2024-01-29',
                status: 'active',
                capacity: 160,
                assigned: 125,
                completed: 45,
                issues: 12,
                goal: 'Implement complete user authentication flow',
                burndownData: [160, 145, 130, 115, 100, 85, 70, 60, 50, 45]
            },
            {
                id: 'sprint-2',
                name: 'Sprint 4 - Payment Integration',
                project: 'project-1',
                startDate: '2024-01-30',
                endDate: '2024-02-13',
                status: 'planned',
                capacity: 160,
                assigned: 140,
                completed: 0,
                issues: 8,
                goal: 'Integrate payment processing system',
                burndownData: []
            },
            {
                id: 'sprint-3',
                name: 'Sprint 5 - API Optimization',
                project: 'project-2',
                startDate: '2024-01-15',
                endDate: '2024-01-29',
                status: 'active',
                capacity: 140,
                assigned: 120,
                completed: 80,
                issues: 15,
                goal: 'Optimize API response times by 50%',
                burndownData: [140, 125, 110, 95, 80, 70, 60, 50, 40, 35]
            }
        ];

        this.issues = [
            {
                id: 'issue-1',
                title: 'Implement OAuth2 authentication',
                description: 'Add OAuth2 support for Google and Facebook login',
                type: 'feature',
                priority: 'high',
                status: 'in-progress',
                assignee: 'Sarah Chen',
                reporter: 'Alex Rivera',
                project: 'project-1',
                sprint: 'sprint-1',
                storyPoints: 8,
                timeTracking: { estimated: 16, logged: 10 },
                labels: ['authentication', 'security', 'frontend'],
                comments: 5,
                attachments: 2,
                created: '2024-01-16',
                updated: '2024-01-18'
            },
            {
                id: 'issue-2',
                title: 'Fix memory leak in data processing',
                description: 'Memory usage increases continuously during data processing',
                type: 'bug',
                priority: 'critical',
                status: 'open',
                assignee: 'Mike Johnson',
                reporter: 'Emma Wilson',
                project: 'project-2',
                sprint: 'sprint-3',
                storyPoints: 5,
                timeTracking: { estimated: 8, logged: 0 },
                labels: ['bug', 'performance', 'backend'],
                comments: 3,
                attachments: 1,
                created: '2024-01-17',
                updated: '2024-01-17'
            },
            {
                id: 'issue-3',
                title: 'Add dark mode support',
                description: 'Implement dark mode theme throughout the application',
                type: 'feature',
                priority: 'medium',
                status: 'todo',
                assignee: 'David Kim',
                reporter: 'Lisa Anderson',
                project: 'project-1',
                sprint: 'sprint-2',
                storyPoints: 3,
                timeTracking: { estimated: 12, logged: 0 },
                labels: ['ui', 'frontend', 'enhancement'],
                comments: 2,
                attachments: 0,
                created: '2024-01-18',
                updated: '2024-01-18'
            }
        ];

        this.repositories = [
            {
                name: 'mobile-app',
                url: 'https://github.com/company/mobile-app',
                language: 'React Native',
                stars: 145,
                forks: 32,
                commits: 1247,
                branches: 8,
                lastCommit: '2 hours ago',
                contributors: 8
            },
            {
                name: 'backend-api',
                url: 'https://github.com/company/backend-api',
                language: 'Python',
                stars: 89,
                forks: 18,
                commits: 892,
                branches: 6,
                lastCommit: '30 minutes ago',
                contributors: 6
            }
        ];

        this.renderDev();
    }

    renderDev() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="dev-container">
                <div class="dev-header">
                    <h1>Monday Dev - Software Development</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary create-sprint-btn">
                            <i class="fas fa-plus"></i> New Sprint
                        </button>
                        <button class="btn btn-secondary create-issue-btn">
                            <i class="fas fa-bug"></i> New Issue
                        </button>
                        <button class="btn btn-secondary" onclick="syncRepositories()">
                            <i class="fab fa-github"></i> Sync
                        </button>
                    </div>
                </div>

                <div class="dev-stats">
                    <div class="stat-card">
                        <div class="stat-icon success">
                            <i class="fas fa-running"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.sprints.filter(s => s.status === 'active').length}</div>
                            <div class="stat-label">Active Sprints</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon warning">
                            <i class="fas fa-bug"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.issues.filter(i => i.type === 'bug').length}</div>
                            <div class="stat-label">Open Issues</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon primary">
                            <i class="fas fa-code-branch"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.repositories.reduce((sum, repo) => sum + repo.commits, 0)}</div>
                            <div class="stat-label">Total Commits</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon info">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value">${this.projects.reduce((sum, proj) => sum + proj.team, 0)}</div>
                            <div class="stat-label">Team Members</div>
                        </div>
                    </div>
                </div>

                <div class="dev-tabs">
                    <button class="tab-btn active" onclick="switchDevTab('projects')">Projects</button>
                    <button class="tab-btn" onclick="switchDevTab('sprints')">Sprints</button>
                    <button class="tab-btn" onclick="switchDevTab('issues')">Issues</button>
                    <button class="tab-btn" onclick="switchDevTab('repositories')">Repositories</button>
                    <button class="tab-btn" onclick="switchDevTab('roadmap')">Roadmap</button>
                    <button class="tab-btn" onclick="switchDevTab('analytics')">Analytics</button>
                </div>

                <div class="dev-content">
                    ${this.renderProjectsView()}
                </div>
            </div>
        `;
    }

    renderProjectsView() {
        return `
            <div class="projects-view">
                <div class="projects-grid">
                    ${this.projects.map(project => this.renderProjectCard(project)).join('')}
                </div>
            </div>
        `;
    }

    renderProjectCard(project) {
        const statusColors = {
            active: '#00C875',
            planning: '#FFAB00',
            completed: '#627EEA',
            on-hold: '#FF6D00'
        };

        return `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-header">
                    <div class="project-info">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>
                    </div>
                    <div class="project-status">
                        <span class="status-badge" style="background-color: ${statusColors[project.status]}">
                            ${project.status}
                        </span>
                    </div>
                </div>
                
                <div class="project-metrics">
                    <div class="metric">
                        <div class="metric-label">Team</div>
                        <div class="metric-value">
                            <i class="fas fa-users"></i> ${project.team}
                        </div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">Velocity</div>
                        <div class="metric-value">
                            <i class="fas fa-tachometer-alt"></i> ${project.velocity}
                        </div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">Burndown</div>
                        <div class="metric-value">
                            <i class="fas fa-fire"></i> ${project.burndown}%
                        </div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">Sprints</div>
                        <div class="metric-value">
                            <i class="fas fa-running"></i> ${project.currentSprint}
                        </div>
                    </div>
                </div>

                <div class="project-timeline">
                    <div class="timeline-dates">
                        <span><i class="fas fa-calendar-start"></i> ${project.startDate}</span>
                        <span><i class="fas fa-calendar-check"></i> ${project.targetDate}</span>
                    </div>
                </div>

                <div class="project-technologies">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>

                <div class="project-footer">
                    <div class="repository-info">
                        <i class="fab fa-github"></i>
                        <span>${project.repository}</span>
                    </div>
                    <div class="project-actions">
                        <button class="btn btn-sm btn-secondary" onclick="viewProject('${project.id}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderSprintsView() {
        return `
            <div class="sprints-view">
                <div class="sprints-header">
                    <h2>Sprint Management</h2>
                    <div class="sprint-controls">
                        <select class="filter-select" onchange="filterSprintsByProject(this.value)">
                            <option value="">All Projects</option>
                            ${this.projects.map(project => 
                                `<option value="${project.id}">${project.name}</option>`
                            ).join('')}
                        </select>
                        <button class="btn btn-secondary" onclick="viewCapacityPlanner()">
                            <i class="fas fa-chart-pie"></i> Capacity Planner
                        </button>
                    </div>
                </div>

                <div class="sprints-grid">
                    ${this.sprints.map(sprint => this.renderSprintCard(sprint)).join('')}
                </div>
            </div>
        `;
    }

    renderSprintCard(sprint) {
        const project = this.projects.find(p => p.id === sprint.project);
        const completion = (sprint.completed / sprint.assigned) * 100;
        const statusColors = {
            active: '#00C875',
            planned: '#FFAB00',
            completed: '#627EEA',
            cancelled: '#FF6D00'
        };

        return `
            <div class="sprint-card" data-sprint-id="${sprint.id}">
                <div class="sprint-header">
                    <div class="sprint-info">
                        <h3>${sprint.name}</h3>
                        <p class="project-name">${project ? project.name : 'Unknown Project'}</p>
                    </div>
                    <div class="sprint-status">
                        <span class="status-badge" style="background-color: ${statusColors[sprint.status]}">
                            ${sprint.status}
                        </span>
                    </div>
                </div>

                <div class="sprint-goal">
                    <strong>Goal:</strong> ${sprint.goal}
                </div>

                <div class="sprint-timeline">
                    <div class="timeline-info">
                        <span><i class="fas fa-calendar-start"></i> ${sprint.startDate}</span>
                        <span><i class="fas fa-calendar-check"></i> ${sprint.endDate}</span>
                    </div>
                </div>

                <div class="sprint-metrics">
                    <div class="metric-row">
                        <div class="metric">
                            <span class="label">Capacity</span>
                            <span class="value">${sprint.capacity}h</span>
                        </div>
                        <div class="metric">
                            <span class="label">Assigned</span>
                            <span class="value">${sprint.assigned}h</span>
                        </div>
                        <div class="metric">
                            <span class="label">Completed</span>
                            <span class="value">${sprint.completed}h</span>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${completion}%"></div>
                    </div>
                    <div class="progress-text">${Math.round(completion)}% complete</div>
                </div>

                <div class="sprint-stats">
                    <div class="stat">
                        <i class="fas fa-bug"></i>
                        <span>${sprint.issues} Issues</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-chart-line"></i>
                        <span>Burndown</span>
                    </div>
                </div>

                ${sprint.burndownData.length > 0 ? `
                    <div class="burndown-chart">
                        <canvas id="burndown-${sprint.id}" width="300" height="100"></canvas>
                    </div>
                ` : ''}

                <div class="sprint-actions">
                    <button class="btn btn-sm btn-secondary" onclick="viewSprint('${sprint.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="editSprint('${sprint.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        `;
    }

    renderIssuesView() {
        const issuesByStatus = {
            'todo': this.issues.filter(i => i.status === 'todo'),
            'in-progress': this.issues.filter(i => i.status === 'in-progress'),
            'testing': this.issues.filter(i => i.status === 'testing'),
            'done': this.issues.filter(i => i.status === 'done')
        };

        return `
            <div class="issues-view">
                <div class="issues-header">
                    <h2>Issue Tracking</h2>
                    <div class="issue-controls">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search issues..." onkeyup="filterIssues(this.value)">
                        </div>
                        <select class="filter-select" onchange="filterIssuesByType(this.value)">
                            <option value="">All Types</option>
                            <option value="feature">Features</option>
                            <option value="bug">Bugs</option>
                            <option value="improvement">Improvements</option>
                        </select>
                    </div>
                </div>

                <div class="kanban-board">
                    ${Object.entries(issuesByStatus).map(([status, issues]) => `
                        <div class="kanban-column">
                            <div class="column-header">
                                <h3>${status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}</h3>
                                <span class="issue-count">${issues.length}</span>
                            </div>
                            <div class="issues-list" data-status="${status}">
                                ${issues.map(issue => this.renderIssueCard(issue)).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderIssueCard(issue) {
        const priorityColors = {
            low: '#00C875',
            medium: '#FFAB00',
            high: '#FF6D00',
            critical: '#E91E63'
        };

        const typeIcons = {
            feature: 'fa-star',
            bug: 'fa-bug',
            improvement: 'fa-arrow-up',
            task: 'fa-tasks'
        };

        return `
            <div class="issue-card" data-issue-id="${issue.id}" draggable="true" ondragstart="handleIssueDragStart(event, '${issue.id}')">
                <div class="issue-header">
                    <div class="issue-type">
                        <i class="fas ${typeIcons[issue.type]}"></i>
                    </div>
                    <div class="issue-priority" style="color: ${priorityColors[issue.priority]}">
                        <i class="fas fa-flag"></i>
                    </div>
                </div>
                
                <div class="issue-title">${issue.title}</div>
                
                <div class="issue-meta">
                    <div class="issue-id">#${issue.id.split('-')[1]}</div>
                    <div class="issue-story-points">${issue.storyPoints} points</div>
                </div>

                ${issue.labels.length > 0 ? `
                    <div class="issue-labels">
                        ${issue.labels.map(label => `
                            <span class="label">${label}</span>
                        `).join('')}
                    </div>
                ` : ''}

                <div class="issue-footer">
                    <div class="issue-assignee">
                        <img src="https://picsum.photos/seed/${issue.assignee.replace(' ', '')}/24/24" alt="${issue.assignee}">
                        <span>${issue.assignee}</span>
                    </div>
                    <div class="issue-time">
                        <i class="fas fa-clock"></i>
                        ${issue.timeTracking.logged}/${issue.timeTracking.estimated}h
                    </div>
                </div>

                <div class="issue-stats">
                    <span class="stat">
                        <i class="fas fa-comment"></i> ${issue.comments}
                    </span>
                    <span class="stat">
                        <i class="fas fa-paperclip"></i> ${issue.attachments}
                    </span>
                </div>
            </div>
        `;
    }

    renderRepositoriesView() {
        return `
            <div class="repositories-view">
                <div class="repositories-header">
                    <h2>Code Repositories</h2>
                    <button class="btn btn-secondary" onclick="connectRepository()">
                        <i class="fab fa-github"></i> Connect Repository
                    </button>
                </div>

                <div class="repositories-grid">
                    ${this.repositories.map(repo => this.renderRepositoryCard(repo)).join('')}
                </div>
            </div>
        `;
    }

    renderRepositoryCard(repo) {
        const languageColors = {
            'React Native': '#61DAFB',
            'Python': '#3776AB',
            'JavaScript': '#F7DF1E',
            'TypeScript': '#3178C6',
            'Java': '#007396'
        };

        return `
            <div class="repository-card">
                <div class="repo-header">
                    <div class="repo-info">
                        <h3>
                            <i class="fab fa-github"></i> ${repo.name}
                        </h3>
                        <a href="${repo.url}" target="_blank" class="repo-link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                    <div class="repo-language">
                        <span class="language-badge" style="background-color: ${languageColors[repo.language] || '#6C757D'}">
                            ${repo.language}
                        </span>
                    </div>
                </div>

                <div class="repo-stats">
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>${repo.stars}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-code-branch"></i>
                        <span>${repo.forks}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-code-commit"></i>
                        <span>${repo.commits}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>${repo.contributors}</span>
                    </div>
                </div>

                <div class="repo-branches">
                    <span class="branches-info">
                        <i class="fas fa-code-branch"></i> ${repo.branches} branches
                    </span>
                </div>

                <div class="repo-footer">
                    <span class="last-commit">
                        <i class="fas fa-clock"></i> ${repo.lastCommit}
                    </span>
                    <button class="btn btn-sm btn-secondary" onclick="viewCommits('${repo.name}')">
                        <i class="fas fa-code-commit"></i> Commits
                    </button>
                </div>
            </div>
        `;
    }

    showCreateSprintModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Sprint</h3>
                    <button class="modal-close" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Sprint Name</label>
                        <input type="text" class="form-control" id="sprintName" placeholder="Enter sprint name">
                    </div>
                    <div class="form-group">
                        <label>Project</label>
                        <select class="form-control" id="sprintProject">
                            ${this.projects.map(project => 
                                `<option value="${project.id}">${project.name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Sprint Goal</label>
                        <textarea class="form-control" id="sprintGoal" placeholder="What's the goal of this sprint?"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Start Date</label>
                            <input type="date" class="form-control" id="sprintStartDate">
                        </div>
                        <div class="form-group">
                            <label>End Date</label>
                            <input type="date" class="form-control" id="sprintEndDate">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Capacity (hours)</label>
                        <input type="number" class="form-control" id="sprintCapacity" value="160">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal(this)">Cancel</button>
                    <button class="btn btn-primary" onclick="createSprint()">Create Sprint</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    showCreateIssueModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Issue</h3>
                    <button class="modal-close" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Issue Title</label>
                        <input type="text" class="form-control" id="issueTitle" placeholder="Enter issue title">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" id="issueDescription" placeholder="Describe the issue in detail"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Type</label>
                            <select class="form-control" id="issueType">
                                <option value="feature">Feature</option>
                                <option value="bug">Bug</option>
                                <option value="improvement">Improvement</option>
                                <option value="task">Task</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Priority</label>
                            <select class="form-control" id="issuePriority">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Project</label>
                            <select class="form-control" id="issueProject">
                                ${this.projects.map(project => 
                                    `<option value="${project.id}">${project.name}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Assignee</label>
                            <select class="form-control" id="issueAssignee">
                                <option>Sarah Chen</option>
                                <option>Mike Johnson</option>
                                <option>David Kim</option>
                                <option>Emma Wilson</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Story Points</label>
                        <input type="number" class="form-control" id="issueStoryPoints" min="1" max="13" value="3">
                    </div>
                    <div class="form-group">
                        <label>Labels (comma separated)</label>
                        <input type="text" class="form-control" id="issueLabels" placeholder="frontend, bug, urgent">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal(this)">Cancel</button>
                    <button class="btn btn-primary" onclick="createIssue()">Create Issue</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    viewProject(projectId) {
        this.currentProject = this.projects.find(p => p.id === projectId);
        if (this.currentProject) {
            showNotification(`Viewing project: ${this.currentProject.name}`, 'info');
        }
    }

    viewSprint(sprintId) {
        const sprint = this.sprints.find(s => s.id === sprintId);
        if (sprint) {
            showNotification(`Viewing sprint: ${sprint.name}`, 'info');
        }
    }

    viewIssue(issueId) {
        const issue = this.issues.find(i => i.id === issueId);
        if (issue) {
            showNotification(`Viewing issue: ${issue.title}`, 'info');
        }
    }
}

// Global functions
function loadDev() {
    if (!window.devManager) {
        window.devManager = new DevManager();
    } else {
        window.devManager.renderDev();
    }
}

function switchDevTab(tab) {
    document.querySelectorAll('.dev-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const contentArea = document.querySelector('.dev-content');
    const devManager = window.devManager;

    switch(tab) {
        case 'projects':
            contentArea.innerHTML = devManager.renderProjectsView();
            break;
        case 'sprints':
            contentArea.innerHTML = devManager.renderSprintsView();
            break;
        case 'issues':
            contentArea.innerHTML = devManager.renderIssuesView();
            break;
        case 'repositories':
            contentArea.innerHTML = devManager.renderRepositoriesView();
            break;
        case 'roadmap':
            contentArea.innerHTML = '<div class="placeholder">Roadmap view coming soon...</div>';
            break;
        case 'analytics':
            contentArea.innerHTML = '<div class="placeholder">Analytics view coming soon...</div>';
            break;
    }
}

function createSprint() {
    const sprintData = {
        id: `sprint-${Date.now()}`,
        name: document.getElementById('sprintName').value,
        project: document.getElementById('sprintProject').value,
        goal: document.getElementById('sprintGoal').value,
        startDate: document.getElementById('sprintStartDate').value,
        endDate: document.getElementById('sprintEndDate').value,
        capacity: parseInt(document.getElementById('sprintCapacity').value) || 160,
        assigned: 0,
        completed: 0,
        issues: 0,
        status: 'planned',
        burndownData: []
    };

    if (!sprintData.name || !sprintData.goal) {
        showNotification('Please fill in required fields', 'error');
        return;
    }

    window.devManager.sprints.push(sprintData);
    window.devManager.renderDev();
    closeModal(document.querySelector('.modal-close'));
    showNotification('Sprint created successfully', 'success');
}

function createIssue() {
    const issueData = {
        id: `issue-${Date.now()}`,
        title: document.getElementById('issueTitle').value,
        description: document.getElementById('issueDescription').value,
        type: document.getElementById('issueType').value,
        priority: document.getElementById('issuePriority').value,
        project: document.getElementById('issueProject').value,
        assignee: document.getElementById('issueAssignee').value,
        storyPoints: parseInt(document.getElementById('issueStoryPoints').value) || 3,
        status: 'todo',
        timeTracking: { estimated: 8, logged: 0 },
        labels: document.getElementById('issueLabels').value.split(',').map(l => l.trim()).filter(l => l),
        comments: 0,
        attachments: 0,
        created: new Date().toISOString().split('T')[0],
        updated: new Date().toISOString().split('T')[0]
    };

    if (!issueData.title) {
        showNotification('Please enter an issue title', 'error');
        return;
    }

    window.devManager.issues.push(issueData);
    window.devManager.renderDev();
    closeModal(document.querySelector('.modal-close'));
    showNotification('Issue created successfully', 'success');
}

function handleIssueDragStart(event, issueId) {
    event.dataTransfer.setData('issueId', issueId);
}

function syncRepositories() {
    showNotification('Syncing repositories...', 'info');
}

function filterSprintsByProject(projectId) {
    showNotification(`Filter sprints by project: ${projectId}`, 'info');
}

function viewCapacityPlanner() {
    showNotification('Opening capacity planner...', 'info');
}

function filterIssues(query) {
    // Implementation for filtering issues
}

function filterIssuesByType(type) {
    showNotification(`Filter issues by type: ${type}`, 'info');
}

function editSprint(sprintId) {
    showNotification(`Edit sprint ${sprintId}`, 'info');
}

function connectRepository() {
    showNotification('Connect repository feature', 'info');
}

function viewCommits(repoName) {
    showNotification(`View commits for ${repoName}`, 'info');
}

// Add Dev-specific styles
const devStyles = `
<style>
.dev-container {
    padding: 1.5rem;
}

.dev-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.dev-header h1 {
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.dev-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.dev-tabs {
    display: flex;
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: 1.5rem;
    overflow: hidden;
}

.dev-tabs .tab-btn {
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

.dev-tabs .tab-btn:hover {
    background-color: var(--light-color);
}

.dev-tabs .tab-btn.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.dev-content {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
}

.projects-view {
    padding: 1.5rem;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
}

.project-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    transition: var(--transition);
}

.project-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.project-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.project-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.125rem;
}

.project-info p {
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

.project-metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
}

.metric {
    text-align: center;
}

.metric-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-bottom: 0.25rem;
}

.metric-value {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
}

.project-timeline {
    margin-bottom: 1rem;
}

.timeline-dates {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.project-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.tech-tag {
    padding: 0.25rem 0.5rem;
    background-color: var(--light-color);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.project-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

.repository-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.sprints-view {
    padding: 1.5rem;
}

.sprints-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.sprint-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.sprints-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
}

.sprint-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    transition: var(--transition);
}

.sprint-card:hover {
    box-shadow: var(--shadow-md);
}

.sprint-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.sprint-info h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
}

.project-name {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.75rem;
}

.sprint-goal {
    font-size: 0.875rem;
    margin-bottom: 1rem;
    color: var(--text-secondary);
}

.sprint-timeline {
    margin-bottom: 1rem;
}

.timeline-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.sprint-metrics {
    margin-bottom: 1rem;
}

.metric-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
}

.metric-row .metric {
    text-align: left;
}

.metric-row .label {
    display: block;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.metric-row .value {
    font-weight: 500;
    color: var(--text-primary);
}

.progress-bar {
    width: 100%;
    height: 8px;
    background-color: var(--border-color);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.25rem;
}

.progress-fill {
    height: 100%;
    background-color: var(--success-color);
    transition: width 0.3s ease;
}

.progress-text {
    font-size: 0.75rem;
    color: var(--text-secondary);
    text-align: center;
}

.sprint-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.burndown-chart {
    margin-bottom: 1rem;
    text-align: center;
}

.sprint-actions {
    display: flex;
    gap: 0.5rem;
}

.issues-view {
    padding: 1.5rem;
}

.issues-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.issue-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.search-bar {
    position: relative;
}

.search-bar i {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-secondary);
}

.search-bar input {
    padding: 0.5rem 0.75rem 0.5rem 2.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    width: 250px;
}

.kanban-board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    height: calc(100vh - 300px);
}

.kanban-column {
    background-color: var(--light-color);
    border-radius: var(--radius-lg);
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

.column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);
}

.column-header h3 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
}

.issue-count {
    background-color: var(--border-color);
    color: var(--text-secondary);
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.issues-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.issue-card {
    background-color: white;
    border-radius: var(--radius-md);
    padding: 1rem;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow-sm);
}

.issue-card:hover {
    box-shadow: var(--shadow-md);
}

.issue-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
}

.issue-type {
    color: var(--primary-color);
}

.issue-priority {
    font-size: 1rem;
}

.issue-title {
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    line-height: 1.3;
}

.issue-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.issue-id {
    font-weight: 500;
}

.issue-story-points {
    color: var(--primary-color);
}

.issue-labels {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-bottom: 0.75rem;
}

.label {
    padding: 0.125rem 0.5rem;
    background-color: var(--light-color);
    border-radius: 9999px;
    font-size: 0.625rem;
    color: var(--text-secondary);
}

.issue-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.issue-assignee {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.issue-assignee img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.issue-time {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.issue-stats {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.repositories-view {
    padding: 1.5rem;
}

.repositories-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.repositories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
}

.repository-card {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    transition: var(--transition);
}

.repository-card:hover {
    box-shadow: var(--shadow-md);
}

.repo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.repo-info h3 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
}

.repo-link {
    color: var(--text-secondary);
    text-decoration: none;
    transition: var(--transition);
}

.repo-link:hover {
    color: var(--primary-color);
}

.language-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
}

.repo-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1rem;
}

.repo-stats .stat {
    text-align: center;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.repo-stats .stat span {
    display: block;
    font-weight: 500;
    color: var(--text-primary);
}

.repo-branches {
    margin-bottom: 1rem;
}

.branches-info {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.repo-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.last-commit {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.placeholder {
    padding: 3rem;
    text-align: center;
    color: var(--text-secondary);
    font-style: italic;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', devStyles);