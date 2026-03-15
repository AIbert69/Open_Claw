const responsesByRole: Record<string, string[]> = {
  boss: [
    "I've noted that. Let me check on the status and get back to you.",
    "Good call. I'll prioritize this across the team.",
    "Let's schedule a review for that. I'll set it up.",
    "I've delegated that to the appropriate agent. You'll have an update soon.",
    "Consider it done. I'll follow up with a summary.",
    "That aligns with our current priorities. Moving forward on it.",
  ],
  fitness: [
    "Great! Let's build a routine around that goal. How many days per week can you commit?",
    "Remember to stay hydrated and get 7-8 hours of sleep for optimal recovery.",
    "I'd recommend starting with 3 sets of 12 reps and progressively overloading.",
    "Your consistency has been solid this week. Keep pushing!",
    "Let me put together a split that targets those muscle groups effectively.",
    "Recovery is just as important as the workout. Don't skip rest days.",
  ],
  "life coach": [
    "That's a powerful insight. How does that align with your long-term vision?",
    "Let's break that down into smaller, actionable steps you can start today.",
    "I've added that to your journal. Reflecting on it will bring clarity.",
    "I believe in your ability to achieve this. What's your first move?",
    "Interesting pattern I'm noticing - you tend to thrive when you have structure.",
    "Let me capture that thought. It could be valuable for your weekly review.",
  ],
  contacts: [
    "I can help you draft an outreach message for that connection.",
    "Let me check your network for relevant introductions.",
    "I'd suggest following up within 48 hours while the conversation is fresh.",
    "I've found 3 people in your network who might be valuable for this.",
    "Great networking opportunity. Want me to prep some talking points?",
    "I'll add them to your contacts with the context of how you met.",
  ],
};

const defaultResponses = [
  "Got it. I'll work on that right away.",
  "Understood. Let me process that and get back to you.",
  "I'm on it. You'll have an update shortly.",
  "Thanks for letting me know. I'll take care of it.",
];

export function getMockResponse(role: string): string {
  const pool = responsesByRole[role.toLowerCase()] || defaultResponses;
  return pool[Math.floor(Math.random() * pool.length)];
}
