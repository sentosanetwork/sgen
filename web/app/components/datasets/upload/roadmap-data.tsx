export const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Phase 1: Foundations', extraInfo: 'This phase covers the foundational knowledge required to become a front-end developer. To learn this, start with basic HTML, CSS, and JavaScript. Progress through understanding version control, and move towards more advanced JavaScript ES6+ concepts.' }, type: 'input' },
  { id: '2', position: { x: -150, y: 100 }, data: { label: 'Master HTML, CSS, and JavaScript', extraInfo: 'Learn the basic building blocks of web development. Start with tutorials or courses on HTML, CSS, and JavaScript, and build small projects to practice your skills.' }, type: 'default' },
  { id: '3', position: { x: 150, y: 100 }, data: { label: 'Version Control with Git', extraInfo: 'Get hands-on experience with Git and GitHub for version control. Follow a beginner’s Git course to understand commands like clone, commit, and push.' }, type: 'default' },
  { id: '4', position: { x: -200, y: 200 }, data: { label: 'Learn HTML5 Basics', extraInfo: 'Understand the fundamentals of HTML5 to structure web pages effectively. Focus on semantic HTML, forms, and basic web layout.' }, type: 'default' },
  { id: '5', position: { x: -150, y: 200 }, data: { label: 'Learn CSS3 Basics', extraInfo: 'Explore the styling techniques with CSS3 to make responsive websites. Learn flexbox, grid, and media queries.' }, type: 'default' },
  { id: '6', position: { x: -100, y: 200 }, data: { label: 'Master JavaScript ES6+', extraInfo: 'Deep dive into JavaScript ES6+ syntax and features for modern web development. Study features like arrow functions, promises, async/await, and modules.' }, type: 'default' },
  { id: '7', position: { x: 100, y: 200 }, data: { label: 'Git Basics: clone, commit, push', extraInfo: 'Learn how to clone repositories, commit changes, and push them to GitHub or GitLab. Practice by contributing to open-source projects or building your own.' }, type: 'default' },
  { id: '8', position: { x: 150, y: 200 }, data: { label: 'Work with Branching', extraInfo: 'Get familiar with branching strategies and how to collaborate effectively. Study concepts like branching, merging, and pull requests.' }, type: 'default' },
  { id: '9', position: { x: 200, y: 200 }, data: { label: 'GitHub/GitLab Collaboration', extraInfo: 'Collaborate on projects with others using GitHub or GitLab. Learn how to fork repositories and submit pull requests.' }, type: 'default' },
  { id: '10', position: { x: 0, y: 300 }, data: { label: 'Phase 2: Mastering React', extraInfo: 'This phase covers React core concepts and how to build powerful front-end applications. Start with basic React concepts like components, JSX, and state, then move on to more advanced hooks and lifecycle methods.' }, type: 'default' },
  { id: '11', position: { x: -150, y: 400 }, data: { label: 'Core React Concepts', extraInfo: 'Understand components, JSX, and virtual DOM to work with React. Build small applications to get hands-on experience.' }, type: 'default' },
  { id: '12', position: { x: 150, y: 400 }, data: { label: 'React Hooks', extraInfo: 'Learn to manage state and side effects with React hooks like useState and useEffect. Build apps that use both hooks to understand their use cases.' }, type: 'default' },
  { id: '13', position: { x: -200, y: 500 }, data: { label: 'Components, JSX, Props', extraInfo: 'Discover how to create reusable components and pass data using props. Focus on component composition and practice by building multiple UI components.' }, type: 'default' },
  { id: '14', position: { x: -150, y: 500 }, data: { label: 'State & Lifecycle', extraInfo: 'Manage state and lifecycle methods in functional components. Study how state changes over time and its impact on UI rendering.' }, type: 'default' },
  { id: '15', position: { x: -100, y: 500 }, data: { label: 'Event Handling', extraInfo: 'Handle user interactions with event handling in React. Learn to capture user input and trigger appropriate functions on events.' }, type: 'default' },
  { id: '16', position: { x: 100, y: 500 }, data: { label: 'useState, useEffect', extraInfo: 'Master React hooks for state and side effect management. Build projects that involve data fetching and dynamic updates using these hooks.' }, type: 'default' },
  { id: '17', position: { x: 150, y: 500 }, data: { label: 'useRef, useMemo, useCallback', extraInfo: 'Optimize performance using hooks like useRef, useMemo, and useCallback. Focus on preventing unnecessary re-renders and improving component efficiency.' }, type: 'default' },
  { id: '18', position: { x: 200, y: 500 }, data: { label: 'Custom Hooks', extraInfo: 'Build your own reusable custom hooks to encapsulate complex logic. Practice by modularizing logic across components into reusable hooks.' }, type: 'default' },
  { id: '19', position: { x: 0, y: 600 }, data: { label: 'React Router', extraInfo: 'Learn how to navigate between pages with React Router. Build multi-page applications with dynamic routing.' }, type: 'default' },
  { id: '20', position: { x: -150, y: 700 }, data: { label: 'React Router Setup', extraInfo: 'Set up routing in your React app to enable page navigation. Practice setting up routes, linking between pages, and implementing browser history.' }, type: 'default' },
  { id: '21', position: { x: 0, y: 700 }, data: { label: 'Nested & Protected Routes', extraInfo: 'Implement nested and protected routes in your React app. Learn to structure routes for complex applications and add authentication guards.' }, type: 'default' },
  { id: '22', position: { x: 0, y: 800 }, data: { label: 'Phase 3: Building Real Projects', extraInfo: 'Start applying your knowledge by building real-world React applications. Choose projects that involve API integration and more complex state management.' }, type: 'default' },
  { id: '23', position: { x: -150, y: 900 }, data: { label: 'Create First React App', extraInfo: 'Create your first React application from scratch. Follow tutorials to set up the project and practice using common features like forms and navigation.' }, type: 'default' },
  { id: '24', position: { x: 150, y: 900 }, data: { label: 'API Integration', extraInfo: 'Learn how to integrate third-party APIs into your React apps. Study how to make API calls and handle responses.' }, type: 'default' },
  { id: '25', position: { x: -200, y: 1000 }, data: { label: 'To-do App', extraInfo: 'Build a simple To-do app to manage tasks. Focus on managing state, adding, editing, and deleting tasks.' }, type: 'default' },
  { id: '26', position: { x: -150, y: 1000 }, data: { label: 'Weather App', extraInfo: 'Create a weather app that fetches data from a weather API. Learn to handle asynchronous operations and display real-time data.' }, type: 'default' },
  { id: '27', position: { x: 100, y: 1000 }, data: { label: 'Fetch Data with Axios', extraInfo: 'Learn how to fetch data from APIs using Axios. Practice making get requests, handling responses, and error management.' }, type: 'default' },
  { id: '28', position: { x: 150, y: 1000 }, data: { label: 'Handle Loading & Errors', extraInfo: 'Handle loading states and errors in your applications. Study how to show loading spinners and handle error cases gracefully.' }, type: 'default' },
  { id: '29', position: { x: 0, y: 1100 }, data: { label: 'Phase 4: Performance Optimization', extraInfo: 'Learn how to optimize your React applications for better performance. Focus on tools and techniques to improve rendering efficiency.' }, type: 'default' },
  { id: '30', position: { x: -150, y: 1200 }, data: { label: 'Performance Optimization Techniques', extraInfo: 'Implement techniques to improve app performance and reduce render time. Learn memoization, code-splitting, and lazy loading.' }, type: 'default' },
  { id: '31', position: { x: 150, y: 1200 }, data: { label: 'React DevTools', extraInfo: 'Use React DevTools to debug and profile your app. Study how to find performance bottlenecks and inspect component rendering.' }, type: 'default' },
  { id: '32', position: { x: 0, y: 1300 }, data: { label: 'Phase 5: Advanced React Ecosystem', extraInfo: 'Explore advanced topics in the React ecosystem. Study topics like server-side rendering and advanced data fetching strategies.' }, type: 'default' },
  { id: '33', position: { x: -150, y: 1400 }, data: { label: 'Server-Side Rendering (SSR)', extraInfo: 'Learn how to render React on the server to improve performance and SEO. Follow a tutorial on using Next.js or similar frameworks.' }, type: 'default' },
  { id: '34', position: { x: 150, y: 1400 }, data: { label: 'GraphQL Integration', extraInfo: 'Integrate GraphQL with your React application to fetch data efficiently. Study how to set up a GraphQL client and query data.' }, type: 'default' },
  { id: '35', position: { x: 0, y: 1500 }, data: { label: 'Phase 6: Deployment & DevOps', extraInfo: 'Deploy your React applications and set up continuous integration/continuous deployment pipelines. Practice automating deployment processes.' }, type: 'default' },
  { id: '36', position: { x: -150, y: 1600 }, data: { label: 'CI/CD Pipelines', extraInfo: 'Set up CI/CD pipelines to automate deployment processes. Use services like GitHub Actions, Jenkins, or CircleCI.' }, type: 'default' },
  { id: '37', position: { x: 150, y: 1600 }, data: { label: 'Deploying React Apps', extraInfo: 'Learn how to deploy your React apps to platforms like Netlify or Vercel. Follow step-by-step guides to publish your app live.' }, type: 'output' },
]

export const initialEdges = [
  { id: 'e1', source: '1', target: '2' },
  { id: 'e2', source: '1', target: '3' },
  { id: 'e3', source: '2', target: '4' },
  { id: 'e4', source: '2', target: '5' },
  { id: 'e5', source: '2', target: '6' },
  { id: 'e6', source: '3', target: '7' },
  { id: 'e7', source: '3', target: '8' },
  { id: 'e8', source: '3', target: '9' },
  { id: 'e9', source: '10', target: '11' },
  { id: 'e10', source: '10', target: '12' },
  { id: 'e11', source: '11', target: '13' },
  { id: 'e12', source: '11', target: '14' },
  { id: 'e13', source: '11', target: '15' },
  { id: 'e14', source: '12', target: '16' },
  { id: 'e15', source: '12', target: '17' },
  { id: 'e16', source: '12', target: '18' },
  { id: 'e17', source: '19', target: '20' },
  { id: 'e18', source: '19', target: '21' },
  { id: 'e19', source: '22', target: '23' },
  { id: 'e20', source: '22', target: '24' },
  { id: 'e21', source: '23', target: '25' },
  { id: 'e22', source: '23', target: '26' },
  { id: 'e23', source: '24', target: '27' },
  { id: 'e24', source: '24', target: '28' },
  { id: 'e25', source: '29', target: '30' },
  { id: 'e26', source: '29', target: '31' },
  { id: 'e27', source: '32', target: '33' },
  { id: 'e28', source: '32', target: '34' },
  { id: 'e29', source: '35', target: '36' },
  { id: 'e30', source: '35', target: '37' },

  // New edges to connect Phase 1 to Phase 2 through Phase 6
  { id: 'e31', source: '1', target: '10' }, // Phase 1 to Phase 2
  { id: 'e32', source: '10', target: '19' }, // Phase 2 to Phase 3
  { id: 'e33', source: '19', target: '29' }, // Phase 3 to Phase 4
  { id: 'e34', source: '29', target: '32' }, // Phase 4 to Phase 5
  { id: 'e35', source: '32', target: '35' }, // Phase 5 to Phase 6
]

export const mermaidDiagram = `
    graph TD;
    A((Start Mobile App Development)) --> B[Phase 1: Beginner];
    B --> C{Learn Fundamentals};
    C --> D[Flutter/Dart Basics];
    C --> E[React Native/JavaScript Basics];
    C --> F[Git & Version Control];
    C --> G[Firebase Basics];
    C --> H[Milestone: Build Simple Apps];
    B --> I[Phase 2: Intermediate];
    I --> J{Advance UI/UX Skills};
    J --> K[Custom Widgets in Flutter];
    J --> L[React Hooks & Redux-Saga];
    J --> M[APIs: Dio & Axios];
    J --> N[State Management: Getx & Redux];
    J --> O[Milestone: Publish First App];
    I --> P{Master App Store Deployment};
    P --> Q[CI/CD Setup];
    P --> R[Publish to AppStore/PlayStore];
    P --> S[Milestone: Deploy Multiple Apps];
    I --> T[Phase 3: Advanced];
    T --> U{Backend & Advanced Features};
    U --> V[Firebase Firestore Integration];
    U --> W[Push Notifications];
    U --> X[Offline Functionality];
    U --> Y[Milestone: Real-time Sync & Offline Support];
    T --> Z{Optimization & Testing};
    Z --> AA[Performance Optimization];
    Z --> AB[Automated Testing];
    Z --> AC[Deeper CI/CD Exploration];
    Z --> AD[Milestone: Automated Testing & Delivery];
    T --> AE[Phase 4: Expert / Leadership];
    AE --> AF{Contribute & Lead};
    AF --> AG[Contribute to Open Source];
    AF --> AH[Mentor Others];
    AF --> AI{Advanced Architecture};
    AI --> AJ[Modular App Design];
    AI --> AK[Scalability & Maintainability];
    AF --> AL[Milestone: Lead a Team/Project];

    %% Correct clickable buttons
    click A "https://www.example.com/decide-to-make-pizza" "Step 1: Decide to make pizza";
    click B "https://www.example.com/buy-ingredients" "Step 2: Buy ingredients";
    click C "https://www.example.com/prepare-sauce" "Step 3: Prepare sauce";
    click D "https://www.example.com/roll-out-dough" "Step 4: Roll out dough";
    click E "https://www.example.com/add-toppings" "Step 5: Add cheese & toppings";
    click F "https://www.example.com/bake-pizza" "Step 6: Bake pizza";
    click G "https://www.example.com/enjoy-pizza" "Step 7: Enjoy your pizza!";
    `
