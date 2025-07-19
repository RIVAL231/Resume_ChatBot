"use client"

import { useState, useRef, useEffect } from "react"

// Minimal Input Component
const Input = ({ className = "", disabled = false, ...props }) => {
  return (
    <input
      className={`
        w-full px-4 py-3 
        bg-white/70 backdrop-blur-md border border-gray-200/50 rounded-xl
        focus:outline-none focus:ring-1 focus:ring-blue-400/60 focus:border-blue-300/60
        disabled:bg-gray-50/50 disabled:cursor-not-allowed disabled:opacity-50
        transition-all duration-200 ease-out
        placeholder-gray-400 text-gray-700
        text-sm
        ${className}
      `}
      disabled={disabled}
      {...props}
    />
  )
}

// Minimal Button Component
const Button = ({ children, type = "button", disabled = false, className = "", ...props }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        px-6 py-3 
        bg-blue-500 hover:bg-blue-600
        text-white rounded-xl font-medium text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-400/50
        disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60
        transition-all duration-200 ease-out
        active:scale-95
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

// Minimal Card Components
const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
      bg-white/80 backdrop-blur-xl border border-gray-200/30 rounded-2xl 
      shadow-lg
      ${className}
    `}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = "" }) => {
  return <div className={`p-6 pb-4 ${className}`}>{children}</div>
}

const CardTitle = ({ children, className = "" }) => {
  return <h3 className={`text-2xl font-semibold text-gray-800 ${className}`}>{children}</h3>
}

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}

// Custom ScrollArea with fixed height
const ScrollArea = ({ children, className = "" }) => {
  return (
    <div
      className={`overflow-y-auto ${className}`}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#cbd5e1 transparent",
        height: "calc(100vh - 280px)", // Adjusted for better space calculation
        minHeight: "400px", // Minimum height to ensure usability
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 4px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
      {children}
    </div>
  )
}

// Enhanced function to format markdown-style text with better structure handling
const formatMessage = (text) => {
  // Handle section headers with ###
  let formatted = text.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-gray-800 mt-4 mb-2 border-b border-gray-200 pb-1">$1</h3>')
  
  // Handle subsection headers with ##
  formatted = formatted.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-gray-800 mt-4 mb-2">$1</h2>')
  
  // Handle main headers with #
  formatted = formatted.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-gray-900 mt-4 mb-3">$1</h1>')
  
  // Handle **bold** text
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
  
  // Handle *italic* text
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
  
  // Handle `code` text
  formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-blue-100/60 px-2 py-1 rounded text-xs font-mono text-blue-800 border border-blue-200/50">$1</code>')
  
  // Handle multi-line code blocks ```
  formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-lg text-sm font-mono text-gray-800 border border-gray-200 my-2 overflow-x-auto"><code>$1</code></pre>')
  
  // Handle numbered lists with better styling
  formatted = formatted.replace(/^(\d+)\.\s(.+)/gm, '<div class="flex items-start gap-3 my-2 pl-2"><span class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">$1</span><span class="text-gray-700">$2</span></div>')
  
  // Handle bullet points with enhanced styling
  formatted = formatted.replace(/^[-*]\s(.+)/gm, '<div class="flex items-start gap-3 my-2 pl-2"><span class="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></span><span class="text-gray-700">$1</span></div>')
  
  // Handle sub-bullet points (indented with spaces)
  formatted = formatted.replace(/^\s{2,}[-*]\s(.+)/gm, '<div class="flex items-start gap-3 my-1 pl-8"><span class="flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span><span class="text-gray-600 text-sm">$1</span></div>')
  
  // Handle line breaks
  formatted = formatted.replace(/\n/g, '<br>')
  
  // Handle sections with better spacing
  formatted = formatted.replace(/(<h[1-3][^>]*>.*?<\/h[1-3]>)/g, '<div class="mt-4 mb-2">$1</div>')
  
  // Handle areas for growth or similar sections
  // formatted = formatted.replace(/Areas for Growth:/gi, '<div class="mt-4 mb-2"><h3 class="text-lg font-semibold text-amber-600 border-l-4 border-amber-400 pl-3">Areas for Growth:</h3></div>')
  
  // Handle key achievements sections
  // formatted = formatted.replace (/Key Achievements:/gi, '<div class="mt-4 mb-2"><h3 class="text-lg font-semibold text-green-600 border-l-4 border-green-400 pl-3">Key Achievements:</h3></div>')
  
  // Handle technical skills sections
  // formatted = formatted.replace(/Technical Skills:/gi, '<div class="mt-4 mb-2"><h3 class="text-lg font-semibold text-blue-600 border-l-4 border-blue-400 pl-3">Technical Skills:</h3></div>')
  
  // Handle experience sections
  // formatted = formatted.replace(/Experience:/gi, '<div class="mt-4 mb-2"><h3 class="text-lg font-semibold text-purple-600 border-l-4 border-purple-400 pl-3">Experience:</h3></div>')
  
  return formatted
}

export default function PersonalChat() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Hello! I'm **Sankalp's AI assistant**. I'm here to help you learn about his background, skills, and projects.\n\nYou can ask me about:\n- His *education* and achievements\n- Work experience at `HealthSutra Analytics` and `MedWander`\n- **Technical skills** like React.js, Python, AWS\n- Cool projects like *VoxGuard*, *FasalFix*, and *Echoed Words*\n\nWhat would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setLoading(true)

    try {
      const responseRes = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      })

      if (!responseRes.ok) {
        throw new Error(`HTTP error! status: ${responseRes.status}`)
      }

      const data = await responseRes.json()
      const botMessage = {
        role: "bot",
        content: data.response || "I apologize, but I couldn't process that request at the moment. Please try again.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage = {
        role: "bot",
        content: "Something went wrong. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full max-w-4xl mx-auto p-4">
        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader className="border-b border-gray-100/50 flex-shrink-0">
            <CardTitle className="text-center mb-2">Discover my journey, skills, and projects</CardTitle>
            {/* <p className="text-center text-gray-500 text-sm"></p> */}
          </CardHeader>

          <CardContent className="flex-1 flex flex-col min-h-0">
            <ScrollArea className="flex-1 pr-2 mb-4">
              <div className="space-y-4 py-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-2xl px-5 py-4 max-w-[85%] text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white shadow-lg"
                          : "bg-white/90 text-gray-700 border border-gray-200/50 shadow-sm"
                      }`}
                    >
                      <div 
                        dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                        className={`prose prose-sm max-w-none ${
                          msg.role === "user" 
                            ? "prose-invert" 
                            : "prose-gray"
                        }`}
                        style={{
                          lineHeight: '1.6',
                          fontSize: '14px'
                        }}
                      />
                      {msg.timestamp && (
                        <span
                          className={`text-xs mt-2 block opacity-70 ${
                            msg.role === "user" ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100/80 rounded-2xl px-6 py-4 border border-gray-200/50 relative overflow-hidden">
                      <div className="flex items-center space-x-3">
                        {/* Sophisticated animated dots */}
                        <div className="flex items-center space-x-1">
                          <div className="typing-dot-1"></div>
                          <div className="typing-dot-2"></div>
                          <div className="typing-dot-3"></div>
                        </div>
                        <span className="text-gray-500 text-sm font-medium">Sankalp's AI is thinking</span>
                      </div>
                      {/* Subtle background animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent animate-pulse-slow"></div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <form
              className="flex items-center space-x-3 p-4 bg-gray-50/50 backdrop-blur-sm rounded-xl border border-gray-200/30 flex-shrink-0"
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
            >
              <Input
                placeholder="Ask me anything about Sankalp..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !input.trim()} className="shrink-0">
                {loading ? "..." : "Send"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0, -8px, 0);
    }
    70% {
      transform: translate3d(0, -4px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }
  
  @keyframes sophisticatedBounce {
    0%, 60%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.7;
    }
    30% {
      transform: translateY(-12px) scale(1.1);
      opacity: 1;
    }
  }
  
  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
      transform: scale(1.05);
    }
  }
  
  @keyframes slideBackground {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .animate-bounce {
    animation: bounce 1.4s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: slideBackground 2s ease-in-out infinite;
  }
  
  .typing-dot-1,
  .typing-dot-2,
  .typing-dot-3 {
    width: 8px;
    height: 8px;
    background: linear-gradient(45deg, #3b82f6, #6366f1);
    border-radius: 50%;
    animation: sophisticatedBounce 1.4s ease-in-out infinite, pulseGlow 2s ease-in-out infinite;
  }
  
  .typing-dot-1 {
    animation-delay: 0s;
  }
  
  .typing-dot-2 {
    animation-delay: 0.2s;
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
  }
  
  .typing-dot-3 {
    animation-delay: 0.4s;
    background: linear-gradient(45deg, #8b5cf6, #a855f7);
  }
  
  /* Enhanced hover effects for dots */
  .typing-dot-1:hover,
  .typing-dot-2:hover,
  .typing-dot-3:hover {
    animation-play-state: paused;
    transform: scale(1.3);
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
  }
  
  /* Enhanced text formatting styles */
  .prose h1, .prose h2, .prose h3 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
  
  .prose ul, .prose ol {
    margin: 0.5rem 0;
    padding-left: 0;
  }
  
  .prose li {
    margin: 0.25rem 0;
  }
  
  .prose code {
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .prose pre {
    margin: 0.75rem 0;
    border-radius: 0.5rem;
  }
  
  .prose blockquote {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1rem 0;
    background: rgba(59, 130, 246, 0.05);
    border-radius: 0 0.5rem 0.5rem 0;
  }
  
  /* Custom spacing for better readability */
  .message-content p {
    margin: 0.5rem 0;
  }
  
  .message-content p:first-child {
    margin-top: 0;
  }
  
  .message-content p:last-child {
    margin-bottom: 0;
  }
`}</style>
    </div>
  )
}
