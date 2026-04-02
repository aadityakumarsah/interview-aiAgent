// In-memory database — stored on globalThis so it survives Next.js hot-reloads

interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
  coverImage?: string;
  persona?: string;
}

interface Feedback {
  id: string;
  interviewId: string;
  userId: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}

// Use globalThis so hot-reload doesn't wipe the Maps
const g = globalThis as typeof globalThis & {
  _interviews?: Map<string, Interview>;
  _feedbacks?: Map<string, Feedback>;
};

if (!g._interviews) g._interviews = new Map<string, Interview>();
if (!g._feedbacks) g._feedbacks = new Map<string, Feedback>();

const interviews = g._interviews;
const feedbacks = g._feedbacks;

function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export const interviewDb = {
  add: async (interview: Omit<Interview, "id">): Promise<{ id: string }> => {
    const id = generateId();
    interviews.set(id, { ...interview, id });
    return { id };
  },

  get: async (id: string): Promise<Interview | null> => {
    return interviews.get(id) || null;
  },

  getByUserId: async (userId: string): Promise<Interview[]> => {
    return Array.from(interviews.values())
      .filter((i) => i.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  },

  getLatest: async (userId: string, limit = 20): Promise<Interview[]> => {
    return Array.from(interviews.values())
      .filter((i) => i.finalized && i.userId !== userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, limit);
  },

  getAll: async (): Promise<Interview[]> => Array.from(interviews.values()),

  update: async (id: string, data: Partial<Interview>): Promise<void> => {
    const item = interviews.get(id);
    if (item) interviews.set(id, { ...item, ...data });
  },

  delete: async (id: string): Promise<void> => {
    interviews.delete(id);
  },
};

export const feedbackDb = {
  add: async (feedback: Omit<Feedback, "id">): Promise<{ id: string }> => {
    const id = generateId();
    feedbacks.set(id, { ...feedback, id });
    return { id };
  },

  get: async (id: string): Promise<Feedback | null> => {
    return feedbacks.get(id) || null;
  },

  getByInterviewId: async (
    interviewId: string,
    userId: string
  ): Promise<Feedback | null> => {
    return (
      Array.from(feedbacks.values()).find(
        (f) => f.interviewId === interviewId && f.userId === userId
      ) || null
    );
  },

  update: async (id: string, data: Partial<Feedback>): Promise<void> => {
    const item = feedbacks.get(id);
    if (item) feedbacks.set(id, { ...item, ...data });
  },

  delete: async (id: string): Promise<void> => {
    feedbacks.delete(id);
  },
};

export type { Interview, Feedback };
