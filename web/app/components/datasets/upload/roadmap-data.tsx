
export const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Phase 1: Foundations' }, type: 'input' },
    { id: '2', position: { x: -150, y: 100 }, data: { label: 'Master HTML, CSS, and JavaScript' }, type: 'default' },
    { id: '3', position: { x: 150, y: 100 }, data: { label: 'Version Control with Git' }, type: 'default' },
    { id: '4', position: { x: -200, y: 200 }, data: { label: 'Learn HTML5 Basics' }, type: 'default' },
    { id: '5', position: { x: -150, y: 200 }, data: { label: 'Learn CSS3 Basics' }, type: 'default' },
    { id: '6', position: { x: -100, y: 200 }, data: { label: 'Master JavaScript ES6+' }, type: 'default' },
    { id: '7', position: { x: 100, y: 200 }, data: { label: 'Git Basics: clone, commit, push' }, type: 'default' },
    { id: '8', position: { x: 150, y: 200 }, data: { label: 'Work with Branching' }, type: 'default' },
    { id: '9', position: { x: 200, y: 200 }, data: { label: 'GitHub/GitLab Collaboration' }, type: 'default' },

    { id: '10', position: { x: 0, y: 300 }, data: { label: 'Phase 2: Mastering React' }, type: 'default' },
    { id: '11', position: { x: -150, y: 400 }, data: { label: 'Core React Concepts' }, type: 'default' },
    { id: '12', position: { x: 150, y: 400 }, data: { label: 'React Hooks' }, type: 'default' },
    { id: '13', position: { x: -200, y: 500 }, data: { label: 'Components, JSX, Props' }, type: 'default' },
    { id: '14', position: { x: -150, y: 500 }, data: { label: 'State & Lifecycle' }, type: 'default' },
    { id: '15', position: { x: -100, y: 500 }, data: { label: 'Event Handling' }, type: 'default' },
    { id: '16', position: { x: 100, y: 500 }, data: { label: 'useState, useEffect' }, type: 'default' },
    { id: '17', position: { x: 150, y: 500 }, data: { label: 'useRef, useMemo, useCallback' }, type: 'default' },
    { id: '18', position: { x: 200, y: 500 }, data: { label: 'Custom Hooks' }, type: 'default' },

    { id: '19', position: { x: 0, y: 600 }, data: { label: 'React Router' }, type: 'default' },
    { id: '20', position: { x: -150, y: 700 }, data: { label: 'React Router Setup' }, type: 'default' },
    { id: '21', position: { x: 0, y: 700 }, data: { label: 'Nested & Protected Routes' }, type: 'default' },

    { id: '22', position: { x: 0, y: 800 }, data: { label: 'Phase 3: Building Real Projects' }, type: 'default' },
    { id: '23', position: { x: -150, y: 900 }, data: { label: 'Create First React App' }, type: 'default' },
    { id: '24', position: { x: 150, y: 900 }, data: { label: 'API Integration' }, type: 'default' },
    { id: '25', position: { x: -200, y: 1000 }, data: { label: 'To-do App' }, type: 'default' },
    { id: '26', position: { x: -150, y: 1000 }, data: { label: 'Weather App' }, type: 'default' },
    { id: '27', position: { x: 100, y: 1000 }, data: { label: 'Fetch Data with Axios' }, type: 'default' },
    { id: '28', position: { x: 150, y: 1000 }, data: { label: 'Handle Loading & Errors' }, type: 'default' },

    { id: '29', position: { x: 0, y: 1100 }, data: { label: 'Phase 4: Performance Optimization' }, type: 'default' },
    { id: '30', position: { x: -150, y: 1200 }, data: { label: 'Performance Optimization Techniques' }, type: 'default' },
    { id: '31', position: { x: 150, y: 1200 }, data: { label: 'React DevTools' }, type: 'default' },

    { id: '32', position: { x: 0, y: 1300 }, data: { label: 'Phase 5: Advanced React Ecosystem' }, type: 'default' },
    { id: '33', position: { x: -150, y: 1400 }, data: { label: 'Server-Side Rendering (SSR)' }, type: 'default' },
    { id: '34', position: { x: 150, y: 1400 }, data: { label: 'GraphQL Integration' }, type: 'default' },

    { id: '35', position: { x: 0, y: 1500 }, data: { label: 'Phase 6: Deployment & DevOps' }, type: 'default' },
    { id: '36', position: { x: -150, y: 1600 }, data: { label: 'CI/CD Pipelines' }, type: 'default' },
    { id: '37', position: { x: 150, y: 1600 }, data: { label: 'Deploying React Apps' }, type: 'output' },
];

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
];

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
