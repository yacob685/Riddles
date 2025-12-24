// Work Management - Boards Module
class BoardsManager {
    constructor() {
        this.boards = [];
        this.currentBoard = null;
        this.views = ['table', 'kanban', 'calendar', 'timeline', 'chart', 'map', 'workload'];
        this.columnTypes = [
            'status', 'text', 'number', 'date', 'timeline', 'person', 'label', 
            'priority', 'dropdown', 'checkbox', 'link', 'file', 'email', 'phone',
            'location', 'rating', 'vote', 'formula', 'mirror', 'dependency'
        ];
        this.init();
    }

    init() {
        this.loadBoards();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Event listeners for board interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.board-item')) {
                this.selectBoard(e.target.closest('.board-item').dataset.boardId);
            }
            if (e.target.closest('.create-board-btn')) {
                this.showCreateBoardModal();
            }
            if (e.target.closest('.add-item-btn')) {
                this.addNewItem();
            }
        });
    }

    async loadBoards() {
        // Simulate loading boards from API
        this.boards = [
            {
                id: 'board-1',
                name: 'Marketing Campaign',
                description: 'Q4 Marketing initiatives and campaigns',
                owner: 'Sarah Chen',
                members: 8,
                items: 47,
                updated: '2 hours ago',
                color: '#00C875',
                columns: [
                    { id: 'status', name: 'Status', type: 'status' },
                    { id: 'task', name: 'Task Name', type: 'text' },
                    { id: 'assignee', name: 'Assignee', type: 'person' },
                    { id: 'timeline', name: 'Timeline', type: 'timeline' },
                    { id: 'priority', name: 'Priority', type: 'priority' }
                ],
                items: [
                    {
                        id: 'item-1',
                        values: {
                            status: { label: 'Working on it', color: '#00C875' },
                            task: 'Design social media graphics',
                            assignee: { name: 'Sarah Chen', avatar: 'sarah' },
                            timeline: { start: '2024-01-15', end: '2024-01-20' },
                            priority: { label: 'High', color: '#FF6D00' }
                        }
                    },
                    {
                        id: 'item-2',
                        values: {
                            status: { label: 'Done', color: '#00C875' },
                            task: 'Write blog post for product launch',
                            assignee: { name: 'Mike Johnson', avatar: 'mike' },
                            timeline: { start: '2024-01-10', end: '2024-01-12' },
                            priority: { label: 'Medium', color: '#FFAB00' }
                        }
                    }
                ]
            },
            {
                id: 'board-2',
                name: 'Product Development',
                description: 'New features and improvements',
                owner: 'Alex Rivera',
                members: 12,
                items: 89,
                updated: '5 minutes ago',
                color: '#627EEA',
                columns: [
                    { id: 'feature', name: 'Feature', type: 'text' },
                    { id: 'status', name: 'Status', type: 'status' },
                    { id: 'assignee', name: 'Developer', type: 'person' },
                    { id: 'sprint', name: 'Sprint', type: 'dropdown' },
                    { id: 'story-points', name: 'Story Points', type: 'number' }
                ]
            },
            {
                id: 'board-3',
                name: 'Customer Support',
                description: 'Customer tickets and issues',
                owner: 'Emma Wilson',
                members: 6,
                items: 124,
                updated: '1 hour ago',
                color: '#FF6D00'
            }
        ];
        
        this.renderBoardsList();
    }

    renderBoardsList() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="boards-container">
                <div class="boards-header">
                    <h1>Work Management</h1>
                    <div class="header-actions">
                        <button class="btn btn-primary create-board-btn">
                            <i class="fas fa-plus"></i> New Board
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-th"></i> Templates
                        </button>
                    </div>
                </div>

                <div class="boards-filters">
                    <div class="filter-group">
                        <input type="text" placeholder="Search boards..." class="filter-input">
                        <select class="filter-select">
                            <option>All Boards</option>
                            <option>My Boards</option>
                            <option>Shared with me</option>
                            <option>Archived</option>
                        </select>
                        <select class="filter-select">
                            <option>All Team Members</option>
                            <option>Sarah Chen</option>
                            <option>Alex Rivera</option>
                            <option>Emma Wilson</option>
                        </select>
                    </div>
                </div>

                <div class="boards-grid">
                    ${this.boards.map(board => this.renderBoardCard(board)).join('')}
                </div>
            </div>
        `;

        // Add event listeners for filters
        this.setupBoardFilters();
    }

    renderBoardCard(board) {
        return `
            <div class="board-card" data-board-id="${board.id}">
                <div class="board-header" style="border-left: 4px solid ${board.color}">
                    <h3>${board.name}</h3>
                    <div class="board-menu">
                        <button class="menu-btn" onclick="showBoardMenu('${board.id}')">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    </div>
                </div>
                <div class="board-description">${board.description}</div>
                <div class="board-stats">
                    <div class="stat">
                        <i class="fas fa-tasks"></i>
                        <span>${board.items}</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>${board.members}</span>
                    </div>
                </div>
                <div class="board-footer">
                    <div class="board-owner">
                        <img src="https://picsum.photos/seed/${board.owner.replace(' ', '')}/24/24" alt="${board.owner}">
                        <span>${board.owner}</span>
                    </div>
                    <div class="board-updated">${board.updated}</div>
                </div>
            </div>
        `;
    }

    selectBoard(boardId) {
        this.currentBoard = this.boards.find(b => b.id === boardId);
        if (this.currentBoard) {
            this.renderBoardView();
        }
    }

    renderBoardView() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <div class="board-view">
                <div class="board-toolbar">
                    <div class="toolbar-left">
                        <button class="btn btn-secondary" onclick="backToBoards()">
                            <i class="fas fa-arrow-left"></i> Back to Boards
                        </button>
                        <h2>${this.currentBoard.name}</h2>
                    </div>
                    <div class="toolbar-right">
                        <div class="view-switcher">
                            ${this.views.map(view => `
                                <button class="view-btn ${view === 'table' ? 'active' : ''}" 
                                        onclick="switchView('${view}')"
                                        title="${view.charAt(0).toUpperCase() + view.slice(1)}">
                                    <i class="fas fa-${getViewIcon(view)}"></i>
                                </button>
                            `).join('')}
                        </div>
                        <button class="btn btn-secondary add-item-btn">
                            <i class="fas fa-plus"></i> Add Item
                        </button>
                    </div>
                </div>

                <div class="board-content">
                    ${this.renderTableView()}
                </div>
            </div>
        `;
    }

    renderTableView() {
        const board = this.currentBoard;
        if (!board.columns) return '<div>No columns configured</div>';

        return `
            <div class="table-view">
                <div class="table-header">
                    <div class="table-row">
                        ${board.columns.map(column => `
                            <div class="table-cell header-cell">
                                ${column.name}
                                <button class="column-menu-btn" onclick="showColumnMenu('${column.id}')">
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                            </div>
                        `).join('')}
                        <div class="table-cell header-cell actions"></div>
                    </div>
                </div>
                <div class="table-body">
                    ${board.items.map(item => this.renderTableRow(item)).join('')}
                </div>
            </div>
        `;
    }

    renderTableRow(item) {
        const board = this.currentBoard;
        return `
            <div class="table-row" data-item-id="${item.id}">
                ${board.columns.map(column => `
                    <div class="table-cell" data-column="${column.id}">
                        ${this.renderCellValue(item.values[column.id], column.type)}
                    </div>
                `).join('')}
                <div class="table-cell actions">
                    <button class="action-btn" onclick="editItem('${item.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn" onclick="deleteItem('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    renderCellValue(value, type) {
        switch(type) {
            case 'status':
                return value ? `
                    <span class="status-label" style="background-color: ${value.color}">
                        ${value.label}
                    </span>
                ` : '';
            case 'person':
                return value ? `
                    <div class="person-cell">
                        <img src="https://picsum.photos/seed/${value.avatar}/24/24" alt="${value.name}">
                        <span>${value.name}</span>
                    </div>
                ` : '';
            case 'timeline':
                return value ? `
                    <div class="timeline-cell">
                        <i class="fas fa-calendar"></i>
                        ${value.start} - ${value.end}
                    </div>
                ` : '';
            case 'priority':
                return value ? `
                    <span class="priority-label priority-${value.label.toLowerCase()}">
                        ${value.label}
                    </span>
                ` : '';
            default:
                return value || '';
        }
    }

    showCreateBoardModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Board</h3>
                    <button class="modal-close" onclick="closeModal(this)">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Board Name</label>
                        <input type="text" class="form-control" id="boardName" placeholder="Enter board name">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="form-control" id="boardDescription" placeholder="What's this board for?"></textarea>
                    </div>
                    <div class="form-group">
                        <label>Template</label>
                        <select class="form-control">
                            <option>Blank Board</option>
                            <option>Project Management</option>
                            <option>Campaign Tracker</option>
                            <option>Content Calendar</option>
                            <option>Bug Tracker</option>
                            <option>CRM</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Board Color</label>
                        <div class="color-picker">
                            ${['#00C875', '#627EEA', '#FF6D00', '#FFAB00', '#E91E63', '#9C27B0'].map(color => `
                                <button class="color-option" style="background-color: ${color}" 
                                        onclick="selectBoardColor('${color}')"></button>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeModal(this)">Cancel</button>
                    <button class="btn btn-primary" onclick="createBoard()">Create Board</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
    }

    addNewItem() {
        if (!this.currentBoard) return;

        const newItem = {
            id: `item-${Date.now()}`,
            values: {}
        };

        // Initialize empty values for each column
        this.currentBoard.columns.forEach(column => {
            newItem.values[column.id] = null;
        });

        this.currentBoard.items.push(newItem);
        this.renderBoardView();
        showNotification('New item added', 'success');
    }

    setupBoardFilters() {
        const filterInput = document.querySelector('.filter-input');
        if (filterInput) {
            filterInput.addEventListener('input', (e) => {
                this.filterBoards(e.target.value);
            });
        }
    }

    filterBoards(query) {
        const filteredBoards = this.boards.filter(board =>
            board.name.toLowerCase().includes(query.toLowerCase()) ||
            board.description.toLowerCase().includes(query.toLowerCase())
        );

        const boardsGrid = document.querySelector('.boards-grid');
        if (boardsGrid) {
            boardsGrid.innerHTML = filteredBoards.map(board => this.renderBoardCard(board)).join('');
        }
    }
}

// Global functions
function loadWorkManagement() {
    if (!window.boardsManager) {
        window.boardsManager = new BoardsManager();
    } else {
        window.boardsManager.renderBoardsList();
    }
}

function backToBoards() {
    window.boardsManager.renderBoardsList();
}

function switchView(view) {
    // Update active view button
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.view-btn').classList.add('active');

    // Re-render board with different view
    window.boardsManager.currentView = view;
    window.boardsManager.renderBoardView();
}

function getViewIcon(view) {
    const icons = {
        table: 'table',
        kanban: 'columns',
        calendar: 'calendar',
        timeline: 'stream',
        chart: 'chart-bar',
        map: 'map-marked-alt',
        workload: 'weight'
    };
    return icons[view] || 'table';
}

function showBoardMenu(boardId) {
    showNotification('Board menu options', 'info');
}

function showColumnMenu(columnId) {
    showNotification('Column menu options', 'info');
}

function editItem(itemId) {
    showNotification(`Edit item ${itemId}`, 'info');
}

function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        const board = window.boardsManager.currentBoard;
        board.items = board.items.filter(item => item.id !== itemId);
        window.boardsManager.renderBoardView();
        showNotification('Item deleted', 'success');
    }
}

function selectBoardColor(color) {
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    window.selectedBoardColor = color;
}

function createBoard() {
    const name = document.getElementById('boardName').value;
    const description = document.getElementById('boardDescription').value;

    if (!name) {
        showNotification('Please enter a board name', 'error');
        return;
    }

    const newBoard = {
        id: `board-${Date.now()}`,
        name: name,
        description: description,
        owner: 'Current User',
        members: 1,
        items: 0,
        updated: 'Just now',
        color: window.selectedBoardColor || '#627EEA',
        columns: [
            { id: 'status', name: 'Status', type: 'status' },
            { id: 'task', name: 'Task Name', type: 'text' },
            { id: 'assignee', name: 'Assignee', type: 'person' }
        ],
        items: []
    };

    window.boardsManager.boards.unshift(newBoard);
    window.boardsManager.renderBoardsList();
    closeModal(document.querySelector('.modal-close'));
    showNotification('Board created successfully', 'success');
}

function closeModal(element) {
    const modal = element.closest('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Add board-specific styles
const boardStyles = `
<style>
.boards-container {
    padding: 1.5rem;
}

.boards-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.boards-header h1 {
    margin: 0;
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.boards-filters {
    margin-bottom: 2rem;
    padding: 1rem;
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
}

.filter-group {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.filter-input, .filter-select {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
}

.filter-input {
    flex: 1;
    max-width: 300px;
}

.boards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.board-card {
    background-color: white;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    padding: 1.5rem;
    cursor: pointer;
    transition: var(--transition);
}

.board-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}

.board-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
}

.board-header h3 {
    margin: 0;
    font-size: 1.125rem;
}

.board-menu {
    opacity: 0;
    transition: opacity 0.2s;
}

.board-card:hover .board-menu {
    opacity: 1;
}

.menu-btn {
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: var(--text-secondary);
}

.board-description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    font-size: 0.875rem;
}

.board-stats {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.stat {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.stat i {
    color: var(--primary-color);
}

.board-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.board-owner {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.board-owner img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.board-view {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.board-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: white;
    border-bottom: 1px solid var(--border-color);
}

.toolbar-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.toolbar-left h2 {
    margin: 0;
}

.toolbar-right {
    display: flex;
    align-items: center;
    gap: 1rem;
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

.board-content {
    flex: 1;
    overflow: auto;
}

.table-view {
    background-color: white;
    margin: 1rem;
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
    min-width: 150px;
}

.header-cell {
    font-weight: 600;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.column-menu-btn {
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: var(--text-secondary);
}

.status-label {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
}

.person-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.person-cell img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.timeline-cell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.priority-label {
    padding: 0.25rem 0.75rem;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    font-weight: 500;
}

.priority-high { background-color: rgba(255, 109, 0, 0.1); color: var(--danger-color); }
.priority-medium { background-color: rgba(255, 171, 0, 0.1); color: var(--warning-color); }
.priority-low { background-color: rgba(0, 200, 117, 0.1); color: var(--success-color); }

.actions {
    width: 80px;
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

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    border-radius: var(--radius-lg);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    color: var(--text-secondary);
}

.modal-body {
    padding: 1.5rem;
}

.modal-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

.color-picker {
    display: flex;
    gap: 0.5rem;
}

.color-option {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    transition: var(--transition);
}

.color-option:hover {
    transform: scale(1.1);
}

.color-option.selected {
    border-color: var(--text-primary);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', boardStyles);