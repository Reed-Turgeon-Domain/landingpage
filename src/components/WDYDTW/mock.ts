export const wdydtwData = [
  {
    dates:{
      start: "2025-05-12",
      end: "2025-05-18"
    },
    tasks: [
      {
        category: 'CODING',
        title: 'Hourglass Attention Tracker',
        update: 'New application to better manage / track where my time is going (prep for graduate school). I am also using this project as an excuse to learn Electron. Got far enough to realize I needed to dive deeper into Electron - hense the WRITING:Electron101 article and the CODING:Electron Example / Template repo.',
        link: 'https://github.com/Hourglass-Attention-Tracker/HAT-MVP-ELECTRON'
      },
      {
        category: 'WRITING',
        title: 'Electron101',
        update: 'Researched and wrote article outlining the main pillars of Electron.',
        link: 'https://github.com/Mr-T-Writing/Electron-101/blob/main/electron_101.article.md',
      },
      {
        category: 'CODING',
        title: 'Electron Example / Template',
        update: 'Based on research for Electron101 article I configured a full Electron template repo using Electron, Vite, Tanstack Router, React, Typescript, SQLite, and Drizzle.',
        link: 'https://github.com/Learn-Like-Me-LLM/ELECTRON-EXAMPLE',
      },
    ],
    logs: {
      running: [
        {
          date: '2025-05-12',
          timestamp: new Date('2025-05-12').getTime(),
          distance: 10,
          time_in_minutes: 100,
        },
        {
          date: '2025-05-13',
          timestamp: new Date('2025-05-13').getTime(),
          distance: 10,
          time_in_minutes: 100,
        },
        {
          date: '2025-05-16',
          timestamp: new Date('2025-05-16').getTime(),
          distance: 10,
          time_in_minutes: 100,
        },
        
      ],
      pushups: [
        {
          date: '2025-05-12',
          timestamp: new Date('2025-05-12').getTime(),
          count: 10,
        },
        {
          date: '2025-05-13',
          timestamp: new Date('2025-05-13').getTime(),
          count: 10,
        } 
      ],
      weight: [
        {
          date: '2025-05-12',
          timestamp: new Date('2025-05-12').getTime(),
          weight_in_lbs: 100,
        },
        {
          date: '2025-05-13',
          timestamp: new Date('2025-05-13').getTime(),
          weight_in_lbs: 100,
        },
      ],
    }
  },
]