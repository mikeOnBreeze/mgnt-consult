---

## 2025-10-06 12:20 PDT — Gong MCP Docs

- Added `Gong-dash-docs.md` with auth, endpoints, rate limits, headers, and MCP usage notes.
- Noted env var alignment needed: use `GONG_ACCESS_KEY`/`GONG_ACCESS_SECRET` (current `.env` has `GONG_API_KEY`).
- Next: add pagination support to `list_calls` and confirm required headers vs tenant docs.

https://x.com/karpathy/status/1886192184808149383?lang=en
2/2/2025
Andrej Karpathy
@karpathy
There's a new kind of coding I call "vibe coding", where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper so I barely even touch the keyboard. I ask for the dumbest things like "decrease the padding on the sidebar by half" because I'm too lazy to find it. I "Accept All" always, I don't read the diffs anymore. When I get error messages I just copy paste them in with no comment, usually that fixes it. The code grows beyond my usual comprehension, I'd have to really read through it for a while. Sometimes the LLMs can't fix a bug so I just work around it or ask for random changes until it goes away. It's not too bad for throwaway weekend projects, but still quite amusing. I'm building a project or webapp, but it's not really coding - I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works.

---

# SLIDE 1: PROMPT ENGINEERING
**The Art of Effective AI Instructions**
https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview

## What is Prompt Engineering?
- The art and science of crafting effective instructions to AI models to get better, more reliable outputs
- A practical skill that requires only text input—no coding or technical training required

## Why It Matters
- **Cost-effective**: Works with base models without expensive fine-tuning
- **Flexible**: Allows rapid experimentation and iteration
- **Accessible**: Anyone can learn it with practice

## Core Principle: Be Clear and Specific
- Remove ambiguity—state exactly what you want
- Provide context about your goals and constraints
- Define success criteria upfront

## Use Examples (Multishot Prompting)
- Show the AI what good output looks like with 2-3 examples
- Examples are more powerful than lengthy explanations
- Demonstrates format, tone, and level of detail

## Break Down Complex Tasks (Chain of Thought)
- Ask AI to "think step-by-step" for complex problems
- Guide the reasoning process explicitly
- Improves accuracy and helps you verify the logic

## Assign Roles and Use Structure
- Give AI a specific role (e.g., "You are an expert teacher...")
- Use structured formats (bullet points, numbered lists, XML tags)
- Helps organize information and maintain consistency

## Iterate and Experiment
- Start with a draft prompt, test it, refine it
- Compare different approaches systematically
- Prompt engineering improves with practice

## Key Takeaway
- Better prompts = better AI outputs
- Small changes in wording can produce dramatically different results
- Think of prompting as a conversation: provide context, examples, and clear guidance

---

# SLIDE 2: CONTEXT ENGINEERING
**The "NEW Shit" - Managing AI Agent Information Environments**
https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

## What is Context Engineering?
- **Evolution beyond prompt engineering**: Managing the *entire* information environment an AI agent operates in—not just the question you ask
- **Core definition**: "Curating the smallest possible set of high-signal tokens that maximize the likelihood of success"
- Information quality over quantity

## Why It's Critical for AI Agents
- **The finite attention problem**: LLMs suffer from "context rot"—as context grows, accuracy degrades
- **Agent failures = Context failures**: In 2025, most agent failures aren't model limitations—they're context management failures
- Better context = more reliable, autonomous agents

## How It Differs From Prompt Engineering
- **Prompt engineering**: Writing effective instructions/questions ("What should I ask?")
- **Context engineering**: Designing the complete operational system ("What does the agent need to know, remember, and access?")
- **Scope**: Manages system instructions, tools, external data sources, conversation history, and memory

## The Four Core Context Management Strategies
- **Write**: Save information outside the context window (external memory/databases)
- **Select**: Pull in only relevant information when needed (retrieval)
- **Compress**: Summarize/condense to retain only essential tokens
- **Isolate**: Separate contexts for different purposes (sub-agents, workspaces)

## Key Principle: "Informative Yet Tight"
- **Treat context as precious**: Like RAM in a computer—finite and expensive
- **Minimal is better**: Start with minimal context and add only what improves performance
- **Avoid pollution**: Remove outdated, conflicting, or redundant information

## Practical Techniques That Work
- **Context compaction**: Summarize long conversations before hitting limits
- **Structured note-taking**: Agents maintain external "notebooks" of key facts
- **Sub-agent architectures**: Break complex tasks into focused mini-agents with clean context
- **Tool design**: Create self-contained, error-robust tools with clear purposes

## Real-World Impact Example
- **Without context engineering**: "Generate Q3 sales report" → Agent asks "What should I include?"
- **With context engineering**: Agent automatically drafts comprehensive report by accessing CRM data, support logs, meeting notes, templates—zero clarification questions

## Key Takeaway
- Context engineering is the foundation of reliable AI systems
- The shift from agents that "guess" to agents that "understand"
- Think of it like setting up a workspace for a new employee—right tools, files, access, and guidelines

---

# SLIDE 3: RIPER-5 MODES
**Mental Framework for Guiding AI Models**
See RIPER-5.md in repo

## The Five Operational Modes

### MODE 1: RESEARCH
- **Purpose**: Information gathering ONLY
- **Permitted**: Reading files, asking clarifying questions, understanding code structure
- **Forbidden**: Suggestions, implementations, planning
- **Output**: ONLY observations and questions

### MODE 2: INNOVATE (Brainstorm)
- **Purpose**: Brainstorming potential approaches
- **Permitted**: Discussing ideas, advantages/disadvantages, seeking feedback
- **Forbidden**: Concrete planning, implementation details, code writing
- **Output**: ONLY possibilities and considerations

### MODE 3: PLAN
- **Purpose**: Creating exhaustive technical specification
- **Permitted**: Detailed plans with exact file paths, function names, changes
- **Forbidden**: Any implementation or code writing
- **Requirement**: Plan comprehensive enough that no creative decisions needed during execution
- **Output**: Complete specifications + numbered CHECKLIST

### MODE 4: EXECUTE
- **Purpose**: Implementing EXACTLY what was planned
- **Permitted**: ONLY implementing what was explicitly detailed in approved plan
- **Forbidden**: Any deviation, improvement, or creative addition not in plan
- **Rule**: If ANY issue requires deviation, IMMEDIATELY return to PLAN mode

### MODE 5: REVIEW
- **Purpose**: Ruthlessly validate implementation against plan
- **Required**: Line-by-line comparison, EXPLICITLY FLAG ANY DEVIATION
- **Output**: Either "IMPLEMENTATION MATCHES PLAN EXACTLY" or "IMPLEMENTATION DEVIATES FROM PLAN"

## Why This Matters
- Prevents AI from being overeager and breaking existing code
- Forces separation of thinking from doing
- Ensures no unauthorized modifications
- Creates accountability and traceability
- Note: Less necessary with smarter models, but excellent mental framework for complex projects

## Key Protocol Rules
- Must declare mode at start of EVERY response: [MODE: MODE_NAME]
- Cannot transition between modes without explicit permission
- In EXECUTE mode, must follow plan with 100% fidelity
- In REVIEW mode, must flag even smallest deviation

---

# SLIDE 4: DEEP AGENTS
**From Simple AI to Autonomous Systems**
https://github.com/langchain-ai/deepagents

## What Are Deep Agents?
- Advanced AI systems that autonomously handle complex, multi-step tasks
- Go beyond simple Q&A to plan ahead, break down problems, work independently toward goals
- **Analogy**: Voice assistant (reactive) vs. Project manager (proactive and autonomous)

## The Four Core Components (Architecture)
- **Detailed System Prompt**: Extensive instructions with examples (like Claude Code's system prompt)
- **Planning Tool**: Built-in task tracking (Todo lists) to break goals into manageable steps
- **Sub-agents**: Specialized AI agents that handle specific subtasks with focused context
- **File System Access**: Persistent storage for notes, context, accumulated information

## How Deep Agents Work Differently
- **AI Assistants (Shallow)**: Wait for step-by-step instructions, respond to each prompt separately
- **Deep Agents (Autonomous)**: Given a goal, independently plan workflows, decompose tasks, execute without constant prompting
- Use hierarchical task planning to maintain dependencies and execution order

## Key Features That Enable Autonomy
- **Long-term planning**: Breaking down complex objectives into dependency-aware subtasks
- **Context management**: Using virtual file systems and sub-agents to avoid context overload
- **Adaptive execution**: Can refine plans based on results and changing circumstances
- **Tool creation**: Some systems can even create their own tools from UI interactions

## Real-World Examples
- **Claude Code**: Autonomous coding assistant that plans, writes, tests, debugs with minimal human intervention
- **Deep Research**: Multi-step research gathering information across sources, synthesizing reports
- **Manus**: Complex task automation system using deep agent principles
- Built with frameworks like LangGraph and DeepAgents library

## Why This Matters for Developers
- **Automation**: Handle complex workflows without continuous human supervision
- **Productivity**: One initial goal can trigger hours of autonomous work
- **Scalability**: Agents can decompose and parallelize tasks across sub-agents
- **Intelligence**: Systems that learn, adapt, improve through reflection and feedback

## The Future of Development
- Shift from "writing code" to "directing autonomous agents" that write, test, improve code
- Moving from reactive AI (assistants) to proactive AI (agents) that understand goals and create plans
- Enables developers to focus on high-level architecture while agents handle implementation
- Foundation for next-generation software development workflows

## Key Takeaway
- Deep Agents represent a paradigm shift from AI that answers questions to AI that autonomously solves problems
- Transforming software development through goal-oriented, self-planning, adaptive automation


