# Project Management Application

![Project Management](https://img.shields.io/badge/Project-Management-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-red)

A modern, full-stack project management application built with React, Node.js, and PostgreSQL. This application helps teams manage projects, tasks, and collaboration effectively with features like Kanban boards, list views, timeline views, and more.

## 🌟 Features

### 📊 Multiple View Options
- **Board View**: Kanban-style board for visual task management
- **List View**: Traditional list view for detailed task information
- **Timeline View**: Gantt chart for project scheduling
- **Table View**: Sortable table view for data analysis

### 🎯 Task Management
- Create and manage tasks with rich details
- Set priorities and deadlines
- Track progress and status
- Assign tasks to team members
- Add attachments and comments

### 👥 Team Collaboration
- Real-time updates
- Team member assignments
- Project sharing
- Activity tracking

### 🎨 Modern UI/UX
- Clean and intuitive interface
- Dark mode support
- Responsive design
- Drag-and-drop functionality

## 🛠️ Tech Stack

### Frontend
- [<img src="https://reactjs.org/favicon.ico" width="16"/> React](https://reactjs.org/)
- [<img src="https://www.typescriptlang.org/favicon-32x32.png" width="16"/> TypeScript](https://www.typescriptlang.org/)
- [<img src="https://tailwindcss.com/favicons/favicon-32x32.png" width="16"/> Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### Backend
- [<img src="https://nodejs.org/static/images/favicons/favicon.ico" width="16"/> Node.js](https://nodejs.org/)
- [<img src="https://www.prisma.io/favicon.ico" width="16"/> Prisma](https://www.prisma.io/)
- [<img src="https://www.postgresql.org/favicon.ico" width="16"/> PostgreSQL](https://www.postgresql.org/)

### Additional Tools
- [date-fns](https://date-fns.org/) for date manipulation
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [React DnD](https://react-dnd.github.io/react-dnd/) for drag and drop
- [Gantt Chart](https://github.com/JSainsburyPLC/react-timelines) for timeline view

## 📦 Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/project-management.git
\`\`\`

2. Install dependencies
\`\`\`bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd client
npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
# Create .env file in server directory
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"

# Create .env file in client directory
VITE_API_URL="http://localhost:3000"
\`\`\`

4. Run database migrations
\`\`\`bash
cd server
npx prisma migrate dev
\`\`\`

5. Start the application
\`\`\`bash
# Start backend server
cd server
npm run dev

# Start frontend application
cd client
npm run dev
\`\`\`

## 🚀 Usage

1. Create a new project
2. Add team members
3. Create tasks and organize them
4. Use different views to manage your project
5. Track progress and collaborate with your team

## 📸 Screenshots

### Board View
![Board View](path_to_board_view_screenshot.png)

### Timeline View
![Timeline View](path_to_timeline_view_screenshot.png)

### List View
![List View](path_to_list_view_screenshot.png)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
