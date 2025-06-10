
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, User, Settings, Menu } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [notifications, setNotifications] = useState(["New message from admin", "System update available"]);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish UI", done: false },
    { id: 2, title: "Review PRs", done: true },
  ]);
  const [query, setQuery] = useState("");
  const [analyticsData, setAnalyticsData] = useState(null);

  const handleNotificationClick = () => {
    alert(notifications.join("\n"));
  };

  const handleUserClick = () => {
    alert("Go to user profile or logout.");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const addTask = (title) => {
    setTasks((prev) => [...prev, { id: Date.now(), title, done: false }]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const fetchAnalytics = async () => {
      // Simulated API call
      const data = { users: 120, messages: 45 };
      setAnalyticsData(data);
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 text-green-900">
      <header className="flex justify-between items-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-green-800"
        >
          Elegant Dashboard
        </motion.div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
            <Bell className="text-green-700" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="text-green-700" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleUserClick}>
            <User className="text-green-700" />
          </Button>
        </div>
      </header>

      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks..."
          className="p-2 border border-green-200 rounded-lg shadow w-full max-w-md"
        />
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-2xl shadow-lg border-green-200 bg-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Analytics</h2>
              <p className="text-green-600">
                Users: {analyticsData?.users ?? "Loading..."}<br />
                Messages: {analyticsData?.messages ?? "Loading..."}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="rounded-2xl shadow-lg border-green-200 bg-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Tasks</h2>
              <ul className="space-y-2">
                {filteredTasks.map((task) => (
                  <li key={task.id} className="flex justify-between items-center">
                    <span className={task.done ? "line-through text-green-400" : ""}>{task.title}</span>
                    <div className="space-x-2">
                      <Button onClick={() => toggleTask(task.id)} size="sm" variant="outline">Toggle</Button>
                      <Button onClick={() => deleteTask(task.id)} size="sm" variant="destructive">Delete</Button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="New Task Title"
                  className="p-2 border border-green-200 rounded-lg w-full mb-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim()) {
                      addTask(e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="rounded-2xl shadow-lg border-green-200 bg-white">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Messages</h2>
              <p className="text-green-600">
                You have {notifications.length} notifications. Click the bell icon to view.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <footer className="mt-12 text-center text-sm text-green-700">
        Made with ❤️ | <span className="text-yellow-600 font-semibold">Gold Accent</span> by Ice
      </footer>
    </div>
  );
};

export default Dashboard;
